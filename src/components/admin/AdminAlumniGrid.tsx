"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Search, Pencil, Trash2, Award, Briefcase } from "lucide-react";

type Alumni = {
  id: string;
  name: string;
  image_url: string | null;
  batch: string;
  role: string;
  company: string | null;
  order: number | null;
  created_at?: string;
};

interface AdminAlumniGridProps {
  initialData: Alumni[];
}

import { ConfirmModal } from "@/components/admin/ConfirmModal";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction } from "@/components/ui/alert-dialog";

// ... (imports)

export function AdminAlumniGrid({ initialData }: AdminAlumniGridProps) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [load, setLoad] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const filteredData = initialData.filter((a) =>
    a.name.toLowerCase().includes(search.toLowerCase()) ||
    a.role.toLowerCase().includes(search.toLowerCase()) ||
    (a.company && a.company.toLowerCase().includes(search.toLowerCase())) ||
    a.batch.toLowerCase().includes(search.toLowerCase())
  );

  // Group by Batch
  const groupedAlumni = filteredData.reduce((acc, curr) => {
    const batch = curr.batch || "Unknown";
    if (!acc[batch]) acc[batch] = [];
    acc[batch].push(curr);
    return acc;
  }, {} as Record<string, Alumni[]>);

  // Sort batches descending (e.g. 2024, 2023...)
  const sortedBatches = Object.entries(groupedAlumni).sort((a, b) => b[0].localeCompare(a[0]));

  const handleDeleteClick = (id: string) => {
    setDeleteId(id);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    setLoad(true);
    try {
      const res = await fetch(`/api/alumni/${deleteId}`, { method: "DELETE" });
      if (!res.ok) {
         const data = await res.json().catch(() => ({}));
         throw new Error(data.error || "Failed to delete alumni");
      }
      router.refresh();
      setDeleteId(null);
    } catch (err: any) {
      console.error(err);
      setError(err.message);
      setDeleteId(null);
    } finally {
      setLoad(false);
    }
  };


  const AlumniCard = ({ alumni }: { alumni: Alumni }) => {
    const initials = alumni.name.substring(0, 2).toUpperCase();

    return (
      <div className="bg-white rounded-lg shadow-sm border p-4 flex gap-4 relative group hover:shadow-md transition-shadow">
        {/* Actions */}
        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Link href={`/admin/alumni/${alumni.id}`}>
            <Button size="icon" variant="ghost" className="h-7 w-7">
              <Pencil className="w-3.5 h-3.5 text-blue-600" />
            </Button>
          </Link>
          <Button size="icon" variant="ghost" className="h-7 w-7 text-red-500" onClick={() => handleDeleteClick(alumni.id)} disabled={load}>
            <Trash2 className="w-3.5 h-3.5" />
          </Button>
        </div>

        {/* Image */}
        <div className="flex-shrink-0">
          {alumni.image_url ? (
            <img src={alumni.image_url} alt={alumni.name} className="w-16 h-16 rounded-full object-cover border-2 border-dashed border-primary/20" />
          ) : (
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-500">
              {initials}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-gray-900 truncate">{alumni.name}</h4>
          <p className="text-sm text-primary font-medium truncate">{alumni.role}</p>
          {alumni.company && (
            <p className="text-xs text-gray-500 flex items-center gap-1 mt-1 truncate">
              <Briefcase className="w-3 h-3 flex-shrink-0" />
              {alumni.company}
            </p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-12">
      {/* Error Dialog */}
      <AlertDialog open={!!error} onOpenChange={() => setError(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-red-600">Error</AlertDialogTitle>
            <AlertDialogDescription>{error}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setError(null)} className="bg-red-600 text-white hover:bg-red-700">OK</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Confirmation */}
      <ConfirmModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={confirmDelete}
        loading={load}
        title="Delete Alumni"
        description="Are you sure you want to delete this alumni member? This action cannot be undone."
      />

      {/* Search Bar sticky */}
      <div className="sticky top-0 z-20 bg-background/95 backdrop-blur py-4 border-b">
         <div className="flex items-center gap-4">
           <div className="bg-white rounded-lg border shadow-sm px-3 py-2 flex items-center gap-2 flex-1">
              <Search className="w-4 h-4 text-gray-400" />
              <input
                placeholder="Search alumni by name, role, or batch..."
                className="bg-transparent border-none outline-none w-full text-sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
           </div>
         </div>
      </div>

      {sortedBatches.length > 0 ? (
        sortedBatches.map(([batch, list]) => (
          <section key={batch}>
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-primary hover:bg-primary-dark text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-sm uppercase tracking-wide flex items-center gap-2">
                 <Award className="w-3.5 h-3.5 text-amber-400" />
                 Batch of {batch}
              </div>
              <div className="h-px bg-gray-200 flex-1"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {list.map(a => <AlumniCard key={a.id} alumni={a} />)}
            </div>
          </section>
        ))
      ) : (
        <div className="py-20 text-center text-gray-500 bg-white rounded-lg border border-dashed">
          No alumni found matching your search.
        </div>
      )}
    </div>
  );
}
