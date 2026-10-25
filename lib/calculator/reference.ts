// Estimate reference codes ("K-7F3Q9C"): random, short enough to read out
// over WhatsApp, and never derived from anything the visitor typed (email,
// phone). Crockford base32 skips I, L, O and U so codes can't be misread.
// /api/calculator/reference issues them; the client only falls back to
// generating one itself if that request fails, so a result is never
// blocked on the network.

const ALPHABET = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";
const LENGTH = 6;

export const REFERENCE_PATTERN = /^K-[0-9A-HJKMNP-TV-Z]{6}$/;

export function generateReference(): string {
  const bytes = new Uint8Array(LENGTH);
  globalThis.crypto.getRandomValues(bytes);
  // 256 is a multiple of 32, so masking keeps every character equally likely.
  return `K-${Array.from(bytes, (byte) => ALPHABET[byte & 31]).join("")}`;
}

export function isValidReference(value: unknown): value is string {
  return typeof value === "string" && REFERENCE_PATTERN.test(value);
}
