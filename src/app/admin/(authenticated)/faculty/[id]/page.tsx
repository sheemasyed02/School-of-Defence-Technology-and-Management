import { supabase } from "@/lib/supabase";
import { FacultyForm } from "@/components/admin/FacultyForm";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function EditFacultyPage({ params }: PageProps) {
  const { data: faculty, error } = await supabase
    .from("Faculty")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error || !faculty) {
    notFound();
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
       {/* @ts-ignore: Supabase return type matches Faculty interface structurally */}
      <FacultyForm initialData={faculty} />
    </div>
  );
}
