import { supabase } from "@/lib/supabase";
import { ResearchForm } from "@/components/admin/ResearchForm";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function EditResearchPage({ params }: PageProps) {
  const { data: research, error } = await supabase
    .from("Research")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error || !research) {
    notFound();
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <ResearchForm initialData={research} />
    </div>
  );
}
