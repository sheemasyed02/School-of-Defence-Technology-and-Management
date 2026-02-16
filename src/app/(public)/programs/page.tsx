import { supabase } from "@/lib/supabase";
import ProgramsClient from "./ProgramsClient";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Academic Programs | School of Defence Technology",
  description: "Explore our Master of Technology and PhD programs in Defence Technology, designed for future leaders.",
};

// Revalidate every 60 seconds (ISR) or on-demand via actions
export const revalidate = 60;

export default async function ProgramsPage() {
    // Fetch programs from Supabase
    const { data: programs, error } = await supabase
        .from("Program")
        .select("*")
        .eq("isVisible", true)
        .order("createdAt", { ascending: true });

    if (error) {
        console.error("Error fetching programs:", error);
        // We can throw or return empty. Client handles empty.
    }

    return <ProgramsClient initialPrograms={programs || []} />;
}
