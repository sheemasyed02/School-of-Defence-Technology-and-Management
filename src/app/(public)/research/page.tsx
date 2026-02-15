import { createMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/ui";
import { AnimateIn, StaggerGroup } from "@/components/animation";

export const metadata = createMetadata({
  title: "Research",
  description:
    "Research areas, ongoing projects, publications, patents, and labs at the School of Defence Technology and Management.",
});

/* ── SVG icon components ─────────────────────────────── */

const Icons = {
  ai: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.4}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 14.5M14.25 3.104c.251.023.501.05.75.082M19.8 14.5l-2.047 3.07a2.25 2.25 0 01-1.872 1.005H8.119a2.25 2.25 0 01-1.872-1.005L4.2 14.5m15.6 0h-3.528m-11.544 0H8.25" />
    </svg>
  ),
  data: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.4}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v-5.5m3 5.5V8.75" />
    </svg>
  ),
  blockchain: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.4}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
    </svg>
  ),
  iot: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.4}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
    </svg>
  ),
  cyber: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.4}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  ),
  cloud: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.4}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
    </svg>
  ),
  supply: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.4}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
    </svg>
  ),
  digital: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.4}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
    </svg>
  ),
  innovation: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.4}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
    </svg>
  ),
  startup: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.4}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
    </svg>
  ),
};

const iconKeys = Object.keys(Icons) as (keyof typeof Icons)[];

/* ── Data ─────────────────────────────────────────────── */

const RESEARCH_AREAS = [
  { name: "Artificial Intelligence & Machine Learning", icon: "ai" },
  { name: "Data Science & Big Data Analytics", icon: "data" },
  { name: "Blockchain Technology", icon: "blockchain" },
  { name: "Internet of Things (IoT)", icon: "iot" },
  { name: "Cybersecurity", icon: "cyber" },
  { name: "Cloud Computing", icon: "cloud" },
  { name: "Supply Chain Management", icon: "supply" },
  { name: "Digital Transformation", icon: "digital" },
  { name: "Innovation Management", icon: "innovation" },
  { name: "Technology Entrepreneurship", icon: "startup" },
] as const;

const ONGOING_PROJECTS = [
  {
    title: "AI-Driven Supply Chain Optimization",
    duration: "2024 – 2026",
    lead: "Dr. Sarah Johnson",
    desc: "Developing machine learning models for predictive demand forecasting and real-time supply chain optimization using advanced AI techniques.",
    status: "Active",
  },
  {
    title: "Blockchain for Healthcare Data Management",
    duration: "2025 – 2027",
    lead: "Dr. Maria Rodriguez",
    desc: "Implementing a secure, decentralized healthcare data management system using blockchain technology to ensure data integrity and patient privacy.",
    status: "Active",
  },
  {
    title: "Smart City IoT Infrastructure",
    duration: "2024 – 2026",
    lead: "Dr. Amit Patel",
    desc: "Designing and deploying a scalable IoT infrastructure for smart city applications including traffic management, energy efficiency, and environmental monitoring.",
    status: "Active",
  },
];

const PUBLICATIONS = [
  {
    authors: "Johnson, S., Chen, M.",
    title: "Machine Learning for Real-Time Supply Chain Forecasting",
    journal: "IEEE Transactions on AI",
    year: "2024",
  },
  {
    authors: "Rodriguez, M., Patel, A.",
    title: "Blockchain-Based Secure Data Exchange in Healthcare Systems",
    journal: "ACM Computing Surveys",
    year: "2024",
  },
  {
    authors: "Patel, A., Wang, L.",
    title: "Scalable IoT Architecture for Smart Urban Environments",
    journal: "Journal of IoT Research",
    year: "2023",
  },
];

const PATENTS = [
  {
    title: "Smart Inventory Management System Using IoT Sensors",
    year: "2024",
    inventors: "Dr. Maria Rodriguez, Dr. Michael Chen",
  },
  {
    title: "AI-Based Predictive Maintenance Framework",
    year: "2023",
    inventors: "Dr. Amit Patel",
  },
];

