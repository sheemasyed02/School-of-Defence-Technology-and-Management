import { supabase } from "@/lib/supabase";
import { EventForm } from "@/components/admin/EventForm";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function EditEventPage({ params }: PageProps) {
  const { data: event, error } = await supabase
    .from("Event")
    .select("*")
    .eq("id", params.id)
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
