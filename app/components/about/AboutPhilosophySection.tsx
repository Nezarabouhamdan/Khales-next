"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DrawnLine from "../DrawnLine";
import type { Locale } from "@/i18n-config";
import type { AboutPhilosophyDict } from "@/dictionaries/types";

type AboutPhilosophySectionProps = {
  lang: Locale;
  content: AboutPhilosophyDict;
};

export default function AboutPhilosophySection({ lang, content }: AboutPhilosophySectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const dir = lang === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        quoteRef.current,
        { y: 50, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      dir={dir}
      className="relative w-full bg-[#ebebeb] text-neutral-900 px-6 md:px-16 py-24 md:py-32 overflow-hidden"
    >
      <DrawnLine
        d="M 0 60 C 250 -20, 500 160, 800 40 C 1050 -60, 1250 140, 1440 20"
        viewBox="0 0 1440 120"
        className="absolute top-10 left-0 w-full h-24 text-neutral-400/50 pointer-events-none"
        strokeWidth={1.2}
        duration={2}
      />

      <div ref={quoteRef} className="max-w-4xl mx-auto text-center relative z-10">
        <span className="block text-6xl md:text-7xl font-serif text-neutral-300 leading-none mb-4">
          &ldquo;
        </span>
        <p className="font-light tracking-tight leading-[1.2] text-[clamp(1.6rem,4vw,3rem)]">
          {content.quote}
        </p>
        <p className="mt-8 text-xs uppercase tracking-widest text-neutral-400">
          {content.attribution}
        </p>
      </div>
    </section>
  );
}
