import { createMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/ui";
import { AnimateIn, StaggerGroup } from "@/components/animation";

export const metadata = createMetadata({
  title: "Faculty",
  description: "Meet our distinguished faculty — experts in defence technology, strategic studies, cybersecurity, and management.",
});

const DEPARTMENTS = [
  "Defence Technology",
  "Strategic Studies",
  "Cybersecurity & AI",
  "Defence Management",
  "Weapons Systems",
  "Electronic Warfare",
];

const FACULTY = [
  { name: "Prof. Rajiv Menon", dept: "Defence Technology", designation: "Professor & Head", specialization: "Missile Guidance Systems, Control Engineering", publications: 85 },
  { name: "Dr. Sunita Krishnan", dept: "Cybersecurity & AI", designation: "Associate Professor", specialization: "Network Security, Machine Learning in Defence", publications: 62 },
  { name: "Prof. Anil Deshpande", dept: "Strategic Studies", designation: "Professor", specialization: "Nuclear Strategy, Defence Policy", publications: 110 },
  { name: "Dr. Kavita Rao", dept: "Defence Management", designation: "Assistant Professor", specialization: "Defence Procurement, Supply Chain", publications: 38 },
  { name: "Prof. Vikram Singh", dept: "Weapons Systems", designation: "Professor & Head", specialization: "Ballistics, Armament Technology", publications: 95 },
  { name: "Dr. Priya Nair", dept: "Electronic Warfare", designation: "Associate Professor", specialization: "Radar Systems, Signal Processing", publications: 54 },
  { name: "Prof. Sanjay Gupta", dept: "Cybersecurity & AI", designation: "Professor", specialization: "Autonomous Systems, Deep Learning", publications: 78 },
  { name: "Dr. Arjun Reddy", dept: "Defence Technology", designation: "Assistant Professor", specialization: "UAV Design, Aerospace Structures", publications: 42 },
  { name: "Prof. Lakshmi Iyer", dept: "Strategic Studies", designation: "Professor", specialization: "Indo-Pacific Security, Maritime Strategy", publications: 88 },
];

export default function FacultyPage() {
  return (
    <>
      <PageHeader
        title="Our Faculty"
        subtitle="Distinguished academicians and defence scientists driving excellence in education and research."
        breadcrumb="Faculty"
      />

      {/* Departments */}
      <section className="section-padding bg-background">
        <div className="container-site">
          <AnimateIn type="fadeUp" className="section-heading">
            <div className="gold-bar mx-auto mb-4" />
            <h2>Departments</h2>
          </AnimateIn>
          <StaggerGroup className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-8">
            {DEPARTMENTS.map((dept) => (
              <div key={dept} className="card text-center py-6 hover:-translate-y-1 transition-transform duration-300">
                <div className="w-10 h-10 rounded-full bg-primary/10 mx-auto mb-3 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 bg-gold rounded-full" />
                </div>
                <h3 className="text-sm font-semibold text-primary">{dept}</h3>
              </div>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Faculty Grid */}
      <section className="section-padding bg-background-muted">
        <div className="container-site">
          <AnimateIn type="fadeUp" className="section-heading">
            <div className="gold-bar mx-auto mb-4" />
            <h2>Faculty Members</h2>
            <p>Our faculty brings a wealth of experience from academia, DRDO, armed forces, and industry.</p>
          </AnimateIn>
          <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {FACULTY.map((f) => (
              <div key={f.name} className="card group hover:-translate-y-1 transition-transform duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center">
                    <span className="text-lg font-heading font-bold text-primary/40">{f.name.split(" ").map(n => n[0]).join("").slice(0, 2)}</span>
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base font-heading font-bold text-primary mb-0.5 truncate">{f.name}</h3>
                    <p className="text-xs text-accent font-semibold mb-1">{f.designation}</p>
                    <p className="text-xs text-foreground-light">{f.dept}</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-border-light">
                  <p className="text-sm text-foreground-muted mb-2">
                    <span className="font-semibold text-primary/80">Specialization:</span> {f.specialization}
                  </p>
                  <p className="text-xs text-foreground-light">{f.publications} Publications</p>
                </div>
              </div>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-primary">
        <div className="container-site">
          <StaggerGroup className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { val: "150+", label: "Faculty Members" },
              { val: "40+", label: "Ph.D. Holders" },
              { val: "2000+", label: "Research Papers" },
              { val: "6", label: "Departments" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-3xl md:text-4xl font-heading font-bold text-gold mb-1">{s.val}</div>
                <div className="text-sm text-white/60">{s.label}</div>
              </div>
            ))}
          </StaggerGroup>
        </div>
      </section>
    </>
  );
}
