"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Pencil, Trash } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ConfirmModal } from "@/components/admin/ConfirmModal";
import { supabase } from "@/lib/supabase";

export type GalleryItem = {
  id: string;
  title: string;
  type: string;
  category: string;
  url: string;
  isVisible: boolean;
};

interface CellActionProps {
  data: GalleryItem;
}

const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const onDelete = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.from("Gallery").delete().eq("id", data.id);
      if (error) throw error;
      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <ConfirmModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center gap-2">
        <Link href={`/admin/gallery/${data.id}`}>
          <Button size="icon" variant="ghost">
            <Pencil className="w-4 h-4" />
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

export const columns: ColumnDef<GalleryItem>[] = [
  {
      id: "thumbnail",
      header: "Preview",
      cell: ({ row }) => (
          <div className="w-16 h-10 rounded overflow-hidden bg-gray-100">
              {row.original.type === 'image' ? (
                  <img src={row.original.url} alt={row.original.title} className="w-full h-full object-cover" />
              ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs text-gray-500">Video</div>
              )}
          </div>
      )
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => <span className="capitalize">{row.original.category}</span>
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => <span className="capitalize text-xs font-medium px-2 py-1 bg-gray-100 rounded-full">{row.original.type}</span>
  },
  {
    accessorKey: "isVisible",
    header: "Status",
    cell: ({ row }) => (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          row.original.isVisible
            ? "bg-green-100 text-green-800"
            : "bg-gray-100 text-gray-800"
        }`}
      >
        {row.original.isVisible ? "Visible" : "Hidden"}
      </span>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
