"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaPlay } from "react-icons/fa";
import type { Locale } from "@/i18n-config";
import type { MediaCenterPageDict } from "@/dictionaries/types";
import type { Reel, ReelCategory } from "@/data/media";

type MediaGallerySectionProps = {
  lang: Locale;
  content: MediaCenterPageDict;
  reels: Reel[];
};

type FilterKey = ReelCategory | "All";

export default function MediaGallerySection({ lang, content, reels }: MediaGallerySectionProps) {
  const dir = lang === "ar" ? "rtl" : "ltr";
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<FilterKey>("All");

  const filters: FilterKey[] = ["All", "Design", "Architecture", "Construction", "Development", "Sales"];
  const filtered = useMemo(
    () => (filter === "All" ? reels : reels.filter((reel) => reel.category === filter)),
    [reels, filter],
  );

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        gridRef.current ? gridRef.current.children : [],
        { autoAlpha: 0, y: 30 },
        {
          autoAlpha: 1,
          y: 0,
          stagger: 0.06,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 85%" },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, [filtered.length]);

  return (
    <section
      ref={sectionRef}
      dir={dir}
      className="relative w-full bg-[#f7f7f7] text-neutral-900 px-6 md:px-16 py-20 md:py-28"
    >
      <div className="flex flex-wrap gap-2 mb-12">
        {filters.map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setFilter(key)}
            className={`text-xs uppercase tracking-widest px-4 py-2 rounded-full border transition-colors ${
              filter === key
                ? "border-neutral-900 bg-neutral-900 text-white"
                : "border-neutral-300 text-neutral-500 hover:border-neutral-500"
            }`}
          >
            {content.categoryLabels[key]}
          </button>
        ))}
      </div>

      <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((reel, index) => (
          <ReelCard key={`${reel.embedUrl}-${index}`} reel={reel} lang={lang} />
        ))}
      </div>
    </section>
  );
}

function ReelCard({ reel, lang }: { reel: Reel; lang: Locale }) {
  const [playing, setPlaying] = useState(false);
  const title = reel.title[lang];

  return (
    <div
      onClick={() => setPlaying(true)}
      className="group relative w-full aspect-[4/5] overflow-hidden rounded-xl cursor-pointer bg-neutral-200"
    >
      {playing ? (
        <iframe
          src={`${reel.embedUrl}?autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full border-0"
        />
      ) : (
        <>
          <Image
            src={reel.thumbnailUrl}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="w-14 h-14 rounded-full bg-white/85 backdrop-blur-sm flex items-center justify-center text-neutral-900 scale-90 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300">
              <FaPlay className="translate-x-0.5" />
            </span>
          </span>
          <p className="absolute bottom-0 inset-x-0 p-4 text-white font-medium text-sm leading-snug">
            {title}
          </p>
        </>
      )}
    </div>
  );
}
