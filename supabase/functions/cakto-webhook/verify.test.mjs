import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import test from "node:test";
import { verifyCaktoSignature } from "./verify.ts";

const secret = "local-test-secret";
const timestamp = "1781440000";
const body = new TextEncoder().encode('{"event":"purchase_approved","data":{"id":"order-1"}}');
const digest = createHmac("sha256", secret)
  .update(`${timestamp}.`)
  .update(body)
  .digest("hex");

test("accepts the Cakto signature over the exact raw body", async () => {
  assert.equal(await verifyCaktoSignature(body, timestamp, `v1=${digest}`, secret, Number(timestamp)), true);
});

test("rejects altered body, stale delivery, and missing signature", async () => {
  const altered = new TextEncoder().encode('{"event":"purchase_approved","data":{"id":"order-2"}}');
  assert.equal(await verifyCaktoSignature(altered, timestamp, `v1=${digest}`, secret, Number(timestamp)), false);
  assert.equal(await verifyCaktoSignature(body, timestamp, `v1=${digest}`, secret, Number(timestamp) + 301), false);
  assert.equal(await verifyCaktoSignature(body, timestamp, null, secret, Number(timestamp)), false);
});
