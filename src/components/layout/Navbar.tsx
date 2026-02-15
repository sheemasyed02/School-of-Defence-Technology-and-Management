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

  const mobileMenuRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    // Reset scroll position to top when menu opens
    if (mobileOpen && mobileMenuRef.current) {
      mobileMenuRef.current.scrollTop = 0;
    }
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
          ? "bg-white shadow-brand border-b border-border-light"
          : "bg-white shadow-sm"
      )}
    >
      {/* ── Top row: Centered Brand ── */}
      <div className="max-w-[1400px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8 flex items-center justify-center h-14 sm:h-16 md:h-20 xl:h-[5.5rem] relative">
        {/* Brand — centered */}
        <Link href="/" className="flex items-center gap-2 sm:gap-3 md:gap-4 shrink-0">
          <div className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex-shrink-0">
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
              "font-heading font-bold tracking-wide transition-colors text-sm md:text-lg lg:text-xl xl:text-2xl leading-tight text-primary hidden md:block"
            )}
          >
            School of Defence Technology and Management
          </span>
        </Link>

        {/* Mobile hamburger — absolute right */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={cn(
            "xl:hidden absolute right-3 sm:right-4 md:right-6 w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-brand transition-all duration-300 touch-target",
            "text-primary hover:bg-primary/5 active:bg-primary/10"
          )}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
        >
          <span className={cn("block h-0.5 w-5 rounded-full transition-all duration-300 bg-current", mobileOpen && "rotate-45 translate-y-2")} />
          <span className={cn("block h-0.5 w-5 rounded-full transition-all duration-300 bg-current", mobileOpen && "opacity-0")} />
          <span className={cn("block h-0.5 w-5 rounded-full transition-all duration-300 bg-current", mobileOpen && "-rotate-45 -translate-y-2")} />
        </button>
      </div>

      {/* ── Bottom row: Desktop nav ── */}
      <nav
        className={cn(
          "hidden xl:block border-t transition-colors bg-[#F2F3F6]",
          "border-border-light"
        )}
      >
        <div className="max-w-[1400px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12">
          <div className="flex items-center justify-center gap-0.5 h-10 overflow-x-auto scrollbar-hide">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative px-2 lg:px-2.5 xl:px-3 py-1.5 text-xs lg:text-sm font-semibold tracking-wide transition-all duration-200 rounded-brand whitespace-nowrap flex-shrink-0 touch-target",
                  isActive(link.href)
                    ? "text-gold bg-gold/5"
                    : "text-primary/70 hover:text-gold hover:bg-gold/5"
                )}
              >
                {link.label}
                {isActive(link.href) && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-4/5 rounded-full bg-gold" />
                )}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile backdrop overlay */}
      {mobileOpen && (
        <div
          className="xl:hidden fixed inset-0 top-14 sm:top-16 md:top-20 bg-black/30 backdrop-blur-sm z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile menu */}
      <div
        ref={mobileMenuRef}
        className={cn(
          "xl:hidden fixed left-0 right-0 top-14 sm:top-16 md:top-20 bottom-0 z-50 overflow-y-auto overscroll-contain transition-all duration-300",
          mobileOpen
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none -translate-y-3"
        )}
      >
        <nav className="bg-background-paper shadow-brand-lg mx-0">
          <div className="container-site py-3 sm:py-4 md:py-8">
            <ul className="space-y-0.5 sm:space-y-1">
              {NAV_LINKS.map((link, index) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "flex items-center px-3 sm:px-4 py-2.5 sm:py-3 rounded-brand text-sm sm:text-base font-semibold transition-all duration-200 touch-target group",
                      isActive(link.href)
                        ? "bg-gold/10 text-gold border-l-4 border-gold"
                        : "text-primary hover:text-gold hover:bg-gold/5 hover:border-l-4 hover:border-gold/30 border-l-4 border-transparent"
                    )}
                    style={{
                      animationDelay: `${index * 50}ms`
                    }}
                  >
                    <span className="flex-1">{link.label}</span>
                    {isActive(link.href) && (
                      <svg className="w-4 h-4 text-gold flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
            
            {/* Mobile menu footer */}
            <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-border-light">
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <Link
                  href="/contact"
                  className="btn-primary w-full sm:w-auto text-center text-sm py-2.5"
                >
                  Contact Us
                </Link>
                <Link
                  href="/programs"
                  className="btn-secondary w-full sm:w-auto text-center text-sm py-2.5"
                >
                  View Programs
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
