/* ═══════════════════════════════════════════════════════
   Hero Section — Clean, professional government-style
   ═══════════════════════════════════════════════════════ */

"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "@/animations/gsap-setup";
import { HERO_STATS } from "@/constants";

const HERO_IMAGES = [
  "/hero/hero1.jpeg",
  "/hero/hero2.jpeg",
  "/hero/hero3.jpeg",
  "/hero/hero4.jpeg",
];

const SLIDE_INTERVAL = 5000;

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const topBarRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, SLIDE_INTERVAL);
    return () => clearInterval(timer);
  }, [nextSlide]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        delay: 0.15,
      });

      tl.fromTo(topBarRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 });
      tl.fromTo(headingRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, "-=0.2");
      tl.fromTo(subtitleRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.3");
      tl.fromTo(ctaRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, "-=0.2");
      tl.fromTo(
        statsRef.current?.children ?? [],
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 },
        "-=0.2"
      );
      if (imageRef.current) {
        tl.fromTo(
          imageRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8 },
          0.3
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-primary overflow-hidden"
    >
      {/* ── Top gold accent bar ── */}
      <div className="h-1 bg-gold-accent w-full" />

      {/* ── Main content area ── */}
      <div className="container-site py-20 pt-32 lg:pt-36 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">

          {/* ── Left: Text ── */}
          <div>
            <div
              ref={topBarRef}
              className="flex items-center gap-3 mb-6"
              style={{ opacity: 0 }}
            >
              <div className="w-10 h-[2px] bg-gold" />
              <span className="text-xs font-semibold text-gold tracking-[0.2em] uppercase">
                Admissions Open 2026–27
              </span>
            </div>

            <h1
              ref={headingRef}
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-heading font-bold text-white leading-tight mb-5"
              style={{ opacity: 0 }}
            >
              School of Defence<br />
              Technology &amp;&nbsp;Management
            </h1>

            <p
              ref={subtitleRef}
              className="text-base md:text-lg text-white/70 max-w-lg leading-relaxed mb-8"
              style={{ opacity: 0 }}
            >
              A premier institution dedicated to advancing defence education,
              cutting-edge research, and strategic leadership for national
              security.
            </p>

            <div
              ref={ctaRef}
              className="flex flex-wrap gap-3 mb-12"
              style={{ opacity: 0 }}
            >
              <Link
                href="/programs"
                className="inline-flex items-center justify-center bg-gold text-primary font-semibold text-sm px-7 py-3 rounded transition-colors hover:bg-gold-300"
              >
                Explore Programmes
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center border border-white/30 text-white font-semibold text-sm px-7 py-3 rounded transition-colors hover:bg-white/10"
              >
                Learn More
              </Link>
            </div>

            {/* Stats row */}
            <div
              ref={statsRef}
              className="flex gap-8 border-t border-white/10 pt-6"
            >
              {HERO_STATS.map((stat) => (
                <div key={stat.label} style={{ opacity: 0 }}>
                  <p className="text-2xl md:text-3xl font-heading font-bold text-gold leading-none">
                    {stat.value.toLocaleString()}
                    <span className="text-gold/60">{stat.suffix}</span>
                  </p>
                  <p className="text-[11px] md:text-xs text-white/50 mt-1 uppercase tracking-wide">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Image Slideshow ── */}
          <div
            ref={imageRef}
            className="hidden lg:block"
            style={{ opacity: 0 }}
          >
            <div className="relative">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
                {HERO_IMAGES.map((src, index) => (
                  <div
                    key={src}
                    className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
                    style={{ opacity: index === currentSlide ? 1 : 0 }}
                  >
                    <Image
                      src={src}
                      alt={`Campus view ${index + 1}`}
                      fill
                      className="object-cover"
                      priority={index === 0}
                      sizes="(max-width: 1024px) 0vw, 50vw"
                    />
                  </div>
                ))}
              </div>

              {/* Slide dots */}
              <div className="flex items-center justify-center gap-2 mt-4">
                {HERO_IMAGES.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? "w-6 h-1.5 bg-gold"
                        : "w-1.5 h-1.5 bg-white/25 hover:bg-white/40"
                    }`}
                    aria-label={`Slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom gold accent bar ── */}
      <div className="h-1 bg-gold-accent w-full" />
    </section>
  );
}
