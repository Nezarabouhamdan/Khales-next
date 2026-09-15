"use client";

import { useState } from "react";
import Image from "next/image";
import type { Locale } from "@/i18n-config";
import type { ProjectsMaterialsDict } from "@/dictionaries/types";

const materialImages = [
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1200&q=80",
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
                {m.name}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
