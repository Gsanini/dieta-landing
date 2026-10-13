# Cakto → Supabase → acesso ao TESTO MAX

Esta pasta contém a landing page e os arquivos de backend preparados para a aplicação com login. O checkout da landing está em `src/config.ts`. O webhook precisa ser implantado no projeto Supabase da aplicação; publicar apenas `dist` não instala a Edge Function nem as tabelas.

## O que a integração faz

- Aceita apenas entregas com assinatura HMAC-SHA256 válida da Cakto, feitas nos últimos cinco minutos.
- Processa somente o produto `56f7c026-d402-4f29-9f50-f4639744dc3a` (TESTO MAX).
- Concede acesso depois de `purchase_approved` ou de uma renovação paga.
- Corta o acesso em `subscription_canceled`, `subscription_late` e `subscription_paused`.
- Restaura em `subscription_late_recovered`, `subscription_resumed` ou `subscription_renewed`, desde que exista uma compra paga.
- Remove o direito ligado a um pedido reembolsado (`refund`) ou contestado (`chargeback`). Uma outra renovação paga da mesma assinatura mantém o acesso.
- Aceita payload V1 (`data` como objeto) e V2 (`data` como lista). Pedidos repetidos não criam acesso duplicado.

O cliente precisa provar a posse do e-mail usado na compra. A função `has_testo_max_access()` só retorna `true` se o e-mail do usuário estiver confirmado no Supabase Auth e houver uma assinatura ativa com pedido pago para esse mesmo e-mail.

## Implantar no projeto Supabase

1. Instale/use a CLI do Supabase, faça login e vincule o projeto: `npx supabase login` e `npx supabase link --project-ref SEU_PROJECT_REF`.
2. Aplique a migração: `npx supabase db push`.
3. Publique a função: `npx supabase functions deploy cakto-webhook --project-ref SEU_PROJECT_REF --no-verify-jwt`.
4. No painel Supabase, em **Edge Functions → Secrets**, defina `CAKTO_WEBHOOK_SECRET` com o segredo do webhook **novo** da Cakto. `SUPABASE_URL` e as chaves administrativas são fornecidas pelo Supabase à Edge Function. Nunca coloque o segredo em `src/`, em `VITE_*`, no git ou no navegador.
5. No painel Cakto, cadastre um webhook HTTPS apontando para `https://SEU_PROJECT_REF.supabase.co/functions/v1/cakto-webhook`. Selecione `purchase_approved`, `subscription_renewed`, `subscription_late_recovered`, `subscription_resumed`, `subscription_late`, `subscription_paused`, `subscription_canceled`, `refund` e `chargeback`. Vincule ao produto TESTO MAX. O segredo mostrado na Cakto deve ser igual ao configurado no Supabase.

O segredo enviado nesta conversa deve ser substituído por um novo antes de colocar a integração em produção. A conta Cakto conectada não tinha webhook cadastrado quando esta integração foi preparada.

## Login na aplicação

Use login por código/link enviado ao e-mail. O cliente informa o mesmo endereço da compra e confirma o e-mail antes de receber acesso. Após o login, consulte o direito:

```ts
const { data: hasAccess, error } = await supabase.rpc("has_testo_max_access");
if (error) throw error;
if (!hasAccess) {
  // Mostrar tela sem acesso e opção de usar o e-mail da compra.
}
```

Não grave o resultado permanentemente no navegador: consulte novamente ao abrir conteúdo protegido. A proteção do próprio conteúdo deve usar uma checagem no servidor ou uma política RLS equivalente. Esconder apenas o botão no React não protege arquivos ou dados.

## Validar antes de vender

1. Confirme que uma requisição sem assinatura recebe `401`.
2. Envie um evento de teste pela Cakto para verificar conectividade e assinatura. O exemplo de teste da Cakto não representa fielmente uma assinatura real; não use seus campos para validar a regra comercial.
3. Faça uma compra de teste do produto real e verifique que o e-mail confirmado recebe `true` em `has_testo_max_access()`.
4. Confirme que outro e-mail recebe `false`, que um evento repetido não duplica registros e que cancelamento/atraso retiram o acesso.
5. Consulte **Histórico de Eventos do Webhook** na Cakto se a função responder com erro. A Cakto não reenvia automaticamente quando recebe uma resposta HTTP de erro; nesse caso, corrija e reenvie o evento pelo histórico.

A migração SQL ainda precisa ser executada e validada no projeto Supabase final. Sem o repositório da aplicação não é possível ligar a tela de login e a proteção do conteúdo ao RPC.
