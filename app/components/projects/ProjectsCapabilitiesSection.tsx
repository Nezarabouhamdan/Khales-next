"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DrawnLine from "../DrawnLine";
import type { Locale } from "@/i18n-config";
import type { ProjectsCapabilitiesDict } from "@/dictionaries/types";

type ProjectsCapabilitiesSectionProps = {
  lang: Locale;
  content: ProjectsCapabilitiesDict;
};

export default function ProjectsCapabilitiesSection({
  lang,
  content,
}: ProjectsCapabilitiesSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
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
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        },
      );
      gsap.fromTo(
        statsRef.current ? statsRef.current.children : [],
        { y: 20, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: { trigger: statsRef.current, start: "top 90%" },
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
      <DrawnLine
        d="M 240 0 L 240 900"
        viewBox="0 0 720 900"
        className="absolute inset-0 w-full h-full text-white/10 pointer-events-none hidden md:block"
        strokeWidth={1}
        duration={1.6}
      />
      <DrawnLine
        d="M 480 0 L 480 900"
        viewBox="0 0 720 900"
        className="absolute inset-0 w-full h-full text-white/10 pointer-events-none hidden md:block"
        strokeWidth={1}
        duration={1.6}
        delay={0.15}
      />

      <div className="max-w-7xl mx-auto">
        <p className="text-xs uppercase tracking-widest text-neutral-500 mb-2">
          {content.eyebrow}
        </p>
        <h2 className="font-semibold tracking-tight text-2xl md:text-4xl mb-16 md:mb-20">
          {content.title}
        </h2>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 relative"
        >
          {content.capabilities.map((cap) => (
            <div key={cap.index} className="md:px-8 first:md:pl-0 last:md:pr-0">
              <span className="text-xs font-mono text-neutral-500">
                {cap.index}
              </span>
              <h3 className="text-xl md:text-2xl font-medium tracking-tight mt-3 mb-3">
                {cap.title}
              </h3>
              <p className="text-neutral-400 leading-relaxed">{cap.body}</p>
            </div>
          ))}
        </div>

        <div
          ref={statsRef}
          className="grid grid-cols-3 gap-6 mt-20 md:mt-24 pt-10 border-t border-white/10"
        >
          {content.stats.map((stat) => (
            <div key={stat.label}>
              <p className="font-semibold tracking-tight text-3xl md:text-4xl">
                {stat.value}
              </p>
              <p className="text-xs uppercase tracking-widest text-neutral-500 mt-2">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
