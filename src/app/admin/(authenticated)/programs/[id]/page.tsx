import { supabase } from "@/lib/supabase";
import { ProgramForm } from "@/components/admin/ProgramForm";
import { notFound } from "next/navigation";

export default async function EditProgramPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data: program, error } = await supabase
    .from("Program")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !program) {
    notFound();
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <ProgramForm initialData={program} />
    </div>
  );
}
