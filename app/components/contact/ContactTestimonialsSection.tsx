"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { Locale } from "@/i18n-config";
import type { ContactTestimonialsSectionDict } from "@/dictionaries/types";

type ContactTestimonialsSectionProps = {
  lang: Locale;
  content: ContactTestimonialsSectionDict;
};

export default function ContactTestimonialsSection({
  lang,
  content,
}: ContactTestimonialsSectionProps) {
  const [index, setIndex] = useState(0);
  const [spacing, setSpacing] = useState(300);
  const dragStartX = useRef(0);
  const dir = lang === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    const update = () => setSpacing(window.innerWidth < 768 ? 240 : 340);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const go = (step: number) =>
    setIndex((i) => Math.min(Math.max(i + step, 0), content.items.length - 1));

  return (
    <section
      dir={dir}
      className="relative w-full bg-[#ebebeb] text-neutral-900 px-6 md:px-16 py-24 md:py-32 overflow-hidden"
    >
      <p className="text-xs uppercase tracking-widest text-neutral-400 mb-2 text-center">
        {content.eyebrow}
      </p>
      <h2 className="font-semibold tracking-tight text-2xl md:text-4xl mb-16 md:mb-20 text-center">
        {content.heading}
      </h2>

      <div
        className="relative flex items-center justify-center h-[340px] md:h-[380px] cursor-grab active:cursor-grabbing select-none"
        onPointerDown={(e) => {
          dragStartX.current = e.clientX;
        }}
        onPointerUp={(e) => {
          const delta = e.clientX - dragStartX.current;
          if (delta > 60) go(-1);
          else if (delta < -60) go(1);
        }}
      >
        {content.items.map((t, i) => {
          const offset = i - index;
          const abs = Math.abs(offset);
          if (abs > 2) return null;
          return (
            <motion.div
              key={i}
              animate={{
                x: offset * spacing,
                scale: abs === 0 ? 1 : abs === 1 ? 0.82 : 0.68,
                opacity: abs === 0 ? 1 : abs === 1 ? 0.4 : 0.15,
              }}
              style={{ zIndex: 10 - abs }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="absolute w-[260px] md:w-[380px] bg-white shadow-xl p-8"
            >
              <p className="text-base md:text-lg leading-relaxed mb-6">
                &ldquo;{t.quote}&rdquo;
              </p>
              <p className="text-xs uppercase tracking-widest text-neutral-400">
                {t.role}
              </p>
            </motion.div>
          );
        })}
      </div>

      <div className="flex justify-center gap-4 mt-10">
        <button
          type="button"
          onClick={() => go(-1)}
          disabled={index === 0}
          className="w-11 h-11 rounded-full border border-neutral-300 flex items-center justify-center disabled:opacity-30 hover:border-neutral-900 transition-colors"
        >
          &larr;
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          disabled={index === content.items.length - 1}
          className="w-11 h-11 rounded-full border border-neutral-300 flex items-center justify-center disabled:opacity-30 hover:border-neutral-900 transition-colors"
        >
          &rarr;
        </button>
      </div>
    </section>
  );
}
