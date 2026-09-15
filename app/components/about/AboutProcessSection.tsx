"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DrawnLine from "../DrawnLine";
import type { Locale } from "@/i18n-config";
import type { AboutProcessDict } from "@/dictionaries/types";

type AboutProcessSectionProps = {
  lang: Locale;
  content: AboutProcessDict;
};

export default function AboutProcessSection({ lang, content }: AboutProcessSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<HTMLDivElement>(null);
  const dir = lang === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        rowsRef.current ? rowsRef.current.children : [],
        { y: 40, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          stagger: 0.12,
          duration: 0.8,
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
      className="relative w-full bg-[#171717] text-white px-6 md:px-16 py-24 md:py-32 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto">
        <p className="text-xs uppercase tracking-widest text-neutral-500 mb-2">
          {content.eyebrow}
        </p>
        <h2 className="font-semibold tracking-tight text-2xl md:text-4xl mb-16 md:mb-20">
          {content.title}
        </h2>

        <div ref={rowsRef} className="relative">
          <DrawnLine
            d="M 0 0 L 0 1000"
            viewBox="0 0 4 1000"
            className="absolute left-[7px] md:left-[9px] top-2 bottom-2 w-1 h-[calc(100%-1rem)] text-white/20 pointer-events-none"
            strokeWidth={2}
            duration={2.4}
            start="top 75%"
          />

          {content.steps.map((step) => (
            <div
              key={step.index}
              className="relative grid grid-cols-[auto_1fr] md:grid-cols-[auto_140px_1fr] gap-x-6 md:gap-x-10 py-8 border-b border-white/10 last:border-b-0"
            >
              <span className="relative z-10 w-4 h-4 mt-1 rounded-full bg-white shrink-0" />
              <span className="text-sm font-mono text-neutral-500 md:pt-0.5">
                {step.index}
              </span>
              <div className="col-span-2 md:col-span-1 mt-3 md:mt-0">
                <h3 className="text-xl md:text-2xl font-medium tracking-tight mb-2">
                  {step.title}
                </h3>
                <p className="text-neutral-400 leading-relaxed max-w-lg">
                  {step.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
