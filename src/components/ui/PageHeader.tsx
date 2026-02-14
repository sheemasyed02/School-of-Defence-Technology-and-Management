/* ═══════════════════════════════════════════════════════
   PageHeader — Reusable hero banner for inner pages
   ═══════════════════════════════════════════════════════ */

"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "@/animations/gsap-setup";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumb?: string;
}

export default function PageHeader({ title, subtitle, breadcrumb }: PageHeaderProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(el.querySelector(".ph-title"), { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 })
        .fromTo(el.querySelector(".ph-line"), { scaleX: 0 }, { scaleX: 1, duration: 0.6 }, "-=0.4")
        .fromTo(el.querySelector(".ph-sub"), { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.3");
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      className="relative pt-32 pb-16 md:pt-40 md:pb-20 bg-primary overflow-hidden"
    >
      {/* background decoration */}
      <div className="absolute inset-0 bg-hero-radial opacity-50" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container-site relative z-10 text-center">
        {breadcrumb && (
          <p className="text-xs uppercase tracking-[0.25em] text-white/40 font-body mb-4">
            Home &nbsp;/&nbsp; {breadcrumb}
          </p>
        )}
        <h1
          className="ph-title text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white mb-4"
          style={{ opacity: 0 }}
        >
          {title}
        </h1>
        <div className="ph-line h-1 w-16 bg-gold mx-auto rounded-full mb-4 origin-left" style={{ transform: "scaleX(0)" }} />
        {subtitle && (
          <p className="ph-sub text-base md:text-lg text-white/70 max-w-2xl mx-auto" style={{ opacity: 0 }}>
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
