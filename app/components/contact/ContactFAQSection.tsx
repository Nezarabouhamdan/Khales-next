"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Locale } from "@/i18n-config";
import type { ContactFAQSectionDict } from "@/dictionaries/types";

type ContactFAQSectionProps = {
  lang: Locale;
  content: ContactFAQSectionDict;
};

export default function ContactFAQSection({ lang, content }: ContactFAQSectionProps) {
  const [open, setOpen] = useState<number | null>(0);
  const dir = lang === "ar" ? "rtl" : "ltr";

  return (
    <section dir={dir} className="relative w-full bg-[#f7f7f7] text-neutral-900 px-6 md:px-16 py-20 md:py-28">
      <div className="max-w-3xl mx-auto">
        <p className="text-xs uppercase tracking-widest text-neutral-400 mb-2">
          {content.eyebrow}
        </p>
        <h2 className="font-semibold tracking-tight text-2xl md:text-3xl mb-12 md:mb-16">
          {content.heading}
        </h2>

        <div className="flex flex-col">
          {content.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className="border-t border-neutral-200 last:border-b">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-6 py-6 text-left"
                >
                  <span className="text-base md:text-lg font-medium tracking-tight">
                    {item.q}
                  </span>
                  <span
                    className={`shrink-0 text-xl font-light transition-transform duration-300 ${
                      isOpen ? "rotate-45" : "rotate-0"
                    }`}
                  >
                    +
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 pr-10 text-neutral-500 leading-relaxed">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
