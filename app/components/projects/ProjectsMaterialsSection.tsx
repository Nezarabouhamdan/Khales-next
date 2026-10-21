"use client";

import { useState } from "react";
import Image from "next/image";
import type { Locale } from "@/i18n-config";
import type { ProjectsMaterialsDict } from "@/dictionaries/types";

// Matched by index to content.materials (names live in the dictionaries).
const materialImages = [
  "/materials/architectural-glass.jpg",
  "/materials/bespoke-woodwork.jpg",
  "/materials/bronze-and-champagne-finishes.jpg",
  "/materials/calacatta-marble.jpg",
  "/materials/microcement-finishes.jpg",
  "/materials/natural-stone-and-travertine.jpg",
];

type ProjectsMaterialsSectionProps = {
  lang: Locale;
  content: ProjectsMaterialsDict;
};

export default function ProjectsMaterialsSection({
  lang,
  content,
}: ProjectsMaterialsSectionProps) {
  const [active, setActive] = useState(0);
  const dir = lang === "ar" ? "rtl" : "ltr";

  const materials = content.materials.map((m, i) => ({
    name: m.name,
    image: materialImages[i],
  }));

  return (
    <section
      dir={dir}
      className="relative w-full bg-[#f7f7f7] text-neutral-900 px-6 md:px-16 py-24 md:py-32"
    >
      <p className="text-xs uppercase tracking-widest text-neutral-400 mb-2">
        {content.eyebrow}
      </p>
      <h2 className="font-semibold tracking-tight text-2xl md:text-4xl mb-12 md:mb-16">
        {content.title}
      </h2>

      <div className="flex h-[380px] md:h-[520px] gap-2 overflow-hidden">
        {materials.map((m, i) => {
          const isActive = active === i;
          return (
            <button
              type="button"
              key={m.name}
              onClick={() => setActive(i)}
              onMouseEnter={() => setActive(i)}
              className="relative h-full overflow-hidden transition-[flex-grow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{ flexGrow: isActive ? 6 : 1, flexBasis: 0, minWidth: 0 }}
            >
              <Image
                src={m.image}
                alt={m.name}
                fill
                sizes="(max-width: 768px) 60vw, 30vw"
                // Already pre-sized (1376px) and compressed (~200KB) JPEGs,
                // so they're served as-is: the on-demand optimizer added a
                // round-trip per panel and intermittently stalled under
                // load, leaving panels blank.
                unoptimized
                className="object-cover"
              />
              <div
                className={`absolute inset-0 transition-colors duration-500 ${
                  isActive ? "bg-black/20" : "bg-black/50"
                }`}
              />
              <span
                className={`absolute bottom-6 left-4 right-4 text-white font-medium tracking-tight transition-all duration-300 ${
                  isActive
                    ? "text-lg md:text-2xl whitespace-nowrap"
                    : "text-[10px] md:text-xs uppercase tracking-widest [writing-mode:vertical-rl] whitespace-nowrap opacity-80"
                }`}
              >
                {isActive && (
                  <span aria-hidden className="inline-block me-2 h-2 w-2 rounded-full bg-brand align-middle" />
                )}
                {m.name}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
