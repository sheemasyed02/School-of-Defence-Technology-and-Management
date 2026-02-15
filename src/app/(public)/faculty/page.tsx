import { createMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/ui";
import { AnimateIn, StaggerGroup } from "@/components/animation";
import { supabase } from "@/lib/supabase";

export const metadata = createMetadata({
  title: "Faculty",
  description: "Meet our distinguished faculty — experts in technology management, data analytics, AI, operations, and entrepreneurship.",
});

const COLORS = [
  { from: "from-primary", to: "to-secondary" },
  { from: "from-gold", to: "to-gold-500" },
  { from: "from-accent", to: "to-accent-600" },
  { from: "from-secondary", to: "to-primary" },
  { from: "from-gold-500", to: "to-gold-700" },
];

// Helper to parse JSON string array safely
const parseList = (jsonStr: string | null): string[] => {
  if (!jsonStr) return [];
  try {
    const parsed = JSON.parse(jsonStr);
    return Array.isArray(parsed) ? parsed : [String(parsed)];
  } catch (e) {
    return [jsonStr]; // Fallback to raw string if parsing fails
  }
};

// Revalidate every hour
export const revalidate = 3600;

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
              { value: "63+", label: "Years Experience" }, // Placeholder unless calculated
              { value: "10+", label: "Publications" },     // Placeholder
              { value: "20+", label: "Research Areas" },    // Placeholder
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="stat-number text-3xl mb-1">{s.value}</p>
                <p className="text-xs text-foreground-muted font-semibold uppercase tracking-wide">{s.label}</p>
              </div>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Faculty Members */}
      <section className="section-padding bg-background">
        <div className="container-site">
          <AnimateIn type="fadeUp" className="section-heading mb-14">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold mb-3">Meet Our Team</p>
            <h2>Faculty Members</h2>
            <div className="section-divider mx-auto mt-4" />
          </AnimateIn>

          <div className="space-y-10">
            {facultyList.length === 0 ? (
                <div className="text-center text-foreground-muted py-10">
                    <p>No faculty members found.</p>
                </div>
            ) : (
                facultyList.map((f, idx) => {
                  const research = parseList(f.research);
                  const publications = parseList(f.publications);
                  // Initials logic (Name first letters)
                  const initials = f.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase();

                  return (
                    <AnimateIn key={f.id} type={idx % 2 === 0 ? "slideLeft" : "slideRight"} delay={0.05}>
                        <div className="bg-background-paper rounded-2xl shadow-brand border border-border-light overflow-hidden transition-all duration-300 hover:shadow-brand-lg">
                        <div className="grid md:grid-cols-[240px_1fr]">
                            {/* Left — Profile column */}
                            <div className={`bg-gradient-to-br ${COLORS[idx % COLORS.length].from} ${COLORS[idx % COLORS.length].to} p-8 flex flex-col items-center justify-center text-center`}>
                            {f.imageUrl ? (
                                <img src={f.imageUrl} alt={f.name} className="w-24 h-24 rounded-full object-cover ring-4 ring-white/20 mb-4" />
                            ) : (
                                <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center ring-4 ring-white/20 mb-4">
                                    <span className="text-2xl font-heading font-bold text-white/90">{initials}</span>
                                </div>
                            )}
                            <h3 className="text-lg font-heading font-bold text-white">{f.name}</h3>
                            <p className="text-xs text-gold-100 font-semibold mt-1">{f.designation}</p>
                            {/* Contact */}
                            <div className="mt-5 pt-4 border-t border-white/15 w-full space-y-1.5">
                                {f.email && <p className="text-xs text-white/70">{f.email}</p>}
                                {f.phone && <p className="text-xs text-white/70">{f.phone}</p>}
                            </div>
                            </div>

                            {/* Right — Details */}
                            <div className="p-8 space-y-5">
                            {/* Top row: Qualification, Specialization (mapped to Dept), Experience */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="bg-background-muted rounded-lg p-4">
                                <p className="text-[10px] font-bold text-primary/50 uppercase tracking-wider mb-1">Qualification</p>
                                <p className="text-sm text-foreground-muted leading-snug">{f.qualification || "Ph.D."}</p>
                                </div>
                                <div className="bg-background-muted rounded-lg p-4">
                                <p className="text-[10px] font-bold text-primary/50 uppercase tracking-wider mb-1">Department</p>
                                <p className="text-sm text-foreground-muted leading-snug">{f.department}</p>
                                </div>
                                <div className="bg-background-muted rounded-lg p-4">
                                <p className="text-[10px] font-bold text-primary/50 uppercase tracking-wider mb-1">Experience</p>
                                <p className="text-sm text-foreground-muted leading-snug">{f.experience || "10+ Years"}</p>
                                </div>
                            </div>

                            {/* Research Interests - Only show if exists */}
                            {research.length > 0 && (
                                <div>
                                    <p className="text-[10px] font-bold text-primary/50 uppercase tracking-wider mb-2">Research Interests</p>
                                    <div className="flex flex-wrap gap-2">
                                    {research.map((r, i) => (
                                        <span key={i} className="text-xs bg-gradient-to-r from-gold/10 to-gold/5 text-gold border border-gold/20 px-3.5 py-1.5 rounded-full font-medium">{r}</span>
                                    ))}
                                    </div>
                                </div>
                            )}

                            {/* Publications - Only show if exists */}
                            {publications.length > 0 && (
                                <div>
                                    <p className="text-[10px] font-bold text-primary/50 uppercase tracking-wider mb-2">Selected Publications</p>
                                    <ul className="space-y-2">
                                    {publications.map((pub, i) => (
                                        <li key={i} className="flex items-start gap-2.5 text-xs text-foreground-muted leading-relaxed">
                                        <svg className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
                        </div>
                    </AnimateIn>
                  );
                })
            )}

          </div>
        </div>
      </section>
    </>
  );
}
