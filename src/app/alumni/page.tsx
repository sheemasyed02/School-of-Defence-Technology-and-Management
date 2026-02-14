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

const BATCHES = Array.from(new Set(ALUMNI.map((a) => a.batch))).sort((a, b) => Number(b) - Number(a));

const GRADIENT_COLORS = [
  "from-primary to-secondary",
  "from-gold to-gold-500",
  "from-accent to-accent-600",
  "from-secondary to-primary",
  "from-gold-500 to-gold-700",
  "from-primary to-gold",
  "from-accent to-gold",
  "from-secondary to-gold",
];

export default function AlumniPage() {
  return (
    <>
      <PageHeader
        title="Alumni"
        subtitle="Our alumni network spans across leading technology companies, startups, and research institutions worldwide. They continue to make us proud with their achievements and contributions to the field of technology management."
        breadcrumb="Alumni"
      />

      {/* Alumni Stats */}
      <section className="py-10 bg-background-muted border-b border-border-light">
        <div className="container-site">
          <StaggerGroup className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
            {[
              { value: "15+", label: "Distinguished Alumni" },
              { value: "10+", label: "Companies Represented" },
              { value: "8", label: "Batch Years" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="stat-number text-3xl mb-1">{s.value}</p>
                <p className="text-xs text-foreground-muted font-semibold uppercase tracking-wide">{s.label}</p>
              </div>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Distinguished Alumni by Batch */}
      <section className="section-padding bg-background">
        <div className="container-site">
          <AnimateIn type="fadeUp" className="section-heading mb-14">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold mb-3">Our Pride</p>
            <h2>Distinguished Alumni</h2>
            <div className="section-divider mx-auto mt-4" />
          </AnimateIn>

          <div className="space-y-14">
            {BATCHES.map((batch, bi) => {
              const batchAlumni = ALUMNI.filter((a) => a.batch === batch);
              return (
                <div key={batch}>
                  <AnimateIn type="fadeUp">
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`inline-flex items-center gap-2 bg-gradient-to-r ${GRADIENT_COLORS[bi % GRADIENT_COLORS.length]} rounded-xl px-5 py-2.5 shadow-md`}>
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342" />
                        </svg>
                        <span className="text-sm font-bold text-white">Batch {batch}</span>
                      </div>
                      <div className="flex-1 h-px bg-border-light" />
                    </div>
                  </AnimateIn>
                  <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {batchAlumni.map((a, ai) => (
                      <div key={`${a.name}-${a.batch}`} className="group bg-background-paper rounded-2xl shadow-brand border border-border-light overflow-hidden transition-all duration-300 hover:shadow-brand-lg hover:-translate-y-1">
                        <div className={`h-1.5 bg-gradient-to-r ${GRADIENT_COLORS[(bi + ai) % GRADIENT_COLORS.length]}`} />
                        <div className="p-6 flex items-center gap-4">
                          <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${GRADIENT_COLORS[(bi + ai) % GRADIENT_COLORS.length]} flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                            <span className="text-lg font-heading font-bold text-white">{a.name.split(" ").map(w => w[0]).join("").slice(0, 2)}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-base font-heading font-bold text-primary truncate">{a.name}</h3>
                            <p className="text-xs text-foreground-muted mt-0.5">{a.role}</p>
                          </div>
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
    </>
  );
}
