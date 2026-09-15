"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const stats = [
  { value: "14+", label: "Years of practice" },
  { value: "240+", label: "Projects delivered" },
  { value: "12", label: "Countries worldwide" },
];

const values = [
  {
    index: "01",
    title: "Considered design",
    body: "Every plan starts from how a space will actually be lived in, not just how it will photograph.",
  },
  {
    index: "02",
    title: "Material honesty",
    body: "We favour natural stone, wood and metal left to age well, rather than surfaces built to look new forever.",
  },
  {
    index: "03",
    title: "Seamless delivery",
    body: "Our teams stay involved from concept through to the final handover, so nothing is lost in translation.",
  },
];

export default function AboutStorySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        photoRef.current,
        { y: 100, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 90%",
            end: "top 35%",
            scrub: 1,
          },
        },
      );
      gsap.fromTo(
        textRef.current,
        { y: 60, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            end: "top 40%",
            scrub: 1,
          },
        },
      );
      gsap.fromTo(
        statsRef.current ? statsRef.current.children : [],
        { y: 30, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 90%",
          },
        },
      );
      gsap.fromTo(
        valuesRef.current ? valuesRef.current.children : [],
        { y: 40, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: valuesRef.current,
            start: "top 88%",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#f7f7f7] text-neutral-900 px-6 md:px-16 py-24 md:py-32 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
        <div
          ref={photoRef}
          className="relative w-full h-[360px] md:h-[560px] overflow-hidden"
        >
          <Image
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80"
            alt="A Khales-designed interior"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover grayscale contrast-125"
          />
        </div>

        <div ref={textRef}>
          <p className="text-xs uppercase tracking-widest text-neutral-400 mb-4">
            Our story
          </p>
          <h2 className="font-semibold tracking-tight leading-[1.05] text-[clamp(1.8rem,3.2vw,2.75rem)] mb-6">
            Founded on the belief that a home should feel as good as it looks
          </h2>
          <p className="text-neutral-500 leading-relaxed mb-4">
            Khales began as a small studio working on private residences in
            Moscow and grew into an international practice spanning
            architecture, interiors and bespoke joinery. The scale has
            changed; the way we work has not.
          </p>
          <p className="text-neutral-500 leading-relaxed">
            Every project - from a single apartment to a full estate - passes
            through the same hands from first sketch to final walkthrough, so
            the intent behind the design survives contact with the real
            world.
          </p>

          <div
            ref={statsRef}
            className="grid grid-cols-3 gap-6 mt-12 pt-10 border-t border-neutral-200"
          >
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-semibold tracking-tight text-3xl md:text-4xl">
                  {stat.value}
                </p>
                <p className="text-xs uppercase tracking-widest text-neutral-400 mt-2">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        ref={valuesRef}
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 mt-24 md:mt-32 pt-16 border-t border-neutral-200"
      >
        {values.map((value) => (
          <div key={value.index}>
            <span className="text-xs font-mono text-neutral-400">
              {value.index}
            </span>
            <h3 className="font-semibold tracking-tight text-xl md:text-2xl mt-3 mb-3">
              {value.title}
            </h3>
            <p className="text-neutral-500 leading-relaxed text-sm md:text-base">
              {value.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
