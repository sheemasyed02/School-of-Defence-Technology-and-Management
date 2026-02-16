import { StudentForm } from "@/components/admin/StudentForm";
import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";

interface EditStudentPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditStudentPage({ params }: EditStudentPageProps) {
  const { id } = await params;
  const { data: student } = await supabase
    .from("Student")
    .select("*")
    .eq("id", id)
    .single();

  if (!student) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-heading font-bold text-primary">Edit Student</h1>
      </div>
      <StudentForm initialData={student} />
    </div>
  );
}
