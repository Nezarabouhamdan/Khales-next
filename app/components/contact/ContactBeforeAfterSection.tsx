"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import type { Locale } from "@/i18n-config";
import type { ContactBeforeAfterSectionDict } from "@/dictionaries/types";

type ContactBeforeAfterSectionProps = {
  lang: Locale;
  content: ContactBeforeAfterSectionDict;
};

export default function ContactBeforeAfterSection({
  lang,
  content,
}: ContactBeforeAfterSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const afterRef = useRef<HTMLDivElement>(null);
  const [pct, setPct] = useState(50);
  const dir = lang === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    gsap.registerPlugin(Draggable);
    const container = containerRef.current;
    const handle = handleRef.current;
    if (!container || !handle) return;

    const update = (x: number) => {
      const rect = container.getBoundingClientRect();
      const ratio = Math.min(1, Math.max(0, x / rect.width));
      if (afterRef.current) {
        afterRef.current.style.clipPath = `inset(0 ${100 - ratio * 100}% 0 0)`;
      }
      setPct(Math.round(ratio * 100));
    };

    const [draggable] = Draggable.create(handle, {
      type: "x",
      bounds: container,
      onDrag: function onDrag() {
        update(this.x);
      },
    });

    const initX = container.getBoundingClientRect().width / 2;
    gsap.set(handle, { x: initX });
    update(initX);

    const onResize = () => {
      const rect = container.getBoundingClientRect();
      update((pct / 100) * rect.width);
    };
    window.addEventListener("resize", onResize);

    return () => {
      draggable.kill();
      window.removeEventListener("resize", onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section dir={dir} className="relative w-full bg-[#171717] text-white px-6 md:px-16 py-20 md:py-28">
      <div className="max-w-5xl mx-auto">
        <p className="text-xs uppercase tracking-widest text-neutral-500 mb-2">
          {content.eyebrow}
        </p>
        <h2 className="font-semibold tracking-tight text-2xl md:text-4xl mb-10">
          {content.heading}
        </h2>

        {/* Pinned LTR: the handle's x offset and the clip-path are both
            measured from the left edge, so under the page's RTL the
            handle would start off-screen and dragging wouldn't work. */}
        <div
          ref={containerRef}
          dir="ltr"
          className="relative w-full aspect-[16/10] md:aspect-[16/8] overflow-hidden select-none"
        >
          {/* Base layer = the "after" (the build on site), visible to the
              right of the handle. The clipped layer on top shows the
              "before" (the design render) to the left of it. Both are
              pre-sized 1376px JPEGs, served as-is. */}
          <Image
            src="/compare/villa-on-site.jpg"
            alt={content.afterLabel}
            fill
            sizes="(max-width: 1200px) 100vw, 1000px"
            unoptimized
            className="object-cover"
          />
          <div
            ref={afterRef}
            className="absolute inset-0"
            style={{ clipPath: "inset(0 50% 0 0)" }}
          >
            <Image
              src="/compare/villa-design-render.jpg"
              alt={content.beforeLabel}
              fill
              sizes="(max-width: 1200px) 100vw, 1000px"
              unoptimized
              className="object-cover"
            />
          </div>

          <div
            ref={handleRef}
            className="absolute top-0 bottom-0 -ml-5 w-10 cursor-ew-resize touch-none"
            style={{ touchAction: "none" }}
          >
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[2px] bg-white" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white text-black flex items-center justify-center shadow-xl text-lg">
              &harr;
            </div>
          </div>
        </div>

        {/* Pinned LTR so each label stays under its own side of the slider
            (the images don't mirror in Arabic). The side currently taking
            up more of the frame is highlighted. */}
        <div
          dir="ltr"
          className="flex justify-between mt-4 text-xs uppercase tracking-widest text-neutral-500"
        >
          <span className={pct >= 50 ? "text-white" : ""}>{content.beforeLabel}</span>
          <span className={pct < 50 ? "text-white" : ""}>{content.afterLabel}</span>
        </div>
      </div>
    </section>
  );
}
