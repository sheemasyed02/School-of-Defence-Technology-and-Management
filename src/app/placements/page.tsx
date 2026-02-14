import { createMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/ui";
import { AnimateIn, StaggerGroup } from "@/components/animation";

export const metadata = createMetadata({
  title: "Placements",
  description: "Placement statistics, recruiting partners, and training programs at the School of Defence Technology and Management.",
});

const PLACEMENT_STATS = [
  { year: "2025-26", placed: "142", highest: "$125,000", average: "$68,000" },
  { year: "2024-25", placed: "138", highest: "$115,000", average: "$65,000" },
  { year: "2023-24", placed: "135", highest: "$110,000", average: "$62,000" },
];

const TRAINING_PROGRAMS = [
  { num: "1", title: "Technical Skills Development", desc: "Programming, Data Structures, Algorithms" },
  { num: "2", title: "Soft Skills Training", desc: "Communication, Leadership, Teamwork" },
  { num: "3", title: "Aptitude and Reasoning", desc: "Quantitative, Logical, Verbal" },
  { num: "4", title: "Mock Interviews", desc: "Technical and HR rounds" },
  { num: "5", title: "Resume Building and LinkedIn Profile Optimization", desc: "" },
  { num: "6", title: "Group Discussion and Case Study Analysis", desc: "" },
];

const RECRUITING_COMPANIES = [
  "Google", "Microsoft", "Amazon", "Meta", "Apple",
  "IBM", "Oracle", "Cisco", "Intel", "Adobe",
  "Salesforce", "SAP", "Accenture", "Deloitte", "McKinsey",
  "BCG", "Goldman Sachs", "JP Morgan", "Morgan Stanley", "Flipkart",
];

const ALUMNI_COMPANIES = [
  "Tesla", "Netflix", "Uber", "Airbnb", "SpaceX",
  "Twitter", "LinkedIn", "Stripe", "Shopify", "Zoom",
  "Slack", "Atlassian", "Palantir", "Snowflake", "Databricks",
];

export default function PlacementsPage() {
  return (
    <>
      <PageHeader
        title="Placements"
        subtitle="Our department maintains an excellent placement record with students securing positions at leading technology companies worldwide."
        breadcrumb="Placements"
      />

      {/* Placement Statistics Table */}
      <section className="section-padding bg-background">
        <div className="container-site">
          <AnimateIn type="fadeUp" className="section-heading">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold mb-3">Track Record</p>
            <h2>Placement Statistics</h2>
            <div className="section-divider mx-auto mt-4" />
          </AnimateIn>

          <AnimateIn type="fadeUp">
            <div className="mt-12 max-w-4xl mx-auto overflow-hidden rounded-2xl border border-border-light shadow-brand">
              {/* Table header */}
              <div className="bg-gradient-to-r from-primary to-secondary grid grid-cols-4 text-center">
                {["Academic Year", "Students Placed", "Highest Package", "Average Package"].map((h) => (
                  <div key={h} className="py-4 px-3">
                    <p className="text-xs font-bold text-white/80 uppercase tracking-wider">{h}</p>
                  </div>
                ))}
              </div>
              {/* Table rows */}
              {PLACEMENT_STATS.map((row, i) => (
                <div
                  key={row.year}
                  className={`grid grid-cols-4 text-center ${i % 2 === 0 ? "bg-background-paper" : "bg-background-muted"} border-t border-border-light`}
                >
                  <div className="py-5 px-3">
                    <p className="text-sm font-semibold text-primary">{row.year}</p>
                  </div>
                  <div className="py-5 px-3">
                    <p className="text-sm font-bold text-gold">{row.placed}</p>
                  </div>
                  <div className="py-5 px-3">
                    <p className="text-sm font-bold text-gold">{row.highest}</p>
                  </div>
                  <div className="py-5 px-3">
                    <p className="text-sm font-bold text-gold">{row.average}</p>
                  </div>
                </div>
              ))}
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* Placement Process */}
      <section className="section-padding bg-background-muted">
        <div className="container-site">
          <AnimateIn type="fadeUp" className="section-heading">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold mb-3">How It Works</p>
            <h2>Placement Process</h2>
            <div className="section-divider mx-auto mt-4" />
          </AnimateIn>
          <AnimateIn type="fadeUp">
            <div className="max-w-4xl mx-auto mt-10">
              <p className="text-foreground-muted leading-relaxed text-center">
                Our placement process is designed to ensure every student gets the best opportunity. It includes pre-placement training, resume building workshops, mock interviews, aptitude tests, and direct interaction with recruiters. The placement cell works year-round to bring top companies to campus and prepare students for successful careers.
              </p>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* Internship Opportunities */}
      <section className="section-padding bg-background">
        <div className="container-site">
          <div className="max-w-5xl mx-auto grid md:grid-cols-[1fr_auto] gap-10 items-center">
            <AnimateIn type="slideLeft">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold mb-3">Hands-On Experience</p>
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary mb-4">Internship Opportunities</h2>
              <div className="section-divider mb-6" />
              <p className="text-foreground-muted leading-relaxed">
                We facilitate summer internships for all students after their second and third years. Our industry partnerships ensure students gain hands-on experience at leading technology companies, startups, and research organizations. Internships often lead to pre-placement offers.
              </p>
            </AnimateIn>
            <AnimateIn type="scaleIn">
              <div className="w-36 h-36 md:w-44 md:h-44 rounded-2xl bg-gradient-to-br from-gold to-gold-500 flex items-center justify-center shadow-lg">
                <div className="text-center">
                  <svg className="w-10 h-10 text-white mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
                  </svg>
                  <p className="text-xl font-heading font-bold text-white leading-none">PPOs</p>
                  <p className="text-xs text-white/70 mt-1">Pre-Placement Offers</p>
                </div>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* Training Programs */}
      <section className="section-padding bg-background-muted">
        <div className="container-site">
          <AnimateIn type="fadeUp" className="section-heading">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold mb-3">Career Preparation</p>
            <h2>Training Programs</h2>
            <div className="section-divider mx-auto mt-4" />
          </AnimateIn>
          <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-12 max-w-5xl mx-auto">
            {TRAINING_PROGRAMS.map((tp) => (
              <div key={tp.num} className="group bg-background-paper rounded-xl shadow-brand border border-border-light p-6 flex items-start gap-4 transition-all duration-300 hover:shadow-brand-lg hover:-translate-y-0.5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold to-gold-500 flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-110 transition-transform duration-300">
                  <span className="text-sm font-heading font-bold text-white">{tp.num}</span>
                </div>
                <div>
                  <h3 className="text-sm font-heading font-bold text-primary mb-1">{tp.title}</h3>
                  {tp.desc && <p className="text-xs text-foreground-muted">{tp.desc}</p>}
                </div>
              </div>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Recruiting Companies */}
      <section className="section-padding bg-background">
        <div className="container-site">
          <AnimateIn type="fadeUp" className="section-heading">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold mb-3">Our Recruiters</p>
            <h2>Recruiting Companies</h2>
            <div className="section-divider mx-auto mt-4" />
          </AnimateIn>
          <StaggerGroup className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4 mt-12 max-w-5xl mx-auto">
            {RECRUITING_COMPANIES.map((c) => (
              <div
                key={c}
                className="group bg-background-paper rounded-xl border border-border-light shadow-sm p-5 text-center transition-all duration-300 hover:shadow-brand hover:border-gold/30 hover:-translate-y-0.5"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center mx-auto mb-2 group-hover:bg-gold/10 transition-colors">
                  <span className="text-sm font-heading font-bold text-primary/40 group-hover:text-gold transition-colors">{c[0]}</span>
                </div>
                <p className="text-xs font-semibold text-primary">{c}</p>
              </div>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Where Our Alumni Work */}
      <section className="section-padding bg-background-muted">
        <div className="container-site">
          <AnimateIn type="fadeUp" className="section-heading">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold mb-3">Global Presence</p>
            <h2>Where Our Alumni Work</h2>
            <div className="section-divider mx-auto mt-4" />
          </AnimateIn>
          <StaggerGroup className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mt-12 max-w-4xl mx-auto">
            {ALUMNI_COMPANIES.map((c) => (
              <div
                key={c}
                className="group bg-background-paper rounded-xl border border-border-light shadow-sm p-4 text-center transition-all duration-300 hover:shadow-brand hover:border-gold/30 hover:-translate-y-0.5"
              >
                <div className="w-10 h-10 rounded-lg bg-accent/5 flex items-center justify-center mx-auto mb-2 group-hover:bg-gold/10 transition-colors">
                  <span className="text-sm font-heading font-bold text-accent/40 group-hover:text-gold transition-colors">{c[0]}</span>
                </div>
                <p className="text-xs font-semibold text-primary">{c}</p>
              </div>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Placement Officer */}
      <section className="section-padding bg-background relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-72 h-72 dot-pattern opacity-30 rounded-full translate-y-1/3 translate-x-1/4" />
        <div className="container-site relative z-10">
          <AnimateIn type="fadeUp" className="section-heading">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold mb-3">Contact</p>
            <h2>Placement Officer</h2>
            <div className="section-divider mx-auto mt-4" />
          </AnimateIn>
          <AnimateIn type="scaleIn">
            <div className="max-w-md mx-auto mt-10 bg-background-paper rounded-2xl shadow-brand-lg border border-border-light overflow-hidden">
              <div className="bg-gradient-to-r from-primary to-secondary p-6 text-center">
                <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mx-auto ring-4 ring-white/20 mb-3">
                  <span className="text-2xl font-heading font-bold text-white/90">RK</span>
                </div>
                <h3 className="text-lg font-heading font-bold text-white">Dr. Rajesh Kumar</h3>
                <p className="text-xs text-gold font-semibold mt-1">Placement Officer</p>
              </div>
              <div className="p-6 space-y-3 text-center">
                <div className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  <span className="text-sm text-foreground-muted">placements@university.edu</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  <span className="text-sm text-foreground-muted">+1 (555) 123-4567</span>
                </div>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}
