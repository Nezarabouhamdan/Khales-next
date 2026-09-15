"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticButton from "../MagneticButton";
import type { Locale } from "@/i18n-config";
import type { AboutOverviewDict } from "@/dictionaries/types";

type AboutOverviewSectionProps = {
  lang: Locale;
  content: AboutOverviewDict;
};

const galleryImages = [
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=900&q=80",
];

export default function AboutOverviewSection({ lang, content }: AboutOverviewSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const dir = lang === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        { autoAlpha: 0, y: 40 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        },
      );
      gsap.fromTo(
        galleryRef.current ? galleryRef.current.children : [],
        { autoAlpha: 0, y: 50 },
        {
          autoAlpha: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      dir={dir}
      className="relative w-full bg-white text-neutral-900 px-6 md:px-16 py-24 md:py-32 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
        <div ref={textRef} className="text-start">
          <p className="text-xs uppercase tracking-widest text-neutral-400 mb-4">
            {content.subtitle}
          </p>
          <h2 className="font-semibold tracking-tight leading-[1.05] text-[clamp(1.9rem,3.4vw,3rem)] mb-6">
            {content.title}
          </h2>
          <p className="text-neutral-500 leading-relaxed mb-10 text-base md:text-lg">
            {content.intro}
          </p>

          <div className="flex flex-col gap-8">
            {content.subsections.map((sub) => (
              <div key={sub.title} className="border-t border-neutral-200 pt-6">
                <h3 className="font-semibold tracking-tight text-lg md:text-xl mb-2">
                  {sub.title}
                </h3>
                <p className="text-neutral-500 leading-relaxed text-sm md:text-base">{sub.text}</p>
              </div>
            ))}
          </div>

          <MagneticButton
            href={`/${lang}${content.buttonLink}`}
            className="inline-block mt-10 text-xs uppercase tracking-widest font-medium px-6 py-3 rounded-md bg-neutral-900 text-white hover:bg-neutral-700 transition-colors"
          >
            {content.buttonText}
          </MagneticButton>
        </div>

        <div ref={galleryRef} className="grid grid-cols-2 gap-4 h-[420px] md:h-[560px]">
          <div className="relative w-full h-full overflow-hidden mt-10">
            <Image
              src={galleryImages[0]}
              alt={content.title}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover grayscale contrast-125"
            />
          </div>
          <div className="relative w-full h-full overflow-hidden">
            <Image
              src={galleryImages[1]}
              alt={content.subtitle}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover grayscale contrast-125"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
