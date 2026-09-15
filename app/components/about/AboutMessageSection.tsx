"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Locale } from "@/i18n-config";
import type { AboutMessageDict } from "@/dictionaries/types";

type AboutMessageSectionProps = {
  lang: Locale;
  content: AboutMessageDict;
};

export default function AboutMessageSection({ lang, content }: AboutMessageSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const dir = lang === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        photoRef.current,
        { autoAlpha: 0, y: 60 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        },
      );
      gsap.fromTo(
        textRef.current,
        { autoAlpha: 0, y: 40 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          delay: 0.15,
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
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[0.85fr_1.15fr] gap-12 md:gap-16 items-center">
        <div ref={photoRef} className="relative w-full h-[360px] md:h-[480px] overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=900&q=80"
            alt={content.authorName}
            fill
            sizes="(max-width: 768px) 100vw, 45vw"
            className="object-cover grayscale contrast-125"
          />
          <div className="absolute inset-0 border border-white/10" />
        </div>

        <div ref={textRef} className="text-start">
          <p className="text-xs uppercase tracking-widest text-neutral-400 mb-3">
            {content.department}
          </p>
          <p className="text-xs uppercase tracking-widest text-neutral-500 mb-8">{content.date}</p>

          <p className="text-neutral-300 leading-relaxed mb-6 text-base md:text-lg">
            {content.firstParagraph}
          </p>

          <blockquote className="border-s-2 border-white/30 ps-6 my-8">
            <p className="font-light italic leading-[1.35] text-[clamp(1.25rem,2.6vw,1.85rem)] text-white">
              &ldquo;{content.quoteText}&rdquo;
            </p>
          </blockquote>

          <p className="text-neutral-300 leading-relaxed mb-10 text-base md:text-lg">
            {content.thirdParagraph}
          </p>

          <div className="pt-6 border-t border-white/10">
            <p className="font-semibold tracking-tight text-lg">{content.authorName}</p>
            <p className="text-sm text-neutral-500 mt-1">{content.authorTitle}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
