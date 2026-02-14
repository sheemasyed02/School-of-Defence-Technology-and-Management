/* ═══════════════════════════════════════════════════════
   Home Page — Landing page
   ═══════════════════════════════════════════════════════ */

import { Hero } from "@/components/sections";
import { AnimateIn, StaggerGroup } from "@/components/animation";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* ── About / Mission Preview ── */}
      <section className="section-padding bg-background">
        <div className="container-site">
          <AnimateIn type="fadeUp" className="section-heading">
            <div className="gold-bar mx-auto mb-4" />
            <h2>About Our Institution</h2>
            <p>
              The School of Defence Technology and Management is a centre of
              excellence committed to advancing defence education, applied
              research, and strategic leadership for national security.
            </p>
          </AnimateIn>

          <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="card text-center group">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-5 group-hover:bg-primary/20 transition-colors">
                <svg className="w-7 h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342" />
                </svg>
              </div>
              <h3 className="text-lg font-heading font-bold text-primary mb-3">Academic Excellence</h3>
              <p className="text-sm text-foreground-muted leading-relaxed">
                Rigorous programmes in defence technology, strategic studies, and management curated by leading experts.
              </p>
            </div>

            <div className="card text-center group">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-5 group-hover:bg-primary/20 transition-colors">
                <svg className="w-7 h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                </svg>
              </div>
              <h3 className="text-lg font-heading font-bold text-primary mb-3">Cutting-Edge Research</h3>
              <p className="text-sm text-foreground-muted leading-relaxed">
                State-of-the-art laboratories and partnerships with defence organisations to drive innovation.
              </p>
            </div>

            <div className="card text-center group">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-5 group-hover:bg-primary/20 transition-colors">
                <svg className="w-7 h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                </svg>
              </div>
              <h3 className="text-lg font-heading font-bold text-primary mb-3">National Security</h3>
              <p className="text-sm text-foreground-muted leading-relaxed">
                Training future leaders with strategic thinking and technological proficiency for defence.
              </p>
            </div>
          </StaggerGroup>
        </div>
      </section>

      {/* ── Programs Highlight ── */}
      <section className="section-padding bg-background-muted">
        <div className="container-site">
          <AnimateIn type="fadeUp" className="section-heading">
            <div className="gold-bar mx-auto mb-4" />
            <h2>Our Programs</h2>
            <p>Comprehensive academic programs designed to equip students with domain expertise in defence technology and strategic management.</p>
          </AnimateIn>
          <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {[
              { title: "M.Tech in Defence Technology", desc: "Advanced engineering program focused on weapons systems, radar, and electronic warfare." },
              { title: "MBA in Defence Management", desc: "Strategic management program for defence procurement, logistics, and policy." },
              { title: "Ph.D. Research Programs", desc: "Doctoral research in AI, cybersecurity, autonomous systems, and defence sciences." },
              { title: "Certificate Courses", desc: "Short-term professional development courses for serving officers and industry professionals." },
            ].map((p) => (
              <div key={p.title} className="card group hover:-translate-y-1 transition-transform duration-300">
                <div className="h-1 w-10 bg-gold rounded-full mb-4 group-hover:w-16 transition-all duration-300" />
                <h4 className="text-base font-heading font-bold text-primary mb-2">{p.title}</h4>
                <p className="text-sm text-foreground-muted leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </StaggerGroup>
          <AnimateIn type="fadeUp" className="text-center mt-10">
            <Link href="/programs" className="btn-primary">View All Programs</Link>
          </AnimateIn>
        </div>
      </section>

      {/* ── Quick Links Grid ── */}
      <section className="section-padding bg-background">
        <div className="container-site">
          <AnimateIn type="fadeUp" className="section-heading">
            <div className="gold-bar mx-auto mb-4" />
            <h2>Explore SDTM</h2>
          </AnimateIn>
          <StaggerGroup className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10">
            {[
              { label: "Faculty", href: "/faculty", icon: "M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" },
              { label: "Research", href: "/research", icon: "M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" },
              { label: "Students", href: "/students", icon: "M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" },
              { label: "Alumni", href: "/alumni", icon: "M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342" },
              { label: "Placements", href: "/placements", icon: "M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0" },
              { label: "Events", href: "/events", icon: "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" },
              { label: "Gallery", href: "/gallery", icon: "m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm12.75-11.25h.008v.008h-.008V8.25Z" },
              { label: "Contact", href: "/contact", icon: "M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="card flex flex-col items-center text-center py-8 group hover:-translate-y-1 transition-transform duration-300"
              >
                <svg className="w-8 h-8 text-primary/70 mb-3 group-hover:text-accent transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                </svg>
                <span className="text-sm font-semibold text-primary">{item.label}</span>
              </Link>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="relative py-20 bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-hero-radial opacity-60" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.1) 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="container-site relative z-10 text-center">
          <AnimateIn type="fadeUp">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground-inverted mb-4">
              Ready to Shape the Future of Defence?
            </h2>
            <p className="text-foreground-inverted/70 max-w-xl mx-auto mb-8 text-lg">
              Join a community of scholars, researchers, and leaders committed to national security and technological innovation.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Link href="/programs" className="btn-accent text-base px-8 py-3.5">Explore Programs</Link>
              <Link href="/contact" className="btn-secondary border-foreground-inverted/40 text-foreground-inverted hover:bg-foreground-inverted hover:text-primary text-base px-8 py-3.5">Get in Touch</Link>
            </div>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}
