import { DataTable } from "@/components/admin/DataTable";
import { columns, Research } from "./columns";
import { Button } from "@/components/ui/Button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export const dynamic = 'force-dynamic';

async function getData(): Promise<Research[]> {
  const { data: research, error } = await supabase
    .from("Research")
    .select("*")
    .order("createdAt", { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }
  return (research as Research[]) || [];
}

export default async function ResearchPage() {
  const data = await getData();

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-primary/10 pb-6">
        <div>
           <h1 className="text-4xl font-heading font-bold text-primary tracking-tight">Research Management</h1>
           <p className="text-foreground-muted mt-1.5 flex items-center gap-2">
             <span className="w-1.5 h-1.5 rounded-full bg-gold" />
             Strategic overview of publications, research projects, and intellectual property.
           </p>
        </div>
        <Link href="/admin/research/new">
          <Button className="bg-primary hover:bg-primary/90 text-white shadow-brand-lg gap-2 h-11 px-6">
              <Plus className="w-5 h-5" />
              <span className="font-bold">New Research Item</span>
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-brand shadow-brand border border-border-light overflow-hidden">
        <div className="h-1 w-full bg-gold-accent" />
        <div className="p-6">
            <DataTable columns={columns} data={data} searchKey="title" />
        </div>
      </div>
    </div>
  );
}
