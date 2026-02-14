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
      {/* ── Top gold accent ── */}
      <div className="h-1 w-full bg-gold-accent" />

      <div className="container-site py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* ── Brand column ── */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              <div className="relative w-14 h-14">
                <Image
                  src={SITE.logo}
                  alt={`${SITE.shortName} Logo`}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="leading-tight">
                <span className="block text-base font-heading font-bold text-foreground-inverted tracking-wide">
                  {SITE.shortName}
                </span>
                <span className="block text-xs text-foreground-inverted/60">
                  Defence Education & Research
                </span>
              </div>
            </Link>
            <p className="text-sm text-foreground-inverted/70 leading-relaxed mb-6 max-w-xs">
              {SITE.tagline}. Preparing tomorrow&apos;s leaders for national
              defence and strategic management.
            </p>
            <div className="flex items-center gap-4">
              {Object.entries(SITE.socials).map(([platform, url]) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-sm hover:bg-gold transition-colors duration-200"
                  aria-label={platform}
                >
                  {platform[0].toUpperCase()}
                </a>
              ))}
            </div>
          </div>

          {/* ── Institution links ── */}
          <div>
            <h4 className="text-sm font-semibold text-gold uppercase tracking-widest mb-6 font-body">
              Institution
            </h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.institution.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-foreground-inverted/70 hover:text-gold transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Academics links ── */}
          <div>
            <h4 className="text-sm font-semibold text-gold uppercase tracking-widest mb-6 font-body">
              Academics
            </h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.academics.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-foreground-inverted/70 hover:text-gold transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Quick links + Contact ── */}
          <div>
            <h4 className="text-sm font-semibold text-gold uppercase tracking-widest mb-6 font-body">
              Quick Links
            </h4>
            <ul className="space-y-3 mb-8">
              {FOOTER_LINKS.quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-foreground-inverted/70 hover:text-gold transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="space-y-2 text-sm text-foreground-inverted/70">
              <p>{SITE.email}</p>
              <p>{SITE.phone}</p>
              <p>{SITE.address}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-white/10">
        <div className="container-site py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-foreground-inverted/50">
          <p>&copy; {currentYear} {SITE.name}. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-gold transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-gold transition-colors">
              Terms of Use
            </Link>
            <Link href="/sitemap" className="hover:text-gold transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
