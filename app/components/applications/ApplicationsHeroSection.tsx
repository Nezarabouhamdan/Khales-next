"use client";

import type { Locale } from "@/i18n-config";
import type { ApplicationsPageDict } from "@/dictionaries/types";
import LiveBadge from "../LiveBadge";
import Marquee from "../Marquee";

type ApplicationsHeroSectionProps = {
  lang: Locale;
  content: ApplicationsPageDict;
};

export default function ApplicationsHeroSection({ lang, content }: ApplicationsHeroSectionProps) {
  const dir = lang === "ar" ? "rtl" : "ltr";

  return (
    <section dir={dir} className="relative w-full min-h-[70vh] bg-[#171717] text-white overflow-hidden flex flex-col justify-center px-6 md:px-16 pt-32 pb-10">
      <div className="max-w-3xl">
        <div className="mb-6">
          <LiveBadge label={content.hiringBadge} dotClassName="bg-sky-400" />
        </div>
        <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-neutral-400 mb-4">
          {content.eyebrow}
        </p>
        <h1 className="font-semibold tracking-tighter leading-[0.95] text-[clamp(2.25rem,6vw,5.5rem)]">
          {content.title}
        </h1>
        <p className="mt-6 max-w-lg text-neutral-300 leading-relaxed">{content.subtitle}</p>
      </div>

      <div className="mt-16 border-t border-white/10 pt-6">
        <Marquee
          items={content.valuesMarquee}
          duration={22}
          className="text-neutral-600"
          itemClassName="text-sm md:text-base uppercase tracking-[0.3em] mx-8"
        />
      </div>
    </section>
  );
}
