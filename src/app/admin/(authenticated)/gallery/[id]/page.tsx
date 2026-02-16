import { supabase } from "@/lib/supabase";
import { GalleryForm } from "@/components/admin/GalleryForm";
import { notFound } from "next/navigation";

export default async function EditGalleryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data: gallery, error } = await supabase
    .from("Gallery")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !gallery) {
    notFound();
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <GalleryForm initialData={gallery} />
    </div>
  );
}
