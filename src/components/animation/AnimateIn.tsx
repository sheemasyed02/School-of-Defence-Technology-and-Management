/* ═══════════════════════════════════════════════════════
   <AnimateIn />  — Declarative scroll-reveal wrapper
   Wraps children and animates them into view on scroll.
   ═══════════════════════════════════════════════════════ */

"use client";

import React, { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/animations/gsap-setup";
import { cn } from "@/lib/utils";

type AnimationType = "fadeUp" | "fadeIn" | "slideLeft" | "slideRight" | "scaleIn";

interface AnimateInProps {
  children: React.ReactNode;
  type?: AnimationType;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

const FROM_VARS: Record<AnimationType, gsap.TweenVars> = {
  fadeUp:     { y: 48, opacity: 0 },
  fadeIn:     { opacity: 0 },
  slideLeft:  { x: -80, opacity: 0 },
  slideRight: { x: 80, opacity: 0 },
  scaleIn:    { scale: 0.85, opacity: 0 },
};

export default function AnimateIn({
  children,
  type = "fadeUp",
  delay = 0,
  duration = 0.8,
  className,
  once = true,
}: AnimateInProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(el, FROM_VARS[type], {
        y: 0,
        x: 0,
        scale: 1,
        opacity: 1,
        duration,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          toggleActions: once
            ? "play none none none"
            : "play reverse play reverse",
        },
      });
    });

    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={ref}
      className={cn("will-change-transform", className)}
    >
      {children}
    </div>
  );
}
