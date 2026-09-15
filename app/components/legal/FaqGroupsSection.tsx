"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Locale } from "@/i18n-config";
import type { FaqPageDict } from "@/dictionaries/types";

type FaqGroupsSectionProps = {
  lang: Locale;
  content: FaqPageDict;
};

export default function FaqGroupsSection({ lang, content }: FaqGroupsSectionProps) {
  const dir = lang === "ar" ? "rtl" : "ltr";
  const [openKey, setOpenKey] = useState<string | null>(`${content.groups[0]?.heading}-0`);

  return (
    <section dir={dir} className="relative w-full bg-[#f7f7f7] text-neutral-900 px-6 md:px-16 py-16 md:py-24">
      <div className="max-w-3xl mx-auto">
        {content.groups.map((group) => (
          <div key={group.heading} className="mb-14 last:mb-0">
            <h2 className="text-xs uppercase tracking-widest text-neutral-400 mb-4">{group.heading}</h2>
            <div className="flex flex-col">
              {group.items.map((item, i) => {
                const key = `${group.heading}-${i}`;
                const isOpen = openKey === key;
                return (
                  <div key={item.q} className="border-t border-neutral-200 last:border-b">
                    <button
                      type="button"
                      onClick={() => setOpenKey(isOpen ? null : key)}
                      className="w-full flex items-center justify-between gap-6 py-6 text-start"
                    >
                      <span className="text-base md:text-lg font-medium tracking-tight">{item.q}</span>
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
                          <p className="pb-6 pe-10 text-neutral-500 leading-relaxed">{item.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
