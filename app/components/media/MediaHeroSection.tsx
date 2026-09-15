"use client";

import type { Locale } from "@/i18n-config";
import type { MediaCenterPageDict } from "@/dictionaries/types";
import LiveBadge from "../LiveBadge";
import CountUp from "../CountUp";

const RING_DURATIONS = [40, 60, 85];

type MediaHeroSectionProps = {
  lang: Locale;
  content: MediaCenterPageDict;
  reelCount: number;
  categoryCount: number;
};

export default function MediaHeroSection({ lang, content, reelCount, categoryCount }: MediaHeroSectionProps) {
  const dir = lang === "ar" ? "rtl" : "ltr";

  return (
    <section
      dir={dir}
      className="relative w-full min-h-[86vh] bg-[#0b0b0b] text-white overflow-hidden flex flex-col justify-center px-6 md:px-16 pt-32 pb-16"
    >
      {/* Continuously rotating concentric rings - purely ambient, never pauses */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
        {RING_DURATIONS.map((duration, i) => (
          <div
            key={duration}
            className="absolute rounded-full border border-white/10"
            style={{
              width: `${560 + i * 220}px`,
              height: `${560 + i * 220}px`,
              animation: `${i % 2 === 0 ? "spin-orbit" : "spin-orbit-reverse"} ${duration}s linear infinite`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-4xl">
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <LiveBadge label={content.liveLabel} />
        </div>
        <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-neutral-400 mb-4">
          {content.eyebrow}
        </p>
        <h1 className="font-semibold tracking-tighter leading-[0.95] text-[clamp(2.25rem,6vw,5.5rem)]">
          {content.title}
        </h1>
        <p className="mt-6 max-w-lg text-neutral-300 leading-relaxed">{content.subtitle}</p>
      </div>

      <div className="relative z-10 grid grid-cols-2 gap-6 md:gap-16 max-w-md mt-16 pt-10 border-t border-white/10">
        <div>
          <CountUp to={reelCount} suffix="+" className="block font-semibold tracking-tight text-3xl md:text-4xl" />
          <p className="text-xs uppercase tracking-widest text-neutral-500 mt-2">{content.statReelsLabel}</p>
        </div>
        <div>
          <CountUp to={categoryCount} className="block font-semibold tracking-tight text-3xl md:text-4xl" />
          <p className="text-xs uppercase tracking-widest text-neutral-500 mt-2">{content.statCategoriesLabel}</p>
        </div>
      </div>
    </section>
  );
}
