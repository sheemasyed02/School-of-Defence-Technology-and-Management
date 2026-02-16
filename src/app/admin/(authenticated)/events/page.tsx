import { supabase } from "@/lib/supabase";
import { EventsManagement } from "@/components/admin/EventsManagement";

export const dynamic = 'force-dynamic';

async function getEvents() {
  const { data, error } = await supabase
    .from("Event")
    .select("*")
    .order("date", { ascending: false });

  if (error) {
    console.error("Error fetching events:", error);
    return [];
  }
  return data || [];
}

async function getRegistrations() {
  const { data, error } = await supabase
    .from("EventRegistration")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching registrations:", error);
    return [];
  }
  return data || [];
}

export default async function EventsPage() {
  const [events, registrations] = await Promise.all([
    getEvents(),
    getRegistrations()
  ]);

  return (
    <div className="p-6 sm:p-10 bg-gray-50/50 min-h-screen">
      <EventsManagement initialEvents={events} initialRegistrations={registrations} />
    </div>
  );
}
