"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Marquee from "../Marquee";
import type { Locale } from "@/i18n-config";
import type { AboutHeroDict } from "@/dictionaries/types";

type AboutHeroSectionProps = {
  lang: Locale;
  content: AboutHeroDict;
};

export default function AboutHeroSection({ lang, content }: AboutHeroSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const introRef = useRef<HTMLDivElement>(null);
  const dir = lang === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Background pans slowly upward across the whole pin, same
      // full-bleed parallax technique as the homepage's closing CTA.
      gsap.fromTo(
        bgRef.current,
        { y: "0%" },
        {
          y: "-18%",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        },
      );

      gsap.fromTo(
        lineRefs.current,
        { yPercent: 100 },
        {
          yPercent: 0,
          duration: 1.1,
          stagger: 0.1,
          ease: "power4.out",
          delay: 0.2,
        },
      );

      gsap.fromTo(
        introRef.current,
        { autoAlpha: 0, y: 30 },
        { autoAlpha: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.9 },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      dir={dir}
      className="relative w-full min-h-[92vh] md:min-h-screen bg-[#171717] text-white overflow-hidden flex flex-col justify-end select-none"
    >
      <div ref={bgRef} className="absolute inset-x-0 -top-[10%] h-[130%] z-0">
        <Image
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=80"
          alt={content.heroImageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover grayscale contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#171717] via-[#171717]/60 to-black/40" />
        <div className="absolute inset-0 bg-black/25" />
      </div>

      <div className="relative z-10 px-6 md:px-16 pt-40 pb-16 md:pb-20">
        <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-neutral-400 mb-6">
          {content.eyebrow}
        </p>

        <h1 className="font-semibold tracking-tighter leading-[0.88] text-[clamp(2.75rem,8vw,7rem)]">
          {content.headingLines.map((line, i) => (
            <span key={line} className="block overflow-hidden">
              <span
                ref={(el) => {
                  lineRefs.current[i] = el;
                }}
                className="block"
              >
                {line}
              </span>
            </span>
          ))}
        </h1>

        <div
          ref={introRef}
          className="mt-8 flex flex-col md:flex-row md:items-end md:justify-between gap-8"
        >
          <p className="max-w-md text-base md:text-lg text-neutral-300 leading-relaxed">
            {content.intro}
          </p>
          <div className="flex gap-10 text-xs uppercase tracking-widest text-neutral-500">
            {content.stats.map((stat, i) => (
              <span key={stat} className={i === 2 ? "hidden md:inline" : undefined}>
                {stat}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-10 border-t border-white/10 py-4">
        <Marquee
          items={content.marqueeItems}
          duration={26}
          className="text-neutral-500"
          itemClassName="text-sm md:text-base uppercase tracking-[0.3em] mx-8"
        />
      </div>
    </section>
  );
}
