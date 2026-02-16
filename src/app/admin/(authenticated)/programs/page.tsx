import { DataTable } from "@/components/admin/DataTable";
import { columns, Program } from "./columns";
import { Button } from "@/components/ui/Button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export const dynamic = 'force-dynamic';

async function getData(): Promise<Program[]> {
  const { data: programs, error } = await supabase
    .from("Program")
    .select("*")
    .order("createdAt", { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }
  return (programs as Program[]) || [];
}

export default async function ProgramsPage() {
  const data = await getData();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
           <h1 className="text-3xl font-heading font-bold text-primary">Academic Programs</h1>
           <p className="text-foreground-muted mt-1">Manage degree details and curriculum.</p>
        </div>
        <Link href="/admin/programs/new">
          <Button className="gap-2">
              <Plus className="w-4 h-4" />
               New Program
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-lg border shadow-sm p-4">
        <DataTable columns={columns} data={data} searchKey="title" />
      </div>
    </div>
  );
}
