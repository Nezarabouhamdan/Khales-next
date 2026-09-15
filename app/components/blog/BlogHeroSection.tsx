"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import type { Locale } from "@/i18n-config";
import type { BlogsPageDict } from "@/dictionaries/types";
import type { BlogPost } from "@/data/blogs";
import Marquee from "../Marquee";

type BlogHeroSectionProps = {
  lang: Locale;
  content: BlogsPageDict;
  featured: BlogPost[];
};

export default function BlogHeroSection({ lang, content, featured }: BlogHeroSectionProps) {
  const dir = lang === "ar" ? "rtl" : "ltr";
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % featured.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [featured.length]);

  const post = featured[index];
  const categories = Array.from(new Set(featured.flatMap((p) => p.tags.map((t) => t[lang]))));

  return (
    <section dir={dir} className="relative w-full min-h-[92vh] bg-[#171717] text-white overflow-hidden">
      <AnimatePresence mode="sync">
        <motion.div
          key={post.slug}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0"
        >
          <Image src={post.cover} alt={post.title[lang]} fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#171717] via-[#171717]/70 to-black/40" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 flex flex-col justify-between min-h-[92vh] px-6 md:px-16 pt-40 pb-10">
        <div>
          <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-neutral-400 mb-6">
            {content.eyebrow}
          </p>
          <h1 className="font-semibold tracking-tighter leading-[0.95] text-[clamp(2.25rem,6vw,5.5rem)] max-w-4xl">
            {content.title}
          </h1>
          <p className="mt-6 max-w-lg text-neutral-300 leading-relaxed">{content.subtitle}</p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-widest text-neutral-500 mb-3">{content.featuredLabel}</p>
          <AnimatePresence mode="wait">
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5 }}
            >
              <Link href={`/${lang}/blog/${post.slug}`} className="group inline-block">
                <p className="text-xs uppercase tracking-widest text-neutral-400 mb-2">
                  {post.tags.map((t) => t[lang]).join(" · ")}
                </p>
                <h2 className="text-xl md:text-3xl font-medium tracking-tight group-hover:opacity-70 transition-opacity max-w-2xl">
                  {post.title[lang]}
                </h2>
              </Link>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center gap-2 mt-6">
            {featured.map((p, i) => (
              <button
                key={p.slug}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={p.title[lang]}
                className={`h-1 rounded-full transition-all ${
                  i === index ? "w-8 bg-white" : "w-4 bg-white/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-10 border-t border-white/10 py-4">
        <Marquee
          items={categories}
          duration={24}
          className="text-neutral-500"
          itemClassName="text-sm md:text-base uppercase tracking-[0.3em] mx-8"
        />
      </div>
    </section>
  );
}
