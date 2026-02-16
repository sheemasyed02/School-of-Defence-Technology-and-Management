import { supabase } from "@/lib/supabase";
import { FacultyForm } from "@/components/admin/FacultyForm";
import { notFound } from "next/navigation";


async function getFaculty(id: string) {
  const { data: faculty, error } = await supabase
    .from("Faculty")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching faculty:", error);
    return null;
  }
  return faculty;
}

export default async function EditFacultyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const faculty = await getFaculty(id);

  if (!faculty) {
    notFound();
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <FacultyForm initialData={faculty} />
    </div>
  );
}
