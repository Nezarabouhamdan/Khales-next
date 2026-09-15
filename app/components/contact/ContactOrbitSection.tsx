"use client";

import { useState } from "react";
import type { Locale } from "@/i18n-config";
import type { ContactOrbitSectionDict } from "@/dictionaries/types";

const RADIUS = 130;
const DURATION = 26;

type ContactOrbitSectionProps = {
  lang: Locale;
  content: ContactOrbitSectionDict;
};

export default function ContactOrbitSection({ lang, content }: ContactOrbitSectionProps) {
  const [paused, setPaused] = useState(false);
  const dir = lang === "ar" ? "rtl" : "ltr";

  return (
    <section
      dir={dir}
      className="relative w-full bg-[#0f0f0f] text-white px-6 md:px-16 py-24 md:py-32 flex flex-col items-center overflow-hidden"
    >
      <p className="text-xs uppercase tracking-widest text-neutral-500 mb-2">
        {content.eyebrow}
      </p>
      <h2 className="font-semibold tracking-tight text-2xl md:text-4xl mb-16 md:mb-20 text-center">
        {content.heading}
      </h2>

      <div className="relative w-[300px] h-[300px] md:w-[340px] md:h-[340px]">
        <div className="absolute inset-0 rounded-full border border-white/10" />

        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div>
            <p className="text-xs uppercase tracking-widest text-neutral-500">
              {content.centerLabel}
            </p>
            <p className="text-sm text-neutral-300 mt-1 max-w-[7rem]">
              {content.centerText}
            </p>
          </div>
        </div>

        <div
          className="absolute inset-0"
          style={{
            animation: `spin-orbit ${DURATION}s linear infinite`,
            animationPlayState: paused ? "paused" : "running",
          }}
        >
          {content.methods.map((m, i) => {
            const angle = (360 / content.methods.length) * i;
            return (
              <div
                key={m.label}
                className="absolute top-1/2 left-1/2"
                style={{
                  transform: `rotate(${angle}deg) translateX(${RADIUS}px) rotate(-${angle}deg)`,
                }}
              >
                <div
                  className="-translate-x-1/2 -translate-y-1/2"
                  style={{
                    animation: `spin-orbit-reverse ${DURATION}s linear infinite`,
                    animationPlayState: paused ? "paused" : "running",
                  }}
                >
                  <a
                    href={m.href}
                    target={m.href.startsWith("http") ? "_blank" : undefined}
                    rel={m.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    onMouseEnter={() => setPaused(true)}
                    onMouseLeave={() => setPaused(false)}
                    aria-label={m.label}
                    className="group flex flex-col items-center gap-2"
                  >
                    <span className="w-14 h-14 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-lg backdrop-blur-sm transition-transform duration-300 group-hover:scale-125 group-hover:bg-white group-hover:text-black">
                      {m.icon}
                    </span>
                    <span className="text-[10px] uppercase tracking-widest text-neutral-500 group-hover:text-white transition-colors">
                      {m.label}
                    </span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
