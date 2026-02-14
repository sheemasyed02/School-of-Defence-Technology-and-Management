import { createMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/ui";
import { AnimateIn, StaggerGroup } from "@/components/animation";

export const metadata = createMetadata({
  title: "Announcements",
  description: "Official announcements, circulars, notices, and news from the School of Defence Technology and Management.",
});

const PINNED = [
  {
    title: "Admissions Open — M.Tech & MBA Programmes 2025-26",
    date: "15 January 2025",
    category: "Admissions",
    body: "Applications are invited for M.Tech (Defence Technology, Cyber Security, Aerospace Engineering) and MBA (Defence Management) programmes for the academic year 2025-26. Apply through the official portal before 31 March 2025.",
  },
  {
    title: "International Conference on Defence Innovation — Call for Papers",
    date: "08 January 2025",
    category: "Conference",
    body: "SDTM is hosting ICDI-2025 on 20-22 March 2025. Researchers and practitioners are invited to submit papers on defence technology innovation, strategic management, and emerging threats.",
  },
];

const RECENT = [
  {
    title: "Semester Examination Schedule — Spring 2025",
    date: "12 January 2025",
    category: "Examinations",
    body: "The end-semester examination schedule for Spring 2025 has been published. Students are advised to check the examination portal for date-sheets and seating arrangements.",
  },
  {
    title: "Guest Lecture by Lt. Gen. (Retd.) on Strategic Defence Planning",
    date: "10 January 2025",
    category: "Lecture",
    body: "A distinguished guest lecture on 'India's Strategic Defence Roadmap: 2030 and Beyond' will be held on 18 January 2025 at the Main Auditorium.",
  },
  {
    title: "Winter Break — Office and Library Timings",
    date: "28 December 2024",
    category: "General",
    body: "During the winter break (25 Dec – 05 Jan), the administrative offices will operate from 10:00 AM to 4:00 PM and the library from 9:00 AM to 5:00 PM.",
  },
  {
    title: "DRDO Sponsored Research Grant — Proposal Submission Deadline Extended",
    date: "20 December 2024",
    category: "Research",
    body: "The deadline for submitting research proposals under the DRDO Sponsored Research Scheme has been extended to 15 January 2025. Faculty members are encouraged to apply.",
  },
  {
    title: "Placement Drive — HAL, BEL & BDL Campus Recruitment",
    date: "15 December 2024",
    category: "Placements",
    body: "Hindustan Aeronautics Limited, Bharat Electronics Limited, and Bharat Dynamics Limited will conduct campus recruitment drives during 10-15 February 2025.",
  },
  {
    title: "Annual Sports Meet 2025 — Registration Open",
    date: "10 December 2024",
    category: "Sports",
    body: "Registrations for the Annual Sports Meet 2025 are now open. Events include athletics, basketball, badminton, chess, and more. Register with your House Captain.",
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  Admissions: "bg-green-100 text-green-800",
  Conference: "bg-purple-100 text-purple-800",
  Examinations: "bg-red-100 text-red-800",
  Lecture: "bg-blue-100 text-blue-800",
  General: "bg-gray-100 text-gray-800",
  Research: "bg-yellow-100 text-yellow-800",
  Placements: "bg-teal-100 text-teal-800",
  Sports: "bg-orange-100 text-orange-800",
};

export default function AnnouncementsPage() {
  return (
    <>
      <PageHeader
        title="Announcements"
        subtitle="Stay updated with the latest circulars, notices, and news from SDTM."
        breadcrumb="Announcements"
      />

      {/* Pinned Announcements */}
      <section className="section-padding bg-background">
        <div className="container-site">
          <AnimateIn type="fadeUp" className="section-heading">
            <div className="gold-bar mx-auto mb-4" />
            <h2>Important Notices</h2>
          </AnimateIn>
          <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            {PINNED.map((a) => (
              <div
                key={a.title}
                className="card border-l-4 border-l-accent hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${CATEGORY_COLORS[a.category] ?? "bg-gray-100 text-gray-800"}`}>
                    {a.category}
                  </span>
                  <span className="text-xs text-foreground-muted">{a.date}</span>
                </div>
                <h3 className="text-base font-heading font-bold text-primary mb-2">{a.title}</h3>
                <p className="text-sm text-foreground-muted leading-relaxed">{a.body}</p>
                <div className="mt-4">
                  <span className="text-xs font-semibold text-accent cursor-pointer hover:underline">
                    Read More →
                  </span>
                </div>
              </div>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Recent Announcements */}
      <section className="section-padding bg-background-muted">
        <div className="container-site">
          <AnimateIn type="fadeUp" className="section-heading">
            <div className="gold-bar mx-auto mb-4" />
            <h2>Recent Announcements</h2>
          </AnimateIn>
          <StaggerGroup className="space-y-4 mt-10 max-w-3xl mx-auto">
            {RECENT.map((a) => (
              <div
                key={a.title}
                className="card flex flex-col sm:flex-row sm:items-start gap-4 hover:shadow-card-hover transition-shadow duration-300"
              >
                <div className="sm:w-28 shrink-0 text-center sm:text-left">
                  <p className="text-xs font-medium text-foreground-muted whitespace-nowrap">{a.date}</p>
                  <span className={`inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${CATEGORY_COLORS[a.category] ?? "bg-gray-100 text-gray-800"}`}>
                    {a.category}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-heading font-bold text-primary mb-1">{a.title}</h3>
                  <p className="text-xs text-foreground-muted leading-relaxed">{a.body}</p>
                </div>
              </div>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Archive CTA */}
      <section className="section-padding bg-background">
        <div className="container-site max-w-2xl text-center">
          <AnimateIn type="fadeUp">
            <p className="text-foreground-muted mb-4">
              Looking for older announcements? Browse our complete archive for past circulars, notices, and events.
            </p>
            <button className="btn-primary">View Full Archive</button>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}
