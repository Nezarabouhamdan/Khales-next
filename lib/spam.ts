// Lightweight, invisible spam filtering for public forms - no CAPTCHA.
//
// Bots hitting the contact form were creating Odoo leads with random-string
// names/messages (e.g. "vC4lYa6ZQs") and borrowed real email addresses, and
// each one also triggered a Resend confirmation email to that stranger from
// our domain. Three cheap layers catch nearly all of that:
//   1. a honeypot field humans never see (bots fill every input),
//   2. a minimum fill time (bots submit instantly; also catches direct API
//      POSTs that never loaded the page, since they send no timing at all),
//   3. content checks for the gibberish patterns those bots produce.

const MIN_FILL_MS = 3000;

export type SpamCheckInput = {
  honeypot?: unknown;
  elapsedMs?: unknown;
  name: string;
  message?: string;
};

/** True when the submission should be silently dropped. */
export function looksLikeSpam({ honeypot, elapsedMs, name, message }: SpamCheckInput): boolean {
  if (typeof honeypot === "string" && honeypot.trim() !== "") return true;
  if (typeof elapsedMs !== "number" || !Number.isFinite(elapsedMs) || elapsedMs < MIN_FILL_MS) {
    return true;
  }
  if (isGibberishToken(name)) return true;
  if (message) {
    const trimmed = message.trim();
    // A long "message" with no spaces at all is a random token, not prose
    // (in any language - Arabic and English both use spaces).
    if (trimmed.length >= 20 && !/\s/.test(trimmed)) return true;
  }
  return false;
}

// Random-looking single words like "vC4lYa6ZQs": no spaces, and either
// digits mixed with letters or several lower->upper case flips mid-word.
function isGibberishToken(value: string): boolean {
  const v = value.trim();
  if (/\s/.test(v) || v.length < 6) return false;
  const hasLetter = /\p{L}/u.test(v);
  if (hasLetter && /\d/.test(v)) return true;
  const caseFlips = (v.match(/\p{Ll}\p{Lu}/gu) ?? []).length;
  return caseFlips >= 2;
}

export type ContactFieldErrors = "name" | "email" | "phone" | "message";

/** Field-level validation for real users; returns the first invalid field. */
export function validateContactFields(fields: {
  name: string;
  email: string;
  phone: string;
  message?: string;
}): ContactFieldErrors | null {
  const name = fields.name.trim();
  if (name.length < 2 || name.length > 80 || /\d/.test(name) || /https?:|www\./i.test(name)) {
    return "name";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(fields.email.trim()) || fields.email.length > 120) {
    return "email";
  }
  const phoneDigits = fields.phone.replace(/[\s\-().+]/g, "");
  if (!/^\d{7,15}$/.test(phoneDigits)) return "phone";
  if (fields.message && fields.message.length > 5000) return "message";
  return null;
}

/** Escapes user text before it goes into an HTML email. */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
