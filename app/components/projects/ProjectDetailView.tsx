"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { LocalizedProject } from "@/data/projects";
import type { Locale } from "@/i18n-config";
import type { ProjectDetailDict } from "@/dictionaries/types";

export default function ProjectDetailView({
  lang,
  project,
  next,
  content,
}: {
  lang: Locale;
  project: LocalizedProject;
  next: LocalizedProject;
  content: ProjectDetailDict;
}) {
  const heroRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const dir = lang === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        captionRef.current,
        { y: 40, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 1, ease: "power2.out", delay: 0.3 },
      );
      gsap.fromTo(
        bodyRef.current,
        { y: 60, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          ease: "none",
          scrollTrigger: {
            trigger: bodyRef.current,
            start: "top 90%",
            end: "top 50%",
            scrub: 1,
          },
        },
      );
      gsap.fromTo(
        galleryRef.current ? galleryRef.current.children : [],
        { y: 60, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: galleryRef.current,
            start: "top 90%",
          },
        },
      );
    }, heroRef);

    return () => ctx.revert();
  }, [project.slug]);

  return (
    <div dir={dir}>
      {/* Hero */}
      <div
        ref={heroRef}
        className="relative w-full h-[80vh] md:h-screen overflow-hidden bg-[#525151]"
      >
        <Image
          src={project.cover}
          alt={project.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/30 pointer-events-none" />

        <div
          ref={captionRef}
          className="absolute inset-x-0 bottom-0 z-10 px-6 md:px-16 pb-12 md:pb-16 text-white"
        >
          <p className="text-sm md:text-base font-medium">
            {project.location}{" "}
            <span className="text-xs md:text-sm font-normal opacity-80">
              [{project.status}]
            </span>
          </p>
          <h1 className="mt-2 font-semibold tracking-tighter leading-[0.95] text-[clamp(2.2rem,6vw,5.5rem)] max-w-4xl">
            {project.title}
          </h1>
          <div className="flex flex-wrap gap-x-8 gap-y-2 mt-6 text-xs md:text-sm uppercase tracking-widest text-[#dedede]">
            <span>{project.categoryLabel}</span>
            <span>{project.size}</span>
            {project.beds && <span>{project.beds}</span>}
            {project.floor && <span>{project.floor}</span>}
          </div>
        </div>
      </div>

      {/* Description */}
      <section className="relative w-full bg-[#f7f7f7] text-neutral-900 px-6 md:px-16 py-20 md:py-28">
        <div
          ref={bodyRef}
          className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8 md:gap-20"
        >
          <p className="text-xs uppercase tracking-widest text-neutral-400 whitespace-nowrap">
            {content.projectBriefLabel}
          </p>
          <div className="max-w-3xl">
            <p className="text-lg md:text-2xl font-light leading-relaxed">{project.description}</p>
            {project.longDescription && (
              <p className="mt-6 text-neutral-600 leading-relaxed">{project.longDescription}</p>
            )}

            {project.highlights.length > 0 && (
              <div className="flex flex-wrap gap-x-10 gap-y-4 mt-10 pt-8 border-t border-neutral-200">
                {project.highlights.map((item) => (
                  <div key={item.label}>
                    <p className="text-xs uppercase tracking-widest text-neutral-400 mb-1">{item.label}</p>
                    <p className="font-medium">{item.value}</p>
                  </div>
                ))}
              </div>
            )}

            {project.keyFeatures.length > 0 && (
              <div className="mt-10 pt-8 border-t border-neutral-200">
                <p className="text-xs uppercase tracking-widest text-neutral-400 mb-4">
                  {content.keyFeaturesLabel}
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                  {project.keyFeatures.map((feature) => (
                    <li key={feature} className="flex gap-3 text-neutral-700 leading-relaxed">
                      <span className="text-neutral-400 mt-1">—</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Gallery */}
        <div
          ref={galleryRef}
          className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-16 md:mt-24"
        >
          {project.gallery.map((image, index) => (
            <div
              key={image + index}
              className={`relative w-full overflow-hidden ${
                index === 0
                  ? "md:col-span-2 h-[50vh] md:h-[70vh]"
                  : "h-[45vh] md:h-[55vh]"
              }`}
            >
              <Image
                src={image}
                alt={`${project.title} - ${content.galleryViewLabel} ${index + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Next project */}
      <Link
        href={`/${lang}/projects/${next.slug}`}
        className="group relative block w-full h-[60vh] md:h-[70vh] overflow-hidden"
      >
        <Image
          src={next.cover}
          alt={next.title}
          fill
          sizes="100vw"
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition-colors pointer-events-none" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-6">
          <p className="text-xs uppercase tracking-widest text-[#dedede] mb-4">
            {content.nextProjectLabel}
          </p>
          <h2 className="font-semibold tracking-tighter leading-[0.95] text-[clamp(2rem,5.5vw,4.5rem)]">
            {next.title}
          </h2>
          <p className="mt-4 text-sm md:text-base text-[#dedede]">
            {next.location} [{next.status}]
          </p>
        </div>
      </Link>
    </div>
  );
}
