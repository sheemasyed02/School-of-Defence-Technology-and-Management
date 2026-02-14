import { createMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/ui";
import { AnimateIn, StaggerGroup } from "@/components/animation";

export const metadata = createMetadata({
  title: "Students",
  description: "Current active students at the School of Defence Technology and Management across undergraduate, postgraduate, and doctoral programs.",
});

const STUDENT_GROUPS = [
  {
    label: "1st Year Active Students",
    badge: "B.Tech Year 1",
    students: [
      "Aarav Sharma", "Ananya Patel", "Arjun Kumar", "Diya Singh", "Ishaan Reddy",
      "Kavya Mehta", "Rohan Gupta", "Saanvi Joshi", "Vihaan Desai", "Zara Khan",
      "Aditya Verma", "Myra Kapoor", "Kabir Malhotra", "Navya Iyer", "Reyansh Nair",
    ],
    color: "from-primary to-secondary",
  },
  {
    label: "2nd Year Students",
    badge: "B.Tech Year 2",
    students: [
      "Advait Rao", "Anika Bose", "Dhruv Saxena", "Ira Chatterjee", "Kiaan Agarwal",
      "Larisa Menon", "Mihir Pandey", "Nisha Pillai", "Pranav Shetty", "Riya Banerjee",
      "Siddharth Kulkarni", "Tara Bhatt", "Vivaan Jain", "Yash Thakur", "Zoya Mishra",
    ],
    color: "from-gold to-gold-500",
  },
  {
    label: "M.Tech Students",
    badge: "Postgraduate",
    students: [
      "Akash Srinivasan", "Bhavna Krishnan", "Chetan Raghavan", "Deepika Venkatesh",
      "Gaurav Subramanian", "Harini Ramesh", "Karthik Narayanan", "Lakshmi Balakrishnan",
      "Manoj Sundaram", "Priya Natarajan",
    ],
    color: "from-accent to-accent-600",
  },
  {
    label: "Ph.D. Students",
    badge: "Doctoral",
    students: [
      "Dr. Candidate Arvind Mohan", "Dr. Candidate Divya Shankar", "Dr. Candidate Ganesh Iyer",
      "Dr. Candidate Kavitha Raman", "Dr. Candidate Prakash Murthy", "Dr. Candidate Sneha Gopalan",
      "Dr. Candidate Varun Krishnamurthy",
    ],
    color: "from-secondary to-primary",
  },
];

export default function StudentsPage() {
  return (
    <>
      <PageHeader
        title="Students"
        subtitle="Our department is proud to nurture talented students across undergraduate, postgraduate, and doctoral programs."
        breadcrumb="Students"
      />

      {/* Summary stats */}
      <section className="py-10 bg-background-muted border-b border-border-light">
        <div className="container-site">
          <StaggerGroup className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
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
              Below is the list of our current active students pursuing excellence in technology management. Our students come from diverse backgrounds and are shaping the future of technology-driven industries.
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
            <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {group.students.map((name) => (
                <div key={name} className="group bg-background-paper rounded-xl shadow-brand border border-border-light flex items-center gap-3 p-4 transition-all duration-300 hover:shadow-brand-lg hover:-translate-y-0.5">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${group.color} flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-sm font-heading font-bold text-white">{name[0]}</span>
                  </div>
                  <p className="text-sm font-medium text-primary truncate">{name}</p>
                </div>
              ))}
            </StaggerGroup>
          </div>
        </section>
      ))}
    </>
  );
}
