"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { teamMembers } from "@/data/team";
import type { Locale } from "@/i18n-config";
import type { TeamGridSectionDict } from "@/dictionaries/types";

const defaultContent: TeamGridSectionDict = {
  teamLabel: "Team",
  viewAllLabel: "View all",
  memberLabel: "Team Member",
};

type TeamGridSectionProps = {
  lang?: Locale;
  content?: TeamGridSectionDict;
};

export default function TeamGridSection({
  lang = "en",
  content = defaultContent,
}: TeamGridSectionProps = {}) {
  const dir = lang === "ar" ? "rtl" : "ltr";
  const sliderRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const draggedDistanceRef = useRef(0);
  const [showDragCursor, setShowDragCursor] = useState(false);

  const xTo = useRef<((value: number) => void) | null>(null);
  const yTo = useRef<((value: number) => void) | null>(null);

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

  const handleMouseMove = (e: React.MouseEvent) => {
    if (xTo.current && yTo.current) {
      xTo.current(e.clientX);
      yTo.current(e.clientY);
    }
  };

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

  return (
    <section
      dir={dir}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setShowDragCursor(true)}
      onMouseLeave={() => setShowDragCursor(false)}
      className="relative w-full bg-[#ebebeb] text-[#8e8d8d] overflow-hidden select-none py-10 md:py-14 cursor-none"
    >
      {/* Custom Circular Drag Cursor */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white text-black flex items-center justify-center shadow-md pointer-events-none z-[100] transition-opacity duration-300 ${
          showDragCursor ? "opacity-100 scale-100" : "opacity-0 scale-50"
        }`}
      >
        <span className="block w-3.5 h-px bg-black" />
      </div>

      <div className="absolute inset-0 pointer-events-none z-0 opacity-60">
        <svg
          className="w-full h-full stroke-[#b1b0af] fill-none"
          viewBox="0 0 1440 900"
          preserveAspectRatio="none"
        >
          <path
            d="M -100 200 C 300 0, 500 500, 900 250 C 1150 100, 1300 350, 1500 150"
            strokeWidth="1.4"
          />
          <path
            d="M 100 850 C 400 600, 550 950, 900 700 C 1150 550, 1300 850, 1500 650"
            strokeWidth="1.4"
          />
          <path
            d="M -50 500 C 300 350, 500 700, 850 450 C 1100 250, 1300 550, 1500 400"
            strokeWidth="1.4"
          />
        </svg>
      </div>

      <div className="relative z-10 flex justify-between items-center px-6 md:px-12 pb-8 text-[10px] md:text-xs font-semibold tracking-widest uppercase text-[#8e8d8d]">
        <span>{content.teamLabel}</span>
        <a
          href={`/${lang}/about#team`}
          className="underline underline-offset-4 hover:text-black transition-colors"
        >
          {content.viewAllLabel}
        </a>
      </div>

      <div
        ref={sliderRef}
        onMouseDown={handleMouseDown}
        className="relative z-10 flex overflow-x-auto scrollbar-none px-6 md:px-12 gap-0 cursor-grab active:cursor-grabbing"
      >
        {teamMembers.map((member) => (
          <div
            key={member.role.en}
            className="flex-shrink-0 w-[280px] sm:w-[320px] md:w-[19vw] group"
          >
            <div className="relative w-full aspect-[3/4]">
              <Image
                src={member.image}
                alt={member.role[lang]}
                fill
                sizes="(max-width: 768px) 320px, 19vw"
                className="object-cover grayscale pointer-events-none"
              />
            </div>
            <div className="pt-3 pb-6 pr-4">
              <p className="text-xs md:text-sm font-semibold uppercase tracking-wide text-black">
                {content.memberLabel}
              </p>
              <p className="text-[10px] md:text-xs uppercase tracking-wide text-[#8e8d8d] mt-1 leading-relaxed">
                {member.role[lang]}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
