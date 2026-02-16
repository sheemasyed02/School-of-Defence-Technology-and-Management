import { AdminAlumniGrid, Alumni } from "@/components/admin/AdminAlumniGrid";
import { Button } from "@/components/ui/Button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export const dynamic = 'force-dynamic';

async function getData(): Promise<Alumni[]> {
  const { data, error } = await supabase
    .from("Alumni")
    .select("*")
    .order("batch", { ascending: false }); // Sort by latest batch first

  if (error) {
    console.error(error);
    return [];
  }
  return (data as Alumni[]) || [];
}

export default async function AlumniPage() {
  const data = await getData();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
           <h1 className="text-3xl font-heading font-bold text-primary">Alumni</h1>
           <p className="text-foreground-muted mt-1">Manage distinguished alumni and their achievements.</p>
        </div>
        <Link href="/admin/alumni/new">
          <Button className="gap-2">
              <Plus className="w-4 h-4" />
               Add Alumni
          </Button>
        </Link>
      </div>

      <div className="bg-transparent border-none shadow-none p-0">
        <AdminAlumniGrid initialData={data || []} />
      </div>
    </div>
  );
}
