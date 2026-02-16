"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Search, Pencil, Trash2, GraduationCap } from "lucide-react";

export type Student = {
  id: string;
  name: string;
  image_url: string | null;
  program_type: "M.Tech" | "Ph.D";
  order: number | null;
  created_at?: string;
};

interface AdminStudentGridProps {
  initialData: Student[];
}

import { ConfirmModal } from "@/components/admin/ConfirmModal";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction } from "@/components/ui/alert-dialog";

// ... (imports)

export function AdminStudentGrid({ initialData }: AdminStudentGridProps) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const filteredData = initialData.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  const mtechStudents = filteredData.filter(s => s.program_type === "M.Tech");
  const phdStudents = filteredData.filter(s => s.program_type === "Ph.D");

  const handleDeleteClick = (id: string) => {
    setDeleteId(id);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/students/${deleteId}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to delete student");
      }
      router.refresh();
      setDeleteId(null);
    } catch (err: any) {
      console.error(err);
      setError(err.message);
      setDeleteId(null);
    } finally {
      setLoading(false);
    }
  };

  const StudentCard = ({ student }: { student: Student }) => {
    const initials = student.name.substring(0, 2).toUpperCase();

    return (
      <div className="bg-white rounded-lg shadow-sm border p-4 flex items-center gap-4 relative group hover:shadow-md transition-shadow">
        {/* Actions */}
        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Link href={`/admin/students/${student.id}`}>
            <Button size="icon" variant="ghost" className="h-7 w-7">
              <Pencil className="w-3.5 h-3.5 text-blue-600" />
            </Button>
          </Link>
          <Button size="icon" variant="ghost" className="h-7 w-7 text-red-500" onClick={() => handleDeleteClick(student.id)} disabled={loading}>
            <Trash2 className="w-3.5 h-3.5" />
          </Button>
        </div>

        {/* Image */}
        <div className="flex-shrink-0">
          {student.image_url ? (
            <img src={student.image_url} alt={student.name} className="w-12 h-12 rounded-full object-cover border border-gray-100" />
          ) : (
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500">
              {initials}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <h4 className="font-semibold text-gray-900">{student.name}</h4>
          <p className="text-xs text-gray-500">{student.program_type} Student</p>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
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
        loading={loading}
        title="Delete Student"
        description="Are you sure you want to delete this student? This action cannot be undone."
      />

      {/* Search */}
      <div className="flex items-center gap-4 bg-white p-4 rounded-lg border shadow-sm sticky top-0 z-10">
        <Search className="w-4 h-4 text-gray-400" />
        <Input
          placeholder="Search students..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border-none shadow-none focus-visible:ring-0 px-0 h-auto flex-1"
        />
      </div>

      {/* M.Tech Section */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-red-700 text-white px-3 py-1 rounded text-xs font-bold flex items-center gap-1">
            <GraduationCap className="w-3 h-3" />
            {mtechStudents.length} Students
          </div>
          <h2 className="text-xl font-bold text-primary">M.Tech Students</h2>
        </div>
        {mtechStudents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {mtechStudents.map(s => <StudentCard key={s.id} student={s} />)}
          </div>
        ) : (
          <div className="text-sm text-gray-500 italic px-1">No M.Tech students found.</div>
        )}
      </section>

      {/* Ph.D Section */}
      <section>
        <div className="flex items-center gap-3 mb-4 pt-4 border-t border-dashed">
          <div className="bg-blue-900 text-white px-3 py-1 rounded text-xs font-bold flex items-center gap-1">
            <GraduationCap className="w-3 h-3" />
            {phdStudents.length} Students
          </div>
          <h2 className="text-xl font-bold text-primary">Ph.D. Students</h2>
        </div>
        {phdStudents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {phdStudents.map(s => <StudentCard key={s.id} student={s} />)}
          </div>
        ) : (
          <div className="text-sm text-gray-500 italic px-1">No Ph.D. students found.</div>
        )}
      </section>
    </div>
  );
}
