import { createMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/ui";
import { AnimateIn } from "@/components/animation";
import Link from "next/link";
import ProgramCard from "./ProgramCard";

export const metadata = createMetadata({
  title: "Programs",
  description: "Explore academic programs at the School of Defence Technology and Management — M.Tech and Ph.D. in technology management.",
});

const PROGRAMS = [
  {
    title: "M.Tech in Technology Management",
    duration: "2 Years (4 Semesters)",
    intake: "30 students per year",
    overview:
      "A 2-year postgraduate program focusing on advanced technology management concepts, research methodologies, and specialized domains.",
    eligibility: "B.Tech/B.E. in relevant discipline with minimum 60% marks",
    intakeCapacity: "30 students per year",
    outcomes: [
      "Advanced knowledge in technology management",
      "Research and analytical skills",
      "Specialization in chosen domain",
      "Industry-ready project management capabilities",
      "Publication and presentation skills",
    ],
    color: "from-gold to-gold-500",
    accent: "gold",
    semesters: [
      {
        name: "Semester 1",
        subjects: ["Advanced Technology Management", "Research Methodology", "Data Analytics", "Innovation Management", "Elective I"],
      },
      {
        name: "Semester 2",
        subjects: ["Strategic Management", "Project Management", "Supply Chain Management", "Elective II", "Seminar"],
      },
      {
        name: "Semester 3",
        subjects: ["Technology Forecasting", "Dissertation Phase I", "Elective III", "Industrial Training"],
      },
      {
        name: "Semester 4",
        subjects: ["Dissertation Phase II", "Comprehensive Viva"],
      },
    ],
  },
  {
    title: "Ph.D. in Technology Management",
    duration: "3-5 Years",
    intake: "10 students per year",
    overview:
      "A research-focused doctoral program for candidates interested in contributing to the body of knowledge in technology management through original research.",
    eligibility: "M.Tech/M.E./MBA with minimum 60% marks and valid GATE/NET score",
    intakeCapacity: "10 students per year",
    outcomes: [
      "Expertise in specialized research area",
      "Ability to conduct independent research",
      "Publication in top-tier journals",
      "Teaching and mentoring capabilities",
      "Contribution to academic and industry knowledge",
    ],
    color: "from-accent to-accent-600",
    accent: "accent",
    semesters: [
      {
        name: "Phase 1: Coursework",
        subjects: ["Advanced Research Methods", "Domain-Specific Elective I", "Domain-Specific Elective II", "Literature Review Seminar"],
      },
      {
        name: "Phase 2: Research",
        subjects: ["Research Proposal Defense", "Thesis Research", "Publication Requirement (Min. 2 papers)", "Progress Seminars"],
      },
      {
        name: "Phase 3: Submission",
        subjects: ["Thesis Writing", "Pre-Submission Seminar", "Final Thesis Defense", "Comprehensive Viva-Voce"],
      },
    ],
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
          <div className="grid grid-cols-2 gap-6 max-w-md mx-auto">
            {PROGRAMS.map((p) => (
              <div key={p.title} className="text-center">
                <p className="stat-number text-3xl mb-1">{p.intake.split(" ")[0]}</p>
                <p className="text-xs text-foreground-muted font-semibold uppercase tracking-wide">{p.title.split(" in ")[0]} Intake</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs */}
      {PROGRAMS.map((prog, i) => (
        <section
          key={prog.title}
          className={`section-padding ${i % 2 === 0 ? "bg-background" : "bg-background-muted"} relative overflow-hidden`}
        >
          <div className="container-site max-w-5xl relative z-10">
            <AnimateIn type={i % 2 === 0 ? "slideLeft" : "slideRight"}>
              <ProgramCard program={prog} />
            </AnimateIn>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="relative py-24 bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-hero-radial opacity-60" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.1) 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
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
