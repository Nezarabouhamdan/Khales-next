"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type LazyMountProps = {
  children: ReactNode;
  placeholder?: ReactNode;
  rootMargin?: string;
};

// Defers mounting expensive below-the-fold children (a WebGL scene with
// its own continuous render loop, say) until the viewport actually
// approaches them, rather than as soon as their JS chunk happens to be
// ready. Code-splitting alone (next/dynamic) only delays *fetching* the
// chunk - it still mounts, and starts running, immediately once resolved.
export default function LazyMount({ children, placeholder = null, rootMargin = "600px" }: LazyMountProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (visible || !ref.current) return;
    const el = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [visible, rootMargin]);

  return <div ref={ref}>{visible ? children : placeholder}</div>;
}
