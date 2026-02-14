/* ═══════════════════════════════════════════════════════
   <StaggerGroup />  — Animate each direct child in sequence
   ═══════════════════════════════════════════════════════ */

"use client";

import React, { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/animations/gsap-setup";
import { cn } from "@/lib/utils";

interface StaggerGroupProps {
  children: React.ReactNode;
  stagger?: number;
  duration?: number;
  delay?: number;
  className?: string;
}

export default function StaggerGroup({
  children,
  stagger = 0.12,
  duration = 0.7,
  delay = 0,
  className,
}: StaggerGroupProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const kids = el.children;
    if (!kids.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        kids,
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration,
          delay,
          ease: "power3.out",
          stagger,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
