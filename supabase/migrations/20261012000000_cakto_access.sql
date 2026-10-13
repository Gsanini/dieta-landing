-- Vendas da Cakto ficam privadas. O aplicativo consulta apenas o resultado booleano
-- de public.has_testo_max_access(), após autenticação por e-mail confirmado.
create schema if not exists private;

create table if not exists public.cakto_subscriptions (
  subscription_id text primary key,
  product_id text not null,
  customer_email text not null,
  access_state text not null default 'pending'
    check (access_state in ('pending', 'active', 'late', 'paused', 'canceled')),
  state_changed_at timestamptz,
  updated_at timestamptz not null default now(),
  check (customer_email = lower(btrim(customer_email)))
);

create table if not exists public.cakto_orders (
  order_id text primary key,
  subscription_id text not null references public.cakto_subscriptions(subscription_id),
  product_id text not null,
  customer_email text not null,
  payment_status text not null check (payment_status in ('paid', 'refunded', 'chargeback')),
  paid_at timestamptz,
  updated_at timestamptz not null default now(),
  check (customer_email = lower(btrim(customer_email)))
);

create index if not exists cakto_orders_access_idx
  on public.cakto_orders (subscription_id, payment_status);

alter table public.cakto_subscriptions enable row level security;
alter table public.cakto_orders enable row level security;
revoke all on public.cakto_subscriptions from public, anon, authenticated;
revoke all on public.cakto_orders from public, anon, authenticated;
grant select, insert, update on public.cakto_subscriptions to service_role;
grant select, insert, update on public.cakto_orders to service_role;

-- Executada somente pela Edge Function com a chave secreta do projeto.
-- A transação inteira reverte se algum pedido da entrega falhar.
create or replace function public.record_cakto_webhook(p_event text, p_orders jsonb)
returns void
language plpgsql
security invoker
set search_path = ''
as $$
declare
  v_item jsonb;
  v_order_id text;
  v_subscription_id text;
  v_product_id text;
  v_customer_email text;
  v_event_at timestamptz;
  v_paid_at timestamptz;
  v_old_email text;
  v_old_product text;
  v_new_state text;
begin
  if jsonb_typeof(p_orders) <> 'array' then
    raise exception 'p_orders must be an array';
  end if;

  for v_item in select value from jsonb_array_elements(p_orders) loop
    v_order_id := v_item->>'id';
    v_subscription_id := v_item#>>'{subscription,id}';
    v_product_id := v_item#>>'{product,id}';
    v_customer_email := lower(btrim(v_item#>>'{customer,email}'));
    if nullif(v_order_id, '') is null or nullif(v_subscription_id, '') is null
       or nullif(v_product_id, '') is null or nullif(v_customer_email, '') is null then
      raise exception 'missing order, subscription, product, or email';
    end if;

    -- updatedAt pertence à assinatura, não ao pedido. Permite ignorar
    -- notificações antigas que cheguem fora de ordem ou sejam reenviadas.
    v_event_at := coalesce(nullif(v_item#>>'{subscription,updatedAt}', '')::timestamptz, now());
    v_paid_at := nullif(v_item->>'paidAt', '')::timestamptz;

    insert into public.cakto_subscriptions
      (subscription_id, product_id, customer_email)
    values (v_subscription_id, v_product_id, v_customer_email)
    on conflict (subscription_id) do nothing;

    select s.customer_email, s.product_id into v_old_email, v_old_product
    from public.cakto_subscriptions s
    where s.subscription_id = v_subscription_id
    for update;
    if v_old_email <> v_customer_email or v_old_product <> v_product_id then
      raise exception 'subscription identity changed';
    end if;

    if p_event in ('purchase_approved', 'subscription_renewed') then
      if v_item->>'status' <> 'paid' then
        raise exception 'approved event without paid status';
      end if;
      insert into public.cakto_orders
        (order_id, subscription_id, product_id, customer_email, payment_status, paid_at)
      values (v_order_id, v_subscription_id, v_product_id, v_customer_email, 'paid', v_paid_at)
      on conflict (order_id) do update
        set payment_status = case
              when public.cakto_orders.payment_status in ('refunded', 'chargeback')
                then public.cakto_orders.payment_status
              else 'paid'
            end,
            updated_at = now()
        where public.cakto_orders.subscription_id = excluded.subscription_id
          and public.cakto_orders.product_id = excluded.product_id
          and public.cakto_orders.customer_email = excluded.customer_email;
      if p_event = 'purchase_approved' then
        update public.cakto_subscriptions s
        set access_state = 'active', state_changed_at = coalesce(v_paid_at, v_event_at), updated_at = now()
        where s.subscription_id = v_subscription_id and s.access_state = 'pending';
      end if;
    elsif p_event in ('refund', 'chargeback') then
      insert into public.cakto_orders
        (order_id, subscription_id, product_id, customer_email, payment_status, paid_at)
      values (v_order_id, v_subscription_id, v_product_id, v_customer_email,
              case when p_event = 'refund' then 'refunded' else 'chargeback' end, v_paid_at)
      on conflict (order_id) do update
        set payment_status = case
              when public.cakto_orders.payment_status = 'chargeback' then 'chargeback'
              else excluded.payment_status
            end,
            updated_at = now()
        where public.cakto_orders.subscription_id = excluded.subscription_id
          and public.cakto_orders.product_id = excluded.product_id
          and public.cakto_orders.customer_email = excluded.customer_email;
    end if;

    v_new_state := case p_event
      when 'subscription_canceled' then 'canceled'
      when 'subscription_late' then 'late'
      when 'subscription_paused' then 'paused'
      when 'subscription_renewed' then 'active'
      when 'subscription_late_recovered' then 'active'
      when 'subscription_resumed' then 'active'
      else null
    end;
    if v_new_state is not null then
      update public.cakto_subscriptions s
      set access_state = v_new_state, state_changed_at = v_event_at, updated_at = now()
      where s.subscription_id = v_subscription_id
        and (s.state_changed_at is null or v_event_at >= s.state_changed_at)
        and (s.access_state <> 'canceled' or v_new_state = 'canceled');
    end if;
  end loop;
end;
$$;

revoke all on function public.record_cakto_webhook(text, jsonb) from public, anon, authenticated;
grant execute on function public.record_cakto_webhook(text, jsonb) to service_role;

create or replace function private.has_testo_max_access()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from auth.users u
    join public.cakto_subscriptions s
      on s.customer_email = lower(btrim(u.email))
    join public.cakto_orders o
      on o.subscription_id = s.subscription_id
      and o.product_id = s.product_id
      and o.customer_email = s.customer_email
    where u.id = auth.uid()
      and u.email_confirmed_at is not null
      and s.product_id = '56f7c026-d402-4f29-9f50-f4639744dc3a'
      and s.access_state = 'active'
      and o.payment_status = 'paid'
  );
$$;

revoke all on function private.has_testo_max_access() from public, anon;
grant usage on schema private to authenticated;
grant execute on function private.has_testo_max_access() to authenticated;

create or replace function public.has_testo_max_access()
returns boolean
language sql
stable
security invoker
set search_path = ''
as $$
  select private.has_testo_max_access();
$$;

revoke all on function public.has_testo_max_access() from public, anon;
grant execute on function public.has_testo_max_access() to authenticated;
