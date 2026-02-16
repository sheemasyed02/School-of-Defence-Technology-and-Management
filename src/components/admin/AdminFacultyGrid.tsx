"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  Search,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  Mail,
  Phone,
  GraduationCap,
  Briefcase
} from "lucide-react";

// Matches DB schema
type Faculty = {
  id: string;
  name: string;
  designation: string;
  department: string;
  email: string | null;
  phone: string | null;
  imageUrl: string | null;
  qualification: string | null;
  experience: string | null;
  bio: string | null;
  publications: string | null; // JSON string
  research: string | null; // JSON string
  isVisible: boolean;
  order: number | null;
  createdAt: string;
  updatedAt: string;
};

interface AdminFacultyGridProps {
  initialData: Faculty[];
}

const COLORS = [
  { from: "from-[#0c1e3a]", to: "to-[#1a3a5c]" },
  { from: "from-[#1a3a5c]", to: "to-[#0c1e3a]" },
  { from: "from-[#142c4a]", to: "to-[#1e4a6e]" },
  { from: "from-[#0f2840]", to: "to-[#1a3a5c]" },
  { from: "from-[#1a3a5c]", to: "to-[#142c4a]" },
];

export function AdminFacultyGrid({ initialData }: AdminFacultyGridProps) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const filteredData = initialData.filter((f) =>
    f.name.toLowerCase().includes(search.toLowerCase()) ||
    f.designation.toLowerCase().includes(search.toLowerCase()) ||
    f.department.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this faculty member?")) return;

    try {
      setLoadingId(id);
      const res = await fetch(`/api/faculty/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete");

      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Error deleting faculty member");
    } finally {
      setLoadingId(null);
    }
  };

  const handleToggleVisibility = async (faculty: Faculty) => {
    try {
      setLoadingId(faculty.id);
      // We'll treat PUT to /api/faculty/[id] as update
      // We need to send the full body or partial? The API likely expects full body based on previous implementation
      // But typically PATCH handles partial. Previous implementation of PUT used z.parse(body).
      // Let's assume we need to send at least the required fields.
      // Actually, safest is to re-send current data with updated isVisible.
      // Or just navigate to edit page?
      // For now, let's keep it simple: Use the Edit button for changes.
      // But a quick toggle is nice. If difficult, skip toggle logic and just show status.
      // I'll skip quick toggle to avoid validation complexity without a dedicated PATCH endpoint.
    } catch (error) {
       console.error(error);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 bg-white p-4 rounded-lg border shadow-sm">
        <Search className="w-5 h-5 text-gray-400" />
        <Input
          placeholder="Search by name, designation, or department..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-md border-none focus-visible:ring-0 px-0 shadow-none h-auto text-base placeholder:text-gray-400"
        />
        <div className="ml-auto text-sm text-gray-500">
          Showing {filteredData.length} of {initialData.length} entries
        </div>
      </div>

      {filteredData.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-lg border border-dashed">
          <p className="text-gray-500">No faculty members found matching your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredData.map((f, idx) => {
            const initials = f.name.split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase();
            const color = COLORS[idx % COLORS.length];

            return (
              <div
                key={f.id}
                className="group relative bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow flex flex-col overflow-hidden"
              >
                {/* Actions Overlay */}
                <div className="absolute top-3 right-3 z-20 flex gap-2">
                   <Link href={`/admin/faculty/${f.id}`}>
                    <Button size="icon" variant="secondary" className="h-8 w-8 bg-white/90 hover:bg-white shadow-sm backdrop-blur-sm">
                      <Pencil className="w-4 h-4 text-blue-600" />
                    </Button>
                   </Link>
                   <Button
                    size="icon"
                    variant="destructive"
                    className="h-8 w-8 shadow-sm"
                    onClick={() => handleDelete(f.id)}
                    disabled={loadingId === f.id}
                   >
                     <Trash2 className="w-4 h-4" />
                   </Button>
                </div>

                {/* Status Badge */}
                <div className="absolute top-3 left-3 z-20">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-sm shadow-sm ${f.isVisible ? 'bg-green-100/90 text-green-700' : 'bg-gray-100/90 text-gray-600'}`}>
                    {f.isVisible ? (
                      <>
                        <Eye className="w-3 h-3" /> Visible
                      </>
                    ) : (
                      <>
                        <EyeOff className="w-3 h-3" /> Hidden
                      </>
                    )}
                  </span>
                </div>

                {/* Header (Visual) */}
                <div className={`relative h-32 bg-gradient-to-br ${color.from} ${color.to}`}>
                  <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay" />
                </div>

                {/* Avatar */}
                <div className="px-6 -mt-12 mb-3 relative z-10">
                   <div className="relative inline-block">
                    {f.imageUrl ? (
                      <img
                        src={f.imageUrl}
                        alt={f.name}
                        className="w-24 h-24 rounded-xl object-cover border-4 border-white shadow-md bg-white"
                      />
                    ) : (
                      <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 border-4 border-white shadow-md flex items-center justify-center">
                        <span className="text-2xl font-bold text-gray-400">{initials}</span>
                      </div>
                    )}
                   </div>
                </div>

                {/* Body Content */}
                <div className="px-6 pb-6 flex-1 flex flex-col gap-3">
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 leading-tight">{f.name}</h3>
                    <p className="text-blue-600 text-sm font-medium">{f.designation}</p>
                  </div>

                  <div className="space-y-2 mt-1">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Briefcase className="w-4 h-4 flex-shrink-0 text-gray-400" />
                      <span className="truncate">{f.department}</span>
                    </div>
                    {f.email && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail className="w-4 h-4 flex-shrink-0 text-gray-400" />
                        <span className="truncate">{f.email}</span>
                      </div>
                    )}
                    {f.phone && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone className="w-4 h-4 flex-shrink-0 text-gray-400" />
                        <span className="truncate">{f.phone}</span>
                      </div>
                    )}
                  </div>

                  <div className="mt-auto pt-4 border-t border-gray-100 grid grid-cols-2 gap-4">
                     <div>
                       <p className="text-xs text-gray-400 uppercase font-semibold">Qualification</p>
                       <p className="text-sm font-medium text-gray-700 truncate">{f.qualification || "—"}</p>
                     </div>
                     <div>
                       <p className="text-xs text-gray-400 uppercase font-semibold">Experience</p>
                       <p className="text-sm font-medium text-gray-700 truncate">{f.experience || "—"}</p>
                     </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
