/* ═══════════════════════════════════════════════════════
   Footer — Institutional footer with multi-column links
   ═══════════════════════════════════════════════════════ */

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { SITE, FOOTER_LINKS } from "@/constants";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-foreground-inverted">
      <div className="container-site py-12 sm:py-14 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12">
          {/* ── Brand column ── */}
          <div className="lg:col-span-1 text-center sm:text-left">
            <Link href="/" className="inline-flex items-center gap-3 mb-4 sm:mb-5 md:mb-6 group">
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0">
                <Image
                  src={SITE.logo}
                  alt={`${SITE.name} Logo`}
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-sm sm:text-base font-heading font-bold text-foreground-inverted tracking-wide leading-tight max-w-[200px] sm:max-w-none">
                {SITE.name}
              </span>
            </Link>
            <p className="text-sm sm:text-base text-foreground-inverted/70 leading-relaxed mb-4 sm:mb-5 md:mb-6 max-w-sm mx-auto sm:mx-0">
              {SITE.tagline}. Preparing tomorrow&apos;s leaders for national
              defence and strategic management.
            </p>
            <div className="flex items-center justify-center sm:justify-start gap-3 sm:gap-4">
              <a
                href={SITE.socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold hover:scale-110 transition-all duration-200 touch-target"
                aria-label="Twitter"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
              </a>
              <a
                href={SITE.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold hover:scale-110 transition-all duration-200 touch-target"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
              </a>
              <a
                href={SITE.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold hover:scale-110 transition-all duration-200 touch-target"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
              </a>
            </div>
          </div>

          {/* ── Institution links ── */}
          <div className="text-center sm:text-left">
            <h4 className="text-sm sm:text-base font-semibold text-gold uppercase tracking-widest mb-4 sm:mb-5 md:mb-6 font-body">
              Institution
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              {FOOTER_LINKS.institution.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm sm:text-base text-foreground-inverted/70 hover:text-gold hover:translate-x-1 transition-all duration-200 block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Academics links ── */}
          <div className="text-center sm:text-left">
            <h4 className="text-sm sm:text-base font-semibold text-gold uppercase tracking-widest mb-4 sm:mb-5 md:mb-6 font-body">
              Academics
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              {FOOTER_LINKS.academics.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm sm:text-base text-foreground-inverted/70 hover:text-gold hover:translate-x-1 transition-all duration-200 block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Quick links + Contact ── */}
          <div className="text-center sm:text-left">
            <h4 className="text-sm sm:text-base font-semibold text-gold uppercase tracking-widest mb-4 sm:mb-5 md:mb-6 font-body">
              Community
            </h4>
            <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
              {FOOTER_LINKS.community.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm sm:text-base text-foreground-inverted/70 hover:text-gold hover:translate-x-1 transition-all duration-200 block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="space-y-2 text-sm sm:text-base text-foreground-inverted/70">
              <p className="flex items-center justify-center sm:justify-start gap-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="break-all">{SITE.email}</span>
              </p>
              <p className="flex items-center justify-center sm:justify-start gap-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>{SITE.phone}</span>
              </p>
              <p className="flex items-center justify-center sm:justify-start gap-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{SITE.address}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-white/10">
        <div className="container-site py-4 sm:py-5 md:py-6 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-xs sm:text-sm text-foreground-inverted/50">
          <p className="text-center sm:text-left">
            &copy; {currentYear} {SITE.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <Link href="/privacy" className="hover:text-gold transition-colors duration-200 whitespace-nowrap">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-gold transition-colors duration-200 whitespace-nowrap">
              Terms of Use
            </Link>
            <Link href="/sitemap" className="hover:text-gold transition-colors duration-200 whitespace-nowrap">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
