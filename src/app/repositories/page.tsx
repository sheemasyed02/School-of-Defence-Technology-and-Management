import { createMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/ui";
import { AnimateIn, StaggerGroup } from "@/components/animation";

export const metadata = createMetadata({
  title: "Repositories",
  description: "Digital repositories — institutional publications, thesis archives, technical reports, and open-access resources.",
});

const REPOSITORIES = [
  {
    title: "Thesis & Dissertation Archive",
    desc: "Complete collection of M.Tech, MBA, M.Sc., and Ph.D. theses submitted by students, searchable by year, department, and topic.",
    count: "2,500+",
    type: "Academic",
  },
  {
    title: "Research Publication Database",
    desc: "Indexed repository of peer-reviewed journal papers, conference proceedings, and book chapters authored by our faculty and researchers.",
    count: "4,000+",
    type: "Research",
  },
  {
    title: "Technical Reports Collection",
    desc: "Internal and sponsored project technical reports, feasibility studies, and technology assessments (access-controlled).",
    count: "800+",
    type: "Technical",
  },
  {
    title: "Course Material Repository",
    desc: "Lecture notes, reference materials, lab manuals, and tutorials for all programs. Accessible to registered students.",
    count: "1,200+",
    type: "Educational",
  },
  {
    title: "Defence Policy Documents",
    desc: "Curated collection of national defence policies, white papers, doctrinal publications, and strategic reports.",
    count: "350+",
    type: "Policy",
  },
  {
    title: "Open Source Code Repository",
    desc: "Open-source software tools, simulation frameworks, and datasets developed at the institution for the research community.",
    count: "120+",
    type: "Software",
  },
];

export default function RepositoriesPage() {
  return (
    <>
      <PageHeader
        title="Repositories"
        subtitle="Access our comprehensive digital archives of academic research, publications, and institutional resources."
        breadcrumb="Repositories"
      />

      {/* Overview */}
      <section className="section-padding bg-background">
        <div className="container-site max-w-4xl">
          <AnimateIn type="fadeUp">
            <p className="text-lg text-foreground-muted leading-relaxed text-center">
              The School of Defence Technology and Management maintains a robust digital repository ecosystem to support academic research, institutional
              memory, and knowledge dissemination. Our repositories serve students, faculty, alumni, and
              authorized external researchers with access to a rich collection of scholarly and technical resources.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* Repository Cards */}
      <section className="section-padding bg-background-muted">
        <div className="container-site">
          <AnimateIn type="fadeUp" className="section-heading">
            <div className="gold-bar mx-auto mb-4" />
            <h2>Digital Collections</h2>
          </AnimateIn>
          <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {REPOSITORIES.map((r) => (
              <div key={r.title} className="card group hover:-translate-y-1 transition-transform duration-300">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-primary/10 text-primary">{r.type}</span>
                  <span className="text-lg font-heading font-bold text-gold">{r.count}</span>
                </div>
                <h3 className="text-base font-heading font-bold text-primary mb-2">{r.title}</h3>
                <p className="text-sm text-foreground-muted leading-relaxed">{r.desc}</p>
                <div className="mt-4 pt-4 border-t border-border-light">
                  <span className="text-xs text-accent font-semibold cursor-pointer hover:underline">
                    Browse Collection →
                  </span>
                </div>
              </div>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Access Info */}
      <section className="section-padding bg-background">
        <div className="container-site max-w-3xl">
          <AnimateIn type="fadeUp" className="section-heading">
            <div className="gold-bar mx-auto mb-4" />
            <h2>Access Information</h2>
          </AnimateIn>
          <AnimateIn type="fadeUp">
            <div className="card">
              <div className="space-y-4 text-sm text-foreground-muted leading-relaxed">
                <p>
                  <span className="font-semibold text-primary">Students & Faculty:</span> Full access to all repositories using your institutional login credentials. Access from campus network or through VPN for off-campus use.
                </p>
                <p>
                  <span className="font-semibold text-primary">Alumni:</span> Access to thesis archives, publication databases, and open-access resources through the alumni portal.
                </p>
                <p>
                  <span className="font-semibold text-primary">External Researchers:</span> Request access through the library&apos;s inter-institutional borrowing program. Open-access publications and datasets are freely available.
                </p>
                <p>
                  <span className="font-semibold text-primary">Classified Materials:</span> Access to restricted technical reports requires appropriate security clearance and approval from the Research Office.
                </p>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}
