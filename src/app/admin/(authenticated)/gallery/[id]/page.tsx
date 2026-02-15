import { supabase } from "@/lib/supabase";
import { GalleryForm } from "@/components/admin/GalleryForm";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function EditGalleryItemPage({ params }: PageProps) {
  const { data: item, error } = await supabase
    .from("Gallery")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error || !item) {
    notFound();
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <GalleryForm initialData={item} />
    </div>
  );
}
