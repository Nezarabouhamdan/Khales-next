"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function DrawnLine({
  d,
  viewBox = "0 0 200 200",
  className = "",
  strokeWidth = 1.5,
  duration = 1.4,
  delay = 0,
  start = "top 85%",
}: {
  d: string;
  viewBox?: string;
  className?: string;
  strokeWidth?: number;
  duration?: number;
  delay?: number;
  start?: string;
}) {
  const pathRef = useRef<SVGPathElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!pathRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        pathRef.current,
        { strokeDashoffset: 1 },
        {
          strokeDashoffset: 0,
          duration,
          delay,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: svgRef.current,
            start,
          },
        },
      );
    });

    return () => ctx.revert();
  }, [duration, delay, start]);

  return (
    <svg
      ref={svgRef}
      viewBox={viewBox}
      className={className}
      fill="none"
      preserveAspectRatio="none"
    >
      <path
        ref={pathRef}
        d={d}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        pathLength={1}
        strokeDasharray={1}
      />
    </svg>
  );
}
