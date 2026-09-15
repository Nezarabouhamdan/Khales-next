"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Locale } from "@/i18n-config";
import type { BlogsPageDict } from "@/dictionaries/types";
import { estimateReadMinutes, type BlogPost } from "@/data/blogs";
import TiltCard from "../TiltCard";

type BlogGridSectionProps = {
  lang: Locale;
  content: BlogsPageDict;
  posts: BlogPost[];
};

export default function BlogGridSection({ lang, content, posts }: BlogGridSectionProps) {
  const dir = lang === "ar" ? "rtl" : "ltr";
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const categories = useMemo(
    () => [content.categoryAllLabel, ...Array.from(new Set(posts.flatMap((p) => p.tags.map((t) => t[lang]))))],
    [posts, lang, content.categoryAllLabel],
  );
  const [active, setActive] = useState(content.categoryAllLabel);

  const filtered =
    active === content.categoryAllLabel ? posts : posts.filter((p) => p.tags.some((t) => t[lang] === active));

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        gridRef.current ? gridRef.current.children : [],
        { autoAlpha: 0, y: 40 },
        {
          autoAlpha: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, [filtered.length]);

  return (
    <section ref={sectionRef} dir={dir} className="relative w-full bg-[#f7f7f7] text-neutral-900 px-6 md:px-16 py-20 md:py-28">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
        <h2 className="font-semibold tracking-tight text-2xl md:text-3xl">{content.latestLabel}</h2>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActive(category)}
              className={`text-xs uppercase tracking-widest px-4 py-2 rounded-full border transition-colors ${
                active === category
                  ? "border-neutral-900 bg-neutral-900 text-white"
                  : "border-neutral-300 text-neutral-500 hover:border-neutral-500"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((post) => (
          <Link key={post.slug} href={`/${lang}/blog/${post.slug}`} className="group">
            <TiltCard className="mb-4">
              <div className="relative w-full aspect-[4/3] overflow-hidden rounded-xl">
                <Image
                  src={post.cover}
                  alt={post.title[lang]}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </TiltCard>
            <p className="text-xs uppercase tracking-widest text-neutral-400 mb-2">
              {post.tags.map((t) => t[lang]).join(" · ")} ·{" "}
              {content.readTimeLabel.replace("{n}", String(estimateReadMinutes(post, lang)))}
            </p>
            <h3 className="font-semibold tracking-tight text-lg md:text-xl leading-snug group-hover:opacity-70 transition-opacity">
              {post.title[lang]}
            </h3>
            <p className="mt-2 text-sm text-neutral-500 leading-relaxed line-clamp-2">
              {post.excerpt[lang]}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
