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

export function PageHeader({ title, subtitle, breadcrumb }: PageHeaderProps) {
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
      className="relative pt-20 pb-8 sm:pt-24 sm:pb-10 md:pt-28 md:pb-12 lg:pt-32 lg:pb-14 xl:pt-36 xl:pb-16 bg-primary overflow-hidden min-h-[35vh] sm:min-h-[40vh] flex items-center"
    >
      {/* background decoration */}
      <div className="absolute inset-0 bg-hero-radial opacity-50" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
          backgroundSize: "40px 40px sm:60px 60px",
        }}
      />

      <div className="container-site relative z-10 text-center w-full">
        {breadcrumb && (
          <p className="text-xs sm:text-sm uppercase tracking-[0.15em] sm:tracking-[0.25em] text-white/40 font-body mb-3 sm:mb-4 md:mb-6">
            <span className="inline-flex items-center gap-1 sm:gap-2">
              <span>Home</span>
              <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span>{breadcrumb}</span>
            </span>
          </p>
        )}
        <h1
          className="ph-title text-section sm:text-hero font-heading font-bold text-white mb-3 sm:mb-4 md:mb-6 lg:mb-8 leading-tight px-4 sm:px-0"
          style={{ opacity: 0 }}
        >
          {title}
        </h1>
        <div className="ph-line section-divider mx-auto mb-4 sm:mb-6 md:mb-8 origin-left" style={{ transform: "scaleX(0)" }} />
        {subtitle && (
          <p className="ph-sub text-body-lg text-white/70 max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-3xl mx-auto leading-relaxed px-4 sm:px-6 lg:px-0" style={{ opacity: 0 }}>
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
