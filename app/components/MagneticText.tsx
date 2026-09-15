"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function MagneticText({
  text,
  className = "",
  radius = 90,
  strength = 0.4,
}: {
  text: string;
  className?: string;
  radius?: number;
  strength?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      lettersRef.current.forEach((el) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.hypot(dx, dy);

        if (dist < radius) {
          const power = 1 - dist / radius;
          gsap.to(el, {
            x: -dx * strength * power,
            y: -dy * strength * power,
            duration: 0.4,
            ease: "power3.out",
          });
        } else {
          gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "power3.out" });
        }
      });
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [radius, strength]);

  return (
    <div ref={containerRef} className={className}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          ref={(el) => {
            lettersRef.current[i] = el;
          }}
          className="inline-block will-change-transform"
          style={{ whiteSpace: "pre" }}
        >
          {char}
        </span>
      ))}
    </div>
  );
}
