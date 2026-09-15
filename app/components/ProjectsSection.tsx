"use client";

import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects, ProjectCategory } from "@/data/projects";
import type { Locale } from "@/i18n-config";
import type { ProjectsSectionDict } from "@/dictionaries/types";

type CategoryType = ProjectCategory;

const defaultContent: ProjectsSectionDict = {
  tabs: {
    Residential: "Residential",
    Commercial: "Commercial",
    Luxury_Villas: "Luxury Villas",
    Interior_Design: "Interior Design",
  },
  viewAllProjectsLabel: "View All Projects",
};

const CATEGORY_TABS: CategoryType[] = ["Residential", "Commercial", "Luxury_Villas", "Interior_Design"];

const pad = (n: number) => String(n).padStart(2, "0");

// Presentation-only layout knobs for the homepage drag slider, keyed by the
// shared project id - keeps the staggered card sizing without duplicating
// the underlying project data. Ids chosen to represent all 4 real project
// categories: 3 (Residential), 13 (Commercial), 17 (Interior_Design), 8 and
// 27 (Luxury_Villas).
const layoutById: Record<
  number,
  { width: string; imgHeight: string; alignSelf?: string }
> = {
  3: {
    width: "w-[380px] md:w-[460px]",
    imgHeight: "h-[250px] md:h-[290px]",
    alignSelf: "self-start",
  },
  17: {
    width: "w-[440px] md:w-[540px]",
    imgHeight: "h-[320px] md:h-[380px]",
    alignSelf: "self-center mt-6",
  },
  13: {
    width: "w-[360px] md:w-[440px]",
    imgHeight: "h-[420px] md:h-[490px]",
    alignSelf: "self-start",
  },
  27: {
    width: "w-[400px] md:w-[480px]",
    imgHeight: "h-[280px] md:h-[330px]",
    alignSelf: "self-end mb-4",
  },
  8: {
    width: "w-[450px] md:w-[520px]",
    imgHeight: "h-[340px] md:h-[400px]",
    alignSelf: "self-center",
  },
};

const horizontalProjects = projects
  .filter((p) => layoutById[p.id])
  .map((p) => ({
    id: p.id,
    slug: p.slug,
    location: p.location,
    status: p.status,
    title: p.title,
    size: p.size,
    image: p.cover,
    category: p.category,
    ...layoutById[p.id],
  }));

type ProjectsSectionProps = {
  lang?: Locale;
  content?: ProjectsSectionDict;
};

