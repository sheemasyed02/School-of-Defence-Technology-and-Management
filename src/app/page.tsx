/* ═══════════════════════════════════════════════════════
   Home Page — Landing page
   ═══════════════════════════════════════════════════════ */

import { Hero } from "@/components/sections";
import { AnimateIn, StaggerGroup } from "@/components/animation";

export default function HomePage() {
  return (
    <>
      {/* ── Hero (client component with GSAP) ── */}
      <Hero />

      {/* ── Mission Preview Section ── */}
      <section className="section-padding bg-background">
        <div className="container-site">
          <AnimateIn type="fadeUp" className="section-heading">
            <div className="gold-bar mx-auto mb-4" />
            <h2>Our Mission</h2>
            <p>
              To advance defence technology through world-class education,
              cutting-edge research, and strategic management programmes that
              serve the nation&apos;s security interests.
            </p>
          </AnimateIn>

          <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {/* Card 1 */}
            <div className="card text-center group">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-5 group-hover:bg-primary/20 transition-colors">
                <svg
                  className="w-7 h-7 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-heading font-bold text-primary mb-3">
                Academic Excellence
              </h3>
              <p className="text-sm text-foreground-muted leading-relaxed">
                Rigorous programmes in defence technology, strategic studies,
                and management curated by leading experts.
              </p>
            </div>

            {/* Card 2 */}
            <div className="card text-center group">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-5 group-hover:bg-primary/20 transition-colors">
                <svg
                  className="w-7 h-7 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-heading font-bold text-primary mb-3">
                Cutting-Edge Research
              </h3>
              <p className="text-sm text-foreground-muted leading-relaxed">
                State-of-the-art laboratories and partnerships with defence
                organisations to drive innovation.
              </p>
            </div>

            {/* Card 3 */}
            <div className="card text-center group">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-5 group-hover:bg-primary/20 transition-colors">
                <svg
                  className="w-7 h-7 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-heading font-bold text-primary mb-3">
                National Security
              </h3>
              <p className="text-sm text-foreground-muted leading-relaxed">
                Training future leaders with strategic thinking and
                technological proficiency for defence.
              </p>
            </div>
          </StaggerGroup>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="relative py-20 bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-hero-radial opacity-60" />
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="container-site relative z-10 text-center">
          <AnimateIn type="fadeUp">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground-inverted mb-4">
              Ready to Shape the Future of Defence?
            </h2>
            <p className="text-foreground-inverted/70 max-w-xl mx-auto mb-8 text-lg">
              Join a community of scholars, researchers, and leaders committed
              to national security and technological innovation.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <a href="/admissions" className="btn-accent text-base px-8 py-3.5">
                Apply for Admission
              </a>
              <a
                href="/contact"
                className="btn-secondary border-foreground-inverted/40 text-foreground-inverted hover:bg-foreground-inverted hover:text-primary text-base px-8 py-3.5"
              >
                Get in Touch
              </a>
            </div>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}
