"use client";

import { useRef, type ReactNode } from "react";
import Link from "next/link";
import gsap from "gsap";

export default function MagneticButton({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  const wrapRef = useRef<HTMLAnchorElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = wrapRef.current;
    const label = labelRef.current;
    if (!el || !label) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    gsap.to(el, { x: relX * 0.4, y: relY * 0.4, duration: 0.4, ease: "power3.out" });
    gsap.to(label, { x: relX * 0.2, y: relY * 0.2, duration: 0.4, ease: "power3.out" });
  };

  const handleLeave = () => {
    const el = wrapRef.current;
    const label = labelRef.current;
    if (!el || !label) return;
    gsap.to([el, label], {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.4)",
    });
  };

  return (
    <Link
      ref={wrapRef}
      href={href}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={className}
    >
      <span ref={labelRef} className="inline-block">
        {children}
      </span>
    </Link>
  );
}
