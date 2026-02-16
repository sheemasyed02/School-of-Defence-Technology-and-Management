import { supabase } from "@/lib/supabase";
import { AnnouncementForm } from "@/components/admin/AnnouncementForm";
import { notFound } from "next/navigation";

export default async function EditAnnouncementPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data: announcement, error } = await supabase
    .from("Announcement")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !announcement) {
    notFound();
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <AnnouncementForm initialData={announcement} />
    </div>
  );
}
