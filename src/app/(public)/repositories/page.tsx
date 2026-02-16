import { createMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/ui";
import { AnimateIn, StaggerGroup } from "@/components/animation";

export const metadata = createMetadata({
  title: "Repositories",
  description: "Download application forms, academic documents, and institutional resources from the School of Defence Technology.",
});

const APPLICATION_FORMS = [
  {
    title: "M.Tech Admission Application Form",
    desc: "Application form for M.Tech in Defence Technology program. Includes personal details, academic history, and statement of purpose sections.",
    format: "PDF",
    size: "245 KB",
    category: "Admissions",
    updated: "January 2026",
  },
  {
    title: "Ph.D. Research Admission Form",
    desc: "Application form for the doctoral program. Includes research proposal template and referee recommendation sections.",
    format: "PDF",
    size: "310 KB",
    category: "Admissions",
    updated: "January 2026",
  },
  {
    title: "Scholarship Application Form",
    desc: "Apply for merit-based scholarships, teaching assistantships, and research fellowships available to enrolled students.",
    format: "PDF",
    size: "180 KB",
    category: "Financial Aid",
    updated: "December 2025",
  },
  {
    title: "Hostel Accommodation Request",
    desc: "Request form for on-campus hostel accommodation. Includes room preference, medical declaration, and emergency contact details.",
    format: "PDF",
    size: "150 KB",
    category: "Student Services",
    updated: "November 2025",
  },
  {
    title: "No Objection Certificate (NOC) Form",
    desc: "NOC request for internships, industrial visits, or participation in external conferences and workshops.",
    format: "PDF",
    size: "95 KB",
    category: "Academic",
    updated: "October 2025",
  },
  {
    title: "Examination Re-evaluation Form",
    desc: "Request for re-evaluation of semester examination answer scripts. Must be submitted within 15 days of result publication.",
    format: "PDF",
    size: "110 KB",
    category: "Examination",
    updated: "August 2025",
  },
  {
    title: "Library Membership & Access Form",
    desc: "Registration form for institutional library access, digital repository credentials, and inter-library borrowing privileges.",
    format: "PDF",
    size: "120 KB",
    category: "Library",
    updated: "July 2025",
  },
  {
    title: "Research Lab Access Request",
    desc: "Request access to specialized research laboratories including Military Vehicle, Shock Tube, Rocket Propellant, and Polymer Labs.",
    format: "PDF",
    size: "135 KB",
    category: "Research",
    updated: "September 2025",
  },
  {
    title: "Thesis/Dissertation Submission Form",
    desc: "Submission form for M.Tech thesis or Ph.D. dissertation. Includes plagiarism declaration, supervisor sign-off, and abstract sections.",
    format: "PDF",
    size: "200 KB",
    category: "Academic",
    updated: "November 2025",
  },
  {
    title: "Alumni Registration Form",
    desc: "Register with the alumni association network. Stay connected for events, mentorship opportunities, and career resources.",
    format: "PDF",
    size: "140 KB",
    category: "Alumni",
    updated: "June 2025",
  },
  {
    title: "Bonafide Certificate Request",
    desc: "Request for bonafide student certificate for bank accounts, passport applications, and other official purposes.",
    format: "PDF",
    size: "85 KB",
    category: "Student Services",
    updated: "October 2025",
  },
  {
    title: "Transfer Certificate (TC) Application",
    desc: "Application for Transfer Certificate upon completion of program or transfer to another institution.",
    format: "PDF",
    size: "90 KB",
    category: "Student Services",
    updated: "August 2025",
  },
];

const CATEGORIES = Array.from(new Set(APPLICATION_FORMS.map((f) => f.category)));

const CATEGORY_COLORS: Record<string, string> = {
  "Admissions": "bg-primary/10 text-primary",
  "Financial Aid": "bg-gold/10 text-gold",
  "Student Services": "bg-secondary/10 text-secondary",
  "Academic": "bg-accent/10 text-accent",
  "Examination": "bg-accent/10 text-accent",
  "Library": "bg-gold/10 text-gold-600",
  "Research": "bg-primary/10 text-primary",
  "Alumni": "bg-secondary/10 text-secondary",
};

export default function RepositoriesPage() {
  return (
    <>
      <PageHeader
        title="Forms & Downloads"
        subtitle="Download official application forms, academic documents, and institutional resources."
        breadcrumb="Repositories"
      />

      {/* Quick Stats */}
      <section className="py-10 bg-background-muted border-b border-border-light">
        <div className="container-site">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {[
              { value: String(APPLICATION_FORMS.length), label: "Forms Available" },
              { value: String(CATEGORIES.length), label: "Categories" },
              { value: "PDF", label: "File Format" },
              { value: "2026", label: "Last Updated" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="stat-number text-3xl mb-1">{s.value}</p>
                <p className="text-xs text-foreground-muted font-semibold uppercase tracking-wide">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instructions */}
      <section className="section-padding bg-background">
        <div className="container-site max-w-4xl">
          <AnimateIn type="fadeUp">
            <div className="bg-background-paper rounded-2xl shadow-brand border border-border-light p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-heading font-bold text-primary mb-2">How to Use</h3>
                  <p className="text-base text-foreground-muted leading-relaxed">
                    Click the <strong className="text-primary">Download</strong> button to save the form as a PDF. Print the form, fill in the required details,
                    and submit it to the respective department office. For online submission, scan the filled form and upload it through the student portal.
                    Ensure all mandatory fields are completed before submission.
                  </p>
                </div>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* Forms by Category */}
      {CATEGORIES.map((category, ci) => {
        const forms = APPLICATION_FORMS.filter((f) => f.category === category);
        return (
          <section
            key={category}
            className={`section-padding ${ci % 2 === 0 ? "bg-background-muted" : "bg-background"}`}
          >
            <div className="container-site">
              <AnimateIn type="fadeUp">
                <div className="flex items-center gap-4 mb-8">
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-secondary rounded-xl px-5 py-3 shadow-md">
                    <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                    </svg>
                    <span className="text-sm font-bold text-white">{category}</span>
                  </div>
                  <div className="flex-1 h-px bg-border-light" />
                  <span className="text-sm text-foreground-muted font-medium">{forms.length} form{forms.length > 1 ? "s" : ""}</span>
                </div>
              </AnimateIn>

              <StaggerGroup className="space-y-4">
                {forms.map((form) => (
                  <div
                    key={form.title}
                    className="group bg-background-paper rounded-2xl shadow-brand border border-border-light overflow-hidden transition-all duration-300 hover:shadow-brand-lg hover:-translate-y-0.5"
                  >
                    <div className="flex flex-col md:flex-row md:items-center p-4 sm:p-5 md:p-6 gap-4 sm:gap-5">
                      {/* Icon */}
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-accent/5 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/10 transition-colors">
                        <svg className="w-7 h-7 text-accent/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.4}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                        </svg>
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1.5">
                          <h3 className="text-base md:text-lg font-heading font-bold text-primary">{form.title}</h3>
                          <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${CATEGORY_COLORS[form.category] || "bg-primary/10 text-primary"}`}>
                            {form.category}
                          </span>
                        </div>
                        <p className="text-sm text-foreground-muted leading-relaxed mb-2">{form.desc}</p>
                        <div className="flex flex-wrap items-center gap-4 text-xs text-foreground-muted">
                          <span className="flex items-center gap-1">
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                            </svg>
                            {form.format}
                          </span>
                          <span className="flex items-center gap-1">
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
                            </svg>
                            {form.size}
                          </span>
                          <span className="flex items-center gap-1">
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                            </svg>
                            Updated: {form.updated}
                          </span>
                        </div>
                      </div>

                      {/* Download Button */}
                      <div className="flex-shrink-0">
                        <button className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-xl text-sm font-bold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                          </svg>
                          Download
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </StaggerGroup>
            </div>
          </section>
        );
      })}

      {/* Submission Guidelines */}
      <section className="section-padding bg-background">
        <div className="container-site">
          <AnimateIn type="fadeUp" className="section-heading">
            <p className="text-sm sm:text-base font-semibold uppercase tracking-[0.2em] text-gold mb-3">Important</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl">Submission Guidelines</h2>
            <div className="section-divider mx-auto mt-4" />
          </AnimateIn>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
            {[
              {
                title: "Offline Submission",
                items: [
                  "Print the downloaded form on A4 size paper",
                  "Fill all mandatory fields in black or blue ink",
                  "Attach passport-size photograph where required",
                  "Submit with required documents to the respective office",
                  "Collect acknowledgment receipt for your records",
                ],
              },
              {
                title: "Online Submission",
                items: [
                  "Fill and scan the completed form (min. 300 DPI)",
                  "Save as PDF (max file size: 5 MB)",
                  "Login to student portal → Forms → Upload",
                  "Attach supporting documents as separate PDFs",
                  "Check status under 'My Applications' section",
                ],
              },
            ].map((guide) => (
              <AnimateIn key={guide.title} type="fadeUp">
                <div className="bg-background-paper rounded-2xl shadow-brand border border-border-light p-5 sm:p-6 md:p-8 h-full">
                  <h3 className="text-base sm:text-lg font-heading font-bold text-primary mb-3 sm:mb-4">{guide.title}</h3>
                  <ul className="space-y-3">
                    {guide.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-gold/10 text-gold text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <span className="text-sm text-foreground-muted leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* Help Section */}
      <section className="relative py-16 sm:py-20 md:py-24 bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-hero-radial opacity-60" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.1) 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="container-site relative z-10 text-center">
          <AnimateIn type="scaleIn">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-gold mb-3 sm:mb-4">Need Help?</p>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-white mb-3 sm:mb-4">Having trouble with a form?</h2>
            <p className="text-white/70 max-w-xl mx-auto mb-6 sm:mb-8 text-sm sm:text-base md:text-lg px-2">
              Contact the administration office for assistance with form filling, document requirements, or submission queries.
            </p>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
              <a href="/contact" className="btn-accent px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base">Contact Us</a>
              <a href="mailto:admin@university.edu" className="inline-flex items-center gap-2 bg-white/10 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl text-sm sm:text-base font-semibold hover:bg-white/20 transition-colors backdrop-blur-sm">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                Email Admin
              </a>
            </div>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}
