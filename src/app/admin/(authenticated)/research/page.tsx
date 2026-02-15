import { DataTable } from "@/components/admin/DataTable";
import { columns } from "./columns";
import { Button } from "@/components/ui/Button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export const dynamic = 'force-dynamic';

async function getData() {
  const { data: research, error } = await supabase
    .from("Research")
    .select("*")
    .order("publicationDate", { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }
  return research;
}

export default async function ResearchPage() {
  const data = await getData();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
           <h1 className="text-3xl font-heading font-bold text-primary">Research & Publications</h1>
           <p className="text-foreground-muted mt-1">Manage academic papers and research projects.</p>
        </div>
        <Link href="/admin/research/new">
          <Button className="gap-2">
              <Plus className="w-4 h-4" />
               New Publication
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
