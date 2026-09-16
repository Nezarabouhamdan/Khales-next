"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SiteHeader from "./SiteHeader";
import InteriorShowcaseSection from "./InteriorShowcaseSection";
import ProjectsSection from "./ProjectsSection";
import ServicesSection from "./ServicesSection";
import type { Locale } from "@/i18n-config";
import type {
  NavigationDict,
  HeroSequenceDict,
  WorldwideSectionDict,
  InteriorShowcaseSectionDict,
  AboutTeamSectionDict,
  TeamGridSectionDict,
  ProjectsSectionDict,
  ServicesSectionDict,
} from "@/dictionaries/types";

// Three.js (the globe) is a large chunk of this page's JS but renders a
// single below-the-fold section - code-splitting it out via next/dynamic
// keeps it out of the initial bundle Lighthouse scores instead of eagerly
// loading and executing it for every visitor before they ever scroll
// there. ssr:false since WebGLRenderer needs a real <canvas>/GL context
// anyway, so there's nothing useful to server-render here.
const WorldwideSection = dynamic(() => import("./WorldwideSection"), {
  ssr: false,
  loading: () => <div className="w-full h-screen bg-[#525151]" />,
});

// Non-text metadata for the hero image captions - the translatable copy
// (location/status/title/size) comes from content.projects, matched by
// index. Real Khales project photography (Mirbah Prime, Al Khawaneej
// Organic Villa) - no real project videos exist to use here, so this is a
// still image rather than the original template's stock video loop.
// A full-bleed 100vw banner needs genuinely landscape-oriented source
// photography - a portrait/square source still "works" via object-cover,
// but crops in tight and loses most of the shot. Most of this dataset's
// photography is Instagram-portrait/square social exports; these are the
// ones actually confirmed landscape (checked real pixel dimensions, not
// just filenames), one per distinct real project - an earlier version
// used 2 angles of the same villa to fill a 4th slot, but with identical
// caption text (same title/location/size) it just read as a stuck/
// duplicated slide rather than "variety".
const heroProjectsMeta = [
  // The Organic Villa - evening exterior elevation.
  { id: 1, image: "https://i.ibb.co/hFHH248S/IMG-20250811-WA0020.jpg" },
  // The Royal Villa - frontal elevation render, self-hosted (source PNG
  // screenshot export, re-encoded to keep the image optimizer fast).
  { id: 2, image: "/projects/royal-villa/hero-01.jpg" },
  // Al Khawaneej Organic Villa - was 67-jpg.jpg (a perfect 1:1 square);
  // swapped to a landscape shot from the same gallery.
  { id: 3, image: "https://i.ibb.co/ymrMTmBM/72-jpg.jpg" },
  // The Executive Villa Interior.
  { id: 4, image: "https://i.ibb.co/PvSc6bfb/shoot1-jpg.jpg" },
];

// Non-text metadata for the 3D flip-card faces - translatable copy comes
// from content.faceProjects, matched by index.
const faceProjectsMeta = [
  {
    image: "https://i.ibb.co/1GPhqTPD/Whats-App-Image-2025-09-04-at-10-32-13-743b2078.jpg",
  },
  {
    image: "https://i.ibb.co/BHV2W6vf/Whats-App-Image-2025-11-18-at-12-29-22-142b2921.jpg",
  },
];

const pad = (n: number) => String(n).padStart(2, "0");

type HeroSequenceProps = {
  lang?: Locale;
  navigation?: NavigationDict;
  content: HeroSequenceDict;
  worldwideContent: WorldwideSectionDict;
  interiorShowcaseContent: InteriorShowcaseSectionDict;
  aboutTeamContent: AboutTeamSectionDict;
  teamGridContent: TeamGridSectionDict;
  projectsSectionContent: ProjectsSectionDict;
  servicesSectionContent: ServicesSectionDict;
};

