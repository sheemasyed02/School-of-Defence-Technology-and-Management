import { createMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/ui";
import { AnimateIn, StaggerGroup } from "@/components/animation";
import { supabase } from "@/lib/supabase";

export const metadata = createMetadata({
  title: "Faculty",
  description: "Meet our distinguished faculty — experts in technology management, data analytics, AI, operations, and entrepreneurship.",
});

const COLORS = [
  { from: "from-[#0c1e3a]", to: "to-[#1a3a5c]" },
  { from: "from-[#1a3a5c]", to: "to-[#0c1e3a]" },
  { from: "from-[#142c4a]", to: "to-[#1e4a6e]" },
  { from: "from-[#0f2840]", to: "to-[#1a3a5c]" },
  { from: "from-[#1a3a5c]", to: "to-[#142c4a]" },
];

// Helper to parse JSON string array safely
const parseList = (jsonStr: string | null): string[] => {
  if (!jsonStr) return [];
  try {
    const parsed = JSON.parse(jsonStr);
    return Array.isArray(parsed) ? parsed : [String(parsed)];
  } catch (e) {
    return [jsonStr];
  }
};

// Revalidate every minute
export const revalidate = 60;

export default async function FacultyPage() {
  const { data: faculty, error } = await supabase
    .from("Faculty")
    .select("*")
    .eq("isVisible", true)
    .order("order", { ascending: true });

  if (error) {
    console.error("Error fetching faculty:", error);
  }

  const facultyList = faculty || [];

  return (
    <>
      <PageHeader
        title="Our Faculty"
        subtitle="Our faculty members are distinguished scholars and industry experts committed to excellence in teaching and research."
        breadcrumb="Faculty"
      />

      {/* Faculty Stats */}
      <section className="py-10 bg-background-muted border-b border-border-light">
        <div className="container-site">
          <StaggerGroup className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {[
              { value: String(facultyList.length), label: "Faculty Members" },
              { value: "63+", label: "Years Experience" },
              { value: "10+", label: "Publications" },
              { value: "20+", label: "Research Areas" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="stat-number text-3xl mb-1">{s.value}</p>
                <p className="text-xs text-foreground-muted font-semibold uppercase tracking-wide">{s.label}</p>
              </div>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Faculty Cards — Vertical Card Grid */}
      <section className="section-padding bg-background">
        <div className="container-site">
          <AnimateIn type="fadeUp" className="section-heading mb-14">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold mb-3">Meet Our Team</p>
            <h2>Faculty Members</h2>
            <div className="section-divider mx-auto mt-4" />
          </AnimateIn>

          {facultyList.length === 0 ? (
            <div className="text-center text-foreground-muted py-10">
              <p>No faculty members found.</p>
            </div>
          ) : (
            <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {facultyList.map((f, idx) => {
                const research = parseList(f.research);
                const publications = parseList(f.publications);
                const initials = f.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase();
                const color = COLORS[idx % COLORS.length];

                return (
                  <div
                    key={f.id}
                    className="group bg-background-paper rounded-2xl shadow-brand border border-border-light overflow-hidden transition-all duration-300 hover:shadow-brand-lg hover:-translate-y-1 flex flex-col"
                  >
                    {/* ── Card Header: gradient + photo + name ── */}
                    <div className={`relative bg-gradient-to-br ${color.from} ${color.to} pt-8 pb-10 px-6 text-center`}>
                      {/* Subtle pattern overlay */}
                      <div
                        className="absolute inset-0 opacity-[0.04]"
                        style={{
                          backgroundImage:
                            "linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)",
                          backgroundSize: "30px 30px",
                        }}
                      />
                      <div className="relative z-10">
                        {/* Photo / Initials */}
                        <div className="mx-auto mb-4">
                          {f.imageUrl ? (
                            <img
                              src={f.imageUrl}
                              alt={f.name}
                              className="w-28 h-28 rounded-full object-cover ring-4 ring-gold/40 mx-auto shadow-lg"
                            />
                          ) : (
                            <div className="w-28 h-28 rounded-full bg-white/10 flex items-center justify-center ring-4 ring-gold/30 mx-auto">
                              <span className="text-3xl font-heading font-bold text-white/80">{initials}</span>
                            </div>
                          )}
                        </div>
                        {/* Name & Designation */}
                        <h3 className="text-lg font-heading font-bold text-white leading-snug">{f.name}</h3>
                        <p className="text-xs text-gold font-semibold mt-1 tracking-wide">{f.designation}</p>

                        {/* Contact under name */}
                        <div className="mt-4 pt-3 border-t border-white/15 space-y-1">
                          {f.email && (
                            <p className="text-[11px] text-white/60 truncate">{f.email}</p>
                          )}
                          {f.phone && (
                            <p className="text-[11px] text-white/60">{f.phone}</p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* ── Card Body: details ── */}
                    <div className="p-6 flex-1 flex flex-col gap-4">
                      {/* Qualification */}
                      {f.qualification && (
                        <div className="bg-background-muted rounded-lg p-3.5">
                          <p className="text-[10px] font-bold text-primary/50 uppercase tracking-wider mb-1">Qualification</p>
                          <p className="text-sm text-foreground-muted leading-snug">{f.qualification}</p>
                        </div>
                      )}

                      {/* Department / Specialization */}
                      {f.department && (
                        <div className="bg-background-muted rounded-lg p-3.5">
                          <p className="text-[10px] font-bold text-primary/50 uppercase tracking-wider mb-1">Specialization</p>
                          <p className="text-sm text-foreground-muted leading-snug">{f.department}</p>
                        </div>
                      )}

                      {/* Experience */}
                      {f.experience && (
                        <div className="bg-background-muted rounded-lg p-3.5">
                          <p className="text-[10px] font-bold text-primary/50 uppercase tracking-wider mb-1">Experience</p>
                          <p className="text-sm text-foreground-muted leading-snug">{f.experience}</p>
                        </div>
                      )}

                      {/* Research Interests */}
                      {research.length > 0 && (
                        <div>
                          <p className="text-[10px] font-bold text-primary/50 uppercase tracking-wider mb-2">Research Interests</p>
                          <div className="flex flex-wrap gap-1.5">
                            {research.map((r, i) => (
                              <span key={i} className="text-[11px] bg-gradient-to-r from-gold/10 to-gold/5 text-gold border border-gold/20 px-3 py-1 rounded-full font-medium">
                                {r}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Publications */}
                      {publications.length > 0 && (
                        <div className="mt-auto pt-2">
                          <p className="text-[10px] font-bold text-primary/50 uppercase tracking-wider mb-2">Selected Publications</p>
                          <ul className="space-y-2">
                            {publications.map((pub, i) => (
                              <li key={i} className="flex items-start gap-2 text-[11px] text-foreground-muted leading-relaxed">
                                <svg className="w-3.5 h-3.5 text-gold flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                </svg>
                                {pub}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </StaggerGroup>
          )}
        </div>
      </section>
    </>
  );
}
