import { supabase } from "@/lib/supabase";
import { PlacementForm } from "@/components/admin/PlacementForm";
import { notFound } from "next/navigation";

export default async function EditPlacementPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data: placement, error } = await supabase
    .from("Placement")
    .select("*")
    .eq("id", id)
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
