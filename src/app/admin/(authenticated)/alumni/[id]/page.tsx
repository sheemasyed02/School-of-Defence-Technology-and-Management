import { AlumniForm } from "@/components/admin/AlumniForm";
import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";

interface EditAlumniPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditAlumniPage({ params }: EditAlumniPageProps) {
  const { id } = await params;
  const { data: alumni } = await supabase
    .from("Alumni")
    .select("*")
    .eq("id", id)
    .single();

  if (!alumni) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-heading font-bold text-primary">Edit Alumni</h1>
      </div>
      <AlumniForm initialData={alumni} />
    </div>
  );
}
