// Khales' WhatsApp number and a link builder for a prefilled message. The
// link only opens the chat - nothing is sent until the visitor presses send.

export const KHALES_WHATSAPP_NUMBER = "971551299880";

export function whatsappHref(message: string): string {
  return `https://wa.me/${KHALES_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
