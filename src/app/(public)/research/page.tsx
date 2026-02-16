import { createMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/ui";
import { AnimateIn, StaggerGroup } from "@/components/animation";
import { supabase } from "@/lib/supabase";
import {
  Truck,
  Flame,
  Mountain,
  Activity,
  Waves,
  Thermometer,
  Battery,
  Zap,
  Microscope,
  Layers,
  Cloud,
  Pipette,
  ShieldAlert,
  Cpu,
  MonitorCheck
} from "lucide-react";

export const metadata = createMetadata({
  title: "Research",
  description:
    "Research areas, ongoing projects, publications, patents, and labs at the School of Defence Technology and Management.",
});

export const dynamic = 'force-dynamic';

async function getResearchData() {
  const { data, error } = await supabase
    .from("Research")
    .select("*")
    .eq("isVisible", true)
    .order("createdAt", { ascending: false });

  if (error) {
    console.error("Error fetching research data:", error);
    return [];
  }
  return data || [];
}

/* â”€â”€ SVG icon components â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */

const Icons = {
  combat: <Truck className="w-6 h-6" />,
  aircraft: <MonitorCheck className="w-6 h-6" />,
  energetic: <Flame className="w-6 h-6" />,
  terramechanics: <Mountain className="w-6 h-6" />,
  ivhm: <Activity className="w-6 h-6" />,
  fluid: <Waves className="w-6 h-6" />,
  heat: <Thermometer className="w-6 h-6" />,
  battery: <Battery className="w-6 h-6" />,
  power: <Zap className="w-6 h-6" />,
  nano: <Microscope className="w-6 h-6" />,
  composites: <Layers className="w-6 h-6" />,
  foams: <Cloud className="w-6 h-6" />,
  blends: <Pipette className="w-6 h-6" />,
  protection: <ShieldAlert className="w-6 h-6" />,
  cfd: <Cpu className="w-6 h-6" />,
};

const iconKeys = Object.keys(Icons) as (keyof typeof Icons)[];

/* â”€â”€ Static Data â”€â”€â”€â”€â”€â”€â”€â”€ */

const RESEARCH_AREAS = [
  { name: "Combat Vehicle", icon: "combat" },
  { name: "Aircraft Failure Analysis", icon: "aircraft" },
  { name: "Energetic Materials", icon: "energetic" },
  { name: "Terramechanics", icon: "terramechanics" },
  { name: "Integrated Vehicle Health Management", icon: "ivhm" },
  { name: "Fluid Mechanics", icon: "fluid" },
  { name: "Heat Transfer", icon: "heat" },
  { name: "Battery Thermal Management Systems", icon: "battery" },
  { name: "Military Vehicle Power Plant", icon: "power" },
  { name: "Polymer nanocomposites", icon: "nano" },
  { name: "Composites", icon: "composites" },
  { name: "Polymeric foams", icon: "foams" },
  { name: "Carbon Foam Polymer blends", icon: "blends" },
  { name: "Blast and Explosion Protection", icon: "protection" },
  { name: "Computational Fluid Dynamics", icon: "cfd" },
] as const;

const RESEARCH_LABS = [
  {
    name: "Combat Vehicle Laboratory",
    focus: "Design, dynamics, and performance analysis of advanced combat vehicles.",
  },
  {
    name: "ICV Laboratory",
    focus: "Infantry Combat Vehicle systems, modernization, and technical evaluation.",
  },
  {
    name: "Propulsion Laboratory",
    focus: "Advanced engine technologies, power plants, and exhaust mechanisms.",
  },
  {
    name: "Polymer Processing Laboratory",
    focus: "Materials science, composites, and specialized polymer applications for defence.",
  },
];

const COLLABORATIONS = [
  "MIT",
  "Stanford University",
  "Carnegie Mellon University",
  "IIT Delhi",
  "NUS Singapore",
  "TU Munich",
];

/* â”€â”€ Page â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */

export default async function ResearchPage() {
  const researchItems = await getResearchData();

  const projects = researchItems.filter(item => item.type === 'PROJECT');
  const publications = researchItems.filter(item => item.type === 'PUBLICATION');
  const patents = researchItems.filter(item => item.type === 'PATENT');

  const formatYear = (dateStr: string) => {
      if (!dateStr) return null;
      try {
          const year = new Date(dateStr).getFullYear();
          return isNaN(year) ? null : year.toString();
      } catch (e) {
          return null;
      }
  };

  const formatDuration = (start: string, end: string) => {
      if (!start || !end) return null;
      try {
        const sY = new Date(start).getFullYear();
        const eY = new Date(end).getFullYear();
        return `${sY} – ${eY}`;
      } catch (e) {
        return null;
      }
  };

  return (
    <>
      <PageHeader
        title="Research"
        subtitle="Our department is committed to cutting-edge research that drives innovation and addresses real-world challenges."
        breadcrumb="Research"
      />

      {/* â”€â”€â”€ Quick Stats Bar â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="bg-background-paper border-b border-border-light">
        <div className="container-site py-6 sm:py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
            {[
              { value: "15", label: "Research Areas" },
              { value: "$5M+", label: "Annual Funding" },
              { value: "4", label: "Research Labs" },
              { value: "6", label: "Partners" },
            ].map((s) => (
              <div key={s.label}>
                <p className="stat-number text-xl sm:text-2xl md:text-3xl">{s.value}</p>
                <p className="text-xs text-foreground-muted mt-1 uppercase tracking-wider font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* â”€â”€â”€ Research Areas â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="section-padding bg-background">
        <div className="container-site">
          <AnimateIn type="fadeUp" className="section-heading">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold mb-3">Focus Areas</p>
            <h2>Research Domains</h2>
            <div className="section-divider mx-auto mt-4" />
          </AnimateIn>

          <StaggerGroup className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5 max-w-6xl mx-auto">
            {RESEARCH_AREAS.map((area) => (
              <div
                key={area.name}
                className="group bg-background-paper rounded-xl border border-border-light shadow-sm p-4 sm:p-5 md:p-6 text-center transition-all duration-300 hover:shadow-brand hover:border-gold/30 hover:-translate-y-1"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl bg-primary/5 flex items-center justify-center mx-auto mb-3 sm:mb-4 text-primary/60 group-hover:bg-gradient-to-br group-hover:from-gold group-hover:to-gold-500 group-hover:text-white transition-all duration-300">
                  {Icons[area.icon as keyof typeof Icons]}
                </div>
                <p className="text-sm md:text-base font-semibold text-primary leading-snug">{area.name}</p>
              </div>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* â”€â”€â”€ Ongoing Projects â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="section-padding bg-background-muted overflow-hidden">
        <div className="container-site">
          <AnimateIn type="fadeUp" className="section-heading">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold mb-3">Current Work</p>
            <h2>Ongoing Research Projects</h2>
            <div className="section-divider mx-auto mt-4" />
          </AnimateIn>

          <div className="max-w-5xl mx-auto space-y-6">
            {projects.map((proj, i) => {
              const duration = formatDuration(proj.startDate, proj.endDate);
              const hasSidebar = proj.status || duration || proj.authors;

              return (
                <AnimateIn key={proj.id} type={i % 2 === 0 ? "slideLeft" : "slideRight"}>
                  <div className="group bg-background-paper rounded-2xl shadow-brand border border-border-light overflow-hidden transition-all duration-300 hover:shadow-brand-lg hover:-translate-y-0.5">
                    <div className="flex flex-col md:flex-row">
                      {/* Side panel */}
                      {hasSidebar && (
                        <div className="md:w-56 lg:w-64 bg-gradient-to-br from-primary to-secondary p-6 sm:p-8 flex flex-row md:flex-col items-center justify-center text-center shrink-0 gap-3 md:gap-0">
                          {proj.status && (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold text-green-300 uppercase tracking-wider mb-3">
                              <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                              {proj.status}
                            </span>
                          )}
                          {duration && <p className="text-sm font-heading font-bold text-white mb-3">{duration}</p>}
                          {proj.authors && (
                            <>
                              <div className="w-8 h-px bg-gold/40 my-3" />
                              <div className="flex items-center gap-1.5 justify-center">
                                <svg className="w-3.5 h-3.5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                </svg>
                                <span className="text-xs text-white/80 font-medium">{proj.authors}</span>
                              </div>
                            </>
                          )}
                        </div>
                      )}
                      {/* Content */}
                      <div className="p-6 sm:p-8 md:p-10 flex-1 flex flex-col justify-center bg-white">
                        <h3 className="text-lg sm:text-xl md:text-2xl font-heading font-black text-primary leading-tight group-hover:text-gold transition-colors duration-300">{proj.title}</h3>
                        {proj.abstract && <p className="text-sm sm:text-base text-foreground-muted leading-relaxed mt-4 opacity-80 font-medium">{proj.abstract}</p>}
                      </div>
                    </div>
                  </div>
                </AnimateIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* â”€â”€â”€ Publications â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="section-padding bg-background overflow-hidden">
        <div className="container-site">
          <AnimateIn type="fadeUp" className="section-heading">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold mb-3">Published Work</p>
            <h2>Recent Publications</h2>
            <div className="section-divider mx-auto mt-4" />
          </AnimateIn>

          <StaggerGroup className="max-w-4xl mx-auto space-y-4">
            {publications.map((pub) => {
              const year = formatYear(pub.publicationDate);
              return (
                <div
                  key={pub.id}
                  className="bg-background-paper rounded-xl shadow-brand border border-border-light p-6 card-stripe transition-all duration-300 hover:shadow-brand-lg hover:-translate-y-0.5"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-5 h-5 text-primary/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.4}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {year && <span className="inline-block rounded-full bg-gold/10 px-2.5 py-0.5 text-[10px] font-bold text-gold">{year}</span>}
                        {pub.journal && <span className="text-xs text-foreground-muted italic">{pub.journal}</span>}
                      </div>
                      <h3 className="text-sm font-heading font-bold text-primary mb-1.5">{pub.title}</h3>
                      <p className="text-xs text-foreground-muted">{pub.authors}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </StaggerGroup>
        </div>
      </section>

      {/* â”€â”€â”€ Patents â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="section-padding bg-background-muted">
        <div className="container-site">
          <AnimateIn type="fadeUp" className="section-heading">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold mb-3">Intellectual Property</p>
            <h2>Patents</h2>
            <div className="section-divider mx-auto mt-4" />
          </AnimateIn>

          <StaggerGroup className="max-w-3xl mx-auto space-y-4">
            {patents.map((pat) => {
              const year = formatYear(pat.publicationDate);
              return (
                <div
                  key={pat.id}
                  className="bg-background-paper rounded-xl shadow-brand border border-border-light p-6 flex items-start gap-4 transition-all duration-300 hover:shadow-brand-lg hover:-translate-y-0.5"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0 shadow-sm">
                    <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <h3 className="text-sm font-heading font-bold text-primary">{pat.title}</h3>
                      {year && <span className="inline-block rounded-full bg-gold/10 px-2 py-0.5 text-[10px] font-bold text-gold">{year}</span>}
                    </div>
                    {pat.authors && (
                      <div className="flex items-center gap-1.5 text-xs text-foreground-muted">
                        <svg className="w-3.5 h-3.5 text-primary/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg>
                        {pat.authors}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </StaggerGroup>
        </div>
      </section>

      {/* â”€â”€â”€ Research Labs â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="section-padding bg-background">
        <div className="container-site">
          <AnimateIn type="fadeUp" className="section-heading">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold mb-3">Facilities</p>
            <h2>Research Labs</h2>
            <div className="section-divider mx-auto mt-4" />
          </AnimateIn>

          <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {RESEARCH_LABS.map((lab) => (
              <div
                key={lab.name}
                className="group bg-background-paper rounded-xl shadow-brand border border-border-light overflow-hidden transition-all duration-300 hover:shadow-brand-lg hover:-translate-y-1"
              >
                <div className="h-1 bg-gradient-to-r from-gold to-gold-500" />
                <div className="p-6">
                  <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center mb-4 group-hover:bg-gold/10 transition-colors">
                    <svg className="w-5 h-5 text-primary/50 group-hover:text-gold transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.4}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 14.5M14.25 3.104c.251.023.501.05.75.082M19.8 14.5l-2.047 3.07a2.25 2.25 0 01-1.872 1.005H8.119a2.25 2.25 0 01-1.872-1.005L4.2 14.5m15.6 0h-3.528m-11.544 0H8.25" />
                    </svg>
                  </div>
                  <h3 className="text-sm font-heading font-bold text-primary mb-2">{lab.name}</h3>
                  <p className="text-xs text-foreground-muted leading-relaxed">{lab.focus}</p>
                </div>
              </div>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* â”€â”€â”€ Research Funding â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="section-padding bg-background-muted overflow-hidden">
        <div className="container-site">
          <div className="max-w-5xl mx-auto grid md:grid-cols-[1fr_auto] gap-6 sm:gap-8 md:gap-10 items-center">
            <AnimateIn type="slideLeft">
              <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-gold mb-3">Support</p>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-heading font-bold text-primary mb-3 sm:mb-4">Research Funding</h2>
              <div className="section-divider mb-6" />
              <p className="text-foreground-muted leading-relaxed">
                The department receives over <strong className="text-primary">$5 million annually</strong> in
                research funding from government agencies, industry partnerships, and international grants. This
                funding supports cutting-edge projects, state-of-the-art lab equipment, and faculty and student
                research initiatives.
              </p>
            </AnimateIn>
            <AnimateIn type="scaleIn">
              <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg relative overflow-hidden mx-auto md:mx-0">
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle, rgba(212,168,67,0.3) 1px, transparent 1px)", backgroundSize: "12px 12px" }} />
                <div className="text-center relative z-10">
                  <svg className="w-8 h-8 text-gold mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.4}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-2xl sm:text-3xl font-heading font-bold text-white leading-none">$5M+</p>
                  <p className="text-xs text-white/60 mt-1 font-medium">Annual Funding</p>
                </div>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* â”€â”€â”€ Collaborations â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="section-padding bg-background">
        <div className="container-site">
          <AnimateIn type="fadeUp" className="section-heading">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold mb-3">Partners</p>
            <h2>Research Collaborations</h2>
            <div className="section-divider mx-auto mt-4" />
          </AnimateIn>

          <StaggerGroup className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 max-w-5xl mx-auto">
            {COLLABORATIONS.map((inst) => (
              <div
                key={inst}
                className="group bg-background-paper rounded-xl border border-border-light shadow-sm p-3 sm:p-4 md:p-5 text-center transition-all duration-300 hover:shadow-brand hover:border-gold/30 hover:-translate-y-1"
              >
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-primary/5 flex items-center justify-center mx-auto mb-2 sm:mb-3 group-hover:bg-gold/10 transition-colors">
                  <svg className="w-5 h-5 text-primary/40 group-hover:text-gold transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.4}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                  </svg>
                </div>
                <p className="text-xs font-semibold text-primary leading-tight">{inst}</p>
              </div>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* â”€â”€â”€ Student Research â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="section-padding bg-background-muted relative overflow-hidden">
        <div className="absolute top-0 left-0 w-72 h-72 dot-pattern opacity-30 rounded-full -translate-y-1/3 -translate-x-1/4" />
        <div className="container-site relative z-10">
          <AnimateIn type="fadeUp" className="section-heading">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold mb-3">Get Involved</p>
            <h2>Student Research</h2>
            <div className="section-divider mx-auto mt-4" />
          </AnimateIn>

          <AnimateIn type="fadeUp">
              <div className="max-w-3xl mx-auto bg-background-paper rounded-2xl shadow-brand-lg border border-border-light overflow-hidden">
              <div className="p-5 sm:p-6 md:p-8 text-center">
                <p className="text-foreground-muted leading-relaxed mb-8">
                  We encourage students to participate in research from their second year onwards. Students can work
                  with faculty on funded projects, publish papers, file patents, and present at national and
                  international conferences. Research assistantships and stipends are available for outstanding
                  students.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { value: "50+", label: "Student Publications", icon: (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.4}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                      </svg>
                    )},
                    { value: "20+", label: "Conference Presentations", icon: (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.4}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5" />
                      </svg>
                    )},
                    { value: "10+", label: "Research Assistantships", icon: (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.4}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342" />
                      </svg>
                    )},
                  ].map((stat) => (
                    <div key={stat.label} className="p-5 rounded-xl bg-primary/[0.03] border border-border-light">
                      <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center mx-auto mb-3 text-gold">
                        {stat.icon}
                      </div>
                      <p className="text-xl font-heading font-bold text-gold mb-1">{stat.value}</p>
                      <p className="text-xs text-foreground-muted font-medium">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}
