import { DataTable } from "@/components/admin/DataTable";
import { columns, Placement } from "./columns";
import { Button } from "@/components/ui/Button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export const dynamic = 'force-dynamic';

async function getData(): Promise<Placement[]> {
  const { data: placements, error } = await supabase
    .from("Placement")
    .select("*")
    .order("createdAt", { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }
  return (placements as Placement[]) || [];
}

export default async function PlacementsPage() {
  const data = await getData();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
           <h1 className="text-3xl font-heading font-bold text-primary">Placements</h1>
           <p className="text-foreground-muted mt-1">Track student placements and success stories.</p>
        </div>
        <Link href="/admin/placements/new">
          <Button className="gap-2">
              <Plus className="w-4 h-4" />
               Add Placement
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-lg border shadow-sm p-4">
        <DataTable columns={columns} data={data} searchKey="studentName" />
      </div>
    </div>
  );
}
