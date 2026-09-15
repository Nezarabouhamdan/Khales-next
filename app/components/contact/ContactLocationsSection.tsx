"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DrawnLine from "../DrawnLine";
import type { Locale } from "@/i18n-config";
import type { ContactLocationsSectionDict } from "@/dictionaries/types";

type ContactLocationsSectionProps = {
  lang: Locale;
  content: ContactLocationsSectionDict;
};

export default function ContactLocationsSection({
  lang,
  content,
}: ContactLocationsSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const dir = lang === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current ? cardsRef.current.children : [],
        { y: 40, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          stagger: 0.12,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 85%" },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      dir={dir}
      className="relative w-full bg-[#171717] text-white px-6 md:px-16 py-20 md:py-28 overflow-hidden"
    >
      <DrawnLine
        d="M 60 20 L 1380 20"
        viewBox="0 0 1440 40"
        className="absolute top-24 md:top-28 left-0 w-full h-10 text-white/15 pointer-events-none hidden md:block"
        strokeWidth={1}
        duration={1.8}
      />

      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-14 md:mb-16">
          <h2 className="font-semibold tracking-tight text-2xl md:text-3xl">
            {content.heading}
          </h2>
          <p className="hidden md:block text-xs uppercase tracking-widest text-neutral-500">
            {content.subheading}
          </p>
        </div>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8"
        >
          {content.offices.map((office) => (
            <div
              key={office.city}
              className="relative border-t border-white/15 pt-6"
            >
              <span className="absolute -top-[5px] left-0 w-2 h-2 rounded-full bg-white" />
              <p className="text-2xl font-medium tracking-tight mb-2">
                {office.city}
              </p>
              <p className="text-sm text-neutral-400 leading-relaxed mb-6">
                {office.address}
              </p>
              <div className="flex gap-8 text-xs font-mono text-neutral-500 tracking-wider">
                <div>
                  <span className="block text-[9px] text-neutral-600 font-sans uppercase mb-0.5">
                    {content.latLabel}
                  </span>
                  {office.lat}
                </div>
                <div>
                  <span className="block text-[9px] text-neutral-600 font-sans uppercase mb-0.5">
                    {content.lonLabel}
                  </span>
                  {office.lon}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
