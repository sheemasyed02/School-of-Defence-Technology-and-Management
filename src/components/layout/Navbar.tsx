/* ═══════════════════════════════════════════════════════
   Navbar — Institutional top navigation
   Responsive nav with 13 tabs, active state, no accent bar.
   ═══════════════════════════════════════════════════════ */

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { NAV_LINKS, SITE } from "@/constants";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background-paper/95 backdrop-blur-md shadow-brand"
          : "bg-primary/90 backdrop-blur-sm"
      )}
    >
      {/* ── Top row: Brand ── */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 flex items-center justify-between h-16 xl:h-[4.25rem]">
        {/* Brand — pushed to left edge */}
        <Link href="/" className="flex items-center gap-3 shrink-0 -ml-1">
          <div className="relative w-10 h-10 md:w-11 md:h-11">
            <Image
              src={SITE.logo}
              alt={`${SITE.name} Logo`}
              fill
              className="object-contain"
              priority
            />
          </div>
          <span
            className={cn(
              "font-heading font-bold tracking-wide transition-colors text-sm md:text-[15px] leading-tight max-w-[280px] md:max-w-none",
              scrolled ? "text-primary" : "text-white"
            )}
          >
            School of Defence Technology and Management
          </span>
        </Link>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={cn(
            "xl:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-brand transition-colors",
            scrolled ? "text-primary" : "text-white"
          )}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
        >
          <span className={cn("block h-0.5 w-6 rounded-full transition-all duration-300 bg-current", mobileOpen && "rotate-45 translate-y-2")} />
          <span className={cn("block h-0.5 w-6 rounded-full transition-all duration-300 bg-current", mobileOpen && "opacity-0")} />
          <span className={cn("block h-0.5 w-6 rounded-full transition-all duration-300 bg-current", mobileOpen && "-rotate-45 -translate-y-2")} />
        </button>
      </div>

      {/* ── Bottom row: Desktop nav ── */}
      <nav
        className={cn(
          "hidden xl:block border-t transition-colors",
          scrolled ? "border-border-light" : "border-white/10"
        )}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 flex items-center justify-center gap-0.5 h-10">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative px-2.5 py-1.5 text-[12.5px] font-semibold tracking-wide transition-all duration-200 rounded-brand whitespace-nowrap",
                scrolled
                  ? isActive(link.href)
                    ? "text-accent"
                    : "text-primary/70 hover:text-primary hover:bg-primary/5"
                  : isActive(link.href)
                  ? "text-gold"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              )}
            >
              {link.label}
              {isActive(link.href) && (
                <span
                  className={cn(
                    "absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-4/5 rounded-full",
                    scrolled ? "bg-accent" : "bg-gold"
                  )}
                />
              )}
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={cn(
          "xl:hidden fixed inset-0 top-16 bg-background-paper z-40 transition-all duration-300 overflow-y-auto",
          mobileOpen
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none -translate-y-3"
        )}
      >
        <nav className="container-site py-6">
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "flex items-center px-4 py-3 rounded-brand text-base font-semibold transition-colors",
                    isActive(link.href)
                      ? "bg-primary/5 text-accent"
                      : "text-primary hover:bg-primary/5"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
