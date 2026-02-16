import { AdminStudentGrid, Student } from "@/components/admin/AdminStudentGrid";
import { Button } from "@/components/ui/Button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export const dynamic = 'force-dynamic';

async function getData(): Promise<Student[]> {
  const { data, error } = await supabase
    .from("Student")
    .select("*")
    .order("order", { ascending: true }); // Default sort

  if (error) {
    console.error(error);
    return [];
  }
  return (data as Student[]) || [];
}

export default async function StudentPage() {
  const data = await getData();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
           <h1 className="text-3xl font-heading font-bold text-primary">Students</h1>
           <p className="text-foreground-muted mt-1">Manage M.Tech and Ph.D students.</p>
        </div>
        <Link href="/admin/students/new">
          <Button className="gap-2">
              <Plus className="w-4 h-4" />
               Add Student
          </Button>
        </Link>
      </div>

      <div className="bg-transparent border-none shadow-none p-0">
        <AdminStudentGrid initialData={data || []} />
      </div>
    </div>
  );
}
