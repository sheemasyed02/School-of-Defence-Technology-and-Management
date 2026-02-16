import { supabase } from "@/lib/supabase";
import { EventForm } from "@/components/admin/EventForm";
import { notFound } from "next/navigation";

export default async function EditEventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data: event, error } = await supabase
    .from("Event")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !event) {
    notFound();
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <EventForm initialData={event} />
    </div>
  );
}
