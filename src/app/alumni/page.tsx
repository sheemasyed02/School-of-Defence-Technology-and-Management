import { createMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/ui";
import { AnimateIn, StaggerGroup } from "@/components/animation";

export const metadata = createMetadata({
  title: "Alumni",
  description: "SDTM alumni network — distinguished graduates serving in armed forces, DRDO, defence industry, and public policy.",
});

const NOTABLE_ALUMNI = [
  { name: "Brig. Deepak Kumar (Retd.)", batch: "1998", role: "Director, Defence R&D Lab", note: "Led the development of next-gen surveillance systems for border security." },
  { name: "Dr. Ananya Sharma", batch: "2004", role: "Chief Scientist, DRDO", note: "Pioneer in AI-based target recognition systems, recipient of DRDO Technology Award." },
  { name: "Col. Rahul Verma", batch: "2006", role: "Cyber Command, Indian Army", note: "Established India's first military cyber operations training centre." },
  { name: "Ms. Priyanka Das", batch: "2010", role: "VP Engineering, Defence PSU", note: "Leading unmanned aerial vehicle programs for the Indian Navy." },
  { name: "Dr. Sameer Joshi", batch: "2008", role: "Faculty, IIT Delhi", note: "Research on hypersonic propulsion systems with 60+ international publications." },
  { name: "Cdr. Neha Singh", batch: "2012", role: "Naval Architect, Indian Navy", note: "Part of the team designing India's next aircraft carrier." },
];

export default function AlumniPage() {
  return (
    <>
      <PageHeader
        title="Alumni Network"
        subtitle="Our graduates serve with distinction across defence, government, industry, and academia worldwide."
        breadcrumb="Alumni"
      />

      {/* Network Stats */}
      <section className="py-16 bg-primary">
        <div className="container-site">
          <StaggerGroup className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { val: "5,000+", label: "Alumni Worldwide" },
              { val: "35+", label: "Countries Represented" },
              { val: "12", label: "Alumni Chapters" },
              { val: "92%", label: "Industry Placement Rate" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-3xl md:text-4xl font-heading font-bold text-gold mb-1">{s.val}</div>
                <div className="text-sm text-white/60">{s.label}</div>
              </div>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Notable Alumni */}
      <section className="section-padding bg-background">
        <div className="container-site">
          <AnimateIn type="fadeUp" className="section-heading">
            <div className="gold-bar mx-auto mb-4" />
            <h2>Notable Alumni</h2>
            <p>Graduates who have made a significant impact in defence, science, and national security.</p>
          </AnimateIn>
          <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {NOTABLE_ALUMNI.map((a) => (
              <div key={a.name} className="card group hover:-translate-y-1 transition-transform duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-lg font-heading font-bold text-primary/40">{a.name[0]}</span>
                  </div>
                  <div>
                    <h3 className="text-base font-heading font-bold text-primary">{a.name}</h3>
                    <p className="text-xs text-accent font-semibold">{a.role}</p>
                  </div>
                </div>
                <p className="text-sm text-foreground-muted leading-relaxed mb-2">{a.note}</p>
                <p className="text-xs text-foreground-light">Class of {a.batch}</p>
              </div>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Alumni Services */}
      <section className="section-padding bg-background-muted">
        <div className="container-site">
          <AnimateIn type="fadeUp" className="section-heading">
            <div className="gold-bar mx-auto mb-4" />
            <h2>Alumni Services</h2>
          </AnimateIn>
          <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {[
              { title: "Alumni Portal", desc: "Access the exclusive online portal to connect with batchmates, find mentors, and stay updated on institute happenings." },
              { title: "Annual Reunion", desc: "Join fellow alumni for the annual homecoming celebration featuring panels, networking, and cultural events." },
              { title: "Mentorship Program", desc: "Give back by mentoring current students through career guidance, industry insights, and research collaboration." },
              { title: "Newsletter", desc: "Monthly alumni newsletter covering achievements, opportunities, and institutional developments." },
              { title: "Continuing Education", desc: "Exclusive access to executive programs, workshops, and online courses at preferential rates." },
              { title: "Alumni Association", desc: "Active chapters across major cities facilitating professional networking and community events." },
            ].map((s) => (
              <div key={s.title} className="card">
                <div className="h-1 w-10 bg-gold rounded-full mb-4" />
                <h3 className="text-base font-heading font-bold text-primary mb-2">{s.title}</h3>
                <p className="text-sm text-foreground-muted leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </StaggerGroup>
        </div>
      </section>
    </>
  );
}
