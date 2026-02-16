"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Pencil, Trash, Lightbulb, FlaskConical, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ConfirmModal } from "@/components/admin/ConfirmModal";
import { supabase } from "@/lib/supabase";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction } from "@/components/ui/alert-dialog";

export type Research = {
  id: string;
  type: "PUBLICATION" | "PROJECT" | "PATENT";
  title: string;
  authors: string;
  publicationDate?: string;
  startDate?: string;
  endDate?: string;
  journal?: string;
  status?: string;
  isVisible: boolean;
};

interface CellActionProps {
  data: Research;
}

const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [errorData, setErrorData] = useState<string | null>(null);

  const onDelete = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.from("Research").delete().eq("id", data.id);
      if (error) throw error;
      router.refresh();
      setOpen(false);
    } catch (error: any) {
      console.error(error);
      setErrorData(error.message || "Failed to delete");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ConfirmModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
        title="Delete Item"
        description="Are you sure you want to delete this research item? This action cannot be undone."
      />

      {errorData && (
        <AlertDialog open={!!errorData} onOpenChange={() => setErrorData(null)}>
            <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle className="text-red-600">Error</AlertDialogTitle>
                <AlertDialogDescription>{errorData}</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogAction onClick={() => setErrorData(null)} className="bg-red-600 text-white hover:bg-red-700">OK</AlertDialogAction>
            </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
      )}

      <div className="flex items-center gap-2">
        <Link href={`/admin/research/${data.id}`}>
          <Button size="icon" variant="ghost">
            <Pencil className="w-4 h-4 text-blue-600" />
          </Button>
        </Link>
        <Button
          size="icon"
          variant="ghost"
          className="text-red-500 hover:text-red-600"
          onClick={() => setOpen(true)}
        >
          <Trash className="w-4 h-4" />
        </Button>
      </div>
    </>
  );
};

export const columns: ColumnDef<Research>[] = [
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const type = row.original.type || "PUBLICATION";
      const config = {
        PUBLICATION: { color: "bg-primary-50 text-secondary-700 border-secondary-100", icon: BookOpen },
        PROJECT: { color: "bg-accent-50 text-accent-700 border-accent-100", icon: FlaskConical },
        PATENT: { color: "bg-gold-50 text-gold-700 border-gold-100", icon: Lightbulb },
      };
      // Fallback
      const { color, icon: Icon } = config[type] || config.PUBLICATION;

      return (
        <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded border text-[10px] font-bold uppercase tracking-widest ${color}`}>
          <Icon className="w-3 h-3" />
          {type}
        </div>
      );
    },
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="hover:bg-primary/5 hover:text-primary p-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="flex flex-col gap-0.5 py-1">
        <span className="font-bold text-primary max-w-[400px] leading-snug" title={row.original.title}>
          {row.original.title}
        </span>
        <span className="text-[10px] text-foreground-light font-medium uppercase tracking-tight">
          {row.original.authors}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "journal",
    header: "Venue / Sponsor",
    cell: ({ row }) => {
        const venue = row.original.journal;
        if (!venue) return <span className="text-gray-300">-</span>;
        return <span className="text-xs font-medium text-secondary-600 italic">{venue}</span>;
    }
  },
  {
    accessorKey: "date",
    header: "Timeline",
    cell: ({ row }) => {
        const { type, publicationDate, startDate, endDate } = row.original;
        if (type === "PROJECT") {
            const start = startDate ? new Date(startDate).getFullYear() : "Pending";
            const end = endDate ? new Date(endDate).getFullYear() : "Ongoing";
            return (
                <div className="flex flex-col">
                    <span className="text-xs font-bold text-primary">{start}—{end}</span>
                    <span className="text-[9px] text-foreground-light uppercase font-bold tracking-tighter">Academic Year</span>
                </div>
            );
        }
        const year = publicationDate ? new Date(publicationDate).getFullYear() : "N/A";
        return <span className="text-xs font-bold text-primary">{year}</span>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
        const status = row.original.status;
        if (!status) return null;
        return (
            <span className="text-[9px] font-bold border border-primary/20 px-1.5 py-0.5 rounded-sm bg-primary/5 text-primary uppercase tracking-tighter shadow-sm">
                {status}
            </span>
        );
    }
  },
  {
    accessorKey: "isVisible",
    header: "Public",
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <div className={`w-2 h-2 rounded-full ${row.original.isVisible ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" : "bg-gray-300"}`} />
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
