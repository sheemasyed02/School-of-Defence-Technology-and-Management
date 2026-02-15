import { createMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/ui";
import { AnimateIn, StaggerGroup } from "@/components/animation";

export const metadata = createMetadata({
  title: "Alumni",
  description: "Alumni network of the School of Defence Technology and Management — distinguished graduates at leading technology companies, startups, and research institutions worldwide.",
});

const ALUMNI = [
  { name: "Rajiv Mehta", batch: "2020", role: "Software Engineer at Google" },
  { name: "Priya Sharma", batch: "2020", role: "Product Manager at Microsoft" },
  { name: "Amit Kumar", batch: "2019", role: "Data Scientist at Amazon" },
  { name: "Sneha Patel", batch: "2019", role: "Tech Lead at Meta" },
  { name: "Vikram Singh", batch: "2018", role: "Founder & CEO at TechStart Inc." },
  { name: "Neha Gupta", batch: "2018", role: "Senior Consultant at McKinsey" },
  { name: "Arjun Reddy", batch: "2017", role: "Engineering Manager at Apple" },
  { name: "Kavya Iyer", batch: "2017", role: "AI Research Scientist at IBM" },
  { name: "Rohan Desai", batch: "2016", role: "VP Technology at Flipkart" },
  { name: "Ananya Nair", batch: "2016", role: "Director of Operations at Tesla" },
  { name: "Siddharth Joshi", batch: "2015", role: "CTO at FinTech Solutions" },
  { name: "Diya Kapoor", batch: "2015", role: "Principal Engineer at Netflix" },
  { name: "Karan Malhotra", batch: "2014", role: "Head of Innovation at Accenture" },
  { name: "Riya Banerjee", batch: "2014", role: "Senior Manager at Deloitte" },
  { name: "Aditya Verma", batch: "2013", role: "Co-Founder at CloudTech Ventures" },
];

const WHERE_ALUMNI_WORK = [
  "Tesla", "Netflix", "Uber", "Airbnb", "SpaceX", "Twitter",
  "LinkedIn", "Stripe", "Shopify", "Zoom", "Slack", "Atlassian",
  "Palantir", "Snowflake", "Databricks",
];

const BATCHES = Array.from(new Set(ALUMNI.map((a) => a.batch))).sort((a, b) => Number(b) - Number(a));

export default function AlumniPage() {
  return (
    <>
      <PageHeader
        title="Alumni"
        subtitle="Our alumni network spans across leading technology companies, startups, and research institutions worldwide. They continue to make us proud with their achievements and contributions to the field of technology management."
        breadcrumb="Alumni"
      />

      {/* Alumni Stats */}
      <section className="py-12 bg-background-muted border-b border-border-light">
        <div className="container-site">
          <StaggerGroup className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {[
              { value: "15+", label: "Distinguished Alumni" },
              { value: "10+", label: "Companies Represented" },
              { value: "8", label: "Batch Years" },
              { value: "30+", label: "Organizations Worldwide" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="stat-number text-3xl mb-1">{s.value}</p>
                <p className="text-xs text-foreground-muted font-semibold uppercase tracking-wide">{s.label}</p>
              </div>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Distinguished Alumni */}
      <section className="section-padding bg-background">
        <div className="container-site">
          <AnimateIn type="fadeUp" className="section-heading mb-14">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold mb-3">Our Pride</p>
            <h2>Distinguished Alumni</h2>
            <div className="section-divider mx-auto mt-4" />
          </AnimateIn>

          <div className="space-y-12">
            {BATCHES.map((batch) => {
              const batchAlumni = ALUMNI.filter((a) => a.batch === batch);
              return (
                <div key={batch}>
                  <AnimateIn type="fadeUp">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-secondary rounded-lg px-4 py-2 shadow-md">
                        <svg className="w-4 h-4 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342" />
                        </svg>
                        <span className="text-sm font-bold text-white">Batch of {batch}</span>
                      </div>
                      <div className="flex-1 h-px bg-border-light" />
                    </div>
                  </AnimateIn>

                  <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {batchAlumni.map((a) => (
                      <div
                        key={`${a.name}-${a.batch}`}
                        className="group bg-background-paper rounded-xl shadow-brand border border-border-light p-5 flex items-center gap-4 transition-all duration-300 hover:shadow-brand-lg hover:-translate-y-1"
                      >
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform duration-300">
                          <span className="text-sm font-heading font-bold text-white">
                            {a.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-heading font-bold text-primary truncate">{a.name}</h3>
                          <p className="text-xs text-foreground-muted mt-0.5">{a.role}</p>
                        </div>
                      </div>
                    ))}
                  </StaggerGroup>
                </div>
              );
            })}
          </div>
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
            {WHERE_ALUMNI_WORK.map((company) => (
              <div
                key={company}
                className="group bg-background-paper rounded-xl border border-border-light shadow-sm p-4 text-center transition-all duration-300 hover:shadow-brand hover:border-gold/30 hover:-translate-y-0.5"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center mx-auto mb-2 group-hover:bg-gold/10 transition-colors">
                  <span className="text-sm font-heading font-bold text-primary/40 group-hover:text-gold transition-colors">{company[0]}</span>
                </div>
                <p className="text-xs font-semibold text-primary">{company}</p>
              </div>
            ))}
          </StaggerGroup>
        </div>
      </section>
    </>
  );
}
