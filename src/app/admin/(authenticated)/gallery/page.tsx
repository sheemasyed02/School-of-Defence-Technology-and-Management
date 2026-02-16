import { DataTable } from "@/components/admin/DataTable";
import { columns, GalleryItem } from "./columns";
import { Button } from "@/components/ui/Button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export const dynamic = 'force-dynamic';

async function getData(): Promise<GalleryItem[]> {
  const { data: gallery, error } = await supabase
    .from("Gallery")
    .select("*")
    .order("createdAt", { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }
  return (gallery as GalleryItem[]) || [];
}

export default async function GalleryPage() {
  const data = await getData();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
           <h1 className="text-3xl font-heading font-bold text-primary">Media Gallery</h1>
           <p className="text-foreground-muted mt-1">Manage images and videos for the gallery section.</p>
        </div>
        <Link href="/admin/gallery/new">
          <Button className="gap-2">
              <Plus className="w-4 h-4" />
               Add Media
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-lg border shadow-sm p-4">
        <DataTable columns={columns} data={data} searchKey="title" />
      </div>
    </div>
  );
}
