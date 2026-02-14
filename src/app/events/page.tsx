import { createMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/ui";
import { AnimateIn, StaggerGroup } from "@/components/animation";

export const metadata = createMetadata({
  title: "Events",
  description: "Upcoming and past events at SDTM — conferences, seminars, workshops, and cultural programs.",
});

const UPCOMING = [
  { title: "International Conference on Defence AI & Autonomous Systems", date: "March 15–17, 2026", type: "Conference", desc: "A three-day international conference featuring keynotes from global defence AI experts, paper presentations, and technology demonstrations." },
  { title: "Cybersecurity Hackathon 2026", date: "April 5–6, 2026", type: "Competition", desc: "48-hour national hackathon challenging teams to solve real-world cybersecurity problems provided by industry and defence partners." },
  { title: "Guest Lecture: Future of Naval Warfare", date: "March 28, 2026", type: "Lecture", desc: "Admiral S. Karambir Singh (Retd.) discusses emerging naval strategies and technologies shaping maritime security." },
  { title: "Annual Sports Meet 2026", date: "April 12–14, 2026", type: "Cultural", desc: "Inter-batch sporting events across athletics, team sports, and martial arts, fostering camaraderie and fitness." },
];

const PAST = [
  { title: "SDTM Foundation Day Celebration", date: "January 26, 2026", type: "Institutional", desc: "Annual celebration featuring the Director's address, awards ceremony, and cultural performances." },
  { title: "Workshop on Quantum Computing for Defence", date: "December 10–11, 2025", type: "Workshop", desc: "Two-day hands-on workshop with experts from DRDO and IISc on quantum algorithms for cryptography." },
  { title: "Alumni Homecoming 2025", date: "November 15, 2025", type: "Alumni", desc: "Annual reunion bringing together 500+ alumni for networking, mentorship matching, and panel discussions." },
  { title: "SDTM-DRDO Joint Symposium on Missile Technology", date: "October 8, 2025", type: "Symposium", desc: "Collaborative symposium showcasing latest developments in missile guidance, propulsion, and defence systems." },
];

function EventCard({ event }: { event: typeof UPCOMING[0] }) {
  const typeColors: Record<string, string> = {
    Conference: "bg-primary/10 text-primary",
    Competition: "bg-accent/10 text-accent",
    Lecture: "bg-secondary/10 text-secondary",
    Cultural: "bg-gold/10 text-gold-700",
    Institutional: "bg-primary/10 text-primary",
    Workshop: "bg-secondary/10 text-secondary",
    Alumni: "bg-gold/10 text-gold-700",
    Symposium: "bg-accent/10 text-accent",
  };

  return (
    <div className="card group hover:-translate-y-1 transition-transform duration-300">
      <div className="flex items-center gap-3 mb-3">
        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${typeColors[event.type] || "bg-primary/10 text-primary"}`}>
          {event.type}
        </span>
        <span className="text-xs text-foreground-light">{event.date}</span>
      </div>
      <h3 className="text-base font-heading font-bold text-primary mb-2">{event.title}</h3>
      <p className="text-sm text-foreground-muted leading-relaxed">{event.desc}</p>
    </div>
  );
}

export default function EventsPage() {
  return (
    <>
      <PageHeader
        title="Events"
        subtitle="Conferences, workshops, hackathons, and cultural programs that enrich the SDTM experience."
        breadcrumb="Events"
      />

      {/* Upcoming */}
      <section className="section-padding bg-background">
        <div className="container-site">
          <AnimateIn type="fadeUp" className="section-heading">
            <div className="gold-bar mx-auto mb-4" />
            <h2>Upcoming Events</h2>
          </AnimateIn>
          <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            {UPCOMING.map((e) => (
              <EventCard key={e.title} event={e} />
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Past */}
      <section className="section-padding bg-background-muted">
        <div className="container-site">
          <AnimateIn type="fadeUp" className="section-heading">
            <div className="gold-bar mx-auto mb-4" />
            <h2>Past Events</h2>
          </AnimateIn>
          <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            {PAST.map((e) => (
              <EventCard key={e.title} event={e} />
            ))}
          </StaggerGroup>
        </div>
      </section>
    </>
  );
}
