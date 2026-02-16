import { createMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/ui";
import { supabase } from "@/lib/supabase";
import { EventsClient } from "@/components/public/EventsClient";

export const metadata = createMetadata({
  title: "Events",
  description: "Upcoming events, workshops, and seminars at the School of Defence Technology and Management.",
});

export const dynamic = 'force-dynamic';

async function getEvents() {
  const { data, error } = await supabase
    .from("Event")
    .select("*")
    .eq("isVisible", true)
    .order("date", { ascending: true });

  if (error) {
    console.error("Error fetching events:", error);
    return [];
  }
  return data || [];
}

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <div className="bg-background min-h-screen">
      <PageHeader
        title="Campus Events"
        subtitle="Stay updated with our upcoming workshops, seminars, and conferences designed for the next generation of defence leaders."
        breadcrumb="Events"
      />

      <section className="pb-24 mt-12 relative z-10">
        <EventsClient events={events} />
      </section>
    </div>
  );
}
