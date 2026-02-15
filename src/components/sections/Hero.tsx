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
      className="relative bg-primary overflow-hidden min-h-screen sm:min-h-[80vh] md:min-h-[90vh] lg:min-h-screen flex items-center"
    >
      {/* ── Top gold accent bar ── */}
      <div className="h-0.5 bg-gold-accent w-full absolute top-0" />

      {/* ── Main content area ── */}
      <div className="container-site py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 pt-[72px] sm:pt-20 md:pt-28 lg:pt-32 xl:pt-36 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-8 sm:gap-10 md:gap-12 lg:gap-10 xl:gap-14 items-start">

          {/* ── Left: Text ── */}
          <div className="text-center lg:text-left">
            <div
              ref={topBarRef}
              className="flex items-center justify-center lg:justify-start gap-2 sm:gap-3 mb-4 sm:mb-5 md:mb-6"
              style={{ opacity: 0 }}
            >
              <div className="w-8 sm:w-10 md:w-12 h-[2px] bg-gold" />
              <span className="text-xs sm:text-sm md:text-base font-semibold text-gold tracking-[0.2em] uppercase">
                Admissions Open 2026–27
              </span>
            </div>

            <h1
              ref={headingRef}
              className="text-hero font-heading font-bold text-white leading-tight mb-4 sm:mb-5 md:mb-6 lg:mb-8"
              style={{ opacity: 0 }}
            >
              <span className="block">School of Defence</span>
              <span className="block">Technology &amp;&nbsp;Management</span>
            </h1>

            <p
              ref={subtitleRef}
              className="text-body text-white/70 max-w-md lg:max-w-lg xl:max-w-xl mx-auto lg:mx-0 leading-relaxed mb-6 sm:mb-7 md:mb-8 lg:mb-10"
              style={{ opacity: 0 }}
            >
              A premier institution dedicated to advancing defence education,
              cutting-edge research, and strategic leadership for national
              security.
            </p>

            <div
              ref={ctaRef}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start mb-8 sm:mb-10 md:mb-12 lg:mb-16"
              style={{ opacity: 0 }}
            >
              <Link
                href="/programs"
                className="btn-primary bg-gold hover:bg-gold-400 text-primary border-0 w-full sm:w-auto"
              >
                Explore Programmes
              </Link>
              <Link
                href="/about"
                className="btn-secondary border-white/30 text-white hover:bg-white/10 hover:border-white/50 w-full sm:w-auto"
              >
                Learn More
              </Link>
            </div>

            {/* Stats row */}
            <div
              ref={statsRef}
              className="grid grid-cols-2 sm:flex sm:justify-center lg:justify-start gap-4 sm:gap-6 md:gap-8 border-t border-white/10 pt-4 sm:pt-5 md:pt-6"
            >
              {HERO_STATS.map((stat) => (
                <div key={stat.label} className="text-center lg:text-left" style={{ opacity: 0 }}>
                  <p className="stat-number text-gold leading-none">
                    {stat.value.toLocaleString()}
                    <span className="text-gold/60">{stat.suffix}</span>
                  </p>
                  <p className="text-xs sm:text-sm text-white/50 mt-1 uppercase tracking-wide">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Image Slideshow ── */}
          <div
            ref={imageRef}
            className="-mt-2 lg:mt-[4.5rem] order-first lg:order-last"
            style={{ opacity: 0 }}
          >
            <div className="relative">
              <div className="relative aspect-[4/3] sm:aspect-[4/3] lg:aspect-[4/4] xl:aspect-[5/4] rounded-lg overflow-hidden shadow-lg sm:shadow-xl">
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
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 50vw"
                    />
                  </div>
                ))}
                
                {/* Mobile overlay for better text contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent lg:hidden" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom gold accent bar ── */}
      <div className="h-0.5 bg-gold-accent w-full absolute bottom-0" />
    </section>
  );
}
