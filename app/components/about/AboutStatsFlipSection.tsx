"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Locale } from "@/i18n-config";
import type { AboutStatsFlipDict } from "@/dictionaries/types";

type AboutStatsFlipSectionProps = {
  lang: Locale;
  content: AboutStatsFlipDict;
};

export default function AboutStatsFlipSection({ lang, content }: AboutStatsFlipSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const unitsRef = useRef<(HTMLDivElement | null)[]>([]);
  const dir = lang === "ar" ? "rtl" : "ltr";

  const stats = content.stats.map((stat) => ({
    ...stat,
    chars: stat.value.split(""),
  }));

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        unitsRef.current,
        { rotateX: 0 },
        {
          rotateX: 180,
          duration: 0.7,
          stagger: 0.04,
          ease: "power2.inOut",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const prefixLengths = stats.reduce<number[]>(
    (acc, s) => [...acc, (acc[acc.length - 1] ?? 0) + s.chars.length],
    [],
  );

  return (
    <section
      ref={sectionRef}
      dir={dir}
      className="relative w-full bg-[#171717] text-white px-6 md:px-16 py-24 md:py-32 overflow-hidden"
    >
      <p className="text-xs uppercase tracking-widest text-neutral-500 mb-2">
        {content.eyebrow}
      </p>
      <h2 className="font-semibold tracking-tight text-2xl md:text-4xl mb-16 md:mb-20">
        {content.title}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
        {stats.map((stat, statIndex) => (
          <div key={stat.label}>
            <div className="flex [perspective:600px]">
              {stat.chars.map((char, i) => {
                const idx =
                  (statIndex === 0 ? 0 : prefixLengths[statIndex - 1]) + i;
                return (
                  <div
                    key={i}
                    className="relative w-[0.85em] h-[1.3em] text-[clamp(2.5rem,6vw,4.5rem)] mx-[1px] shrink-0"
                  >
                    <div
                      ref={(el) => {
                        unitsRef.current[idx] = el;
                      }}
                      className="relative w-full h-full [transform-style:preserve-3d]"
                    >
                      <div className="absolute inset-0 flex items-center justify-center bg-[#232323] text-neutral-600 font-semibold tracking-tighter [backface-visibility:hidden]">
                        &ndash;
                      </div>
                      <div
                        className="absolute inset-0 flex items-center justify-center bg-[#2c2c2c] text-white font-semibold tracking-tighter [backface-visibility:hidden]"
                        style={{ transform: "rotateX(180deg)" }}
                      >
                        {char}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="mt-6 text-xs uppercase tracking-widest text-neutral-500">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
