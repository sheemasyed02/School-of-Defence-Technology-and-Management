import { createMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/ui";
import { AnimateIn, StaggerGroup } from "@/components/animation";

export const metadata = createMetadata({
  title: "About",
  description: "Learn about the School of Defence Technology and Management — our vision, mission, history, and leadership.",
});

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About Us"
        subtitle="A premier centre of excellence dedicated to advancing defence education, applied research, and strategic leadership."
        breadcrumb="About"
      />

      {/* Vision & Mission */}
      <section className="section-padding bg-background">
        <div className="container-site">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <AnimateIn type="fadeUp">
              <div className="card border-l-4 border-l-gold">
                <h2 className="text-2xl font-heading font-bold text-primary mb-4">Our Vision</h2>
                <p className="text-foreground-muted leading-relaxed">
                  To be a globally recognized institution in defence technology education and research, fostering innovation, strategic thinking, and leadership that contributes to national security and technological self-reliance.
                </p>
              </div>
            </AnimateIn>
            <AnimateIn type="fadeUp" delay={0.15}>
              <div className="card border-l-4 border-l-accent">
                <h2 className="text-2xl font-heading font-bold text-primary mb-4">Our Mission</h2>
                <p className="text-foreground-muted leading-relaxed">
                  To advance defence technology through world-class education, cutting-edge research, and industry-academia collaboration. We aim to develop professionals who are prepared to tackle complex challenges in defence and strategic management.
                </p>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* History */}
      <section className="section-padding bg-background-muted">
        <div className="container-site max-w-4xl">
          <AnimateIn type="fadeUp" className="section-heading">
            <div className="gold-bar mx-auto mb-4" />
            <h2>Our History</h2>
          </AnimateIn>
          <AnimateIn type="fadeUp">
            <div className="prose prose-lg mx-auto text-foreground-muted leading-relaxed space-y-4">
              <p>
                The School of Defence Technology and Management was established with the mandate to bridge the gap between academic research and the practical needs of India&apos;s defence ecosystem. Born from a partnership between the Ministry of Defence and leading academic institutions, the School has grown into one of the nation&apos;s foremost centres for defence education.
              </p>
              <p>
                Over the past 25 years, the institution has consistently evolved its curriculum, research focus, and infrastructure to address emerging threats — from cybersecurity and electronic warfare to unmanned systems and artificial intelligence in defence applications.
              </p>
              <p>
                Today, the School stands at the intersection of technology, management, and national security, producing graduates who serve with distinction across the armed forces, DRDO, defence PSUs, and the private sector.
              </p>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-padding bg-background">
        <div className="container-site">
          <AnimateIn type="fadeUp" className="section-heading">
            <div className="gold-bar mx-auto mb-4" />
            <h2>Core Values</h2>
          </AnimateIn>
          <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {[
              { title: "Integrity", desc: "Upholding the highest ethical standards in education, research, and professional conduct." },
              { title: "Innovation", desc: "Encouraging creative thinking and breakthrough research to solve complex defence challenges." },
              { title: "Excellence", desc: "Striving for the highest standards of academic and professional achievement." },
              { title: "Service", desc: "Commitment to national security and selfless service to the nation." },
            ].map((v) => (
              <div key={v.title} className="card text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-3 h-3 bg-gold rounded-full" />
                </div>
                <h3 className="text-lg font-heading font-bold text-primary mb-2">{v.title}</h3>
                <p className="text-sm text-foreground-muted leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Leadership */}
      <section className="section-padding bg-background-muted">
        <div className="container-site">
          <AnimateIn type="fadeUp" className="section-heading">
            <div className="gold-bar mx-auto mb-4" />
            <h2>Leadership</h2>
            <p>Our institution is guided by distinguished leaders from academia, defence, and public policy.</p>
          </AnimateIn>
          <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
            {[
              { name: "Lt. Gen. (Dr.) A.K. Sharma (Retd.)", role: "Director General", bio: "Distinguished career spanning 38 years in the Indian Army with expertise in defence technology acquisition and strategic planning." },
              { name: "Prof. Meera Raghunathan", role: "Dean — Academics", bio: "Former DRDO scientist with expertise in missile technology and defence electronics. Over 100 peer-reviewed publications." },
              { name: "Vice Admiral R. Suresh (Retd.)", role: "Dean — Research", bio: "Expert in naval warfare systems and maritime security. Has led multiple defence modernization initiatives." },
            ].map((l) => (
              <div key={l.name} className="card">
                <div className="w-20 h-20 rounded-full bg-primary/10 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-heading font-bold text-primary/40">{l.name[0]}</span>
                </div>
                <h3 className="text-lg font-heading font-bold text-primary text-center mb-1">{l.name}</h3>
                <p className="text-sm text-accent font-semibold text-center mb-3">{l.role}</p>
                <p className="text-sm text-foreground-muted leading-relaxed text-center">{l.bio}</p>
              </div>
            ))}
          </StaggerGroup>
        </div>
      </section>
    </>
  );
}
