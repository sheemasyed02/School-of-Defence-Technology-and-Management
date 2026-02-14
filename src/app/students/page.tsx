import { createMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/ui";
import { AnimateIn, StaggerGroup } from "@/components/animation";

export const metadata = createMetadata({
  title: "Students",
  description: "Student life at the School of Defence Technology and Management — campus facilities, clubs, resources, and support services for a holistic learning experience.",
});

export default function StudentsPage() {
  return (
    <>
      <PageHeader
        title="Student Life"
        subtitle="A vibrant campus experience that nurtures academic excellence, leadership, and camaraderie."
        breadcrumb="Students"
      />

      {/* Overview */}
      <section className="section-padding bg-background">
        <div className="container-site max-w-4xl">
          <AnimateIn type="fadeUp">
            <p className="text-lg text-foreground-muted leading-relaxed text-center">
              At the School of Defence Technology and Management, student life extends far beyond the classroom. Our campus provides a holistic environment that encourages intellectual curiosity, physical fitness, leadership development, and community engagement. Students benefit from world-class facilities, mentorship programs, and a close-knit peer community drawn from diverse backgrounds across India.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* Facilities */}
      <section className="section-padding bg-background-muted">
        <div className="container-site">
          <AnimateIn type="fadeUp" className="section-heading">
            <div className="gold-bar mx-auto mb-4" />
            <h2>Campus Facilities</h2>
          </AnimateIn>
          <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {[
              { title: "Central Library", desc: "Over 50,000 volumes, extensive digital database access, e-journals, and dedicated research reading rooms." },
              { title: "Research Laboratories", desc: "40+ state-of-the-art labs for cybersecurity, robotics, signal processing, materials testing, and simulation." },
              { title: "Computing Centre", desc: "High-performance computing clusters, GPU workstations, and 24/7 access for research and coursework." },
              { title: "Sports Complex", desc: "Multi-sport facilities including gymnasium, swimming pool, athletics track, and courts for team sports." },
              { title: "Student Hostels", desc: "Modern residential blocks with single and shared rooms, common areas, Wi-Fi, and mess facilities." },
              { title: "Auditorium & Seminar Halls", desc: "A 1,000-seat auditorium and multiple seminar halls equipped with AV systems for lectures and events." },
            ].map((f) => (
              <div key={f.title} className="card hover:-translate-y-1 transition-transform duration-300">
                <div className="h-1 w-10 bg-gold rounded-full mb-4" />
                <h3 className="text-base font-heading font-bold text-primary mb-2">{f.title}</h3>
                <p className="text-sm text-foreground-muted leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Student Clubs */}
      <section className="section-padding bg-background">
        <div className="container-site">
          <AnimateIn type="fadeUp" className="section-heading">
            <div className="gold-bar mx-auto mb-4" />
            <h2>Student Clubs &amp; Societies</h2>
            <p>Engage, lead, and grow through our vibrant student organizations.</p>
          </AnimateIn>
          <StaggerGroup className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
            {[
              "Robotics Club",
              "Cybersecurity Guild",
              "Debate Society",
              "Defence Innovation Lab",
              "Cultural Committee",
              "Sports Council",
              "Photography Club",
              "Social Outreach Forum",
            ].map((club) => (
              <div key={club} className="card text-center py-6 hover:shadow-brand-lg transition-shadow">
                <div className="w-10 h-10 rounded-full bg-primary/10 mx-auto mb-3 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 bg-accent rounded-full" />
                </div>
                <h3 className="text-sm font-semibold text-primary">{club}</h3>
              </div>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Student Support */}
      <section className="section-padding bg-background-muted">
        <div className="container-site max-w-4xl">
          <AnimateIn type="fadeUp" className="section-heading">
            <div className="gold-bar mx-auto mb-4" />
            <h2>Student Support Services</h2>
          </AnimateIn>
          <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {[
              { title: "Academic Advising", desc: "Every student is assigned a faculty mentor for academic guidance, research direction, and career counselling." },
              { title: "Scholarships & Financial Aid", desc: "Merit-based and need-based scholarships for eligible students, along with research assistantships." },
              { title: "Health & Wellness", desc: "On-campus medical centre, counselling services, and wellness programs to support student well-being." },
              { title: "Career Development", desc: "Resume workshops, interview preparation, industry networking sessions, and placement assistance." },
            ].map((s) => (
              <div key={s.title} className="card">
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
