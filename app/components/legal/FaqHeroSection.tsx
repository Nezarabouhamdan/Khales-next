"use client";

import type { Locale } from "@/i18n-config";
import type { FaqPageDict } from "@/dictionaries/types";

type FaqHeroSectionProps = {
  lang: Locale;
  content: FaqPageDict;
};

export default function FaqHeroSection({ lang, content }: FaqHeroSectionProps) {
  const dir = lang === "ar" ? "rtl" : "ltr";

  return (
    <section
      dir={dir}
      className="relative w-full min-h-[46vh] bg-[#171717] text-white overflow-hidden flex flex-col justify-center px-6 md:px-16 pt-32 pb-14"
    >
      <div className="max-w-3xl">
        <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-neutral-400 mb-4">
          {content.eyebrow}
        </p>
        <h1 className="font-semibold tracking-tighter leading-[0.95] text-[clamp(2.25rem,6vw,4.5rem)]">
          {content.title}
        </h1>
        <p className="mt-6 max-w-lg text-neutral-300 leading-relaxed">{content.subtitle}</p>
      </div>
    </section>
  );
}
