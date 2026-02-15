import { createMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/ui";
import { AnimateIn, StaggerGroup } from "@/components/animation";
import Link from "next/link";

export const metadata = createMetadata({
  title: "Programs",
  description: "Explore academic programs at the School of Defence Technology and Management — B.Tech, M.Tech, Ph.D. in technology management.",
});

const PROGRAMS = [
  {
    title: "B.Tech in Technology Management",
    duration: "4 Years (8 Semesters)",
    intake: "120 students per year",
    overview:
      "A comprehensive 4-year undergraduate program that combines technical knowledge with management skills, preparing students for leadership roles in technology-driven organizations.",
    eligibility: "10+2 with Mathematics and Physics",
    outcomes: [
      "Strong foundation in technology and management principles",
      "Ability to lead technology projects and teams",
      "Understanding of business strategy and operations",
      "Skills in data analysis and decision making",
      "Entrepreneurial mindset and innovation capabilities",
    ],
    color: "from-primary to-secondary",
    accent: "primary",
  },
  {
    title: "M.Tech in Technology Management",
    duration: "2 Years (4 Semesters)",
    intake: "30 students per year",
    overview:
      "A 2-year postgraduate program focusing on advanced technology management concepts, research methodologies, and specialized domains.",
    eligibility: "B.Tech/B.E. in relevant discipline with minimum 60% marks",
    outcomes: [
      "Advanced knowledge in technology management",
      "Research and analytical skills",
      "Specialization in chosen domain",
      "Industry-ready project management capabilities",
      "Publication and presentation skills",
    ],
    color: "from-gold to-gold-500",
    accent: "gold",
  },
  {
    title: "Ph.D. in Technology Management",
    duration: "3-5 Years",
    intake: "10 students per year",
    overview:
      "A research-focused doctoral program for candidates interested in contributing to the body of knowledge in technology management through original research.",
    eligibility: "M.Tech/M.E./MBA with minimum 60% marks and valid GATE/NET score",
    outcomes: [
      "Expertise in specialized research area",
      "Ability to conduct independent research",
      "Publication in top-tier journals",
      "Teaching and mentoring capabilities",
      "Contribution to academic and industry knowledge",
    ],
    color: "from-accent to-accent-600",
    accent: "accent",
  },
];

export default function ProgramsPage() {
  return (
    <>
      <PageHeader
        title="Academic Programs"
        subtitle="Discover our comprehensive programs designed to prepare you for leadership in technology-driven industries."
        breadcrumb="Programs"
      />

      {/* Programs overview stats */}
      <section className="py-10 bg-background-muted border-b border-border-light">
        <div className="container-site">
          <StaggerGroup className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
            {PROGRAMS.map((p) => (
              <div key={p.title} className="text-center">
                <p className="stat-number text-3xl mb-1">{p.intake.split(" ")[0]}</p>
                <p className="text-xs text-foreground-muted font-semibold uppercase tracking-wide">{p.title.split(" in ")[0]} Intake</p>
              </div>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Programs */}
      {PROGRAMS.map((prog, i) => (
        <section
          key={prog.title}
          className={`section-padding ${i % 2 === 0 ? "bg-background" : "bg-background-muted"} relative overflow-hidden`}
        >
          {i === 0 && <div className="absolute top-0 right-0 w-72 h-72 dot-pattern opacity-40 rounded-full -translate-y-1/3 translate-x-1/4" />}
          <div className="container-site max-w-5xl relative z-10">
            <AnimateIn type={i % 2 === 0 ? "slideLeft" : "slideRight"}>
              <div className="bg-background-paper rounded-2xl shadow-brand border border-border-light overflow-hidden transition-all duration-300 hover:shadow-brand-lg">
                {/* Gradient header */}
                <div className={`bg-gradient-to-r ${prog.color} px-8 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4`}>
                  <div>
                    <h2 className="text-xl md:text-2xl font-heading font-bold text-white">{prog.title}</h2>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <span className="inline-flex items-center gap-1.5 bg-white/15 text-white px-4 py-2 rounded-full text-xs font-semibold backdrop-blur-sm">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
                      {prog.duration}
                    </span>
                    <span className="inline-flex items-center gap-1.5 bg-white/15 text-white px-4 py-2 rounded-full text-xs font-semibold backdrop-blur-sm">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>
                      {prog.intake}
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-8 space-y-6">
                  {/* Overview */}
                  <div>
                    <h3 className="text-xs font-bold text-primary/50 uppercase tracking-wider mb-2">Program Overview</h3>
                    <p className="text-foreground-muted leading-relaxed">{prog.overview}</p>
                  </div>

                  {/* Eligibility */}
                  <div className="bg-background-muted rounded-xl p-5">
                    <h3 className="text-xs font-bold text-primary/50 uppercase tracking-wider mb-2">Eligibility Criteria</h3>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342" />
                        </svg>
                      </div>
                      <p className="text-sm text-foreground-muted font-medium">{prog.eligibility}</p>
                    </div>
                  </div>

                  {/* Learning Outcomes */}
                  <div>
                    <h3 className="text-xs font-bold text-primary/50 uppercase tracking-wider mb-3">Learning Outcomes</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {prog.outcomes.map((o) => (
                        <div key={o} className="flex items-start gap-3 bg-background-muted rounded-lg p-3.5">
                          <svg className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                          </svg>
                          <span className="text-sm text-foreground-muted">{o}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </AnimateIn>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="relative py-24 bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-hero-radial opacity-60" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.1) 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full border border-white/5" />
        <div className="absolute -bottom-32 -left-20 w-80 h-80 rounded-full border border-white/5" />
        <div className="container-site relative z-10 text-center">
          <AnimateIn type="scaleIn">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold mb-4">Start Your Journey</p>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-white mb-4">Interested in Our Programs?</h2>
            <p className="text-white/70 max-w-xl mx-auto mb-8 text-lg">Contact our admissions office for eligibility criteria, fee structure, and application deadlines.</p>
            <Link href="/contact" className="btn-accent px-10 py-4 text-base">Contact Admissions</Link>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}
