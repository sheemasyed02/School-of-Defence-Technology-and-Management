import { createMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/ui";
import { AnimateIn, StaggerGroup } from "@/components/animation";
import Link from "next/link";

export const metadata = createMetadata({
  title: "Programs",
  description: "Explore academic programs at SDTM — M.Tech, MBA, Ph.D., and professional certificate courses in defence technology and management.",
});

const PROGRAMS = [
  {
    category: "Postgraduate Programs",
    items: [
      { title: "M.Tech in Defence Technology", duration: "2 Years", mode: "Full-time", desc: "Comprehensive program covering weapons systems, missile technology, radar and surveillance, electronic warfare, and defence electronics. Includes hands-on lab work and industry projects." },
      { title: "M.Tech in Cybersecurity & Defence Informatics", duration: "2 Years", mode: "Full-time", desc: "Focuses on network security, cryptography, cyber warfare, AI-based threat detection, and information warfare in the context of national security." },
      { title: "MBA in Defence Management", duration: "2 Years", mode: "Full-time", desc: "Strategic management program covering defence procurement, logistics, supply chain management, defence economics, and project management for defence organizations." },
      { title: "M.Sc. in Strategic Studies", duration: "2 Years", mode: "Full-time", desc: "Interdisciplinary program in geopolitics, nuclear strategy, national security policy, intelligence studies, and Indo-Pacific security dynamics." },
    ],
  },
  {
    category: "Doctoral Programs",
    items: [
      { title: "Ph.D. in Defence Technology", duration: "3–5 Years", mode: "Full-time / Part-time", desc: "Advanced research in autonomous systems, AI for defence, advanced materials, propulsion systems, and next-generation weapons technology." },
      { title: "Ph.D. in Strategic & Defence Studies", duration: "3–5 Years", mode: "Full-time / Part-time", desc: "Doctoral research in defence policy, conflict studies, maritime security, arms control, and international security architecture." },
    ],
  },
  {
    category: "Certificate & Executive Programs",
    items: [
      { title: "Advanced Certificate in Defence Project Management", duration: "6 Months", mode: "Online / Hybrid", desc: "Intensive program for mid-career defence professionals covering project lifecycle, risk management, and defence acquisition frameworks." },
      { title: "Executive Program in Defence Technology Leadership", duration: "3 Months", mode: "On-campus", desc: "Short-term residential program for senior officers and defence industry leaders focusing on emerging technologies and strategic leadership." },
    ],
  },
];

export default function ProgramsPage() {
  return (
    <>
      <PageHeader
        title="Academic Programs"
        subtitle="Rigorous, industry-aligned programs designed to build expertise in defence technology and strategic management."
        breadcrumb="Programs"
      />

      {PROGRAMS.map((category, ci) => (
        <section
          key={category.category}
          className={`section-padding ${ci % 2 === 0 ? "bg-background" : "bg-background-muted"}`}
        >
          <div className="container-site">
            <AnimateIn type="fadeUp" className="section-heading">
              <div className="gold-bar mx-auto mb-4" />
              <h2>{category.category}</h2>
            </AnimateIn>
            <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
              {category.items.map((p) => (
                <div key={p.title} className="card group hover:-translate-y-1 transition-transform duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-1 bg-gold rounded-full" />
                    <h3 className="text-lg font-heading font-bold text-primary">{p.title}</h3>
                  </div>
                  <p className="text-sm text-foreground-muted leading-relaxed mb-4">{p.desc}</p>
                  <div className="flex flex-wrap gap-3 text-xs">
                    <span className="inline-flex items-center gap-1.5 bg-primary/5 text-primary px-3 py-1.5 rounded-full font-semibold">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
                      {p.duration}
                    </span>
                    <span className="inline-flex items-center gap-1.5 bg-accent/5 text-accent px-3 py-1.5 rounded-full font-semibold">
                      {p.mode}
                    </span>
                  </div>
                </div>
              ))}
            </StaggerGroup>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="py-16 bg-primary">
        <div className="container-site text-center">
          <AnimateIn type="fadeUp">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-4">Interested in Our Programs?</h2>
            <p className="text-white/70 max-w-xl mx-auto mb-6">Contact our admissions office for eligibility criteria, fee structure, and application deadlines.</p>
            <Link href="/contact" className="btn-accent px-8 py-3.5">Contact Admissions</Link>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}
