"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Locale } from "@/i18n-config";
import type { AboutMissionVisionDict } from "@/dictionaries/types";

type AboutMissionSectionProps = {
  lang: Locale;
  content: AboutMissionVisionDict;
};

export default function AboutMissionSection({ lang, content }: AboutMissionSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const dir = lang === "ar" ? "rtl" : "ltr";

  const cards = [content.mission, content.vision];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current ? cardsRef.current.children : [],
        { autoAlpha: 0, y: 50 },
        {
          autoAlpha: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.9,
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
      <div ref={cardsRef} className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
        {cards.map((card) => (
          <div
            key={card.title}
            className="bg-white rounded-2xl p-8 md:p-12 flex flex-col text-start shadow-[0_20px_50px_rgba(0,0,0,0.06)]"
          >
            <h3 className="font-semibold tracking-tight text-2xl md:text-3xl mb-5">
              {card.title}
            </h3>
            <p className="text-neutral-500 leading-relaxed text-sm md:text-base mb-8 flex-1">
              {card.description}
            </p>
            <div className="flex flex-wrap gap-2 pt-6 border-t border-neutral-200">
              {card.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs uppercase tracking-widest text-neutral-500 border border-neutral-300 rounded-full px-3 py-1.5"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
