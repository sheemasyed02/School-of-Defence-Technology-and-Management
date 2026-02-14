/* ═══════════════════════════════════════════════════════
   Hero Section — Full-viewport animated hero
   ═══════════════════════════════════════════════════════ */

"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap, ScrollTrigger } from "@/animations/gsap-setup";
import { SITE, HERO_STATS } from "@/constants";
import { cn } from "@/lib/utils";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const decorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      /* ── Stagger the entrance ── */
      tl.fromTo(
        headingRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 }
      )
        .fromTo(
          subtitleRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.5"
        )
        .fromTo(
          ctaRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          "-=0.4"
        )
        .fromTo(
          statsRef.current?.children ?? [],
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 },
          "-=0.3"
        );

      /* ── Floating decoration ── */
      if (decorRef.current) {
        gsap.to(decorRef.current, {
          y: -20,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      /* ── Parallax on scroll ── */
      gsap.to(section.querySelector(".hero-bg"), {
        yPercent: 25,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, section);

    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* ── Background layers ── */}
      <div className="hero-bg absolute inset-0 bg-hero-gradient" />
      <div className="absolute inset-0 bg-hero-radial" />

      {/* ── Grid pattern overlay ── */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* ── Decorative elements ── */}
      <div
        ref={decorRef}
        className="absolute right-[10%] top-[20%] w-72 h-72 rounded-full bg-gold/10 blur-3xl pointer-events-none hidden lg:block"
      />
      <div className="absolute left-[5%] bottom-[15%] w-96 h-96 rounded-full bg-secondary/20 blur-3xl pointer-events-none" />

      {/* ── Content ── */}
      <div className="relative z-10 container-site pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="max-w-4xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-8">
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
            <span className="text-xs font-semibold text-foreground-inverted/80 tracking-wider uppercase">
              Admissions Open 2026–27
            </span>
          </div>

          {/* Heading */}
          <h1
            ref={headingRef}
            className="text-4xl sm:text-5xl lg:text-display xl:text-display-xl font-heading font-bold text-foreground-inverted leading-[1.08] mb-6"
            style={{ opacity: 0 }}
          >
            Shaping the Future of{" "}
            <span className="gradient-text">Defence</span>{" "}
            <br className="hidden md:block" />
            Technology &amp; Management
          </h1>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="text-lg md:text-xl text-foreground-inverted/75 max-w-2xl leading-relaxed mb-10"
            style={{ opacity: 0 }}
          >
            {SITE.description}
          </p>

          {/* CTAs */}
          <div
            ref={ctaRef}
            className="flex flex-wrap gap-4 mb-16"
            style={{ opacity: 0 }}
          >
            <Link href="/programmes" className="btn-primary text-base px-8 py-3.5">
              Explore Programmes
            </Link>
            <Link
              href="/about"
              className="btn-secondary border-foreground-inverted/40 text-foreground-inverted hover:bg-foreground-inverted hover:text-primary text-base px-8 py-3.5"
            >
              Learn More
            </Link>
          </div>

          {/* Stats */}
          <div
            ref={statsRef}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10"
          >
            {HERO_STATS.map((stat) => (
              <div
                key={stat.label}
                className="text-center md:text-left"
                style={{ opacity: 0 }}
              >
                <div className="text-3xl md:text-4xl font-heading font-bold text-gold mb-1">
                  {stat.value.toLocaleString()}
                  <span className="text-gold/70">{stat.suffix}</span>
                </div>
                <div className="text-xs md:text-sm text-foreground-inverted/60 font-body">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-fade-in">
        <span className="text-[10px] text-foreground-inverted/40 uppercase tracking-widest font-body">
          Scroll
        </span>
        <div className="w-5 h-8 rounded-full border-2 border-foreground-inverted/30 flex justify-center pt-1.5">
          <div className="w-1 h-2 rounded-full bg-gold animate-bounce" />
        </div>
      </div>
    </section>
  );
}
