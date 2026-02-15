import { DataTable } from "@/components/admin/DataTable";
import { columns } from "./columns";
import { Button } from "@/components/ui/Button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export const dynamic = 'force-dynamic';

async function getData() {
  const { data: events, error } = await supabase
    .from("Event")
    .select("*")
    .order("date", { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }
  return events;
}

export default async function EventsPage() {
  const data = await getData();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
           <h1 className="text-3xl font-heading font-bold text-primary">Events</h1>
           <p className="text-foreground-muted mt-1">Manage upcoming and past events.</p>
        </div>
        <Link href="/admin/events/new">
          <Button className="gap-2">
              <Plus className="w-4 h-4" />
               New Event
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-lg border shadow-sm p-4">
        {/* @ts-ignore */}
        <DataTable columns={columns} data={data || []} searchKey="title" />
      </div>
    </div>
  );
}
