"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Locale } from "@/i18n-config";
import type { AboutTeamSectionDict } from "@/dictionaries/types";

const defaultContent: AboutTeamSectionDict = {
  imageAlt: "The Khales team at work",
  kicker: "Arch. /",
  moreLabel: "More",
  aboutUsLabel: "about us",
  lineOne: "Turning dreams",
  lineTwo: "Into reality",
  teamLabel: "TEAM",
  viewAllLabel: "VIEW ALL",
};

type AboutTeamSectionProps = {
  lang?: Locale;
  content?: AboutTeamSectionDict;
};

export default function AboutTeamSection({
  lang = "en",
  content = defaultContent,
}: AboutTeamSectionProps = {}) {
  const dir = lang === "ar" ? "rtl" : "ltr";
  const sectionRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      // Photo and heading start slightly offset and ease into their resting
      // spot in lockstep with scroll (scrub), instead of just appearing.
      gsap.fromTo(
        photoRef.current,
        { y: 140, scale: 0.9 },
        {
          y: 0,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 95%",
            end: "top 35%",
            scrub: 1,
          },
        },
      );
      gsap.fromTo(
        headingRef.current,
        { y: 90 },
        {
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 90%",
            end: "top 25%",
            scrub: 1,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      dir={dir}
      className="relative w-full min-h-screen bg-[#ebebeb] text-[#8e8d8d] overflow-hidden flex flex-col justify-between p-6 md:p-12 select-none"
    >
      <div className="absolute inset-0 pointer-events-none z-0 opacity-60">
        <svg
          className="w-full h-full stroke-[#b1b0af] fill-none"
          viewBox="0 0 1440 900"
          preserveAspectRatio="none"
        >
          <path
            d="M -100 700 C 300 900, 400 100, 800 650 C 1100 950, 1200 50, 1500 400"
            strokeWidth="1.4"
          />
          <path
            d="M 200 -50 C 500 300, 300 700, 700 500 C 1000 350, 1100 700, 1400 850"
            strokeWidth="1.4"
          />
          <path
            d="M -50 400 C 250 250, 450 600, 750 300 C 1000 100, 1250 400, 1500 250"
            strokeWidth="1.4"
          />
        </svg>
      </div>

      <div className="relative z-10 w-full my-auto py-6">
        <div
          ref={photoRef}
          className="relative w-full sm:w-[600px] md:w-[780px] h-[240px] sm:h-[400px] md:h-[500px] mb-[-4rem] sm:mb-[-5.5rem] md:mb-[-7rem] z-0 overflow-hidden shadow-sm"
        >
          <Image
            src="https://api.ab-sl.com/uploads/medium_VBL_09738_HI_RES_BW_b325dded6d.jpg"
            alt={content.imageAlt}
            fill
            className="object-cover grayscale contrast-125 pointer-events-none"
          />
        </div>

        <div
          ref={headingRef}
          className="relative z-10 font-sans tracking-tight leading-[0.82] font-semibold text-[#8e8d8d] text-[clamp(3.5rem,10.5vw,11.5rem)]"
        >
          <div>
            <h1>{content.kicker}</h1>
          </div>
          <div className="relative">
            <a
              href={`/${lang}/about`}
              className="group absolute -top-8 md:-top-10 right-0 z-20 text-right text-xs md:text-sm font-sans font-normal tracking-normal leading-tight text-[#8e8d8d] hover:text-black transition-colors"
            >
              <span className="block leading-none">{content.moreLabel}</span>
              <span className="underline underline-offset-4 decoration-1">
                {content.aboutUsLabel}
              </span>
            </a>
            <h2>{content.lineOne}</h2>
          </div>
          <div className="flex justify-end">
            <h2 className="text-right">{content.lineTwo}</h2>
          </div>
        </div>

        <div className="mt-2 text-[#8e8d8d] text-3xl md:text-5xl font-light tracking-tight">
          ©.26
        </div>
      </div>

      <div className="relative z-10 flex justify-between items-end w-full pb-2 text-[10px] md:text-xs font-semibold tracking-widest text-[#8e8d8d] uppercase">
        <div>{content.teamLabel}</div>
        <div>
          <a
            href={`/${lang}/about#team`}
            className="underline underline-offset-4 hover:text-black transition-colors"
          >
            {content.viewAllLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
