import { createMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/ui";
import { AnimateIn, StaggerGroup } from "@/components/animation";

export const metadata = createMetadata({
  title: "Research",
  description: "Research at the School of Defence Technology and Management — labs, focus areas, publications, and sponsored projects advancing defence technology.",
});

const LABS = [
  { name: "Advanced Robotics & Autonomous Systems Lab", focus: "UAVs, UGVs, swarm robotics, autonomous navigation", projects: 12 },
  { name: "Cybersecurity & Information Warfare Centre", focus: "Network defence, malware analysis, cyber threat intelligence", projects: 15 },
  { name: "Missile & Propulsion Research Lab", focus: "Solid and liquid propulsion, hypersonic vehicles, guidance systems", projects: 8 },
  { name: "AI & Machine Learning for Defence Lab", focus: "Computer vision, NLP for intelligence, predictive analytics", projects: 18 },
  { name: "Electronic Warfare & Radar Lab", focus: "EW systems, AESA radar, signal processing, spectrum management", projects: 10 },
  { name: "Materials & Structural Engineering Lab", focus: "Composite materials, armour technology, blast-resistant structures", projects: 7 },
  { name: "Naval Architecture & Maritime Technology Lab", focus: "Hull design, underwater acoustics, submarine systems", projects: 9 },
  { name: "Strategic & Policy Research Centre", focus: "Defence policy analysis, wargaming and simulation, nuclear studies", projects: 14 },
];

const PUBLICATIONS_RECENT = [
  { title: "Deep Reinforcement Learning for Autonomous UAV Swarm Coordination", journal: "IEEE Transactions on Aerospace", year: 2025 },
  { title: "Quantum-Resistant Cryptographic Protocols for Military Communications", journal: "Journal of Defence Science", year: 2025 },
  { title: "AI-Augmented Target Recognition in Cluttered Maritime Environments", journal: "Defence Technology", year: 2025 },
  { title: "Hypersonic Vehicle Thermal Protection: A Comprehensive Review", journal: "Progress in Aerospace Sciences", year: 2024 },
  { title: "Cyber Threat Intelligence Frameworks for National Security", journal: "Computers & Security", year: 2024 },
  { title: "Strategic Implications of Autonomous Weapons Systems", journal: "International Security", year: 2024 },
];

export default function ResearchPage() {
  return (
    <>
      <PageHeader
        title="Research"
        subtitle="Pioneering research across 40+ laboratories, advancing India's defence capabilities through innovation."
        breadcrumb="Research"
      />

      {/* Stats */}
      <section className="py-16 bg-primary">
        <div className="container-site">
          <StaggerGroup className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { val: "40+", label: "Research Labs" },
              { val: "₹120 Cr", label: "Annual Research Funding" },
              { val: "500+", label: "Publications (5 yrs)" },
              { val: "85+", label: "Sponsored Projects" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-3xl md:text-4xl font-heading font-bold text-gold mb-1">{s.val}</div>
                <div className="text-sm text-white/60">{s.label}</div>
              </div>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Research Labs */}
      <section className="section-padding bg-background">
        <div className="container-site">
          <AnimateIn type="fadeUp" className="section-heading">
            <div className="gold-bar mx-auto mb-4" />
            <h2>Research Laboratories</h2>
          </AnimateIn>
          <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            {LABS.map((lab) => (
              <div key={lab.name} className="card group hover:-translate-y-1 transition-transform duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-base font-heading font-bold text-primary mb-1">{lab.name}</h3>
                    <p className="text-sm text-foreground-muted mb-2">{lab.focus}</p>
                    <span className="text-xs text-accent font-semibold">{lab.projects} Active Projects</span>
                  </div>
                </div>
              </div>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Recent Publications */}
      <section className="section-padding bg-background-muted">
        <div className="container-site">
          <AnimateIn type="fadeUp" className="section-heading">
            <div className="gold-bar mx-auto mb-4" />
            <h2>Recent Publications</h2>
          </AnimateIn>
          <StaggerGroup className="space-y-4 mt-10 max-w-4xl mx-auto">
            {PUBLICATIONS_RECENT.map((p) => (
              <div key={p.title} className="card flex items-start gap-4">
                <div className="text-sm font-heading font-bold text-gold/50 mt-0.5 flex-shrink-0 w-12">{p.year}</div>
                <div>
                  <h3 className="text-base font-semibold text-primary mb-1">{p.title}</h3>
                  <p className="text-sm text-foreground-muted italic">{p.journal}</p>
                </div>
              </div>
            ))}
          </StaggerGroup>
        </div>
      </section>
    </>
  );
}
