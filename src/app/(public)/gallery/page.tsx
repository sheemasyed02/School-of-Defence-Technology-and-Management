"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "@/animations/gsap-setup";
import { supabase } from "@/lib/supabase";
import { Loader2 } from "lucide-react";

/* ── Helpers ── */

const extractYouTubeId = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

type Category = "all" | "EVENTS" | "LABS" | "VISITS" | "CAMPUS";

const CATEGORIES: { key: Category; label: string }[] = [
  { key: "all", label: "All" },
  { key: "EVENTS", label: "Events" },
  { key: "LABS", label: "Labs" },
  { key: "VISITS", label: "Visits" },
];

/* ── Page ── */

export default function GalleryPage() {
  const [active, setActive] = useState<Category>("all");
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const gridRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    async function fetchGallery() {
      try {
        const { data, error } = await supabase
          .from("Gallery")
          .select("*")
          .eq("isVisible", true)
          .order("date", { ascending: false });

        if (error) throw error;
        setItems(data || []);
      } catch (err) {
        console.error("Error fetching gallery:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchGallery();
  }, []);

  /* Hero entrance animation */
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

  /* Animate cards when filter changes or loading ends */
  useEffect(() => {
    if (loading) return;
    const el = gridRef.current;
    if (!el) return;
    const items = el.querySelectorAll(".gallery-item, .video-item");
    gsap.fromTo(items, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.45, stagger: 0.08, ease: "power2.out" });
  }, [active, loading]);

  const images = items.filter(i => i.type === 'image');
  const videos = items.filter(i => i.type === 'video');

  const filteredImages = active === "all" ? images : images.filter((p) => p.category === active);

  return (
    <>
      {/* ─── Hero ──────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative pt-28 pb-12 sm:pt-32 sm:pb-16 md:pt-40 md:pb-20 bg-primary overflow-hidden"
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
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold/90 mb-3">Home / Gallery</p>
          <h1 className="ph-title text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white">Gallery</h1>
          <div className="ph-line mx-auto mt-4 h-[3px] w-16 rounded-full bg-gradient-to-r from-gold to-gold-500 origin-center" />
          <p className="ph-sub mt-4 sm:mt-5 text-sm sm:text-base md:text-lg text-white/70 max-w-2xl mx-auto px-2">
            Explore moments from our events, state-of-the-art labs, and industrial visits.
          </p>
        </div>
      </section>

      {/* ─── Filter Tabs ────────────────────────────────── */}
      <section className="bg-background-paper border-b border-border-light sticky top-[56px] sm:top-[64px] md:top-[80px] xl:top-[128px] z-30">
        <div className="container-site">
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 py-3 sm:py-4 overflow-x-auto scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActive(cat.key)}
                className={`px-3 sm:px-5 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs font-semibold uppercase tracking-wider transition-all duration-300 whitespace-nowrap ${
                  active === cat.key
                    ? "bg-gradient-to-r from-gold to-gold-500 text-white shadow-md"
                    : "bg-background-muted text-foreground-muted hover:text-primary hover:bg-primary/5"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Photos Section ────────────────────────────── */}
      <section className="section-padding bg-background">
        <div className="container-site">
          <div className="section-heading">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-gold mb-3">Photos</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl">Campus Highlights</h2>
            <div className="section-divider mx-auto mt-4" />
          </div>

          <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {loading ? (
                <div className="col-span-full flex flex-col items-center justify-center py-20 gap-4">
                    <Loader2 className="w-10 h-10 text-gold animate-spin" />
                    <p className="text-foreground-muted animate-pulse">Loading gallery items...</p>
                </div>
            ) : (
                <>
                    {filteredImages.map((photo) => (
                        <div key={photo.id} className="gallery-item group">
                            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-brand border border-border-light transition-all duration-300 hover:shadow-brand-lg hover:-translate-y-1">
                            <Image
                                src={photo.url}
                                alt={photo.title || "Gallery Photo"}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                                <h3 className="text-sm font-heading font-bold text-white mb-1">{photo.title}</h3>
                                <span className="inline-block self-start rounded-full bg-gold/20 px-2.5 py-0.5 text-[10px] font-bold text-gold uppercase tracking-wider">
                                {photo.category}
                                </span>
                            </div>
                            </div>
                        </div>
                    ))}

                    {filteredImages.length === 0 && (
                    <div className="col-span-full text-center py-16 text-foreground-muted">
                        <svg className="w-12 h-12 mx-auto mb-4 text-border-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5a1.5 1.5 0 001.5-1.5V5.25a1.5 1.5 0 00-1.5-1.5H3.75a1.5 1.5 0 00-1.5 1.5v14.25a1.5 1.5 0 001.5 1.5z" />
                        </svg>
                        <p className="text-sm">No photos found in this category.</p>
                    </div>
                    )}
                </>
            )}
          </div>
        </div>
      </section>

      {/* ─── Videos Section ────────────────────────────── */}
      {videos.length > 0 && (
        <section className="section-padding bg-background-muted">
            <div className="container-site">
                <div className="section-heading">
                    <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-gold mb-3">Videos</p>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl">Watch & Learn</h2>
                    <div className="section-divider mx-auto mt-4" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 md:gap-8 max-w-5xl mx-auto">
                    {videos.map((video) => {
                        const embedId = extractYouTubeId(video.url);
                        if (!embedId) return null;

                        return (
                            <div
                                key={video.id}
                                className="video-item group bg-background-paper rounded-2xl shadow-brand border border-border-light overflow-hidden transition-all duration-300 hover:shadow-brand-lg hover:-translate-y-1"
                            >
                                <div className="relative aspect-video">
                                <iframe
                                    src={`https://www.youtube.com/embed/${embedId}`}
                                    title={video.title}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="absolute inset-0 w-full h-full"
                                />
                                </div>
                                <div className="p-4 sm:p-5 flex items-center gap-3">
                                <div className="w-9 h-9 rounded-lg bg-primary/5 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/10 transition-colors">
                                    <svg className="w-4 h-4 text-primary/50 group-hover:text-gold transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                                    </svg>
                                </div>
                                <h3 className="text-sm font-heading font-bold text-primary">{video.title}</h3>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
      )}
    </>
  );
}
