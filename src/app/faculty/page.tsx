import { createMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/ui";
import { AnimateIn, StaggerGroup } from "@/components/animation";
import Image from "next/image";

export const metadata = createMetadata({
  title: "Faculty",
  description: "Meet our distinguished faculty — experts in technology management, data analytics, AI, operations, and entrepreneurship.",
});

const FACULTY = [
  {
    name: "Dr. Sarah Johnson",
    initials: "SJ",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    designation: "Professor & Head of Department",
    qualification: "Ph.D. in Technology Management, MIT",
    specialization: "Innovation Management, Digital Transformation",
    experience: "18 years in academia and industry research",
    research: ["Digital Innovation", "Technology Strategy", "Organizational Change", "Industry 4.0"],
    publications: [
      'Johnson, S. (2024). "Digital Transformation in Manufacturing." Journal of Technology Management.',
      'Johnson, S. & Lee, K. (2023). "Innovation Ecosystems in Tech Startups." Strategic Management Review.',
    ],
    email: "sarah.johnson@university.edu",
    phone: "+1 (555) 123-4501",
  },
  {
    name: "Dr. Michael Chen",
    initials: "MC",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    designation: "Associate Professor",
    qualification: "Ph.D. in Information Systems, Stanford University",
    specialization: "Data Analytics, Business Intelligence",
    experience: "12 years in teaching and research",
    research: ["Big Data Analytics", "Machine Learning Applications", "Business Intelligence", "Predictive Modeling"],
    publications: [
      'Chen, M. et al. (2024). "AI-Driven Decision Making in Supply Chains." Data Science Journal.',
      'Chen, M. (2023). "Predictive Analytics for Customer Behavior." Information Systems Research.',
    ],
    email: "michael.chen@university.edu",
    phone: null,
  },
  {
    name: "Dr. Emily Rodriguez",
    initials: "ER",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    designation: "Associate Professor",
    qualification: "Ph.D. in Operations Management, Harvard Business School",
    specialization: "Supply Chain Management, Operations Strategy",
    experience: "15 years in operations consulting and academia",
    research: ["Supply Chain Optimization", "Sustainable Operations", "Logistics Management", "Quality Management"],
    publications: [
      'Rodriguez, E. (2024). "Sustainable Supply Chain Practices." Operations Management Quarterly.',
      'Rodriguez, E. & Patel, R. (2023). "Blockchain in Supply Chain." Technology Review.',
    ],
    email: "emily.rodriguez@university.edu",
    phone: "+1 (555) 123-4503",
  },
  {
    name: "Dr. Rajesh Patel",
    initials: "RP",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
    designation: "Assistant Professor",
    qualification: "Ph.D. in Computer Science, Carnegie Mellon University",
    specialization: "Artificial Intelligence, Cybersecurity",
    experience: "8 years in industry and academia",
    research: ["AI and Machine Learning", "Cybersecurity", "Cloud Computing", "IoT Security"],
    publications: [
      'Patel, R. (2024). "AI Security in Enterprise Systems." Cybersecurity Journal.',
      'Patel, R. et al. (2023). "IoT Security Framework." IEEE Transactions.',
    ],
    email: "rajesh.patel@university.edu",
    phone: null,
  },
  {
    name: "Dr. Lisa Wang",
    initials: "LW",
    image: "https://randomuser.me/api/portraits/women/90.jpg",
    designation: "Assistant Professor",
    qualification: "Ph.D. in Entrepreneurship, UC Berkeley",
    specialization: "Technology Entrepreneurship, Innovation",
    experience: "10 years including 5 years as startup founder",
    research: ["Startup Ecosystems", "Technology Ventures", "Innovation Management", "Venture Capital"],
    publications: [
      'Wang, L. (2024). "Success Factors in Tech Startups." Entrepreneurship Research.',
      'Wang, L. & Kim, J. (2023). "Funding Strategies for Tech Ventures." Venture Capital Review.',
    ],
    email: "lisa.wang@university.edu",
    phone: null,
  },
];

const COLORS = [
  { from: "from-primary", to: "to-secondary" },
  { from: "from-gold", to: "to-gold-500" },
  { from: "from-accent", to: "to-accent-600" },
  { from: "from-secondary", to: "to-primary" },
  { from: "from-gold-500", to: "to-gold-700" },
];

export default function FacultyPage() {
  return (
    <>
      <PageHeader
        title="Our Faculty"
        subtitle="Our faculty members are distinguished scholars and industry experts committed to excellence in teaching and research."
        breadcrumb="Faculty"
      />

      {/* Faculty Stats */}
      <section className="py-8 sm:py-10 bg-background-muted border-b border-border-light">
        <div className="container-site">
          <StaggerGroup className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-3xl mx-auto">
            {[
              { value: "5", label: "Faculty Members" },
              { value: "63+", label: "Years Experience" },
              { value: "10+", label: "Publications" },
              { value: "20+", label: "Research Areas" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="stat-number text-2xl sm:text-3xl mb-1">{s.value}</p>
                <p className="text-xs text-foreground-muted font-semibold uppercase tracking-wide">{s.label}</p>
              </div>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Faculty Members */}
      <section className="section-padding bg-background">
        <div className="container-site">
          <AnimateIn type="fadeUp" className="section-heading mb-10 sm:mb-14">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-gold mb-3">Meet Our Team</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl">Faculty Members</h2>
            <div className="section-divider mx-auto mt-4" />
          </AnimateIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
            {FACULTY.map((f, idx) => (
              <AnimateIn key={f.name} type="fadeUp" delay={idx * 0.1}>
                <div className="bg-background-paper rounded-2xl shadow-brand border border-border-light overflow-hidden transition-all duration-300 hover:shadow-brand-lg hover:-translate-y-1 flex flex-col h-full">
                  {/* Top — Photo / Avatar */}
                  <div className={`relative bg-gradient-to-br ${COLORS[idx % COLORS.length].from} ${COLORS[idx % COLORS.length].to} pt-6 sm:pt-8 pb-5 sm:pb-6 flex flex-col items-center text-center`}>
                    <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full overflow-hidden ring-4 ring-white/20 mb-3 sm:mb-4 bg-white/10 flex items-center justify-center relative">
                      {/* Initials fallback (visible behind image) */}
                      <span className="text-2xl font-heading font-bold text-white/90 absolute z-0">{f.initials}</span>
                      <Image
                        src={f.image}
                        alt={f.name}
                        fill
                        className="object-cover relative z-10"
                        sizes="112px"
                      />
                    </div>
                    <h3 className="text-base sm:text-lg font-heading font-bold text-white">{f.name}</h3>
                    <p className="text-xs text-gold-100 font-semibold mt-1">{f.designation}</p>
                    {/* Contact */}
                    <div className="mt-4 pt-3 border-t border-white/15 w-4/5 space-y-1">
                      <p className="text-xs text-white/70">{f.email}</p>
                      {f.phone && <p className="text-xs text-white/70">{f.phone}</p>}
                    </div>
                  </div>

                  {/* Bottom — Details */}
                  <div className="p-4 sm:p-5 md:p-6 space-y-3 sm:space-y-4 flex-1 flex flex-col">
                    {/* Info chips */}
                    <div className="space-y-2 sm:space-y-3">
                      <div className="bg-background-muted rounded-lg p-2.5 sm:p-3">
                        <p className="text-[10px] sm:text-[11px] font-bold text-primary/50 uppercase tracking-wider mb-1">Qualification</p>
                        <p className="text-sm text-foreground-muted leading-snug">{f.qualification}</p>
                      </div>
                      <div className="bg-background-muted rounded-lg p-2.5 sm:p-3">
                        <p className="text-[10px] sm:text-[11px] font-bold text-primary/50 uppercase tracking-wider mb-1">Specialization</p>
                        <p className="text-sm text-foreground-muted leading-snug">{f.specialization}</p>
                      </div>
                      <div className="bg-background-muted rounded-lg p-2.5 sm:p-3">
                        <p className="text-[10px] sm:text-[11px] font-bold text-primary/50 uppercase tracking-wider mb-1">Experience</p>
                        <p className="text-sm text-foreground-muted leading-snug">{f.experience}</p>
                      </div>
                    </div>

                    {/* Research Interests */}
                    <div className="flex-1">
                      <p className="text-[10px] sm:text-[11px] font-bold text-primary/50 uppercase tracking-wider mb-2">Research Interests</p>
                      <div className="flex flex-wrap gap-1.5">
                        {f.research.map((r) => (
                          <span key={r} className="text-[11px] bg-gradient-to-r from-gold/10 to-gold/5 text-gold border border-gold/20 px-2.5 py-1 rounded-full font-medium">{r}</span>
                        ))}
                      </div>
                    </div>

                    {/* Publications */}
                    <div>
                      <p className="text-[10px] sm:text-[11px] font-bold text-primary/50 uppercase tracking-wider mb-2">Selected Publications</p>
                      <ul className="space-y-2">
                        {f.publications.map((pub, i) => (
                          <li key={i} className="flex items-start gap-2 text-[11px] text-foreground-muted leading-relaxed">
                            <svg className="w-3.5 h-3.5 text-gold flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                            </svg>
                            {pub}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
