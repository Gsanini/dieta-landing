import { verifyCaktoSignature } from "./verify.ts";

const PRODUCT_ID = "56f7c026-d402-4f29-9f50-f4639744dc3a";
const EVENTS = new Set([
  "purchase_approved",
  "subscription_renewed",
  "subscription_late_recovered",
  "subscription_resumed",
  "subscription_late",
  "subscription_paused",
  "subscription_canceled",
  "refund",
  "chargeback",
]);

type JsonObject = Record<string, unknown>;

function isObject(value: unknown): value is JsonObject {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function isRelevantOrder(value: unknown): value is JsonObject {
  return isObject(value) && isObject(value.product) && value.product.id === PRODUCT_ID;
}

function isValidOrder(value: JsonObject): boolean {
  return typeof value.id === "string" && value.id.length > 0 &&
    isObject(value.customer) && typeof value.customer.email === "string" &&
    value.customer.email.includes("@") && isObject(value.subscription) &&
    typeof value.subscription.id === "string" && value.subscription.id.length > 0;
}

function databaseKey(): { value: string; legacy: boolean } | undefined {
  const keys = Deno.env.get("SUPABASE_SECRET_KEYS");
  if (keys) {
    try {
      const parsed = JSON.parse(keys);
      if (typeof parsed.default === "string") return { value: parsed.default, legacy: false };
    } catch {
      // Continue with the legacy key when the new key map is unavailable.
    }
  }
  const legacy = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  return legacy ? { value: legacy, legacy: true } : undefined;
}

Deno.serve(async (request) => {
  if (request.method !== "POST") return new Response("Method not allowed", { status: 405 });
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    return new Response("Unsupported media type", { status: 415 });
  }

  const secret = Deno.env.get("CAKTO_WEBHOOK_SECRET");
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const key = databaseKey();
  if (!secret || !supabaseUrl || !key) {
    console.error("Cakto webhook configuration is incomplete");
    return new Response("Unavailable", { status: 503 });
  }

  const body = new Uint8Array(await request.arrayBuffer());
  if (body.length > 1024 * 1024) return new Response("Payload too large", { status: 413 });
  if (!await verifyCaktoSignature(
    body,
    request.headers.get("x-cakto-timestamp"),
    request.headers.get("x-cakto-signature"),
    secret,
  )) return new Response("Unauthorized", { status: 401 });

  let payload: unknown;
  try {
    payload = JSON.parse(new TextDecoder().decode(body));
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }
  if (!isObject(payload) || typeof payload.event !== "string" || !EVENTS.has(payload.event)) {
    return Response.json({ ignored: true });
  }

  const orders = (Array.isArray(payload.data) ? payload.data : [payload.data])
    .filter(isRelevantOrder);
  if (orders.length === 0) return Response.json({ ignored: true });
  if (!orders.every(isValidOrder)) return new Response("Invalid order", { status: 422 });

  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/rpc/record_cakto_webhook`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        apikey: key.value,
        ...(key.legacy ? { authorization: `Bearer ${key.value}` } : {}),
      },
      body: JSON.stringify({ p_event: payload.event, p_orders: orders }),
      signal: AbortSignal.timeout(6000),
    });
    if (!response.ok) {
      console.error("Cakto webhook database write failed", response.status);
      return new Response("Database unavailable", { status: 503 });
    }
  } catch (error) {
    console.error("Cakto webhook database request failed", error instanceof Error ? error.name : "unknown");
    return new Response("Database unavailable", { status: 503 });
  }

  return Response.json({ received: true });
});
