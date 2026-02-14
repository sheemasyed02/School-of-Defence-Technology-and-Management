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

      {/* ── Mission & Vision ── */}
      <section className="section-padding bg-background">
        <div className="container-site">
          <AnimateIn type="fadeUp" className="section-heading">
            <div className="gold-bar mx-auto mb-4" />
            <h2>About Our Institution</h2>
          </AnimateIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <AnimateIn type="fadeUp">
              <div className="card h-full border-t-4 border-t-gold">
                <h3 className="text-xl font-heading font-bold text-primary mb-4">Our Mission</h3>
                <p className="text-sm text-foreground-muted leading-relaxed">
                  To provide world-class education in technology management, fostering innovation,
                  research excellence, and industry collaboration to develop leaders who drive
                  technological advancement and sustainable business practices.
                </p>
              </div>
            </AnimateIn>
            <AnimateIn type="fadeUp" delay={0.15}>
              <div className="card h-full border-t-4 border-t-accent">
                <h3 className="text-xl font-heading font-bold text-primary mb-4">Our Vision</h3>
                <p className="text-sm text-foreground-muted leading-relaxed">
                  To be a globally recognized center of excellence in technology management education
                  and research, shaping the future of technology-driven industries through innovative
                  pedagogy and cutting-edge research.
                </p>
              </div>
            </AnimateIn>
          </div>

          {/* Strengths cards */}
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

      {/* ── Latest Announcements ── */}
      <section className="section-padding bg-background">
        <div className="container-site">
          <AnimateIn type="fadeUp" className="flex items-center justify-between mb-10">
            <div>
              <div className="gold-bar mb-4" />
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary">Latest Announcements</h2>
            </div>
            <Link href="/announcements" className="text-sm font-semibold text-gold hover:text-gold/80 transition-colors whitespace-nowrap">
              View All
            </Link>
          </AnimateIn>
          <StaggerGroup className="space-y-4">
            {[
              {
                priority: "important",
                date: "2/1/2026",
                title: "Spring 2026 Admissions Open",
                body: "Applications are now open for Spring 2026 semester. Early bird deadline is March 15, 2026. Visit the admissions office for more details.",
              },
              {
                priority: "important",
                date: "2/10/2026",
                title: "Guest Lecture: AI in Business",
                body: "Join us for an insightful guest lecture by Dr. James Miller from Google AI on \"Transforming Business with Artificial Intelligence\" on February 20, 2026.",
              },
              {
                priority: "normal",
                date: "2/8/2026",
                title: "Research Paper Submission Deadline",
                body: "Students are reminded to submit their research papers for the annual conference by February 28, 2026. Guidelines are available on the student portal.",
              },
            ].map((a) => (
              <div
                key={a.title}
                className="card flex flex-col sm:flex-row sm:items-start gap-4 hover:shadow-card-hover transition-shadow duration-300"
              >
                <div className="sm:w-28 shrink-0">
                  <span
                    className={`inline-block text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wide ${
                      a.priority === "important"
                        ? "bg-accent/10 text-accent"
                        : "bg-primary/10 text-primary"
                    }`}
                  >
                    {a.priority}
                  </span>
                  <p className="text-xs text-foreground-muted mt-1">{a.date}</p>
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-heading font-bold text-primary mb-1">{a.title}</h3>
                  <p className="text-xs text-foreground-muted leading-relaxed">{a.body}</p>
                </div>
              </div>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* ── Upcoming Events ── */}
      <section className="section-padding bg-background-muted">
        <div className="container-site">
          <AnimateIn type="fadeUp" className="flex items-center justify-between mb-10">
            <div>
              <div className="gold-bar mb-4" />
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary">Upcoming Events</h2>
            </div>
            <Link href="/events" className="text-sm font-semibold text-gold hover:text-gold/80 transition-colors whitespace-nowrap">
              View All
            </Link>
          </AnimateIn>
          <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                date: "March 15, 2026",
                title: "Annual Tech Symposium 2026",
                venue: "Main Auditorium",
                desc: "Join us for our flagship annual technology symposium featuring keynote speakers from leading tech companies, research presentations, and networking opportunities.",
              },
              {
                date: "February 28, 2026",
                title: "Workshop: Machine Learning Fundamentals",
                venue: "Computer Lab 3",
                desc: "A hands-on workshop covering the fundamentals of machine learning, including supervised and unsupervised learning techniques.",
              },
              {
                date: "March 10, 2026",
                title: "Industry Panel Discussion",
                venue: "Conference Hall",
                desc: "Industry leaders discuss emerging trends in technology management and career opportunities for graduates.",
              },
            ].map((e) => (
              <div key={e.title} className="card group hover:-translate-y-1 transition-transform duration-300">
                <div className="flex items-center gap-2 mb-3">
                  <svg className="w-4 h-4 text-gold shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                  </svg>
                  <span className="text-xs font-semibold text-gold">{e.date}</span>
                </div>
                <h3 className="text-base font-heading font-bold text-primary mb-2">{e.title}</h3>
                <p className="text-xs text-foreground-muted mb-3 font-medium">{e.venue}</p>
                <p className="text-sm text-foreground-muted leading-relaxed">{e.desc}</p>
              </div>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* ── Placement Highlights ── */}
      <section className="section-padding bg-background">
        <div className="container-site">
          <AnimateIn type="fadeUp" className="section-heading">
            <div className="gold-bar mx-auto mb-4" />
            <h2>Placement Highlights</h2>
            <p className="text-foreground-muted">Academic Year 2025-26</p>
          </AnimateIn>
          <StaggerGroup className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10 max-w-3xl mx-auto">
            {[
              { value: "142", label: "Students Placed" },
              { value: "$125,000", label: "Highest Package" },
              { value: "$68,000", label: "Average Package" },
            ].map((s) => (
              <div key={s.label} className="card text-center py-8">
                <p className="text-3xl md:text-4xl font-heading font-bold text-gold mb-2">{s.value}</p>
                <p className="text-sm text-foreground-muted font-medium">{s.label}</p>
              </div>
            ))}
          </StaggerGroup>
          <AnimateIn type="fadeUp" className="text-center mt-8">
            <Link href="/placements" className="btn-primary">View Detailed Statistics</Link>
          </AnimateIn>
        </div>
      </section>

      {/* ── Quick Links ── */}
      <section className="section-padding bg-background-muted">
        <div className="container-site">
          <AnimateIn type="fadeUp" className="section-heading">
            <div className="gold-bar mx-auto mb-4" />
            <h2>Quick Links</h2>
          </AnimateIn>
          <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 max-w-4xl mx-auto">
            <div className="card group hover:-translate-y-1 transition-transform duration-300 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-gold/20 transition-colors">
                <svg className="w-6 h-6 text-primary group-hover:text-gold transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                </svg>
              </div>
              <h4 className="text-base font-heading font-bold text-primary mb-2">Student Corner</h4>
              <p className="text-sm text-foreground-muted mb-4">Access study materials, forms, and resources</p>
              <Link href="/students" className="text-sm font-semibold text-gold hover:text-gold/80 transition-colors">
                Visit
              </Link>
            </div>

            <div className="card group hover:-translate-y-1 transition-transform duration-300 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-gold/20 transition-colors">
                <svg className="w-6 h-6 text-primary group-hover:text-gold transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
              </div>
              <h4 className="text-base font-heading font-bold text-primary mb-2">Contact Us</h4>
              <p className="text-sm text-foreground-muted mb-4">Get in touch with the department</p>
              <Link href="/contact" className="text-sm font-semibold text-gold hover:text-gold/80 transition-colors">
                Contact
              </Link>
            </div>

            <div className="card group hover:-translate-y-1 transition-transform duration-300 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-gold/20 transition-colors">
                <svg className="w-6 h-6 text-primary group-hover:text-gold transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342" />
                </svg>
              </div>
              <h4 className="text-base font-heading font-bold text-primary mb-2">Programs</h4>
              <p className="text-sm text-foreground-muted mb-4">Explore our academic programs</p>
              <Link href="/programs" className="text-sm font-semibold text-gold hover:text-gold/80 transition-colors">
                Explore
              </Link>
            </div>
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
              <Link href="/contact" className="btn-secondary border-foreground-inverted/40 text-foreground-inverted hover:bg-gold hover:text-foreground-inverted hover:border-gold text-base px-8 py-3.5">Get in Touch</Link>
            </div>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}
