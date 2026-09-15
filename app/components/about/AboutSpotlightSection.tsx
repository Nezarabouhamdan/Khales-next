"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import type { Locale } from "@/i18n-config";
import type { AboutSpotlightDict } from "@/dictionaries/types";

const MASK =
  "radial-gradient(260px circle at var(--x) var(--y), transparent 0%, transparent 35%, black 100%)";

type AboutSpotlightSectionProps = {
  lang: Locale;
  content: AboutSpotlightDict;
};

export default function AboutSpotlightSection({ lang, content }: AboutSpotlightSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const dir = lang === "ar" ? "rtl" : "ltr";

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect || !overlayRef.current) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    gsap.to(overlayRef.current, {
      "--x": `${x}px`,
      "--y": `${y}px`,
      duration: 0.5,
      ease: "power3.out",
      overwrite: "auto",
    });
  };

  return (
    <section
      ref={containerRef}
      dir={dir}
      onMouseMove={handleMove}
      className="relative w-full h-[70vh] md:h-screen bg-black overflow-hidden select-none"
    >
      <Image
        src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=80"
        alt={content.imageAlt}
        fill
        sizes="100vw"
        className="object-cover"
      />

      <div
        ref={overlayRef}
        className="absolute inset-0 hidden md:block"
        style={
          {
            "--x": "50%",
            "--y": "50%",
            maskImage: MASK,
            WebkitMaskImage: MASK,
          } as React.CSSProperties
        }
      >
        <Image
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=80"
          alt=""
          fill
          sizes="100vw"
          className="object-cover grayscale brightness-[0.2]"
        />
      </div>

      <div className="absolute inset-0 bg-black/20 md:bg-transparent pointer-events-none" />

      <div className="absolute inset-x-0 bottom-0 p-6 md:p-16 pointer-events-none">
        <p className="text-xs uppercase tracking-widest text-neutral-300 mb-3">
          {content.eyebrow}
        </p>
        <h2 className="font-semibold tracking-tighter leading-[0.95] text-[clamp(1.9rem,5vw,4rem)] text-white max-w-2xl">
          {content.heading}
        </h2>
      </div>
    </section>
  );
}