export default function HeroSequence({
  lang,
  navigation,
  content,
  worldwideContent,
  interiorShowcaseContent,
  aboutTeamContent,
  teamGridContent,
  projectsSectionContent,
  servicesSectionContent,
}: HeroSequenceProps) {
  const dir = lang === "ar" ? "rtl" : "ltr";
  const mainWrapperRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<HTMLDivElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const captionWrapRef = useRef<HTMLDivElement>(null);
  const craftingTextRef = useRef<HTMLDivElement>(null);
  const whiteTextRef = useRef<HTMLDivElement>(null);
  const cardWrapRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const frontFaceRef = useRef<HTMLDivElement>(null);
  const backFaceRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const metaFace0Ref = useRef<HTMLDivElement>(null);
  const metaFace1Ref = useRef<HTMLDivElement>(null);
  const newHeroRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [, setRevealed] = useState(false);
  // All 4 hero backgrounds are stacked for the crossfade, but a viewport-
  // filling image loads regardless of its opacity (native lazy-loading is
  // intersection-based, not visibility-based) - mounting only the first
  // slide up front, then the rest once the browser is idle, keeps slides
  // 2-4 from competing with the actual LCP candidate for bandwidth during
  // the critical load window. Idle fires well before the first 2.5s
  // rotation needs slide 2.
  const [mountedHeroCount, setMountedHeroCount] = useState(1);
  useEffect(() => {
    const ric =
      typeof window.requestIdleCallback === "function"
        ? window.requestIdleCallback
        : (cb: () => void) => setTimeout(cb, 300);
    const handle = ric(() => setMountedHeroCount(heroProjectsMeta.length));
    return () => {
      if (typeof window.cancelIdleCallback === "function") window.cancelIdleCallback(handle as number);
      else clearTimeout(handle as unknown as number);
    };
  }, []);

  const heroProjects = heroProjectsMeta.map((meta, i) => ({
    ...meta,
    ...content.projects[i],
  }));
  const faceProjects = faceProjectsMeta.map((meta, i) => ({
    ...meta,
    ...content.faceProjects[i],
  }));

  const project = heroProjects[activeIndex];

  // Auto-advances the hero background every 2.5s; manual arrow clicks
  // just call the same setActiveIndex and the interval keeps ticking on
  // its own schedule rather than resetting - simplest behavior, and the
  // crossfade below means an overlapping manual click never looks abrupt.
  useEffect(() => {
    const id = setInterval(() => {
      setActiveIndex((i) => (i + 1) % heroProjects.length);
    }, 2500);
    return () => clearInterval(id);
  }, [heroProjects.length]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(linesRef.current, { y: "15%" });
      gsap.set(videoWrapRef.current, { scale: 1, autoAlpha: 1 });
      gsap.set(captionWrapRef.current, { autoAlpha: 1 });
      gsap.set(craftingTextRef.current, { y: "26vh", autoAlpha: 1 });
      gsap.set(whiteTextRef.current, { autoAlpha: 1 });

      gsap.set(cardRef.current, {
        scale: 0.25,
        rotateY: 0,
        autoAlpha: 0,
        width: "360px",
        height: "500px",
        borderRadius: "24px",
      });

      gsap.set(frontFaceRef.current, { autoAlpha: 1 });
      gsap.set(backFaceRef.current, { autoAlpha: 0 });

      gsap.set(metaRef.current, { autoAlpha: 0 });
      gsap.set(metaFace0Ref.current, { autoAlpha: 1 });
      gsap.set(metaFace1Ref.current, { autoAlpha: 0 });
      gsap.set(newHeroRef.current, { autoAlpha: 0 });

      const tl = gsap.timeline();

      tl.to(linesRef.current, { y: "-15%", ease: "none", duration: 3 }, 0);
      tl.to(captionWrapRef.current, { autoAlpha: 0, duration: 0.3 }, 0);
      tl.to(whiteTextRef.current, { autoAlpha: 0, duration: 0.8 }, 0);
      tl.to(
        videoWrapRef.current,
        { scale: 0.9, autoAlpha: 0, ease: "power2.inOut", duration: 1 },
        0,
      );
      tl.to(
        craftingTextRef.current,
        { y: 0, ease: "power2.inOut", duration: 1 },
        0,
      );

      tl.to(cardRef.current, { autoAlpha: 1, duration: 0.3 }, 0.5);
      tl.to(metaRef.current, { autoAlpha: 1, duration: 0.3 }, 0.5);

      tl.to(
        cardRef.current,
        {
          rotateY: 180,
          scale: 0.85,
          width: "720px",
          height: "460px",
          borderRadius: "16px",
          ease: "power2.inOut",
          duration: 1.2,
        },
        0.8,
      );

      tl.to(frontFaceRef.current, { autoAlpha: 0, duration: 0.01 }, 1.3);
      tl.to(backFaceRef.current, { autoAlpha: 1, duration: 0.01 }, 1.3);

      tl.to(metaFace0Ref.current, { autoAlpha: 0, duration: 0.2 }, 1.1);
      tl.to(metaFace1Ref.current, { autoAlpha: 1, duration: 0.2 }, 1.3);

      tl.to(
        cardRef.current,
        {
          width: "100vw",
          height: "100vh",
          scale: 1,
          borderRadius: "0px",
          ease: "power2.inOut",
          duration: 1.2,
        },
        1.8,
      );

      tl.to(
        [craftingTextRef.current, metaRef.current],
        { autoAlpha: 0, duration: 0.4 },
        2.0,
      );

      tl.to(newHeroRef.current, { autoAlpha: 1, duration: 0.6 }, 2.5);

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${window.innerHeight * 3.3}`,
        pin: true,
        scrub: 1,
        animation: tl,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const isRev = self.progress > 0.4;
          setRevealed((prev) => (prev !== isRev ? isRev : prev));
        },
      });
    }, mainWrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={mainWrapperRef}
      dir={dir}
      className="bg-[#525151] text-white relative cursor-default overflow-x-hidden select-none"
    >
      <SiteHeader lang={lang} navigation={navigation} />

      {/* Pinned Hero & Animation Section */}
      <div
        ref={sectionRef}
        className="relative z-30 h-screen w-full overflow-hidden bg-[#f7f7f7]"
      >
        <div
          ref={linesRef}
          className="absolute inset-x-0 pointer-events-none opacity-20 z-0"
          style={{ top: "-30%", height: "160%" }}
        >
          <svg
            className="w-full h-full"
            viewBox="0 0 1440 900"
            fill="none"
            preserveAspectRatio="none"
          >
            <rect
              x="-60"
              y="-180"
              width="360"
              height="760"
              rx="180"
              stroke="#A3A3A3"
              strokeWidth="1.2"
            />
            <rect
              x="640"
              y="90"
              width="540"
              height="700"
              rx="230"
              stroke="#A3A3A3"
              strokeWidth="1.2"
            />
          </svg>
        </div>

        <div ref={videoWrapRef} className="absolute inset-0 z-10 origin-center">
          {/* Stacked + opacity-crossfaded rather than swapping a single
              Image's src, which would just pop instantly between photos
              on every auto-rotation tick or arrow click. */}
          {heroProjects.slice(0, mountedHeroCount).map((p, i) => (
            <Image
              key={p.id}
              src={p.image}
              alt={p.title}
              fill
              priority={i === 0}
              sizes="100vw"
              className={`object-cover transition-opacity duration-1000 ease-in-out ${
                i === activeIndex ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
          <div className="absolute inset-0 bg-black/30 pointer-events-none" />
        </div>

        <div
          ref={captionWrapRef}
          className="absolute inset-0 z-20 pointer-events-none px-6 md:px-16"
        >
          {/* Mirrored under RTL: the crafting-text headline's own flex row
              already auto-reverses so its two-line block moves to this
              same side under Arabic - without mirroring these too, the
              caption/controls collide with it instead of sitting opposite. */}
          <div
            className={`absolute top-[55%] md:top-[58%] text-white ${
              dir === "rtl" ? "right-6 md:right-[54%] text-right" : "left-6 md:left-[54%]"
            }`}
          >
            <p className="text-sm md:text-base font-medium leading-snug">
              {project.location}{" "}
              <span className="text-[10px] md:text-xs font-normal align-top opacity-80">
                [{project.status}]
              </span>
            </p>
            <p className="text-xl md:text-3xl font-light">
              <span className="underline underline-offset-4">
                {project.title}
              </span>
              ,
            </p>
            <p className="text-sm md:text-base font-medium mt-3 md:mt-4">
              {project.size}
            </p>
          </div>

          <div
            className={`absolute top-[55%] md:top-[58%] flex flex-col items-end justify-between h-[85px] md:h-[95px] text-white pointer-events-auto ${
              dir === "rtl" ? "left-6 md:left-16" : "right-6 md:right-16"
            }`}
          >
            <div className="flex items-center gap-4">
              {/* This row's DOM order (prev, next) stays fixed and flex's
                  own RTL auto-reversal puts prev on the right / next on
                  the left under Arabic - but the glyphs themselves need to
                  flip too, or the arrow a button shows ends up pointing
                  away from its own side instead of matching it. */}
              <button
                type="button"
                onClick={() =>
                  setActiveIndex(
                    (i) => (i - 1 + heroProjects.length) % heroProjects.length,
                  )
                }
                className="text-2xl md:text-3xl hover:opacity-60 transition cursor-pointer p-1"
              >
                {dir === "rtl" ? "→" : "←"}
              </button>
              <button
                type="button"
                onClick={() =>
                  setActiveIndex((i) => (i + 1) % heroProjects.length)
                }
                className="text-2xl md:text-3xl hover:opacity-60 transition cursor-pointer p-1"
              >
                {dir === "rtl" ? "←" : "→"}
              </button>
            </div>
            <span className="text-xs md:text-sm font-light tracking-widest">
              {pad(activeIndex + 1)} / {pad(heroProjects.length)}
            </span>
          </div>
        </div>

        <div
          ref={craftingTextRef}
          className="absolute inset-0 z-[35] flex flex-col md:flex-row items-center md:justify-between justify-center gap-2 md:gap-0 px-6 md:px-16 pointer-events-none select-none text-center md:text-left"
        >
          <div className="text-[#9E9D9C] font-semibold tracking-tighter leading-[0.85] text-[clamp(2.75rem,8.5vw,7.5rem)]">
            <p>{content.craftingLine1}</p>
            <p className="md:ml-[100px]">{content.craftingLine2}</p>
          </div>
          <div className="text-[#9E9D9C] font-semibold tracking-tighter leading-[0.85] text-[clamp(2.75rem,8.5vw,7.5rem)]">
            <p>{content.craftingLine3}</p>
          </div>

          <div
            ref={whiteTextRef}
            className="absolute inset-0 flex flex-col md:flex-row items-center md:justify-between justify-center gap-2 md:gap-0 px-6 md:px-16 text-center md:text-left"
          >
            <div className="text-white font-semibold tracking-tighter leading-[0.85] text-[clamp(2.75rem,8.5vw,7.5rem)]">
              <p>{content.craftingLine1}</p>
              <p className="md:ml-[100px]">{content.craftingLine2}</p>
            </div>
            <div className="text-white font-semibold tracking-tighter leading-[0.85] text-[clamp(2.75rem,8.5vw,7.5rem)]">
              <p>{content.craftingLine3}</p>
            </div>
          </div>
        </div>

        {/* 3D Card Container */}
        <div
          ref={cardWrapRef}
          className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none"
          style={{ perspective: "2000px" }}
        >
          <div
            ref={cardRef}
            className="relative shadow-2xl invisible opacity-0 bg-neutral-900"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Front Face */}
            <div
              ref={frontFaceRef}
              className="absolute inset-0 w-full h-full overflow-hidden"
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
              }}
            >
              <Image
                src={faceProjects[0].image}
                alt={faceProjects[0].title}
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>

            {/* Back Face */}
            <div
              ref={backFaceRef}
              className="absolute inset-0 w-full h-full overflow-hidden"
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}
            >
              <Image
                src={faceProjects[1].image}
                alt={faceProjects[1].title}
                fill
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/40 pointer-events-none" />
            </div>
          </div>
        </div>

        <div
          ref={metaRef}
          className="absolute top-24 md:top-28 right-6 md:right-16 z-40 text-neutral-800 pointer-events-none invisible opacity-0"
        >
          <div ref={metaFace0Ref} className="text-right">
            <p className="text-sm font-medium">
              {faceProjects[0].location}{" "}
              <span className="text-xs text-neutral-400 font-light">
                [{faceProjects[0].status}]
              </span>
            </p>
            <p className="text-lg font-normal underline underline-offset-4">
              {faceProjects[0].title}
            </p>
            <p className="text-xs text-neutral-500 font-light mt-0.5">
              {faceProjects[0].size}
            </p>
          </div>

          <div
            ref={metaFace1Ref}
            className="text-right absolute top-0 right-0 w-full invisible opacity-0"
          >
            <p className="text-sm font-medium">
              {faceProjects[1].location}{" "}
              <span className="text-xs text-neutral-400 font-light">
                [{faceProjects[1].status}]
              </span>
            </p>
            <p className="text-lg font-normal underline underline-offset-4">
              {faceProjects[1].title}
            </p>
            <p className="text-xs text-neutral-500 font-light mt-0.5">
              {faceProjects[1].size}
            </p>
          </div>
        </div>

        {/* Headline over full expanded second image */}
        <div
          ref={newHeroRef}
          className="absolute inset-0 z-40 flex items-center justify-center px-6 pointer-events-none invisible opacity-0"
        >
          <h1 className="text-white text-center text-[clamp(2.5rem,7vw,7.5rem)] font-light tracking-tight leading-none drop-shadow-lg">
            {content.finalHeadline}
          </h1>
        </div>
      </div>

      {/* Additional Sub-sections - Services, then Projects gallery, then
          Globe, then a plain full-bleed photo. The About/Team teaser
          (AboutTeamSection, TeamGridSection) is pulled off the homepage
          for now, per request - components are untouched, just not
          rendered here, so re-adding them later is a two-line change. */}
      <ServicesSection lang={lang} content={servicesSectionContent} />
      <ProjectsSection lang={lang} content={projectsSectionContent} />
      <WorldwideSection lang={lang} content={worldwideContent} />
      <InteriorShowcaseSection lang={lang} content={interiorShowcaseContent} />
    </div>
  );
}
