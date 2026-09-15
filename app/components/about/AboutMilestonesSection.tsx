"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Locale } from "@/i18n-config";
import type { AboutMilestonesDict } from "@/dictionaries/types";

type AboutMilestonesSectionProps = {
  lang: Locale;
  content: AboutMilestonesDict;
};

export default function AboutMilestonesSection({ lang, content }: AboutMilestonesSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const dir = lang === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!sectionRef.current || !trackRef.current) return;

    const ctx = gsap.context(() => {
      const track = trackRef.current!;
      const getDistance = () =>
        Math.max(0, track.scrollWidth - window.innerWidth);

      const tween = gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
      });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${getDistance() + window.innerHeight * 0.4}`,
        pin: true,
        scrub: 1,
        animation: tween,
        invalidateOnRefresh: true,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      dir={dir}
      className="relative w-full h-screen bg-[#ebebeb] text-neutral-900 overflow-hidden flex flex-col justify-center select-none"
    >
      <div className="px-6 md:px-16 mb-10 md:mb-16">
        <p className="text-xs uppercase tracking-widest text-neutral-400 mb-2">
          {content.eyebrow}
        </p>
        <h2 className="font-semibold tracking-tight text-2xl md:text-4xl">
          {content.title}
        </h2>
      </div>

      <div
        ref={trackRef}
        className="flex items-stretch gap-10 md:gap-16 px-6 md:px-16 will-change-transform"
      >
        {content.items.map((m) => (
          <div
            key={m.year}
            className="flex-shrink-0 w-[260px] md:w-[360px] border-t-2 border-neutral-900 pt-6"
          >
            <span className="text-4xl md:text-6xl font-semibold tracking-tighter">
              {m.year}
            </span>
            <p className="mt-4 text-neutral-500 leading-relaxed">{m.text}</p>
          </div>
        ))}
        <div className="flex-shrink-0 w-[10px] md:w-[80px]" />
      </div>

      <p className="absolute bottom-8 right-6 md:right-16 text-xs uppercase tracking-widest text-neutral-400">
        {content.scrollHint}
      </p>
    </section>
  );
}
