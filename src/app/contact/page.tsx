import { createMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/ui";
import { AnimateIn, StaggerGroup } from "@/components/animation";

export const metadata = createMetadata({
  title: "Contact",
  description: "Get in touch with the School of Defence Technology and Management — addresses, phone, email, and inquiry form.",
});

const OFFICES = [
  {
    name: "Main Campus Office",
    address: "School of Defence Technology and Management, Defence Research & Development Organisation Campus, New Delhi – 110010, India",
    phone: "+91-11-2345-6789",
    email: "info@sdtm.edu.in",
    hours: "Mon–Fri: 9:00 AM – 5:30 PM",
  },
  {
    name: "Admissions Office",
    address: "Room 102, Administrative Block, SDTM Campus, New Delhi – 110010",
    phone: "+91-11-2345-6790",
    email: "admissions@sdtm.edu.in",
    hours: "Mon–Sat: 9:30 AM – 4:30 PM",
  },
  {
    name: "Research & Collaboration Cell",
    address: "Room 305, Research Block, SDTM Campus, New Delhi – 110010",
    phone: "+91-11-2345-6795",
    email: "research@sdtm.edu.in",
    hours: "Mon–Fri: 10:00 AM – 5:00 PM",
  },
];

const QUICK_CONTACTS = [
  { label: "General Enquiries", email: "info@sdtm.edu.in" },
  { label: "Placement Cell", email: "placements@sdtm.edu.in" },
  { label: "Alumni Relations", email: "alumni@sdtm.edu.in" },
  { label: "IT Helpdesk", email: "ithelpdesk@sdtm.edu.in" },
  { label: "Library Services", email: "library@sdtm.edu.in" },
  { label: "Hostel Administration", email: "hostel@sdtm.edu.in" },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Contact Us"
        subtitle="We'd love to hear from you. Reach out for admissions, research collaboration, or general inquiries."
        breadcrumb="Contact"
      />

      {/* Office Cards */}
      <section className="section-padding bg-background">
        <div className="container-site">
          <AnimateIn type="fadeUp" className="section-heading">
            <div className="gold-bar mx-auto mb-4" />
            <h2>Our Offices</h2>
          </AnimateIn>
          <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            {OFFICES.map((o) => (
              <div key={o.name} className="card hover:-translate-y-1 transition-transform duration-300">
                <h3 className="text-base font-heading font-bold text-primary mb-3">{o.name}</h3>
                <div className="space-y-2 text-sm text-foreground-muted">
                  <p>{o.address}</p>
                  <p><span className="font-semibold text-primary">Phone:</span> {o.phone}</p>
                  <p><span className="font-semibold text-primary">Email:</span> {o.email}</p>
                  <p><span className="font-semibold text-primary">Hours:</span> {o.hours}</p>
                </div>
              </div>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Inquiry Form + Quick Contacts */}
      <section className="section-padding bg-background-muted">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Form */}
            <AnimateIn type="fadeUp" className="lg:col-span-3">
              <div className="card">
                <h3 className="text-lg font-heading font-bold text-primary mb-4">Send Us a Message</h3>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-xs font-semibold text-foreground-muted mb-1">Full Name</label>
                      <input id="name" type="text" placeholder="Your full name" className="w-full px-3 py-2 text-sm border border-border-light rounded-md focus:outline-none focus:ring-2 focus:ring-gold/50 bg-background" />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-xs font-semibold text-foreground-muted mb-1">Email Address</label>
                      <input id="email" type="email" placeholder="you@example.com" className="w-full px-3 py-2 text-sm border border-border-light rounded-md focus:outline-none focus:ring-2 focus:ring-gold/50 bg-background" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-xs font-semibold text-foreground-muted mb-1">Subject</label>
                    <input id="subject" type="text" placeholder="Subject of your inquiry" className="w-full px-3 py-2 text-sm border border-border-light rounded-md focus:outline-none focus:ring-2 focus:ring-gold/50 bg-background" />
                  </div>
                  <div>
                    <label htmlFor="category" className="block text-xs font-semibold text-foreground-muted mb-1">Category</label>
                    <select id="category" className="w-full px-3 py-2 text-sm border border-border-light rounded-md focus:outline-none focus:ring-2 focus:ring-gold/50 bg-background text-foreground-muted">
                      <option>General Inquiry</option>
                      <option>Admissions</option>
                      <option>Research Collaboration</option>
                      <option>Placement</option>
                      <option>Alumni</option>
                      <option>Feedback</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-xs font-semibold text-foreground-muted mb-1">Message</label>
                    <textarea id="message" rows={5} placeholder="Write your message here..." className="w-full px-3 py-2 text-sm border border-border-light rounded-md focus:outline-none focus:ring-2 focus:ring-gold/50 bg-background resize-none" />
                  </div>
                  <button type="submit" className="btn-primary w-full sm:w-auto">Submit Inquiry</button>
                </form>
              </div>
            </AnimateIn>

            {/* Quick Contacts */}
            <AnimateIn type="fadeUp" delay={0.15} className="lg:col-span-2">
              <div className="card h-full">
                <h3 className="text-lg font-heading font-bold text-primary mb-4">Quick Contacts</h3>
                <div className="space-y-4">
                  {QUICK_CONTACTS.map((c) => (
                    <div key={c.label} className="flex flex-col">
                      <span className="text-xs font-semibold text-primary">{c.label}</span>
                      <span className="text-sm text-foreground-muted">{c.email}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-border-light">
                  <h4 className="text-sm font-heading font-bold text-primary mb-2">Emergency Contact</h4>
                  <p className="text-sm text-foreground-muted">Campus Security: +91-11-2345-9999</p>
                  <p className="text-xs text-foreground-muted mt-1">Available 24 × 7</p>
                </div>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="bg-background">
        <div className="container-site section-padding">
          <AnimateIn type="fadeUp" className="section-heading">
            <div className="gold-bar mx-auto mb-4" />
            <h2>Find Us</h2>
          </AnimateIn>
          <AnimateIn type="fadeUp">
            <div className="mt-10 w-full h-72 md:h-96 rounded-xl overflow-hidden bg-primary/5 border border-border-light flex items-center justify-center">
              <p className="text-foreground-muted text-sm">
                📍 Interactive Map — Embed your Google Maps iframe here
              </p>
            </div>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}
