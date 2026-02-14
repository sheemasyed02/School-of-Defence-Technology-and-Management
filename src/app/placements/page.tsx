import { createMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/ui";
import { AnimateIn, StaggerGroup } from "@/components/animation";

export const metadata = createMetadata({
  title: "Placements",
  description: "Placement statistics and recruiting partners at the School of Defence Technology and Management — defence PSUs, armed forces, DRDO, and private sector.",
});

const RECRUITERS = [
  "DRDO", "HAL", "BEL", "BDL", "ISRO", "Indian Army", "Indian Navy", "Indian Air Force",
  "Tata Advanced Systems", "L&T Defence", "Bharat Dynamics", "Mahindra Defence",
  "Adani Defence", "Wipro Defence", "Infosys Defence", "Deloitte",
];

export default function PlacementsPage() {
  return (
    <>
      <PageHeader
        title="Placements"
        subtitle="Our graduates are recruited by India's top defence organizations, PSUs, and leading private sector companies."
        breadcrumb="Placements"
      />

      {/* Stats */}
      <section className="py-16 bg-primary">
        <div className="container-site">
          <StaggerGroup className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { val: "98%", label: "Placement Rate" },
              { val: "₹18 LPA", label: "Average CTC" },
              { val: "₹42 LPA", label: "Highest CTC" },
              { val: "60+", label: "Recruiting Organizations" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-3xl md:text-4xl font-heading font-bold text-gold mb-1">{s.val}</div>
                <div className="text-sm text-white/60">{s.label}</div>
              </div>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Placement Process */}
      <section className="section-padding bg-background">
        <div className="container-site">
          <AnimateIn type="fadeUp" className="section-heading">
            <div className="gold-bar mx-auto mb-4" />
            <h2>Placement Process</h2>
            <p>A structured, transparent process that connects students with the right career opportunities.</p>
          </AnimateIn>
          <StaggerGroup className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-10">
            {[
              { step: "01", title: "Pre-Placement Training", desc: "Aptitude, communication, and technical preparation sessions starting six months before placements." },
              { step: "02", title: "Company Registration", desc: "Organizations register with our placement cell, share job descriptions, and selection criteria." },
              { step: "03", title: "Campus Drives", desc: "On-campus and virtual recruitment drives including written tests, group discussions, and interviews." },
              { step: "04", title: "Offer & Onboarding", desc: "Selected students receive offer letters. Placement cell assists with onboarding and transition." },
            ].map((s) => (
              <div key={s.step} className="card text-center">
                <div className="text-3xl font-heading font-bold text-gold/30 mb-3">{s.step}</div>
                <h3 className="text-base font-heading font-bold text-primary mb-2">{s.title}</h3>
                <p className="text-sm text-foreground-muted leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Recruiters */}
      <section className="section-padding bg-background-muted">
        <div className="container-site">
          <AnimateIn type="fadeUp" className="section-heading">
            <div className="gold-bar mx-auto mb-4" />
            <h2>Our Recruiters</h2>
            <p>Trusted by India&apos;s most prestigious defence and technology organizations.</p>
          </AnimateIn>
          <StaggerGroup className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4 mt-10">
            {RECRUITERS.map((r) => (
              <div key={r} className="card flex items-center justify-center py-5 text-center hover:shadow-brand-lg transition-shadow">
                <span className="text-xs font-semibold text-primary/70">{r}</span>
              </div>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Sector Breakdown */}
      <section className="section-padding bg-background">
        <div className="container-site">
          <AnimateIn type="fadeUp" className="section-heading">
            <div className="gold-bar mx-auto mb-4" />
            <h2>Placement by Sector</h2>
          </AnimateIn>
          <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {[
              { sector: "Defence PSUs", pct: "35%" },
              { sector: "Armed Forces", pct: "25%" },
              { sector: "Private Defence Industry", pct: "22%" },
              { sector: "Research & Academia", pct: "18%" },
            ].map((s) => (
              <div key={s.sector} className="card text-center">
                <div className="text-4xl font-heading font-bold text-primary mb-2">{s.pct}</div>
                <div className="h-1.5 w-full bg-border-light rounded-full overflow-hidden mb-3">
                  <div className="h-full bg-gold rounded-full" style={{ width: s.pct }} />
                </div>
                <h3 className="text-sm font-semibold text-foreground-muted">{s.sector}</h3>
              </div>
            ))}
          </StaggerGroup>
        </div>
      </section>
    </>
  );
}
