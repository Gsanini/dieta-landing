const encoder = new TextEncoder();
const MAX_AGE_SECONDS = 5 * 60;

function equalBytes(left: Uint8Array, right: Uint8Array): boolean {
  if (left.length !== right.length) return false;
  let difference = 0;
  for (let i = 0; i < left.length; i++) difference |= left[i] ^ right[i];
  return difference === 0;
}

export async function verifyCaktoSignature(
  body: Uint8Array,
  timestamp: string | null,
  signature: string | null,
  secret: string,
  nowSeconds = Date.now() / 1000,
): Promise<boolean> {
  if (!secret || !timestamp || !/^\d+$/.test(timestamp) || !signature) return false;
  if (Math.abs(nowSeconds - Number(timestamp)) > MAX_AGE_SECONDS) return false;

  const provided = signature
    .split(",")
    .map((part) => part.trim())
    .find((part) => /^v1=[0-9a-f]{64}$/i.test(part));
  if (!provided) return false;

  const prefix = encoder.encode(`${timestamp}.`);
  const signedBytes = new Uint8Array(prefix.length + body.length);
  signedBytes.set(prefix);
  signedBytes.set(body, prefix.length);

  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const digest = new Uint8Array(await crypto.subtle.sign("HMAC", key, signedBytes));
  const expected = encoder.encode(`v1=${Array.from(digest, (byte) => byte.toString(16).padStart(2, "0")).join("")}`);
  return equalBytes(encoder.encode(provided.toLowerCase()), expected);
}
