import { createMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/ui";
import { AnimateIn, StaggerGroup } from "@/components/animation";

export const metadata = createMetadata({
  title: "About",
  description: "Learn about the School of Defence Technology and Management — our vision, mission, history, leadership, achievements, and infrastructure.",
});

const OBJECTIVES = [
  "Deliver cutting-edge curriculum that integrates technology, management, and innovation",
  "Foster a research culture that addresses real-world technological challenges",
  "Build strong industry partnerships for internships, placements, and collaborative projects",
  "Develop entrepreneurial mindset and leadership skills in students",
  "Promote ethical practices and sustainable technology solutions",
];

const ACHIEVEMENTS = [
  "Ranked among top 10 technology management programs nationally",
  "Over 95% placement rate for the past five years",
  "50+ research publications in top-tier journals annually",
  "Established innovation lab with state-of-the-art facilities",
  "Strong alumni network across leading tech companies globally",
];

const ACCREDITATIONS = [
  { name: "AACSB International Accreditation", icon: "M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" },
  { name: "ABET Accreditation for Engineering Programs", icon: "M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.562.562 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" },
  { name: "NBA Accreditation", icon: "M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M18.75 4.236c.982.143 1.954.317 2.916.52A6.003 6.003 0 0016.27 9.728M18.75 4.236V4.5c0 2.108-.966 3.99-2.48 5.228m0 0a6.04 6.04 0 01-4.27 1.772 6.04 6.04 0 01-4.27-1.772" },
  { name: "ISO 9001:2015 Certified", icon: "M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" },
];

const INFRASTRUCTURE = [
  { name: "Advanced Computer Labs with latest hardware and software", icon: "M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" },
  { name: "Innovation and Entrepreneurship Center", icon: "M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" },
  { name: "Technology Research Labs", icon: "M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" },
  { name: "Smart Classrooms with interactive learning tools", icon: "M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342" },
  { name: "Digital Library with access to international journals", icon: "M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" },
  { name: "Collaborative workspaces and project rooms", icon: "M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" },
];

const INDUSTRY_COLLABORATIONS = [
  { company: "Microsoft", area: "Cloud Computing and AI Research" },
  { company: "Google", area: "Data Analytics and Machine Learning" },
  { company: "Amazon", area: "E-commerce and Supply Chain Innovation" },
  { company: "IBM", area: "Enterprise Technology Solutions" },
  { company: "Cisco", area: "Network Infrastructure and IoT" },
  { company: "SAP", area: "Enterprise Resource Planning" },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About the Department"
        subtitle="A premier centre of excellence dedicated to advancing technology management education, applied research, and strategic leadership."
        breadcrumb="About"
      />

      {/* Our History */}
      <section className="section-padding bg-background relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 md:w-72 md:h-72 dot-pattern opacity-40 rounded-full -translate-y-1/3 translate-x-1/4" />
        <div className="container-site max-w-5xl relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-6 md:gap-10 items-center">
            <AnimateIn type="scaleIn">
              <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-xl md:rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg mx-auto md:mx-0">
                <div className="text-center">
                  <p className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-gold leading-none">1995</p>
                  <p className="text-xs text-white/70 font-semibold uppercase tracking-wide mt-1">Established</p>
                </div>
              </div>
            </AnimateIn>
            <AnimateIn type="fadeUp">
              <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-gold mb-2 md:mb-3 text-center md:text-left">Our Journey</p>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-heading font-bold text-primary mb-3 md:mb-4 text-center md:text-left">Our History</h2>
              <div className="section-divider mb-4 md:mb-6 mx-auto md:mx-0" />
              <p className="text-sm sm:text-base text-foreground-muted leading-relaxed text-center md:text-left">
                Established in 1995, the Technology Management Department has grown from a small program to one of the premier departments in the university. Over the past three decades, we have consistently evolved our curriculum to meet the changing demands of the technology industry while maintaining our commitment to academic excellence and research innovation.
              </p>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section-padding bg-background-muted overflow-hidden">
        <div className="container-site">
          <AnimateIn type="fadeUp" className="section-heading">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-gold mb-2 md:mb-3">Our Purpose</p>
            <h2 className="text-xl sm:text-2xl md:text-3xl">Vision &amp; Mission</h2>
            <div className="section-divider mx-auto mt-3 md:mt-4" />
          </AnimateIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
            <AnimateIn type="slideLeft">
              <div className="group relative bg-background-paper rounded-xl md:rounded-2xl shadow-brand border border-border-light p-6 md:p-8 h-full transition-all duration-300 hover:shadow-brand-lg hover:-translate-y-1 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gold-accent" />
                <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-5">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-lg md:rounded-xl bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 md:w-7 md:h-7 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl md:text-2xl font-heading font-bold text-primary">Vision</h3>
                </div>
                <p className="text-sm md:text-base text-foreground-muted leading-relaxed">
                  To be a globally recognized center of excellence in technology management education and research, shaping the future of technology-driven industries through innovative pedagogy and cutting-edge research.
                </p>
              </div>
            </AnimateIn>
            <AnimateIn type="slideRight">
              <div className="group relative bg-background-paper rounded-xl md:rounded-2xl shadow-brand border border-border-light p-6 md:p-8 h-full transition-all duration-300 hover:shadow-brand-lg hover:-translate-y-1 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-accent" />
                <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-5">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-lg md:rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 md:w-7 md:h-7 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                    </svg>
                  </div>
                  <h3 className="text-xl md:text-2xl font-heading font-bold text-primary">Mission</h3>
                </div>
                <p className="text-sm md:text-base text-foreground-muted leading-relaxed">
                  To provide world-class education in technology management, fostering innovation, research excellence, and industry collaboration to develop leaders who drive technological advancement and sustainable business practices.
                </p>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* Our Objectives */}
      <section className="section-padding bg-background overflow-hidden">
        <div className="container-site max-w-4xl">
          <AnimateIn type="fadeUp" className="section-heading">
            <p className="text-xs sm:text-sm md:text-base font-semibold uppercase tracking-[0.2em] text-gold mb-2 md:mb-3">What We Aim For</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl">Our Objectives</h2>
            <div className="section-divider mx-auto mt-3 md:mt-4" />
          </AnimateIn>
          <StaggerGroup className="space-y-4 md:space-y-5">
            {OBJECTIVES.map((obj, i) => (
              <div key={i} className="group flex items-start gap-4 md:gap-5 bg-background-paper rounded-lg md:rounded-xl shadow-brand border border-border-light p-4 md:p-6 transition-all duration-300 hover:shadow-brand-lg hover:-translate-y-0.5">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-lg md:rounded-xl bg-gradient-to-br from-gold to-gold-500 flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform duration-300">
                  <span className="text-lg md:text-xl font-heading font-bold text-white">{i + 1}</span>
                </div>
                <p className="text-base md:text-lg text-foreground-muted leading-relaxed pt-2 md:pt-3">{obj}</p>
              </div>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Message from HOD */}
      <section className="section-padding bg-background-muted relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-60 h-60 md:w-96 md:h-96 dot-pattern opacity-30 rounded-full translate-y-1/3 translate-x-1/4" />
        <div className="container-site max-w-5xl relative z-10">
          <AnimateIn type="fadeUp" className="section-heading">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-gold mb-2 md:mb-3">Leadership</p>
            <h2 className="text-xl sm:text-2xl md:text-3xl">Message from Head of Department</h2>
            <div className="section-divider mx-auto mt-3 md:mt-4" />
          </AnimateIn>
          <AnimateIn type="scaleIn">
            <div className="bg-background-paper rounded-xl md:rounded-2xl shadow-brand-lg border border-border-light overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] lg:grid-cols-[280px_1fr]">
                {/* Left column — photo & info */}
                <div className="bg-gradient-to-br from-primary to-secondary p-6 md:p-8 flex flex-col items-center justify-center text-center order-2 md:order-1">
                  <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-white/10 flex items-center justify-center ring-4 ring-gold/30 mb-3 md:mb-4">
                    <span className="text-2xl md:text-3xl font-heading font-bold text-white/80">SJ</span>
                  </div>
                  <h3 className="text-base md:text-lg font-heading font-bold text-white mt-2">Dr. Sarah Johnson</h3>
                  <p className="text-xs md:text-sm text-gold font-semibold mt-1">Head of Department</p>
                  <div className="w-10 md:w-12 h-0.5 bg-gold/40 rounded-full mt-3 md:mt-4" />
                </div>
                {/* Right column — message */}
                <div className="p-6 md:p-8 lg:p-10 flex items-center order-1 md:order-2">
                  <blockquote className="text-foreground-muted leading-relaxed italic relative">
                    <svg className="absolute -top-2 -left-2 w-8 h-8 md:w-10 md:h-10 text-gold/15" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11H10v10H0z" />
                    </svg>
                    <p className="pl-6 md:pl-8 text-sm md:text-base">
                      Welcome to the Technology Management Department. As we navigate an era of unprecedented technological change, our department stands at the forefront of preparing the next generation of technology leaders. Our faculty, students, and alumni form a vibrant community dedicated to innovation, excellence, and positive impact. I invite you to explore our programs and join us in shaping the future of technology management.
                    </p>
                  </blockquote>
                </div>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* Achievements */}
      <section className="section-padding bg-background overflow-hidden">
        <div className="container-site max-w-4xl">
          <AnimateIn type="fadeUp" className="section-heading">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-gold mb-2 md:mb-3">Our Pride</p>
            <h2 className="text-xl sm:text-2xl md:text-3xl">Achievements</h2>
            <div className="section-divider mx-auto mt-3 md:mt-4" />
          </AnimateIn>
          <StaggerGroup className="grid grid-responsive-2 gap-4 md:gap-5">
            {ACHIEVEMENTS.map((ach, i) => (
              <div key={ach} className="group flex items-center gap-3 md:gap-4 bg-background-paper rounded-lg md:rounded-xl shadow-brand border border-border-light p-4 md:p-5 transition-all duration-300 hover:shadow-brand-lg hover:-translate-y-0.5">
                <div className="w-9 h-9 md:w-10 md:h-10 rounded-md md:rounded-lg bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center flex-shrink-0 group-hover:from-gold/30 transition-all">
                  <svg className="w-4 h-4 md:w-5 md:h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                </div>
                <p className="text-xs sm:text-sm text-foreground-muted font-medium">{ach}</p>
              </div>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Accreditation & Rankings */}
      <section className="section-padding bg-background-muted overflow-hidden">
        <div className="container-site">
          <AnimateIn type="fadeUp" className="section-heading">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-gold mb-2 md:mb-3">Quality Assurance</p>
            <h2 className="text-xl sm:text-2xl md:text-3xl">Accreditation &amp; Rankings</h2>
            <div className="section-divider mx-auto mt-3 md:mt-4" />
          </AnimateIn>
          <StaggerGroup className="grid grid-responsive-4 gap-5 md:gap-6">
            {ACCREDITATIONS.map((acc) => (
              <div key={acc.name} className="group bg-background-paper rounded-xl md:rounded-2xl shadow-brand border border-border-light p-6 md:p-8 text-center transition-all duration-300 hover:shadow-brand-lg hover:-translate-y-1">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-gold/10 to-gold/5 rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-5 group-hover:scale-110 transition-transform duration-300 ring-1 ring-gold/20">
                  <svg className="w-7 h-7 md:w-8 md:h-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={acc.icon} />
                  </svg>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-primary leading-snug">{acc.name}</p>
              </div>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Infrastructure */}
      <section className="section-padding bg-background overflow-hidden">
        <div className="container-site">
          <AnimateIn type="fadeUp" className="section-heading">
            <p className="text-xs sm:text-sm md:text-base font-semibold uppercase tracking-[0.2em] text-gold mb-2 md:mb-3">Our Facilities</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl">Infrastructure</h2>
            <div className="section-divider mx-auto mt-3 md:mt-4" />
          </AnimateIn>
          <StaggerGroup className="grid grid-responsive-3 gap-5 md:gap-6">
            {INFRASTRUCTURE.map((item) => (
              <div key={item.name} className="group bg-background-paper rounded-lg md:rounded-xl shadow-brand border border-border-light p-5 md:p-6 flex items-start gap-3 md:gap-4 transition-all duration-300 hover:shadow-brand-lg hover:-translate-y-0.5">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-lg md:rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center flex-shrink-0 group-hover:from-primary/20 transition-all">
                  <svg className="w-6 h-6 md:w-7 md:h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                  </svg>
                </div>
                <p className="text-sm sm:text-base md:text-lg text-foreground-muted font-medium pt-2 md:pt-3">{item.name}</p>
              </div>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Industry Collaborations */}
      <section className="section-padding bg-background-muted relative overflow-hidden">
        <div className="absolute top-0 left-0 w-60 h-60 md:w-80 md:h-80 dot-pattern opacity-30 rounded-full -translate-y-1/3 -translate-x-1/4" />
        <div className="container-site relative z-10">
          <AnimateIn type="fadeUp" className="section-heading">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-gold mb-2 md:mb-3">Our Partners</p>
            <h2 className="text-xl sm:text-2xl md:text-3xl">Industry Collaborations</h2>
            <div className="section-divider mx-auto mt-3 md:mt-4" />
          </AnimateIn>
          <StaggerGroup className="grid grid-responsive-3 gap-5 md:gap-6">
            {INDUSTRY_COLLABORATIONS.map((collab) => (
              <div key={collab.company} className="group bg-background-paper rounded-xl md:rounded-2xl shadow-brand border border-border-light overflow-hidden transition-all duration-300 hover:shadow-brand-lg hover:-translate-y-1">
                <div className="h-1.5 bg-gold-accent" />
                <div className="p-5 md:p-6 flex items-center gap-4 md:gap-5">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-lg md:rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform duration-300">
                    <span className="text-lg md:text-xl font-heading font-bold text-white">{collab.company[0]}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm md:text-base font-heading font-bold text-primary mb-0.5 truncate">{collab.company}</h3>
                    <p className="text-xs text-foreground-muted truncate">{collab.area}</p>
                  </div>
                </div>
              </div>
            ))}
          </StaggerGroup>
        </div>
      </section>
    </>
  );
}
