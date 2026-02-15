import { DataTable } from "@/components/admin/DataTable";
import { columns } from "./columns";
import { Button } from "@/components/ui/Button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export const dynamic = 'force-dynamic';

async function getData() {
  const { data: announcements, error } = await supabase
    .from("Announcement")
    .select("*")
    .order("date", { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }
  return announcements;
}

export default async function AnnouncementsPage() {
  const data = await getData();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
           <h1 className="text-3xl font-heading font-bold text-primary">Announcements</h1>
           <p className="text-foreground-muted mt-1">Manage latest news and updates.</p>
        </div>
        <Link href="/admin/announcements/new">
          <Button className="gap-2">
              <Plus className="w-4 h-4" />
               New Announcement
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
