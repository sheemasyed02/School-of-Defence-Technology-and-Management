import { createMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/ui";
import { AnimateIn, StaggerGroup } from "@/components/animation";

export const metadata = createMetadata({
  title: "Events",
  description: "Upcoming events, workshops, and seminars at the School of Defence Technology and Management.",
});

const UPCOMING_EVENTS = [
  {
    title: "Annual Tech Symposium 2026",
    date: "March 15, 2026",
    venue: "Main Auditorium",
    description: "A day-long symposium featuring keynote speakers from the tech industry, student project showcases, and panel discussions on emerging technologies. Open to all students and faculty.",
    tag: "Symposium",
    cta: "Register Now",
  },
  {
    title: "Workshop: Machine Learning Fundamentals",
    date: "February 28, 2026",
    venue: "Computer Lab 3",
    description: "Hands-on workshop covering the basics of machine learning, including supervised and unsupervised learning, neural networks, and practical applications. Conducted by Dr. Michael Chen.",
    tag: "Workshop",
    cta: "Learn More",
  },
  {
    title: "Industry Panel Discussion",
    date: "March 10, 2026",
    venue: "Conference Hall",
    description: "A panel discussion with industry leaders on career opportunities in technology. Topics include AI, Cloud Computing, and Cybersecurity. Organized by the Placement Cell.",
    tag: "Panel",
    cta: "Learn More",
  },
];

const PAST_EVENTS = [
  {
    title: "Hackathon 2025",
    date: "December 10, 2025",
    venue: "Innovation Center",
    description: "A 24-hour hackathon where students built innovative solutions for real-world problems. Over 50 teams participated, with the winning team developing an AI-powered accessibility tool.",
    tag: "Hackathon",
  },
];

export default function EventsPage() {
  return (
    <>
      <PageHeader
        title="Events"
        subtitle="Stay updated with our upcoming events, workshops, seminars, and conferences."
        breadcrumb="Events"
      />

      {/* Upcoming Events */}
      <section className="section-padding bg-background">
        <div className="container-site">
          <AnimateIn type="fadeUp" className="section-heading">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-gold mb-3">What&apos;s Coming Up</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl">Upcoming Events</h2>
            <div className="section-divider mx-auto mt-4" />
          </AnimateIn>

          <div className="mt-12 max-w-5xl mx-auto space-y-6">
            {UPCOMING_EVENTS.map((evt, i) => (
              <AnimateIn key={evt.title} type={i % 2 === 0 ? "slideLeft" : "slideRight"}>
                <div className="group bg-background-paper rounded-2xl shadow-brand border border-border-light overflow-hidden flex flex-col md:flex-row transition-all duration-300 hover:shadow-brand-lg hover:-translate-y-0.5">
                  {/* Date panel */}
                  <div className="md:w-48 lg:w-52 bg-gradient-to-br from-primary to-secondary p-4 sm:p-5 md:p-6 flex flex-row md:flex-col items-center justify-center text-center shrink-0 gap-3 md:gap-0">
                    <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold text-gold uppercase tracking-wider mb-2">
                      {evt.tag}
                    </span>
                    <p className="text-lg font-heading font-bold text-white leading-tight">{evt.date}</p>
                    <div className="mt-2 flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                      <span className="text-xs text-white/80">{evt.venue}</span>
                    </div>
                  </div>
                  {/* Content */}
                  <div className="p-4 sm:p-5 md:p-6 flex-1 flex flex-col justify-center">
                    <h3 className="text-base sm:text-lg font-heading font-bold text-primary mb-2">{evt.title}</h3>
                    <p className="text-xs sm:text-sm text-foreground-muted leading-relaxed mb-3 sm:mb-4">{evt.description}</p>
                    <div>
                      <span className="inline-block btn-primary text-xs cursor-pointer">{evt.cta}</span>
                    </div>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* Past Events */}
      <section className="section-padding bg-background-muted">
        <div className="container-site">
          <AnimateIn type="fadeUp" className="section-heading">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-gold mb-3">Look Back</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl">Past Events</h2>
            <div className="section-divider mx-auto mt-4" />
          </AnimateIn>

          <div className="mt-12 max-w-5xl mx-auto space-y-6">
            {PAST_EVENTS.map((evt) => (
              <AnimateIn key={evt.title} type="fadeUp">
                <div className="bg-background-paper rounded-2xl shadow-brand border border-border-light overflow-hidden flex flex-col md:flex-row opacity-90">
                  {/* Date panel */}
                  <div className="md:w-48 lg:w-52 bg-gradient-to-br from-primary/80 to-secondary/80 p-4 sm:p-5 md:p-6 flex flex-row md:flex-col items-center justify-center text-center shrink-0 gap-3 md:gap-0">
                    <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold text-gold/80 uppercase tracking-wider mb-2">
                      {evt.tag}
                    </span>
                    <p className="text-lg font-heading font-bold text-white/90 leading-tight">{evt.date}</p>
                    <div className="mt-2 flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5 text-gold/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                      <span className="text-xs text-white/70">{evt.venue}</span>
                    </div>
                  </div>
                  {/* Content */}
                  <div className="p-4 sm:p-5 md:p-6 flex-1 flex flex-col justify-center">
                    <h3 className="text-base sm:text-lg font-heading font-bold text-primary mb-2">{evt.title}</h3>
                    <p className="text-xs sm:text-sm text-foreground-muted leading-relaxed">{evt.description}</p>
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
