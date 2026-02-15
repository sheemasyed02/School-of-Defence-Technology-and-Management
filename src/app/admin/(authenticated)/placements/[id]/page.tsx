import { supabase } from "@/lib/supabase";
import { PlacementForm } from "@/components/admin/PlacementForm";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function EditPlacementPage({ params }: PageProps) {
  const { data: placement, error } = await supabase
    .from("Placement")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error || !placement) {
    notFound();
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <PlacementForm initialData={placement} />
    </div>
  );
}
