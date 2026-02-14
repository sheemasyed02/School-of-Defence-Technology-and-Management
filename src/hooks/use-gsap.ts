/* ═══════════════════════════════════════════════════════
   useGSAP — Safe GSAP hook for Next.js App Router
   Creates a GSAP context scoped to a ref, automatically
   cleaned up on unmount.  Works with SSR (no-ops on server).
   ═══════════════════════════════════════════════════════ */

"use client";

import { useRef, useEffect, useCallback } from "react";
import { gsap, ScrollTrigger } from "@/animations/gsap-setup";

type GSAPCallback = (ctx: gsap.Context) => void;

export function useGSAP(callback: GSAPCallback, deps: unknown[] = []) {
  const scopeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scopeRef.current) return;

    const ctx = gsap.context(() => {
      callback(ctx as unknown as gsap.Context);
    }, scopeRef);

    return () => {
      ctx.revert();           // kills all tweens + ScrollTriggers in scope
      ScrollTrigger.refresh(); // recalculates remaining triggers
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return scopeRef;
}

/* ─── Simple intersection-based reveal (no GSAP overhead) ─── */
export function useRevealOnScroll(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("revealed");
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}
