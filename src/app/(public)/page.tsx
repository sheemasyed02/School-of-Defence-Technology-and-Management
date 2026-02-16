/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   Home Page â€” Landing page
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */

import { Hero } from "@/components/sections";
import { AnimateIn, StaggerGroup } from "@/components/animation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

async function getAnnouncements() {
  const { data: scrolling } = await supabase
    .from("Announcement")
    .select("title")
    .eq("isVisible", true)
    .eq("isScrolling", true)
    .order("date", { ascending: false });

  const { data: latest } = await supabase
    .from("Announcement")
    .select("*")
    .eq("isVisible", true)
    .order("date", { ascending: false })
    .limit(3);

  return { scrolling: scrolling || [], latest: latest || [] };
}

export default async function HomePage() {
  const { scrolling, latest } = await getAnnouncements();

  const scrollingText = scrolling.length > 0
    ? scrolling.map(s => s.title)
    : [
        "Admissions Open for M.Tech & Ph.D. 2026-27",
        "National Conference on Defence Technology — March 2026",
        "100% Placement Record for 2025 Batch",
      ];

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString();
  };
  return (
    <>
      <Hero />

      {/* ── Scrolling Marquee ── */}
      <section className="bg-primary py-2 sm:py-3 md:py-4 overflow-hidden">
        <div className="relative flex">
          <div className="animate-marquee flex items-center gap-6 sm:gap-8 md:gap-10 whitespace-nowrap">
            {scrollingText.map((text, i) => (
              <span key={i} className="text-xs sm:text-sm md:text-base font-semibold text-white/90 tracking-wide flex items-center gap-1.5 sm:gap-2">
                {text}
                <span className="text-gold">•</span>
              </span>
            ))}
          </div>
          <div className="animate-marquee2 flex items-center gap-6 sm:gap-8 md:gap-10 whitespace-nowrap absolute top-0">
            {scrollingText.map((text, i) => (
              <span key={i} className="text-xs sm:text-sm md:text-base font-semibold text-white/90 tracking-wide flex items-center gap-1.5 sm:gap-2">
                {text}
                <span className="text-gold">•</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* â”€â”€ Mission & Vision â”€â”€ */}
      <section className="section-padding bg-background relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 dot-pattern opacity-40 rounded-full -translate-y-1/3 translate-x-1/4" />
        <div className="container-site relative z-10">
          <AnimateIn type="fadeUp" className="section-heading">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-gold mb-3">Who We Are</p>
            <h2 className="text-section">About Our Institution</h2>
            <div className="section-divider mx-auto mt-4" />
          </AnimateIn>

          <div className="grid-responsive-2">
            <AnimateIn type="slideLeft">
              <div className="group relative bg-background-paper rounded-brand shadow-brand border border-border-light p-6 sm:p-7 md:p-8 h-full transition-all duration-300 hover:shadow-brand-lg hover:-translate-y-1">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gold-accent rounded-t-brand" />
                <div className="flex items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-5">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors flex-shrink-0">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                    </svg>
                  </div>
                  <h3 className="text-card-title font-heading font-bold text-primary">Our Mission</h3>
                </div>
                <p className="text-body text-foreground-muted leading-relaxed">
                  To provide world-class education in technology management, fostering innovation,
                  research excellence, and industry collaboration to develop leaders who drive
                  technological advancement and sustainable business practices.
                </p>
              </div>
            </AnimateIn>
            <AnimateIn type="slideRight">
              <div className="group relative bg-background-paper rounded-brand shadow-brand border border-border-light p-6 sm:p-7 md:p-8 h-full transition-all duration-300 hover:shadow-brand-lg hover:-translate-y-1">
                <div className="absolute top-0 left-0 right-0 h-1 bg-accent rounded-t-brand" />
                <div className="flex items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-5">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors flex-shrink-0">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 className="text-card-title font-heading font-bold text-primary">Our Vision</h3>
                </div>
                <p className="text-body text-foreground-muted leading-relaxed">
                  To be a globally recognized center of excellence in technology management education
                  and research, shaping the future of technology-driven industries through innovative
                  pedagogy and cutting-edge research.
                </p>
              </div>
            </AnimateIn>
          </div>

          {/* Strengths cards */}
          <div className="mt-6 sm:mt-8 md:mt-10">
            <StaggerGroup className="grid-responsive-3">
              <div className="group text-center p-6 sm:p-7 md:p-8 rounded-2xl bg-gradient-to-br from-primary/[0.03] to-primary/[0.08] border border-primary/10 hover:border-primary/20 transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-5 md:mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342" />
                  </svg>
                </div>
                <h3 className="text-base sm:text-lg font-heading font-bold text-primary mb-2 sm:mb-3">Academic Excellence</h3>
                <p className="text-sm sm:text-base text-foreground-muted leading-relaxed">
                  Rigorous programmes in defence technology, strategic studies, and management curated by leading experts.
                </p>
              </div>

              <div className="group text-center p-6 sm:p-7 md:p-8 rounded-2xl bg-gradient-to-br from-gold/[0.03] to-gold/[0.08] border border-gold/10 hover:border-gold/20 transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-gold to-gold-500 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-5 md:mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                  </svg>
                </div>
                <h3 className="text-base sm:text-lg font-heading font-bold text-primary mb-2 sm:mb-3">Cutting-Edge Research</h3>
                <p className="text-sm sm:text-base text-foreground-muted leading-relaxed">
                  State-of-the-art laboratories and partnerships with defence organisations to drive innovation.
                </p>
              </div>

              <div className="group text-center p-6 sm:p-7 md:p-8 rounded-2xl bg-gradient-to-br from-accent/[0.03] to-accent/[0.08] border border-accent/10 hover:border-accent/20 transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-accent to-accent-600 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-5 md:mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                  </svg>
                </div>
                <h3 className="text-base sm:text-lg font-heading font-bold text-primary mb-2 sm:mb-3">National Security</h3>
                <p className="text-sm sm:text-base text-foreground-muted leading-relaxed">
                  Training future leaders with strategic thinking and technological proficiency for defence.
                </p>
              </div>
            </StaggerGroup>
          </div>
        </div>
      </section>

      {/* â”€â”€ Programs Highlight â”€â”€ */}
      <section className="section-padding bg-background-muted relative">
        <div className="absolute bottom-0 left-0 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 dot-pattern opacity-30 rounded-full translate-y-1/2 -translate-x-1/3" />
        <div className="container-site relative z-10">
          <AnimateIn type="fadeUp" className="section-heading">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-gold mb-3">What We Offer</p>
            <h2 className="text-section">Our Programs</h2>
            <div className="section-divider mx-auto mt-4 mb-4" />
            <p className="text-body">Comprehensive academic programs designed to equip students with domain expertise in defence technology and strategic management.</p>
          </AnimateIn>
          <StaggerGroup className="grid-responsive-4">
            {[
              { title: "M.Tech in Defence Technology", desc: "Advanced engineering program focused on weapons systems, radar, and electronic warfare.", num: "01" },
              { title: "MBA in Defence Management", desc: "Strategic management program for defence procurement, logistics, and policy.", num: "02" },
              { title: "Ph.D. Research Programs", desc: "Doctoral research in AI, cybersecurity, autonomous systems, and defence sciences.", num: "03" },
              { title: "Certificate Courses", desc: "Short-term professional development courses for serving officers and industry professionals.", num: "04" },
            ].map((p) => (
              <div key={p.title} className="group relative bg-background-paper rounded-brand shadow-brand border border-border-light p-4 sm:p-5 md:p-6 transition-all duration-300 hover:shadow-brand-lg hover:-translate-y-2 overflow-hidden">
                <span className="absolute top-3 right-3 sm:top-4 sm:right-4 text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-primary/[0.06] group-hover:text-gold/20 transition-colors duration-300">{p.num}</span>
                <div className="h-0.5 sm:h-1 w-8 sm:w-10 md:w-12 bg-gold-accent rounded-full mb-4 sm:mb-5 group-hover:w-full transition-all duration-500" />
                <h4 className="text-sm sm:text-base font-heading font-bold text-primary mb-2 sm:mb-3 relative z-10 leading-tight">{p.title}</h4>
                <p className="text-xs sm:text-sm text-foreground-muted leading-relaxed relative z-10">{p.desc}</p>
              </div>
            ))}
          </StaggerGroup>
          <AnimateIn type="fadeUp" className="text-center mt-6 sm:mt-8">
            <Link href="/programs" className="btn-primary px-6 sm:px-8">View All Programs</Link>
          </AnimateIn>
        </div>
      </section>

      {/* â”€â”€ Latest Announcements â”€â”€ */}
      <section className="section-padding bg-background">
        <div className="container-site">
          <AnimateIn type="fadeUp" className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-8 sm:mb-10 md:mb-12 gap-4">
            <div>
              <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-gold mb-3">Stay Updated</p>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-heading font-bold text-primary">Latest Announcements</h2>
              <div className="section-divider mt-4" />
            </div>
            <Link href="/announcements" className="inline-flex sm:hidden lg:inline-flex items-center gap-2 text-sm font-semibold text-gold hover:text-gold/80 transition-colors">
              View All
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
            </Link>
          </AnimateIn>
          <StaggerGroup className="space-y-3 sm:space-y-4">
            {latest.map((a) => (
              <div
                key={a.id}
                className="card-stripe pl-4 sm:pl-6 pr-4 sm:pr-6 py-4 sm:py-5 flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4"
              >
                <div className="sm:w-24 md:w-28 shrink-0 flex flex-col gap-1">
                  <span
                    className={`inline-block w-fit text-xs font-bold px-2 sm:px-3 py-1 rounded-full uppercase tracking-wide ${
                      a.priority === "IMPORTANT"
                        ? "bg-accent/10 text-accent"
                        : "bg-primary/10 text-primary"
                    }`}
                  >
                    {a.priority}
                  </span>
                  <p className="text-xs text-foreground-muted mt-1">{formatDate(a.date)}</p>
                </div>
                <div className="flex-1">
                  <h3 className="text-sm sm:text-base font-heading font-bold text-primary mb-1 sm:mb-2">{a.title}</h3>
                  <p className="text-xs sm:text-sm text-foreground-muted leading-relaxed">{a.body}</p>
                </div>
              </div>
            ))}
            {latest.length === 0 && (
                <p className="text-center text-foreground-muted py-10 font-bold">No recent announcements.</p>
            )}
          </StaggerGroup>
        </div>
      </section>

      {/* â”€â”€ Upcoming Events â”€â”€ */}
      <section className="section-padding bg-background-muted">
        <div className="container-site">
          <AnimateIn type="fadeUp" className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-8 sm:mb-10 md:mb-12 gap-4">
            <div>
              <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-gold mb-3">Mark Your Calendar</p>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-heading font-bold text-primary">Upcoming Events</h2>
              <div className="section-divider mt-4" />
            </div>
            <Link href="/events" className="inline-flex sm:hidden lg:inline-flex items-center gap-2 text-sm font-semibold text-gold hover:text-gold/80 transition-colors">
              View All
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
            </Link>
          </AnimateIn>
          <StaggerGroup className="grid-responsive-3 gap-6 sm:gap-8">
            {[
              {
                month: "MAR", day: "15",
                title: "Annual Tech Symposium 2026",
                venue: "Main Auditorium",
                desc: "Join us for our flagship annual technology symposium featuring keynote speakers from leading tech companies, research presentations, and networking opportunities.",
              },
              {
                month: "FEB", day: "28",
                title: "Workshop: Machine Learning Fundamentals",
                venue: "Computer Lab 3",
                desc: "A hands-on workshop covering the fundamentals of machine learning, including supervised and unsupervised learning techniques.",
              },
              {
                month: "MAR", day: "10",
                title: "Industry Panel Discussion",
                venue: "Conference Hall",
                desc: "Industry leaders discuss emerging trends in technology management and career opportunities for graduates.",
              },
            ].map((e) => (
              <div key={e.title} className="group bg-background-paper rounded-brand shadow-brand border border-border-light overflow-hidden transition-all duration-300 hover:shadow-brand-lg hover:-translate-y-1">
                <div className="bg-gradient-to-r from-primary to-secondary px-4 sm:px-5 md:px-6 py-3 sm:py-4 flex items-center gap-3 sm:gap-4">
                  <div className="text-center">
                    <p className="text-xl sm:text-2xl font-heading font-bold text-white leading-none">{e.day}</p>
                    <p className="text-xs font-bold text-gold tracking-wider">{e.month}</p>
                  </div>
                  <div className="w-px h-8 sm:h-10 bg-white/20" />
                  <p className="text-xs sm:text-sm text-white/80 font-medium">{e.venue}</p>
                </div>
                <div className="p-4 sm:p-5 md:p-6">
                  <h3 className="text-sm sm:text-base font-heading font-bold text-primary mb-2 sm:mb-3 leading-tight">{e.title}</h3>
                  <p className="text-xs sm:text-sm text-foreground-muted leading-relaxed">{e.desc}</p>
                </div>
              </div>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* â”€â”€ Placement Highlights â”€â”€ */}
      <section className="section-padding bg-background relative overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-30" />
        <div className="container-site relative z-10">
          <AnimateIn type="fadeUp" className="section-heading">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-gold mb-3">Our Track Record</p>
            <h2 className="text-section">Placement Highlights</h2>
            <div className="section-divider mx-auto mt-4 mb-3" />
            <p className="text-body text-foreground-muted">Academic Year 2025-26</p>
          </AnimateIn>
          <StaggerGroup className="grid-responsive-3 max-w-4xl mx-auto">
            {[
              { value: "142", label: "Students Placed", icon: "M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" },
              { value: "$125,000", label: "Highest Package", icon: "M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
              { value: "$68,000", label: "Average Package", icon: "M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" },
            ].map((s) => (
              <div key={s.label} className="group bg-background-paper rounded-2xl shadow-brand border border-border-light p-6 sm:p-7 md:p-8 text-center transition-all duration-300 hover:shadow-brand-lg hover:-translate-y-1">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary/5 rounded-xl flex items-center justify-center mx-auto mb-4 sm:mb-5 group-hover:bg-gold/10 transition-colors duration-300">
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 text-primary group-hover:text-gold transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={s.icon} />
                  </svg>
                </div>
                <p className="stat-number mb-2">{s.value}</p>
                <p className="text-xs sm:text-sm text-foreground-muted font-semibold uppercase tracking-wide">{s.label}</p>
              </div>
            ))}
          </StaggerGroup>
          <AnimateIn type="fadeUp" className="text-center mt-6 sm:mt-8">
            <Link href="/placements" className="btn-primary px-6 sm:px-8">View Detailed Statistics</Link>
          </AnimateIn>
        </div>
      </section>

      {/* â”€â”€ Quick Links â”€â”€ */}
      <section className="section-padding bg-background-muted">
        <div className="container-site">
          <AnimateIn type="fadeUp" className="section-heading">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-gold mb-3">Explore</p>
            <h2 className="text-section">Quick Links</h2>
            <div className="section-divider mx-auto mt-4" />
          </AnimateIn>
          <StaggerGroup className="grid-responsive-3 max-w-5xl mx-auto">
            <div className="group relative bg-background-paper rounded-2xl shadow-brand border border-border-light p-6 sm:p-7 md:p-8 text-center transition-all duration-300 hover:shadow-brand-lg hover:-translate-y-2 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] to-primary/[0.06] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-5 md:mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                  </svg>
                </div>
                <h4 className="text-base sm:text-lg font-heading font-bold text-primary mb-2">Student Corner</h4>
                <p className="text-xs sm:text-sm text-foreground-muted mb-4 sm:mb-6">Access study materials, forms, and resources</p>
                <Link href="/students" className="inline-flex items-center gap-2 text-sm font-semibold text-gold hover:text-gold/80 transition-colors">
                  Visit
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                </Link>
              </div>
            </div>

            <div className="group relative bg-background-paper rounded-2xl shadow-brand border border-border-light p-6 sm:p-7 md:p-8 text-center transition-all duration-300 hover:shadow-brand-lg hover:-translate-y-2 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-gold/[0.02] to-gold/[0.06] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-gold to-gold-500 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-5 md:mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                  </svg>
                </div>
                <h4 className="text-base sm:text-lg font-heading font-bold text-primary mb-2">Contact Us</h4>
                <p className="text-xs sm:text-sm text-foreground-muted mb-4 sm:mb-6">Get in touch with the department</p>
                <Link href="/contact" className="inline-flex items-center gap-2 text-sm font-semibold text-gold hover:text-gold/80 transition-colors">
                  Contact
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                </Link>
              </div>
            </div>

            <div className="group relative bg-background-paper rounded-2xl shadow-brand border border-border-light p-6 sm:p-7 md:p-8 text-center transition-all duration-300 hover:shadow-brand-lg hover:-translate-y-2 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.02] to-accent/[0.06] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-accent to-accent-600 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-5 md:mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342" />
                  </svg>
                </div>
                <h4 className="text-base sm:text-lg font-heading font-bold text-primary mb-2">Programs</h4>
                <p className="text-xs sm:text-sm text-foreground-muted mb-4 sm:mb-6">Explore our academic programs</p>
                <Link href="/programs" className="inline-flex items-center gap-2 text-sm font-semibold text-gold hover:text-gold/80 transition-colors">
                  Explore
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                </Link>
              </div>
            </div>
          </StaggerGroup>
        </div>
      </section>

      {/* â”€â”€ CTA Banner â”€â”€ */}
      <section className="py-10 sm:py-12 md:py-16 bg-primary">
        <div className="container-site text-center">
          <AnimateIn type="scaleIn">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-gold mb-4">Take The Next Step</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground-inverted mb-4 sm:mb-5 leading-tight">
              Ready to Shape the Future of Defence?
            </h2>
            <p className="text-foreground-inverted/70 max-w-sm sm:max-w-md md:max-w-xl mx-auto mb-8 sm:mb-10 text-sm sm:text-base md:text-lg leading-relaxed">
              Join a community of scholars, researchers, and leaders committed to national security and technological innovation.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <Link href="/programs" className="btn-accent text-sm sm:text-base px-8 sm:px-10 py-3 sm:py-4">Explore Programs</Link>
              <Link href="/contact" className="btn-secondary border-foreground-inverted/40 text-foreground-inverted hover:bg-gold hover:text-foreground-inverted hover:border-gold text-sm sm:text-base px-8 sm:px-10 py-3 sm:py-4">Get in Touch</Link>
            </div>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}
