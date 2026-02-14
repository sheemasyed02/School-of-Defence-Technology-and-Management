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
      <div className="container-site py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* ── Brand column ── */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              <div className="relative w-14 h-14">
                <Image
                  src={SITE.logo}
                  alt={`${SITE.name} Logo`}
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-sm font-heading font-bold text-foreground-inverted tracking-wide leading-tight max-w-[200px]">
                School of Defence Technology and Management
              </span>
            </Link>
            <p className="text-sm text-foreground-inverted/70 leading-relaxed mb-6 max-w-xs">
              {SITE.tagline}. Preparing tomorrow&apos;s leaders for national
              defence and strategic management.
            </p>
            <div className="flex items-center gap-4">
              <a
                href={SITE.socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold transition-colors duration-200"
                aria-label="Twitter"
              >
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
              </a>
              <a
                href={SITE.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
              </a>
              <a
                href={SITE.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold transition-colors duration-200"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
              </a>
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
              Community
            </h4>
            <ul className="space-y-3 mb-8">
              {FOOTER_LINKS.community.map((link) => (
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