const RESEARCH_LABS = [
  {
    name: "Advanced Computing Lab",
    focus: "High-performance computing, parallel processing, distributed systems",
  },
  {
    name: "AI & Machine Learning Lab",
    focus: "Deep learning, NLP, computer vision, reinforcement learning",
  },
  {
    name: "IoT Research Lab",
    focus: "Sensor networks, edge computing, embedded systems",
  },
  {
    name: "Cybersecurity Lab",
    focus: "Network security, cryptography, ethical hacking",
  },
  {
    name: "Innovation & Entrepreneurship Lab",
    focus: "Prototyping, business model design, startup incubation",
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

/* ── Page ─────────────────────────────────────────────── */

export default function ResearchPage() {
  return (
    <>
      <PageHeader
        title="Research"
        subtitle="Our department is committed to cutting-edge research that drives innovation and addresses real-world challenges."
        breadcrumb="Research"
      />

      {/* ─── Quick Stats Bar ───────────────────────────── */}
      <section className="bg-background-paper border-b border-border-light">
        <div className="container-site py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "10", label: "Research Areas" },
              { value: "$5M+", label: "Annual Funding" },
              { value: "5", label: "Research Labs" },
              { value: "6", label: "Global Partners" },
            ].map((s) => (
              <div key={s.label}>
                <p className="stat-number text-2xl md:text-3xl">{s.value}</p>
                <p className="text-xs text-foreground-muted mt-1 uppercase tracking-wider font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Research Areas ────────────────────────────── */}
      <section className="section-padding bg-background">
        <div className="container-site">
          <AnimateIn type="fadeUp" className="section-heading">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold mb-3">Focus Areas</p>
            <h2>Research Domains</h2>
            <div className="section-divider mx-auto mt-4" />
          </AnimateIn>

          <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mt-12 max-w-6xl mx-auto">
            {RESEARCH_AREAS.map((area) => (
              <div
                key={area.name}
                className="group bg-background-paper rounded-xl border border-border-light shadow-sm p-6 text-center transition-all duration-300 hover:shadow-brand hover:border-gold/30 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center mx-auto mb-4 text-primary/60 group-hover:bg-gradient-to-br group-hover:from-gold group-hover:to-gold-500 group-hover:text-white transition-all duration-300">
                  {Icons[area.icon as keyof typeof Icons]}
                </div>
                <p className="text-xs font-semibold text-primary leading-snug">{area.name}</p>
              </div>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* ─── Ongoing Projects ──────────────────────────── */}
      <section className="section-padding bg-background-muted">
        <div className="container-site">
          <AnimateIn type="fadeUp" className="section-heading">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold mb-3">Current Work</p>
            <h2>Ongoing Research Projects</h2>
            <div className="section-divider mx-auto mt-4" />
          </AnimateIn>

          <div className="mt-12 max-w-5xl mx-auto space-y-6">
            {ONGOING_PROJECTS.map((proj, i) => (
              <AnimateIn key={proj.title} type={i % 2 === 0 ? "slideLeft" : "slideRight"}>
                <div className="group bg-background-paper rounded-2xl shadow-brand border border-border-light overflow-hidden transition-all duration-300 hover:shadow-brand-lg hover:-translate-y-0.5">
                  <div className="flex flex-col md:flex-row">
                    {/* Side panel */}
                    <div className="md:w-56 bg-gradient-to-br from-primary to-secondary p-6 flex flex-col items-center justify-center text-center shrink-0">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold text-green-300 uppercase tracking-wider mb-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                        {proj.status}
                      </span>
                      <p className="text-sm font-heading font-bold text-white">{proj.duration}</p>
                      <div className="w-8 h-px bg-gold/40 my-3" />
                      <div className="flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg>
                        <span className="text-xs text-white/80">{proj.lead}</span>
                      </div>
                    </div>
                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col justify-center">
                      <h3 className="text-lg font-heading font-bold text-primary mb-3">{proj.title}</h3>
                      <p className="text-sm text-foreground-muted leading-relaxed">{proj.desc}</p>
                    </div>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Publications ──────────────────────────────── */}
      <section className="section-padding bg-background">
        <div className="container-site">
          <AnimateIn type="fadeUp" className="section-heading">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold mb-3">Published Work</p>
            <h2>Recent Publications</h2>
            <div className="section-divider mx-auto mt-4" />
          </AnimateIn>

          <StaggerGroup className="mt-12 max-w-4xl mx-auto space-y-4">
            {PUBLICATIONS.map((pub) => (
              <div
                key={pub.title}
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
                      <span className="inline-block rounded-full bg-gold/10 px-2.5 py-0.5 text-[10px] font-bold text-gold">{pub.year}</span>
                      <span className="text-xs text-foreground-muted italic">{pub.journal}</span>
                    </div>
                    <h3 className="text-sm font-heading font-bold text-primary mb-1.5">{pub.title}</h3>
                    <p className="text-xs text-foreground-muted">{pub.authors}</p>
                  </div>
                </div>
              </div>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* ─── Patents ───────────────────────────────────── */}
      <section className="section-padding bg-background-muted">
        <div className="container-site">
          <AnimateIn type="fadeUp" className="section-heading">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold mb-3">Intellectual Property</p>
            <h2>Patents</h2>
            <div className="section-divider mx-auto mt-4" />
          </AnimateIn>

          <StaggerGroup className="mt-12 max-w-3xl mx-auto space-y-4">
            {PATENTS.map((pat) => (
              <div
                key={pat.title}
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
                    <span className="inline-block rounded-full bg-gold/10 px-2 py-0.5 text-[10px] font-bold text-gold">{pat.year}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-foreground-muted">
                    <svg className="w-3.5 h-3.5 text-primary/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                    {pat.inventors}
                  </div>
                </div>
              </div>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* ─── Research Labs ─────────────────────────────── */}
      <section className="section-padding bg-background">
        <div className="container-site">
          <AnimateIn type="fadeUp" className="section-heading">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold mb-3">Facilities</p>
            <h2>Research Labs</h2>
            <div className="section-divider mx-auto mt-4" />
          </AnimateIn>

          <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-12 max-w-5xl mx-auto">
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

      {/* ─── Research Funding ──────────────────────────── */}
      <section className="section-padding bg-background-muted">
        <div className="container-site">
          <div className="max-w-5xl mx-auto grid md:grid-cols-[1fr_auto] gap-10 items-center">
            <AnimateIn type="slideLeft">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold mb-3">Support</p>
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary mb-4">Research Funding</h2>
              <div className="section-divider mb-6" />
              <p className="text-foreground-muted leading-relaxed">
                The department receives over <strong className="text-primary">$5 million annually</strong> in
                research funding from government agencies, industry partnerships, and international grants. This
                funding supports cutting-edge projects, state-of-the-art lab equipment, and faculty and student
                research initiatives.
              </p>
            </AnimateIn>
            <AnimateIn type="scaleIn">
              <div className="w-40 h-40 md:w-48 md:h-48 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg relative overflow-hidden">
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle, rgba(212,168,67,0.3) 1px, transparent 1px)", backgroundSize: "12px 12px" }} />
                <div className="text-center relative z-10">
                  <svg className="w-8 h-8 text-gold mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.4}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-3xl font-heading font-bold text-white leading-none">$5M+</p>
                  <p className="text-xs text-white/60 mt-1 font-medium">Annual Funding</p>
                </div>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* ─── Collaborations ────────────────────────────── */}
      <section className="section-padding bg-background">
        <div className="container-site">
          <AnimateIn type="fadeUp" className="section-heading">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold mb-3">Global Partners</p>
            <h2>Research Collaborations</h2>
            <div className="section-divider mx-auto mt-4" />
          </AnimateIn>

          <StaggerGroup className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mt-12 max-w-5xl mx-auto">
            {COLLABORATIONS.map((inst) => (
              <div
                key={inst}
                className="group bg-background-paper rounded-xl border border-border-light shadow-sm p-5 text-center transition-all duration-300 hover:shadow-brand hover:border-gold/30 hover:-translate-y-1"
              >
                <div className="w-11 h-11 rounded-full bg-primary/5 flex items-center justify-center mx-auto mb-3 group-hover:bg-gold/10 transition-colors">
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

      {/* ─── Student Research ──────────────────────────── */}
      <section className="section-padding bg-background-muted relative overflow-hidden">
        <div className="absolute top-0 left-0 w-72 h-72 dot-pattern opacity-30 rounded-full -translate-y-1/3 -translate-x-1/4" />
        <div className="container-site relative z-10">
          <AnimateIn type="fadeUp" className="section-heading">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold mb-3">Get Involved</p>
            <h2>Student Research</h2>
            <div className="section-divider mx-auto mt-4" />
          </AnimateIn>

          <AnimateIn type="fadeUp">
            <div className="max-w-3xl mx-auto mt-10 bg-background-paper rounded-2xl shadow-brand-lg border border-border-light overflow-hidden">
              <div className="p-8 text-center">
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
