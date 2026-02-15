import { createMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/ui";
import { AnimateIn, StaggerGroup } from "@/components/animation";
import Image from "next/image";

export const metadata = createMetadata({
  title: "Students",
  description: "Current active students at the School of Defence Technology and Management across postgraduate and doctoral programs.",
});

const STUDENT_GROUPS = [
  {
    label: "M.Tech Students",
    badge: "Postgraduate",
    students: [
      { name: "Akash Srinivasan", image: "https://randomuser.me/api/portraits/men/11.jpg" },
      { name: "Bhavna Krishnan", image: "https://randomuser.me/api/portraits/women/12.jpg" },
      { name: "Chetan Raghavan", image: "https://randomuser.me/api/portraits/men/13.jpg" },
      { name: "Deepika Venkatesh", image: "https://randomuser.me/api/portraits/women/14.jpg" },
      { name: "Gaurav Subramanian", image: "https://randomuser.me/api/portraits/men/15.jpg" },
      { name: "Harini Ramesh", image: "https://randomuser.me/api/portraits/women/16.jpg" },
      { name: "Karthik Narayanan", image: "https://randomuser.me/api/portraits/men/17.jpg" },
      { name: "Lakshmi Balakrishnan", image: "https://randomuser.me/api/portraits/women/18.jpg" },
      { name: "Manoj Sundaram", image: "https://randomuser.me/api/portraits/men/19.jpg" },
      { name: "Priya Natarajan", image: "https://randomuser.me/api/portraits/women/20.jpg" },
    ],
    color: "from-accent to-accent-600",
  },
  {
    label: "Ph.D. Students",
    badge: "Doctoral",
    students: [
      { name: "Arvind Mohan", image: "https://randomuser.me/api/portraits/men/21.jpg" },
      { name: "Divya Shankar", image: "https://randomuser.me/api/portraits/women/22.jpg" },
      { name: "Ganesh Iyer", image: "https://randomuser.me/api/portraits/men/23.jpg" },
      { name: "Kavitha Raman", image: "https://randomuser.me/api/portraits/women/24.jpg" },
      { name: "Prakash Murthy", image: "https://randomuser.me/api/portraits/men/25.jpg" },
      { name: "Sneha Gopalan", image: "https://randomuser.me/api/portraits/women/26.jpg" },
      { name: "Varun Krishnamurthy", image: "https://randomuser.me/api/portraits/men/27.jpg" },
    ],
    color: "from-secondary to-primary",
  },
];

export default function StudentsPage() {
  return (
    <>
      <PageHeader
        title="Students"
        subtitle="Our department is proud to nurture talented students across postgraduate and doctoral programs."
        breadcrumb="Students"
      />

      {/* Summary stats */}
      <section className="py-10 bg-background-muted border-b border-border-light">
        <div className="container-site">
          <StaggerGroup className="grid grid-cols-2 gap-6 max-w-md mx-auto">
            {STUDENT_GROUPS.map((g) => (
              <div key={g.label} className="text-center">
                <p className="stat-number text-3xl mb-1">{g.students.length}</p>
                <p className="text-xs text-foreground-muted font-semibold uppercase tracking-wide">{g.badge}</p>
              </div>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Intro */}
      <section className="section-padding bg-background">
        <div className="container-site max-w-4xl">
          <AnimateIn type="fadeUp">
            <p className="text-base text-foreground-muted leading-relaxed text-center">
              Below is the list of our current active students pursuing excellence in technology management across our postgraduate and doctoral programs.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* Student Lists */}
      {STUDENT_GROUPS.map((group, gi) => (
        <section
          key={group.label}
          className={`section-padding ${gi % 2 === 0 ? "bg-background-muted" : "bg-background"} relative overflow-hidden`}
        >
          {gi === 0 && <div className="absolute top-0 right-0 w-72 h-72 dot-pattern opacity-40 rounded-full -translate-y-1/3 translate-x-1/4" />}
          <div className="container-site relative z-10">
            <AnimateIn type="fadeUp">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-10">
                <div className={`inline-flex items-center gap-3 bg-gradient-to-r ${group.color} rounded-xl px-5 py-3 shadow-md`}>
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                  </svg>
                  <span className="text-sm font-bold text-white">{group.students.length} Students</span>
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary">{group.label}</h2>
                  <div className="section-divider mt-2" />
                </div>
              </div>
            </AnimateIn>
            <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {group.students.map((student) => (
                <div key={student.name} className="group bg-background-paper rounded-2xl shadow-brand border border-border-light flex items-center gap-4 p-5 transition-all duration-300 hover:shadow-brand-lg hover:-translate-y-0.5">
                  <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0 shadow-md group-hover:scale-110 transition-transform duration-300 relative bg-gradient-to-br from-primary to-secondary">
                    <span className="text-base font-heading font-bold text-white absolute inset-0 flex items-center justify-center z-0">{student.name[0]}</span>
                    <Image src={student.image} alt={student.name} fill className="object-cover relative z-10" sizes="56px" />
                  </div>
                  <p className="text-base font-semibold text-primary truncate">{student.name}</p>
                </div>
              ))}
            </StaggerGroup>
          </div>
        </section>
      ))}
    </>
  );
}
