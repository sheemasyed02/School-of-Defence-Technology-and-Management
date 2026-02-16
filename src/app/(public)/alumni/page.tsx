import { createMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/ui";
import { AnimateIn, StaggerGroup } from "@/components/animation";
import { supabase } from "@/lib/supabase";
import { Award, Briefcase } from "lucide-react";

export const metadata = createMetadata({
  title: "Alumni | School of Defence Technology and Management",
  description: "Alumni network of the School of Defence Technology and Management — distinguished graduates at leading technology companies, startups, and research institutions worldwide.",
});

// Revalidate every 60 seconds
export const revalidate = 60;

type Alumni = {
  id: string;
  name: string;
  image_url: string | null;
  batch: string;
  role: string;
  company: string | null;
  order: number;
};

export default async function AlumniPage() {
  const { data: alumni, error } = await supabase
    .from("Alumni")
    .select("*")
    .order("batch", { ascending: false })
    .order("order", { ascending: true });

  if (error) {
    console.error("Error fetching alumni:", error);
  }

  const allAlumni = (alumni as Alumni[]) || [];

  // Group by Batch
  const groupedAlumni = allAlumni.reduce((acc, curr) => {
    const batch = curr.batch || "Unknown";
    if (!acc[batch]) acc[batch] = [];
    acc[batch].push(curr);
    return acc;
  }, {} as Record<string, Alumni[]>);

  const batches = Object.keys(groupedAlumni).sort((a, b) => b.localeCompare(a)); // Descending

  // Extract companies for "Where Our Alumni Work"
  const companies = Array.from(new Set(allAlumni.map(a => a.company).filter(Boolean) as string[]));
  // If too few, add some defaults or just show what we have.
  // For now, only show if we have companies.

  return (
    <>
      <PageHeader
        title="Alumni"
        subtitle="Our alumni network spans across leading technology companies, startups, and research institutions worldwide."
        breadcrumb="Alumni"
      />

      {/* Alumni Stats (Static for now, could be dynamic count) */}
      <section className="py-8 sm:py-10 md:py-12 bg-background-muted border-b border-border-light">
        <div className="container-site">
          <StaggerGroup className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-3xl mx-auto">
            {[
              { value: `${allAlumni.length}+`, label: "Distinguished Alumni" },
              { value: `${companies.length}+`, label: "Companies Represented" },
              { value: `${batches.length}`, label: "Batch Years" },
              { value: "Global", label: "Presence" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="stat-number text-2xl sm:text-3xl md:text-4xl mb-1">{s.value}</p>
                <p className="text-xs sm:text-sm text-foreground-muted font-semibold uppercase tracking-wide">{s.label}</p>
              </div>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Distinguished Alumni */}
      <section className="section-padding bg-background">
        <div className="container-site">
          <AnimateIn type="fadeUp" className="section-heading">
            <p className="text-sm sm:text-base font-semibold uppercase tracking-[0.2em] text-gold mb-3">Our Pride</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl">Distinguished Alumni</h2>
            <div className="section-divider mx-auto mt-4" />
          </AnimateIn>

          <div className="space-y-12">
            {allAlumni.length === 0 ? (
                <div className="text-center text-gray-500 italic">No alumni records found.</div>
            ) : (
            batches.map((batch) => {
              const list = groupedAlumni[batch];
              return (
                <div key={batch}>
                  <AnimateIn type="fadeUp">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-secondary rounded-lg px-4 py-2 shadow-md">
                        <Award className="w-5 h-5 text-gold" />
                        <span className="text-base font-bold text-white">Batch of {batch}</span>
                      </div>
                      <div className="flex-1 h-px bg-border-light" />
                    </div>
                  </AnimateIn>

                  <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {list.map((a) => (
                      <div
                        key={a.id}
                        className="group bg-background-paper rounded-xl shadow-sm border border-border-light p-4 flex items-center gap-4 transition-all duration-300 hover:shadow-brand-lg hover:-translate-y-1"
                      >
                        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-md flex-shrink-0 bg-gray-100 flex items-center justify-center relative">
                          {a.image_url ? (
                            <img
                              src={a.image_url}
                              alt={a.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                             <span className="text-lg font-bold text-primary/40 uppercase">
                                {a.name.slice(0, 2)}
                             </span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-bold text-primary truncate group-hover:text-gold transition-colors">{a.name}</h3>
                          <p className="text-sm text-foreground-muted font-medium truncate">{a.role}</p>
                          {a.company && (
                              <p className="text-xs text-gray-500 mt-1 flex items-center gap-1 truncate">
                                  <Briefcase className="w-3 h-3" />
                                  {a.company}
                              </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </StaggerGroup>
                </div>
              );
            })
            )}
          </div>
        </div>
      </section>

      {/* Where Our Alumni Work - Only if companies exist */}
      {companies.length > 0 && (
      <section className="section-padding bg-background-muted">
        <div className="container-site">
          <AnimateIn type="fadeUp" className="section-heading">
            <p className="text-sm sm:text-base font-semibold uppercase tracking-[0.2em] text-gold mb-3">Global Presence</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl">Where Our Alumni Work</h2>
            <div className="section-divider mx-auto mt-4" />
          </AnimateIn>
          <StaggerGroup className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 max-w-4xl mx-auto">
            {companies.map((company) => (
              <div
                key={company}
                className="group bg-background-paper rounded-xl border border-border-light shadow-sm p-4 text-center transition-all duration-300 hover:shadow-brand hover:border-gold/30 hover:-translate-y-0.5"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/5 flex items-center justify-center mx-auto mb-2 group-hover:bg-gold/10 transition-colors">
                  <span className="text-lg font-heading font-bold text-primary/40 group-hover:text-gold transition-colors">{company.charAt(0)}</span>
                </div>
                <p className="text-sm font-semibold text-primary truncate" title={company}>{company}</p>
              </div>
            ))}
          </StaggerGroup>
        </div>
      </section>
      )}
    </>
  );
}
