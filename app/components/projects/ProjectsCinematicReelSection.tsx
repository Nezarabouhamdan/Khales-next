"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects, localizeProject } from "@/data/projects";
import type { Locale } from "@/i18n-config";
import type { ProjectsCinematicReelDict } from "@/dictionaries/types";

type ProjectsCinematicReelSectionProps = {
  lang: Locale;
  content: ProjectsCinematicReelDict;
};

export default function ProjectsCinematicReelSection({
  lang,
  content,
}: ProjectsCinematicReelSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const dir = lang === "ar" ? "rtl" : "ltr";
  const reel = projects.slice(0, 6).map((p) => localizeProject(p, lang));

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!sectionRef.current || !trackRef.current) return;

    const ctx = gsap.context(() => {
      const track = trackRef.current!;
      const getDistance = () =>
        Math.max(0, track.scrollWidth - window.innerWidth);

      const tween = gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
      });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${getDistance() + window.innerHeight * 0.4}`,
        pin: true,
        scrub: 1,
        animation: tween,
        invalidateOnRefresh: true,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      dir={dir}
      className="relative w-full h-screen bg-black overflow-hidden select-none"
    >
      <div ref={trackRef} className="flex h-full will-change-transform">
        {reel.map((p) => (
          <div key={p.slug} className="relative flex-shrink-0 w-screen h-full">
            <Image
              src={p.cover}
              alt={p.title}
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/30" />
            <div className="absolute bottom-12 md:bottom-16 left-6 md:left-16 text-white">
              <p className="text-xs md:text-sm uppercase tracking-widest text-neutral-300 mb-2">
                {p.location} [{p.status}]
              </p>
              <h3 className="font-semibold tracking-tighter text-[clamp(2rem,5vw,4.5rem)]">
                {p.title}
              </h3>
            </div>
          </div>
        ))}
      </div>

      <p className="absolute top-8 right-6 md:right-16 text-xs uppercase tracking-widest text-neutral-400 z-10">
        {content.scrollLabel}
      </p>
    </section>
  );
}
