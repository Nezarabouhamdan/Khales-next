"use client";

import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/i18n-config";
import type { BlogsPageDict } from "@/dictionaries/types";
import { estimateReadMinutes, type BlogPost } from "@/data/blogs";
import DrawnLine from "../DrawnLine";

type BlogArticleViewProps = {
  lang: Locale;
  content: BlogsPageDict;
  post: BlogPost;
  next: BlogPost;
};

export default function BlogArticleView({ lang, content, post, next }: BlogArticleViewProps) {
  const dir = lang === "ar" ? "rtl" : "ltr";
  const body = post.body[lang];
  const formattedDate = new Date(post.date).toLocaleDateString(lang === "ar" ? "ar-AE" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article dir={dir} className="relative w-full bg-[#f7f7f7] text-neutral-900">
      <div className="relative w-full h-[56vh] md:h-[68vh] overflow-hidden">
        <Image src={post.cover} alt={post.title[lang]} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#f7f7f7] via-black/10 to-black/40" />
        <div className="absolute inset-x-0 bottom-0 px-6 md:px-16 pb-12">
          <Link
            href={`/${lang}/blog`}
            className="inline-block text-xs uppercase tracking-widest text-white/80 hover:text-white mb-6"
          >
            ← {content.backToBlog}
          </Link>
          <p className="text-xs uppercase tracking-widest text-white/70 mb-3">
            {post.tags.map((t) => t[lang]).join(" · ")}
          </p>
          <h1 className="font-semibold tracking-tight leading-[1.05] text-[clamp(1.9rem,4.5vw,3.5rem)] text-white max-w-3xl">
            {post.title[lang]}
          </h1>
          <p className="mt-4 text-white/80 text-lg max-w-2xl">{body.subtitle}</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 md:px-0 py-16 md:py-20">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs uppercase tracking-widest text-neutral-400 mb-12 pb-8 border-b border-neutral-200">
          <span>{post.authorName[lang]}</span>
          <span>
            {content.publishedLabel} {formattedDate}
          </span>
          <span>{content.readTimeLabel.replace("{n}", String(estimateReadMinutes(post, lang)))}</span>
        </div>

        <div className="flex flex-col gap-6">
          {body.paragraphs.map((paragraph, index) => (
            <p key={index} className="text-neutral-700 leading-relaxed text-base md:text-lg">
              {paragraph}
            </p>
          ))}
        </div>

        <blockquote className="border-s-2 border-neutral-900/20 ps-6 my-10">
          <p className="font-light italic leading-[1.35] text-[clamp(1.15rem,2.2vw,1.6rem)] text-neutral-900">
            &ldquo;{body.quote}&rdquo;
          </p>
        </blockquote>

        <p className="text-neutral-700 leading-relaxed text-base md:text-lg mb-12">{body.paragraphAfterQuote}</p>

        <h2 className="font-semibold tracking-tight text-xl md:text-2xl mb-4">{body.sectionTitle}</h2>
        <p className="text-neutral-700 leading-relaxed text-base md:text-lg mb-6">{body.thirdParagraph}</p>

        <ul className="flex flex-col gap-3 mb-8">
          {body.listItems.map((item, index) => (
            <li key={index} className="flex gap-3 text-neutral-700 leading-relaxed text-base md:text-lg">
              <span className="text-neutral-400 mt-1">—</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <p className="text-neutral-700 leading-relaxed text-base md:text-lg">{body.fourthParagraph}</p>

        <DrawnLine
          d="M 0 30 C 250 -30, 500 90, 800 20 C 1050 -40, 1250 70, 1440 10"
          viewBox="0 0 1440 60"
          className="w-full h-12 text-neutral-300 my-16"
          strokeWidth={1.2}
          duration={1.6}
        />

        <Link href={`/${lang}/blog/${next.slug}`} className="group block">
          <p className="text-xs uppercase tracking-widest text-neutral-400 mb-3">
            {content.nextArticleLabel}
          </p>
          <h3 className="font-semibold tracking-tight text-xl md:text-2xl group-hover:opacity-70 transition-opacity">
            {next.title[lang]}
          </h3>
        </Link>
      </div>
    </article>
  );
}
