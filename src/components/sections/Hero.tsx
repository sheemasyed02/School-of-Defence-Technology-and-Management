/* ═══════════════════════════════════════════════════════
   Hero Section — Full-viewport animated hero with image
   ═══════════════════════════════════════════════════════ */

"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap, ScrollTrigger } from "@/animations/gsap-setup";
import { HERO_STATS } from "@/constants";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const goldLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 0.2,
      });

      /* ── Badge entrance ── */
      tl.fromTo(
        badgeRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }
      );

      /* ── Gold accent line ── */
      tl.fromTo(
        goldLineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.5, ease: "power2.out" },
        "-=0.3"
      );

      /* ── Heading entrance ── */
      tl.fromTo(
        headingRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        "-=0.2"
      );

      /* ── Subtitle ── */
      tl.fromTo(
        subtitleRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.5"
      );

      /* ── CTA buttons ── */
      tl.fromTo(
        ctaRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        "-=0.4"
      );

      /* ── Stats stagger ── */
      tl.fromTo(
        statsRef.current?.children ?? [],
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.15 },
        "-=0.3"
      );

      /* ── Hero image — slides in from right ── */
      if (imageRef.current) {
        tl.fromTo(
          imageRef.current,
          { x: 80, opacity: 0, scale: 0.95 },
          { x: 0, opacity: 1, scale: 1, duration: 1.2, ease: "power2.out" },
          0.4
        );
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

      {/* ── Decorative glows ── */}
      <div className="absolute right-[5%] top-[15%] w-80 h-80 rounded-full bg-gold/8 blur-3xl pointer-events-none hidden lg:block" />
      <div className="absolute left-[5%] bottom-[10%] w-96 h-96 rounded-full bg-secondary/15 blur-3xl pointer-events-none" />

      {/* ── Content ── */}
      <div className="relative z-10 container-site pt-40 pb-20 lg:pt-48 lg:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* ── Left column: Text content ── */}
          <div>
            {/* Badge */}
            <div
              ref={badgeRef}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-8"
              style={{ opacity: 0 }}
            >
              <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
              <span className="text-xs font-semibold text-foreground-inverted/80 tracking-wider uppercase">
                Admissions Open 2026 - 27
              </span>
            </div>

            {/* Gold accent line */}
            <div
              ref={goldLineRef}
              className="w-16 h-1 bg-gold rounded-full mb-6 origin-left"
              style={{ transform: "scaleX(0)" }}
            />

            {/* Heading */}
            <h1
              ref={headingRef}
              className="text-4xl sm:text-5xl lg:text-display xl:text-display-xl font-heading font-bold text-foreground-inverted leading-[1.08] mb-6"
              style={{ opacity: 0 }}
            >
              School of Defence{" "}
              <span className="gradient-text">Technology</span>{" "}
              <br className="hidden md:block" />
              &amp; Management
            </h1>

            {/* Subtitle */}
            <p
              ref={subtitleRef}
              className="text-lg md:text-xl text-foreground-inverted/75 max-w-xl leading-relaxed mb-10"
              style={{ opacity: 0 }}
            >
              A premier institution dedicated to advancing defence education,
              cutting-edge research, and strategic leadership for national security.
            </p>

            {/* CTAs */}
            <div
              ref={ctaRef}
              className="flex flex-wrap gap-4 mb-14"
              style={{ opacity: 0 }}
            >
              <Link
                href="/programs"
                className="btn-primary text-base px-8 py-3.5"
              >
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
              className="grid grid-cols-3 gap-6 md:gap-10"
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

          {/* ── Right column: Hero image ── */}
          <div
            ref={imageRef}
            className="hidden lg:flex items-center justify-center"
            style={{ opacity: 0 }}
          >
            <div className="relative w-full max-w-lg">
              {/* Decorative border frame */}
              <div className="absolute -inset-3 rounded-2xl border-2 border-gold/20" />
              <div className="absolute -inset-6 rounded-3xl border border-white/5" />

              {/* Actual campus image */}
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-2xl">
                <Image
                  src="/defence1.png"
                  alt="School of Defence Technology and Management Campus"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 0vw, 50vw"
                />
                {/* Subtle gradient overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent" />

                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-gold/40 rounded-tl-xl" />
                <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-gold/40 rounded-br-xl" />
              </div>

              {/* Floating info card */}
              <div className="absolute -bottom-4 -left-4 bg-background-paper/95 backdrop-blur-md rounded-lg shadow-card px-5 py-3 border border-border-light">
                <p className="text-xs font-semibold text-primary">Established under DRDO</p>
                <p className="text-[10px] text-foreground-muted">Ministry of Defence, Government of India</p>
              </div>

              {/* Floating stat card */}
              <div className="absolute -top-3 -right-3 bg-gold/90 backdrop-blur-md rounded-lg shadow-card px-4 py-2.5">
                <p className="text-2xl font-heading font-bold text-primary leading-none">450+</p>
                <p className="text-[10px] font-semibold text-primary/70">Active Students</p>
              </div>
            </div>
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
