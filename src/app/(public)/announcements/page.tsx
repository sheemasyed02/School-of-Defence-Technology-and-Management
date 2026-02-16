"use client";

import { useState, useRef, useEffect } from "react";
import { gsap } from "@/animations/gsap-setup";
import { supabase } from "@/lib/supabase";
import { Loader2 } from "lucide-react";

/* ── Helpers ──────────────────────────────────────────── */

function isExpired(dateStr: string | null) {
  if (!dateStr) return false;
  return new Date(dateStr) < new Date();
}

/* ── Page ─────────────────────────────────────────────── */

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [hideExpired, setHideExpired] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchAnnouncements() {
      try {
        const { data, error } = await supabase
          .from("Announcement")
          .select("*")
          .eq("isVisible", true)
          .order("date", { ascending: false });

        if (error) throw error;
        setAnnouncements(data || []);
      } catch (err) {
        console.error("Error fetching announcements:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchAnnouncements();
  }, []);

  /* Hero entrance */
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(el.querySelector(".ph-title"), { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 })
        .fromTo(el.querySelector(".ph-line"), { scaleX: 0 }, { scaleX: 1, duration: 0.6 }, "-=0.4")
        .fromTo(el.querySelector(".ph-sub"), { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.3");
    });
    return () => ctx.revert();
  }, []);

  /* Animate cards on filter change or load */
  useEffect(() => {
    if (loading) return;
    const el = listRef.current;
    if (!el) return;
    const items = el.querySelectorAll(".ann-card");
    gsap.fromTo(items, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.07, ease: "power2.out" });
  }, [hideExpired, loading]);

  const filtered = hideExpired
    ? announcements.filter((a) => !isExpired(a.expiresAt))
    : announcements;

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });
  };

  return (
    <>
      {/* ─── Hero ──────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative pt-32 pb-16 md:pt-40 md:pb-20 bg-primary overflow-hidden"
      >
        <div className="absolute inset-0 bg-hero-radial opacity-50" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="container-site relative z-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold/90 mb-3">Home / Announcements</p>
          <h1 className="ph-title text-3xl md:text-5xl font-heading font-bold text-white">Announcements</h1>
          <div className="ph-line mx-auto mt-4 h-[3px] w-16 rounded-full bg-gradient-to-r from-gold to-gold-500 origin-center" />
          <p className="ph-sub mt-5 text-base md:text-lg text-white/70 max-w-2xl mx-auto">
            Stay informed with the latest updates and important notices from the department.
          </p>
        </div>
      </section>

      {/* ─── Toggle Bar ────────────────────────────────── */}
      <section className="bg-background-paper border-b border-border-light">
        <div className="container-site py-4 flex items-center justify-between">
          <p className="text-sm text-foreground-muted">
            {loading ? (
                <span className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Fetching latest updates...
                </span>
            ) : (
                <>Showing <span className="font-semibold text-primary">{filtered.length}</span> announcement{filtered.length !== 1 ? "s" : ""}</>
            )}
          </p>
          <label className="flex items-center gap-3 cursor-pointer select-none">
            <span className="text-xs font-medium text-foreground-muted">Hide Expired</span>
            <button
              type="button"
              role="switch"
              aria-checked={hideExpired}
              onClick={() => setHideExpired((v) => !v)}
              className={`relative inline-flex h-6 w-11 shrink-0 rounded-full border-2 border-transparent transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 ${
                hideExpired ? "bg-gold" : "bg-border-light"
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-sm ring-0 transition-transform duration-300 ${
                  hideExpired ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </label>
        </div>
      </section>

      {/* ─── Announcements List ────────────────────────── */}
      <section className="section-padding bg-background">
        <div className="container-site">
          <div ref={listRef} className="max-w-4xl mx-auto space-y-5">
            {!loading && filtered.map((a) => {
              const expired = isExpired(a.expiresAt);
              const isImportant = a.priority === "IMPORTANT";
              return (
                <div
                  key={a.id}
                  className={`ann-card group bg-background-paper rounded-2xl shadow-brand border overflow-hidden transition-all duration-300 hover:shadow-brand-lg hover:-translate-y-0.5 ${
                    expired ? "border-border-light opacity-60" : "border-border-light"
                  }`}
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Priority stripe */}
                    <div
                      className={`md:w-1.5 h-1.5 md:h-auto shrink-0 ${
                        isImportant
                          ? "bg-gradient-to-b from-accent to-red-400"
                          : "bg-gradient-to-b from-gold to-gold-500"
                      }`}
                    />
                    <div className="p-6 flex-1">
                      {/* Top meta row */}
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                            isImportant
                              ? "bg-accent/10 text-accent"
                              : "bg-gold/10 text-gold"
                          }`}
                        >
                          {isImportant && (
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                            </svg>
                          )}
                          {a.priority}
                        </span>
                        <span className="text-xs text-foreground-muted">{formatDate(a.date)}</span>
                        {a.expiresAt && (
                            <span className="text-xs text-foreground-muted/60">
                                Expires: {new Date(a.expiresAt).toLocaleDateString()}
                            </span>
                        )}
                        {expired && (
                          <span className="inline-block rounded-full bg-red-100 text-red-600 px-2 py-0.5 text-[10px] font-bold uppercase">
                            Expired
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="text-base font-heading font-bold text-primary mb-2 group-hover:text-gold transition-colors duration-300">
                        {a.title}
                      </h3>

                      {/* Body */}
                      <p className="text-sm text-foreground-muted leading-relaxed">{a.body}</p>

                      {/* Attachment */}
                      {a.attachment_url && (
                        <div className="mt-4">
                          <a
                            href={a.attachment_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-xs font-semibold text-primary cursor-pointer hover:text-gold transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                            </svg>
                            Download Attachment
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {!loading && filtered.length === 0 && (
              <div className="text-center py-16 text-foreground-muted">
                <svg className="w-12 h-12 mx-auto mb-4 text-border-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                </svg>
                <p className="text-sm">No active announcements at this time.</p>
                <button
                  onClick={() => setHideExpired(false)}
                  className="mt-3 text-xs font-semibold text-gold hover:underline"
                >
                  Show all announcements
                </button>
              </div>
            )}

            {loading && (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                    <Loader2 className="w-8 h-8 text-gold animate-spin" />
                    <p className="text-foreground-muted animate-pulse">Loading announcements...</p>
                </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
