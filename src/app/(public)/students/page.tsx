import { createMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/ui";
import { AnimateIn, StaggerGroup } from "@/components/animation";
import { supabase } from "@/lib/supabase";
import { User, Award, BookOpen } from "lucide-react"; // Icons

export const metadata = createMetadata({
  title: "Students | School of Defence Technology",
  description: "Meet our talented students pursuing M.Tech and Ph.D. in Defence Technology.",
});

// Revalidate every 60 seconds
export const revalidate = 60;

type Student = {
  id: string;
  name: string;
  image_url: string | null;
  program_type: "M.Tech" | "Ph.D";
  order: number;
};

export default async function StudentsPage() {
  const { data: students, error } = await supabase
    .from("Student")
    .select("*")
    .order("order", { ascending: true })
    .order("created_at", { ascending: false }); // Secondary sort

  if (error) {
    console.error("Error fetching students:", error);
  }

  const allStudents = (students as Student[]) || [];

  const mtechStudents = allStudents.filter((s) => s.program_type === "M.Tech");
  const phdStudents = allStudents.filter((s) => s.program_type === "Ph.D");

  const studentGroups = [
    {
      label: "M.Tech Students",
      badge: "Postgraduate",
      students: mtechStudents,
      color: "from-primary to-secondary",
      icon: BookOpen
    },
    {
      label: "Ph.D. Students",
      badge: "Doctoral",
      students: phdStudents,
      color: "from-gold to-gold-500",
      icon: Award
    },
  ].filter(g => g.students.length > 0);

  return (
    <>
      <PageHeader
        title="Our Students"
        subtitle="Meet the brilliant minds shaping the future of defence technology."
        breadcrumb="Students"
      />

      {/* Intro */}
      <section className="py-12 bg-background border-b border-border-light">
          <div className="container-site max-w-4xl text-center space-y-4">
               <AnimateIn type="fadeUp">
                  <p className="text-lg text-foreground-muted leading-relaxed">
                     Our department is home to a diverse group of scholars and researchers dedicated to advancing the field of defence technology.
                  </p>
               </AnimateIn>
          </div>
      </section>

      {/* Student Lists */}
      {studentGroups.length === 0 ? (
          <div className="py-20 text-center text-gray-500">
              <h3 className="text-xl font-bold">No students found.</h3>
          </div>
      ) : (
      studentGroups.map((group, gi) => (
        <section
          key={group.label}
          className={`section-padding ${gi % 2 === 0 ? "bg-background-muted" : "bg-background"} relative overflow-hidden`}
        >
          {gi === 0 && <div className="absolute top-0 right-0 w-72 h-72 dot-pattern opacity-40 rounded-full -translate-y-1/3 translate-x-1/4" />}

          <div className="container-site relative z-10">
            <AnimateIn type="fadeUp">
              <div className="flex flex-col sm:flex-row sm:items-center gap-5 mb-10">
                <div className={`inline-flex items-center gap-3 bg-gradient-to-r ${group.color} rounded-xl px-5 py-3 shadow-md`}>
                  <group.icon className="w-5 h-5 text-white" />
                  <span className="text-sm font-bold text-white">{group.students.length} Students</span>
                </div>
                <div>
                   <div className="flex items-center gap-3">
                      <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary">{group.label}</h2>
                      <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wider">{group.badge}</span>
                   </div>
                </div>
              </div>
            </AnimateIn>

            <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {group.students.map((student) => (
                <div key={student.id} className="group bg-background-paper rounded-xl shadow-sm border border-border-light p-4 flex items-center gap-4 transition-all duration-300 hover:shadow-brand-lg hover:-translate-y-1">
                  <div className={`w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-sm flex-shrink-0 bg-gray-100 flex items-center justify-center`}>
                    {student.image_url ? (
                        <img src={student.image_url} alt={student.name} className="w-full h-full object-cover" />
                    ) : (
                        <span className={`text-lg font-bold text-gray-500 uppercase`}>{student.name.charAt(0)}</span>
                    )}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-primary leading-tight group-hover:text-gold transition-colors">{student.name}</h3>
                    <p className="text-xs text-foreground-muted mt-1 uppercase tracking-wide">{student.program_type}</p>
                  </div>
                </div>
              ))}
            </StaggerGroup>
          </div>
        </section>
      ))
      )}
    </>
  );
}
