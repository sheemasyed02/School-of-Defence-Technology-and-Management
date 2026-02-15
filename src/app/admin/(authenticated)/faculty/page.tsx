import { DataTable } from "@/components/admin/DataTable";
import { columns } from "./columns";
import { Button } from "@/components/ui/Button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export const dynamic = 'force-dynamic';

async function getData() {
  const { data: faculty, error } = await supabase
    .from("Faculty")
    .select("*")
    .order("order", { ascending: true });

  if (error) {
    console.error(error);
    return [];
  }
  return faculty;
}

export default async function FacultyPage() {
  const data = await getData();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
           <h1 className="text-3xl font-heading font-bold text-primary">Faculty Management</h1>
           <p className="text-foreground-muted mt-1">Manage teaching staff and their profiles.</p>
        </div>
        <Link href="/admin/faculty/new">
          <Button className="gap-2">
              <Plus className="w-4 h-4" />
               Add Faculty
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-lg border shadow-sm p-4">
        {/* @ts-ignore: Supabase types might be slightly off from component expectation, but structure matches */}
        <DataTable columns={columns} data={data || []} searchKey="name" />
      </div>
    </div>
  );
}
