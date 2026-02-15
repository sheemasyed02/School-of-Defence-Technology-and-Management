import { createMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/ui";
import { AnimateIn } from "@/components/animation";

export const metadata = createMetadata({
  title: "Contact",
  description:
    "Get in touch with the School of Defence Technology and Management for any inquiries or information.",
});

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Contact Us"
        subtitle="We'd love to hear from you. Get in touch with us for any inquiries or information."
        breadcrumb="Contact"
      />

      {/* ─── Contact Information ───────────────────────── */}
      <section className="section-padding bg-background">
        <div className="container-site">
          <AnimateIn type="fadeUp" className="section-heading">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold mb-3">Get in Touch</p>
            <h2>Contact Information</h2>
            <div className="section-divider mx-auto mt-4" />
          </AnimateIn>

          <div className="mt-12 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Address */}
            <AnimateIn type="fadeUp">
              <div className="group bg-background-paper rounded-xl shadow-brand border border-border-light p-6 h-full transition-all duration-300 hover:shadow-brand-lg hover:-translate-y-1">
                <div className="w-11 h-11 rounded-xl bg-primary/5 flex items-center justify-center mb-4 group-hover:bg-gradient-to-br group-hover:from-gold group-hover:to-gold-500 transition-all duration-300">
                  <svg className="w-5 h-5 text-primary/50 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.4}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </div>
                <h3 className="text-sm font-heading font-bold text-primary mb-2">Address</h3>
                <p className="text-xs text-foreground-muted leading-relaxed">
                  Technology Management Department, University Campus, Building A, Room 301, City, State 12345
                </p>
              </div>
            </AnimateIn>

            {/* Email */}
            <AnimateIn type="fadeUp" delay={0.05}>
              <div className="group bg-background-paper rounded-xl shadow-brand border border-border-light p-6 h-full transition-all duration-300 hover:shadow-brand-lg hover:-translate-y-1">
                <div className="w-11 h-11 rounded-xl bg-primary/5 flex items-center justify-center mb-4 group-hover:bg-gradient-to-br group-hover:from-gold group-hover:to-gold-500 transition-all duration-300">
                  <svg className="w-5 h-5 text-primary/50 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.4}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <h3 className="text-sm font-heading font-bold text-primary mb-2">Email</h3>
                <p className="text-xs text-foreground-muted">techmanagement@university.edu</p>
              </div>
            </AnimateIn>

            {/* Phone */}
            <AnimateIn type="fadeUp" delay={0.1}>
              <div className="group bg-background-paper rounded-xl shadow-brand border border-border-light p-6 h-full transition-all duration-300 hover:shadow-brand-lg hover:-translate-y-1">
                <div className="w-11 h-11 rounded-xl bg-primary/5 flex items-center justify-center mb-4 group-hover:bg-gradient-to-br group-hover:from-gold group-hover:to-gold-500 transition-all duration-300">
                  <svg className="w-5 h-5 text-primary/50 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.4}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                </div>
                <h3 className="text-sm font-heading font-bold text-primary mb-2">Phone</h3>
                <p className="text-xs text-foreground-muted">+1 (555) 123-4500</p>
              </div>
            </AnimateIn>

            {/* Office Hours */}
            <AnimateIn type="fadeUp" delay={0.15}>
              <div className="group bg-background-paper rounded-xl shadow-brand border border-border-light p-6 h-full transition-all duration-300 hover:shadow-brand-lg hover:-translate-y-1">
                <div className="w-11 h-11 rounded-xl bg-primary/5 flex items-center justify-center mb-4 group-hover:bg-gradient-to-br group-hover:from-gold group-hover:to-gold-500 transition-all duration-300">
                  <svg className="w-5 h-5 text-primary/50 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.4}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-sm font-heading font-bold text-primary mb-2">Office Hours</h3>
                <p className="text-xs text-foreground-muted">Monday - Friday</p>
                <p className="text-xs text-foreground-muted">9:00 AM - 5:00 PM</p>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* ─── Location Map ──────────────────────────────── */}
      <section className="section-padding bg-background-muted">
        <div className="container-site">
          <AnimateIn type="fadeUp" className="section-heading">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold mb-3">Find Us</p>
            <h2>Location</h2>
            <div className="section-divider mx-auto mt-4" />
          </AnimateIn>
          <AnimateIn type="fadeUp">
            <div className="mt-10 max-w-5xl mx-auto w-full h-72 md:h-96 rounded-2xl overflow-hidden shadow-brand border border-border-light">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.835434509374!2d-122.4194155!3d37.7749295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858064e9b10001%3A0x94f0b5b65e68f4e!2sUniversity%20Campus!5e0!3m2!1sen!2sus!4v1700000000000"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="University Campus Location"
              />
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ─── Contact Form ──────────────────────────────── */}
      <section className="section-padding bg-background relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-72 h-72 dot-pattern opacity-30 rounded-full translate-y-1/3 translate-x-1/4" />
        <div className="container-site relative z-10">
          <AnimateIn type="fadeUp" className="section-heading">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold mb-3">Reach Out</p>
            <h2>Send us a Message</h2>
            <div className="section-divider mx-auto mt-4" />
          </AnimateIn>

          <AnimateIn type="fadeUp">
            <div className="mt-12 max-w-3xl mx-auto bg-background-paper rounded-2xl shadow-brand-lg border border-border-light overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-gold to-gold-500" />
              <form className="p-8 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-xs font-semibold text-foreground-muted mb-1.5">
                      Full Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Your full name"
                      className="w-full px-4 py-2.5 text-sm border border-border-light rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold/30 bg-background transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-semibold text-foreground-muted mb-1.5">
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      className="w-full px-4 py-2.5 text-sm border border-border-light rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold/30 bg-background transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-xs font-semibold text-foreground-muted mb-1.5">
                    Subject
                  </label>
                  <input
                    id="subject"
                    type="text"
                    placeholder="Subject of your inquiry"
                    className="w-full px-4 py-2.5 text-sm border border-border-light rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold/30 bg-background transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-xs font-semibold text-foreground-muted mb-1.5">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    placeholder="Write your message here..."
                    className="w-full px-4 py-2.5 text-sm border border-border-light rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold/30 bg-background resize-none transition-all"
                  />
                </div>
                <div className="pt-2">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 btn-primary"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                    </svg>
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}
