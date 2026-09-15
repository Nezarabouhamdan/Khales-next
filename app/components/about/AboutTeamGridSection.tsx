"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { teamMembers } from "@/data/team";
import type { Locale } from "@/i18n-config";
import type { AboutTeamGridDict } from "@/dictionaries/types";

type AboutTeamGridSectionProps = {
  lang: Locale;
  content: AboutTeamGridDict;
};

export default function AboutTeamGridSection({ lang, content }: AboutTeamGridSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const dir = lang === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        gridRef.current ? gridRef.current.children : [],
        { y: 60, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="team"
      ref={sectionRef}
      dir={dir}
      className="relative w-full bg-[#ebebeb] text-[#8e8d8d] overflow-hidden px-6 md:px-16 py-24 md:py-32 scroll-mt-24"
    >
      <div className="absolute inset-0 pointer-events-none z-0 opacity-60">
        <svg
          className="w-full h-full stroke-[#b1b0af] fill-none"
          viewBox="0 0 1440 900"
          preserveAspectRatio="none"
        >
          <path
            d="M -100 700 C 300 900, 400 100, 800 650 C 1100 950, 1200 50, 1500 400"
            strokeWidth="1.4"
          />
          <path
            d="M 200 -50 C 500 300, 300 700, 700 500 C 1000 350, 1100 700, 1400 850"
            strokeWidth="1.4"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12 md:mb-16">
          <h2 className="font-semibold tracking-tighter leading-[0.9] text-[clamp(2rem,5vw,4.5rem)] text-black">
            {content.headingLines.map((line, i) => (
              <span key={line}>
                {line}
                {i < content.headingLines.length - 1 && <br />}
              </span>
            ))}
          </h2>
          <p className="hidden md:block max-w-xs text-sm text-[#8e8d8d] text-right">
            {content.description}
          </p>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8"
        >
          {teamMembers.map((member) => (
            <div key={member.image} className="group">
              <div className="relative w-full aspect-[3/4] overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.role[lang]}
                  fill
                  sizes="(max-width: 768px) 45vw, 20vw"
                  className="object-cover grayscale group-hover:scale-105 transition-transform duration-700 ease-out pointer-events-none"
                />
              </div>
              <div className="pt-3 pb-1">
                <p className="text-xs md:text-sm font-semibold uppercase tracking-wide text-black">
                  {content.memberLabel}
                </p>
                <p className="text-[10px] md:text-xs uppercase tracking-wide text-[#8e8d8d] mt-1 leading-relaxed">
                  {member.role[lang]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