export default function ProjectsSection({
  lang = "en",
  content = defaultContent,
}: ProjectsSectionProps = {}) {
  const dir = lang === "ar" ? "rtl" : "ltr";
  const tabLabels = content.tabs;
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Map<CategoryType, HTMLButtonElement>>(new Map());
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const draggedDistanceRef = useRef(0);

  // Per-card image refs + gsap quickTo setters, keyed by project id, so each
  // card's image can drift toward the cursor independently on hover.
  const imageRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  const imageTweens = useRef<
    Map<number, { xTo: (v: number) => void; yTo: (v: number) => void }>
  >(new Map());

  const [activeTab, setActiveTab] = useState<CategoryType>("Luxury_Villas");
  const [showDragCursor, setShowDragCursor] = useState(false);

  const xTo = useRef<((value: number) => void) | null>(null);
  const yTo = useRef<((value: number) => void) | null>(null);

  const filteredProjects = useMemo(() => {
    return horizontalProjects.filter((p) => p.category === activeTab);
  }, [activeTab]);

  // Stagger the filtered cards in whenever the active tab changes.
  useEffect(() => {
    if (!sliderRef.current) return;
    gsap.fromTo(
      sliderRef.current.children,
      { opacity: 0, y: 24, scale: 0.97 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.55,
        stagger: 0.06,
        ease: "power3.out",
      },
    );
    sliderRef.current.scrollLeft = 0;
  }, [activeTab]);

  // Wire up a quickTo pair for every currently-rendered card image so hover
  // can drift the image toward the cursor without re-creating tweens.
  useEffect(() => {
    imageTweens.current.clear();
    filteredProjects.forEach((p) => {
      const el = imageRefs.current.get(p.id);
      if (!el) return;
      imageTweens.current.set(p.id, {
        xTo: gsap.quickTo(el, "x", { duration: 0.6, ease: "power3.out" }),
        yTo: gsap.quickTo(el, "y", { duration: 0.6, ease: "power3.out" }),
      });
    });
  }, [filteredProjects]);

  // Sliding pill indicator glides between tabs instead of the old curved
  // folder-tab artwork, echoing the site's editorial-underline language
  // used on Services while staying visually distinct (filled pill vs. line).
  // offsetLeft/offsetWidth are used (not getBoundingClientRect) because
  // they're already relative to the pill's own positioned ancestor - the
  // "relative" tab-row div - regardless of dir="rtl" or page scroll.
  useEffect(() => {
    const activeEl = tabRefs.current.get(activeTab);
    if (!activeEl || !pillRef.current) return;
    gsap.to(pillRef.current, {
      x: activeEl.offsetLeft,
      width: activeEl.offsetWidth,
      duration: 0.5,
      ease: "power3.out",
    });
  }, [activeTab]);

  // Section rises smoothly into place as it scrolls into view, instead of
  // just appearing - matches the reveal used by the other sub-sections.
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { y: 120, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 95%",
            end: "top 40%",
            scrub: 1,
          },
        },
      );

      // Snap the pill to the initial active tab once layout has settled.
      const activeEl = tabRefs.current.get(activeTab);
      if (activeEl && pillRef.current) {
        gsap.set(pillRef.current, {
          x: activeEl.offsetLeft,
          width: activeEl.offsetWidth,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (xTo.current && yTo.current) {
      xTo.current(e.clientX);
      yTo.current(e.clientY);
    }
  };

  useEffect(() => {
    if (!cursorRef.current) return;
    xTo.current = gsap.quickTo(cursorRef.current, "x", {
      duration: 0.2,
      ease: "power3.out",
    });
    yTo.current = gsap.quickTo(cursorRef.current, "y", {
      duration: 0.2,
      ease: "power3.out",
    });
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    isDraggingRef.current = true;
    draggedDistanceRef.current = 0;
    startXRef.current = e.pageX - sliderRef.current.offsetLeft;
    scrollLeftRef.current = sliderRef.current.scrollLeft;
    sliderRef.current.style.scrollBehavior = "auto";
  };

  useEffect(() => {
    const handleMouseMoveWindow = (e: MouseEvent) => {
      if (!isDraggingRef.current || !sliderRef.current) return;
      e.preventDefault();
      const x = e.pageX - sliderRef.current.offsetLeft;
      const walk = (x - startXRef.current) * 1.5;
      draggedDistanceRef.current = Math.abs(walk);
      sliderRef.current.scrollLeft = scrollLeftRef.current - walk;
    };

    const handleMouseUpWindow = () => {
      if (!isDraggingRef.current || !sliderRef.current) return;
      isDraggingRef.current = false;
      sliderRef.current.style.scrollBehavior = "smooth";
    };

    window.addEventListener("mousemove", handleMouseMoveWindow);
    window.addEventListener("mouseup", handleMouseUpWindow);

    return () => {
      window.removeEventListener("mousemove", handleMouseMoveWindow);
      window.removeEventListener("mouseup", handleMouseUpWindow);
    };
  }, []);

  const handleCardClick = (e: React.MouseEvent) => {
    if (draggedDistanceRef.current > 10) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
  };

  // Drifts a card's image a few px toward the cursor position within the
  // frame, and resets it on leave - the subtle "alive" motion the redesign
  // needed to replace the flat hover-scale-only treatment.
  const handleCardMouseMove = useCallback((id: number, e: React.MouseEvent) => {
    const el = imageRefs.current.get(id);
    const tween = imageTweens.current.get(id);
    if (!el || !tween) return;
    const rect = el.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    tween.xTo(relX * 24);
    tween.yTo(relY * 24);
  }, []);

  const handleCardMouseLeave = useCallback((id: number) => {
    const tween = imageTweens.current.get(id);
    if (!tween) return;
    tween.xTo(0);
    tween.yTo(0);
  }, []);

  return (
    <section
      ref={sectionRef}
      dir={dir}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setShowDragCursor(true)}
      onMouseLeave={() => setShowDragCursor(false)}
      className="relative w-full min-h-screen bg-[#525151] overflow-hidden flex flex-col pt-16 pb-10 px-4 md:px-12"
    >
      {/* Custom Drag Cursor */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-44 h-44 rounded-full bg-white text-black flex items-center justify-between px-7 font-medium text-xs shadow-2xl pointer-events-none z-[100] transition-opacity duration-300 ${
          showDragCursor ? "opacity-100 scale-100" : "opacity-0 scale-50"
        }`}
      >
        <span className="text-lg text-neutral-400 font-bold">&lt;</span>
        <span className="tracking-widest text-lg font-semibold">DRAG</span>
        <span className="text-lg text-neutral-400 font-bold">&gt;</span>
      </div>

      <div className="absolute inset-0 pointer-events-none z-0">
        <svg
          className="w-full h-full stroke-[#383838] fill-none opacity-80"
          viewBox="0 0 1440 600"
          preserveAspectRatio="none"
        >
          <path
            d="M -100 520 C 180 520, 260 120, 580 360 C 880 600, 1080 40, 1500 320"
            strokeWidth="1.2"
          />
          <path d="M -50 220 C 380 120, 680 560, 1220 180" strokeWidth="1.0" />
        </svg>
      </div>

      <div ref={contentRef} className="relative z-10 flex flex-col flex-1">
        {/* Sliding pill tab indicator - horizontally scrollable on mobile
            (justify-start, so the overflow is actually reachable) instead
            of centered-and-clipped, which cut off the outer tabs entirely
            on narrow screens. */}
        <div className="relative flex justify-start md:justify-center z-50 pointer-events-auto pb-8 overflow-x-auto scrollbar-none -mx-4 px-4 md:mx-0 md:px-0">
          <div className="relative flex items-center gap-1 p-1 rounded-full bg-black/20 backdrop-blur-sm shrink-0">
            <div
              ref={pillRef}
              className="absolute top-1 bottom-1 left-0 rounded-full bg-white shadow-lg"
              style={{ width: 0 }}
            />
            {CATEGORY_TABS.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  type="button"
                  key={tab}
                  ref={(el) => {
                    if (el) tabRefs.current.set(tab, el);
                  }}
                  onClick={() => setActiveTab(tab)}
                  className={`relative z-10 px-3 md:px-6 h-8 md:h-10 rounded-full text-[9px] md:text-[11px] uppercase tracking-widest font-semibold whitespace-nowrap transition-colors duration-300 cursor-pointer ${
                    isActive ? "text-black" : "text-neutral-300 hover:text-white"
                  }`}
                >
                  {tabLabels[tab]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Horizontal Drag Slider */}
        <div
          ref={sliderRef}
          onMouseDown={handleMouseDown}
          className="relative z-10 flex items-end gap-8 md:gap-12 overflow-x-auto scrollbar-none pt-4 pb-4 px-4 md:px-8 cursor-grab active:cursor-grabbing select-none flex-1"
        >
          {filteredProjects.map((p, i) => (
            <Link
              key={p.id}
              href={`/${lang}/projects/${p.slug}`}
              onClick={handleCardClick}
              onMouseMove={(e) => handleCardMouseMove(p.id, e)}
              onMouseLeave={() => handleCardMouseLeave(p.id)}
              className={`group flex-shrink-0 flex flex-col cursor-pointer ${p.width} ${
                p.alignSelf || ""
              }`}
            >
              <div
                className={`relative w-full ${p.imgHeight} overflow-hidden shadow-2xl`}
              >
                <div
                  ref={(el) => {
                    if (el) imageRefs.current.set(p.id, el);
                  }}
                  className="absolute -inset-3"
                >
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    // Cards are fixed-pixel-width (w-[360px] to w-[540px])
                    // regardless of viewport, not a viewport fraction - the
                    // previous "50vw" requested ~2x the actual rendered
                    // size on wide screens.
                    sizes="540px"
                    className="object-cover scale-110 group-hover:scale-[1.16] transition-transform duration-700 ease-out pointer-events-none"
                  />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <span className="absolute top-3 md:top-4 right-3 md:right-4 text-[10px] md:text-xs font-mono tracking-widest text-white/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {pad(i + 1)} / {pad(filteredProjects.length)}
                </span>
              </div>

              <div className="pt-3.5 pb-1 px-0.5 flex justify-between items-end">
                <div className="flex flex-col items-start">
                  <p className="text-[1.25rem] leading-[1.25rem] font-medium tracking-[-0.024em] text-[#9e9d9c]">
                    {p.location} <span className="opacity-70">[{p.status}]</span>
                  </p>
                  <h3 className="text-[1.25rem] leading-[1.25rem] font-medium tracking-[-0.024em] text-[#9e9d9c] underline decoration-[0.0875rem] underline-offset-[0.0125rem] [text-underline-position:from-font] group-hover:text-white transition-colors mt-0.5">
                    {p.title},
                  </h3>
                </div>

                <div className="text-right">
                  <span className="text-[1.25rem] leading-[1.25rem] font-medium tracking-[-0.024em] text-[#9e9d9c]">
                    {p.size}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="w-full flex justify-center pt-8 z-50 pointer-events-auto">
          <Link
            href={`/${lang}/projects`}
            className="text-xs uppercase tracking-widest font-medium px-6 py-3 rounded-full bg-white/10 hover:bg-white hover:text-black border border-white/20 transition-all duration-300 backdrop-blur-sm"
          >
            {content.viewAllProjectsLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
