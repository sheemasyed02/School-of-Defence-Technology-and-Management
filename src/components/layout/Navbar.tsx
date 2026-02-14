/* ═══════════════════════════════════════════════════════
   Navbar — Institutional top navigation
   ═══════════════════════════════════════════════════════ */

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { NAV_LINKS, SITE } from "@/constants";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  /* ── Track scroll for glass-morphism effect ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Lock body when mobile menu is open ── */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background-paper/95 backdrop-blur-md shadow-brand border-b border-border-light"
          : "bg-transparent"
      )}
    >
      {/* ── Top accent bar ── */}
      <div className="h-1 w-full bg-gold-accent" />

      <nav className="container-site flex items-center justify-between h-[var(--header-height)]">
        {/* ── Brand ── */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <div className="relative w-12 h-12 md:w-14 md:h-14">
            <Image
              src={SITE.logo}
              alt={`${SITE.shortName} Logo`}
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="hidden sm:block leading-tight">
            <span
              className={cn(
                "block text-sm md:text-base font-heading font-bold tracking-wide transition-colors",
                scrolled ? "text-primary" : "text-foreground-inverted"
              )}
            >
              {SITE.shortName}
            </span>
            <span
              className={cn(
                "block text-[10px] md:text-xs font-body transition-colors",
                scrolled ? "text-foreground-muted" : "text-foreground-inverted/70"
              )}
            >
              School of Defence Technology & Management
            </span>
          </div>
        </Link>

        {/* ── Desktop links ── */}
        <ul className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "px-4 py-2 rounded-brand text-sm font-semibold tracking-wide transition-all duration-200",
                  scrolled
                    ? "text-primary hover:bg-primary/5"
                    : "text-foreground-inverted/90 hover:text-foreground-inverted hover:bg-white/10"
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/admissions" className="btn-primary ml-2 text-sm py-2 px-5">
              Apply Now
            </Link>
          </li>
        </ul>

        {/* ── Mobile hamburger ── */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={cn(
            "lg:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-brand transition-colors",
            scrolled ? "text-primary" : "text-foreground-inverted"
          )}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
        >
          <span
            className={cn(
              "block h-0.5 w-6 rounded-full transition-all duration-300 bg-current",
              mobileOpen && "rotate-45 translate-y-2"
            )}
          />
          <span
            className={cn(
              "block h-0.5 w-6 rounded-full transition-all duration-300 bg-current",
              mobileOpen && "opacity-0"
            )}
          />
          <span
            className={cn(
              "block h-0.5 w-6 rounded-full transition-all duration-300 bg-current",
              mobileOpen && "-rotate-45 -translate-y-2"
            )}
          />
        </button>
      </nav>

      {/* ── Mobile menu overlay ── */}
      <div
        className={cn(
          "lg:hidden fixed inset-0 top-[calc(var(--header-height)+4px)] bg-background-paper z-40 transition-all duration-300",
          mobileOpen
            ? "opacity-100 pointer-events-auto translate-x-0"
            : "opacity-0 pointer-events-none translate-x-4"
        )}
      >
        <ul className="container-site flex flex-col gap-2 pt-8">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 text-lg font-heading font-semibold text-primary hover:bg-primary/5 rounded-brand transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li className="mt-4">
            <Link
              href="/admissions"
              onClick={() => setMobileOpen(false)}
              className="btn-primary w-full text-center"
            >
              Apply Now
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
