"use client";

import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DrawnLine from "../DrawnLine";
import type { Locale } from "@/i18n-config";
import type { ProjectsNetworkDict } from "@/dictionaries/types";

type ProjectsNetworkSectionProps = {
  lang: Locale;
  content: ProjectsNetworkDict;
};

export default function ProjectsNetworkSection({
  lang,
  content,
}: ProjectsNetworkSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stationsRef = useRef<HTMLDivElement>(null);
  const dir = lang === "ar" ? "rtl" : "ltr";

  // Portfolio-wide totals come from the dictionary, since the case studies
  // in data/projects only cover a fraction of the delivered work.
  const locations = content.locations;
  const totalProjects = useMemo(
    () => locations.reduce((sum, l) => sum + l.count, 0),
    [locations],
  );

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        stationsRef.current ? stationsRef.current.children : [],
        { autoAlpha: 0, y: 20, scale: 0.6 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          stagger: 0.15,
          duration: 0.6,
          ease: "back.out(1.8)",
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
      className="relative w-full bg-[#171717] text-white px-6 md:px-16 py-24 md:py-32 overflow-hidden"
    >
      <p className="text-xs uppercase tracking-widest text-neutral-500 mb-2">
        {content.eyebrow}
      </p>
      <h2 className="font-semibold tracking-tight text-2xl md:text-4xl mb-20 md:mb-28">
        {content.statsTemplate
          .replace("{count}", String(totalProjects))
          .replace("{cities}", String(locations.length))}
      </h2>

      <div className="relative max-w-5xl mx-auto h-24 px-10 md:px-0">
        <DrawnLine
          d="M 20 20 L 1400 20"
          viewBox="0 0 1420 40"
          className="absolute inset-0 w-full h-full text-white/25 pointer-events-none"
          strokeWidth={1.5}
          duration={2}
        />

        <div ref={stationsRef} className="absolute inset-0">
          {locations.map((c, i) => (
            <div
              key={c.name}
              className="absolute flex flex-col items-center"
              style={{
                left: `${(i / (locations.length - 1)) * 100}%`,
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <span className="relative flex h-3 w-3 mb-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-40" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-brand" />
              </span>
              <p className="text-xs md:text-sm font-medium whitespace-nowrap">
                {c.name}
              </p>
              <p className="text-[10px] md:text-xs text-neutral-500 whitespace-nowrap">
                {c.count} {c.count > 1 ? content.projectPlural : content.projectSingular}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
