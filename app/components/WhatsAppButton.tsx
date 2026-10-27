import { FaWhatsapp } from "react-icons/fa6";
import { whatsappHref } from "@/lib/whatsapp";
import type { WhatsAppDict } from "@/dictionaries/types";

// Floating WhatsApp button on every page, bottom corner on the reading
// end (right in English, left in Arabic). Opens a chat with a prefilled
// message in the page's language.
export default function WhatsAppButton({ content }: { content: WhatsAppDict }) {
  return (
    <a
      href={whatsappHref(content.message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={content.buttonLabel}
      title={content.buttonLabel}
      className="fixed bottom-5 end-5 md:bottom-8 md:end-8 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-black/20 transition-transform hover:scale-105"
    >
      <FaWhatsapp aria-hidden="true" size={30} />
    </a>
  );
}
