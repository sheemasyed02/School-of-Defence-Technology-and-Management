"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Pencil, Trash } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

// This type should match your Prisma model
export type Faculty = {
  id: string;
  name: string;
  designation: string;
  department: string;
  email: string | null;
  imageUrl: string | null;
  isVisible: boolean;
  updatedAt: Date;
};

// Define CellAction here before usage in columns
interface CellActionProps {
  data: Faculty;
}

const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onDelete = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/faculty/${data.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        router.refresh();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Link href={`/admin/faculty/${data.id}`}>
        <Button size="icon" variant="ghost">
          <Pencil className="w-4 h-4" />
        </Button>
      </Link>
      <Button
        size="icon"
        variant="ghost"
        className="text-red-500 hover:text-red-600"
        onClick={() => {
            if (confirm("Are you sure you want to delete this faculty member?")) {
                onDelete();
            }
        }}
        disabled={loading}
      >
        <Trash className="w-4 h-4" />
      </Button>
    </div>
  );
};

export const columns: ColumnDef<Faculty>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "designation",
    header: "Designation",
  },
  {
    accessorKey: "department",
    header: "Department",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "isVisible",
    header: "Status",
    cell: ({ row }) => {
      return (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            row.original.isVisible
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {row.original.isVisible ? "Visible" : "Hidden"}
        </span>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
