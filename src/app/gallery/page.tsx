import { createMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/ui";
import { AnimateIn, StaggerGroup } from "@/components/animation";

export const metadata = createMetadata({
  title: "Gallery",
  description: "Photo gallery showcasing campus life, events, research labs, and student activities.",
});

const GALLERY_CATEGORIES = [
  {
    title: "Campus & Infrastructure",
    images: [
      { alt: "Main Academic Block", desc: "The state-of-the-art main building housing classrooms, faculty offices, and administrative facilities." },
      { alt: "Central Library", desc: "A modern library with extensive print and digital collections for research and study." },
      { alt: "Research Laboratories", desc: "Well-equipped laboratories for hands-on research in defence technology." },
      { alt: "Sports Complex", desc: "Multi-purpose sports facility with indoor and outdoor amenities." },
    ],
  },
  {
    title: "Events & Conferences",
    images: [
      { alt: "International Conference 2025", desc: "Distinguished speakers and delegates at the Annual Defence Technology Conference." },
      { alt: "Foundation Day Celebration", desc: "Students and faculty during the Foundation Day festivities." },
      { alt: "Hackathon 2025", desc: "Teams competing in the national cybersecurity hackathon." },
      { alt: "Guest Lecture Series", desc: "Senior defence leaders sharing insights with students." },
    ],
  },
  {
    title: "Student Life",
    images: [
      { alt: "Convocation Ceremony", desc: "Graduating students receiving their degrees at the annual convocation." },
      { alt: "Cultural Festival", desc: "Students performing during the annual cultural week." },
      { alt: "Robotics Club", desc: "Student-built autonomous robots during a national competition." },
      { alt: "Campus Life", desc: "Students collaborating in the campus common areas." },
    ],
  },
  {
    title: "Research & Innovation",
    images: [
      { alt: "UAV Testing", desc: "Testing of student-designed autonomous UAVs at the campus airfield." },
      { alt: "Cyber Lab", desc: "Students in the cybersecurity lab during a live threat simulation exercise." },
      { alt: "DRDO Collaboration", desc: "Joint research demonstration with DRDO scientists." },
      { alt: "Publication Awards", desc: "Faculty and students recognized for outstanding research publications." },
    ],
  },
];

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        title="Gallery"
        subtitle="A visual journey through our campus, events, and student life."
        breadcrumb="Gallery"
      />

      {GALLERY_CATEGORIES.map((cat, ci) => (
        <section
          key={cat.title}
          className={`section-padding ${ci % 2 === 0 ? "bg-background" : "bg-background-muted"}`}
        >
          <div className="container-site">
            <AnimateIn type="fadeUp" className="section-heading">
              <div className="gold-bar mx-auto mb-4" />
              <h2>{cat.title}</h2>
            </AnimateIn>
            <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
              {cat.images.map((img) => (
                <div
                  key={img.alt}
                  className="group relative rounded-brand overflow-hidden bg-primary/5 aspect-[4/3] flex items-end hover:shadow-brand-lg transition-shadow duration-300"
                >
                  {/* Placeholder - replace with actual images */}
                  <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-primary/40 flex items-center justify-center">
                    <svg className="w-12 h-12 text-primary/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm12.75-11.25h.008v.008h-.008V8.25Z" />
                    </svg>
                  </div>
                  <div className="relative z-10 p-4 w-full bg-gradient-to-t from-black/60 to-transparent">
                    <h3 className="text-sm font-semibold text-white mb-0.5">{img.alt}</h3>
                    <p className="text-xs text-white/70">{img.desc}</p>
                  </div>
                </div>
              ))}
            </StaggerGroup>
          </div>
        </section>
      ))}
    </>
  );
}
