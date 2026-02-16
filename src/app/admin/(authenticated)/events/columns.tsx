"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Pencil, Trash, Calendar, MapPin, Users, Shield } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { deleteRecord } from "@/app/actions";
import { ConfirmModal } from "@/components/admin/ConfirmModal";

export type Event = {
  id: string;
  title: string;
  date: string;
  venue: string | null;
  type: string;
  isVisible: boolean;
  registration_enabled: boolean;
};

interface CellActionProps {
  data: Event;
}

const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const onDelete = async () => {
    try {
      setLoading(true);
      const result = await deleteRecord("Event", data.id, "/admin/events");
      if (!result.success) throw new Error(result.error);
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
        title="Delete Event?"
        description={`This will permanently remove "${data.title}" and all its registrations.`}
      />
      <div className="flex items-center gap-2">
        <Link href={`/admin/events/${data.id}`}>
          <Button size="icon" variant="ghost" className="hover:bg-primary/5 hover:text-primary transition-colors">
            <Pencil className="w-4 h-4" />
          </Button>
        </Link>
        <Button
          size="icon"
          variant="ghost"
          className="text-accent hover:text-accent/80 hover:bg-accent/5 transition-colors"
          onClick={() => setOpen(true)}
        >
          <Trash className="w-4 h-4" />
        </Button>
      </div>
    </>
  );
};

export const columns: ColumnDef<Event>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="hover:bg-primary/5 p-0 font-bold text-primary"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Event Details
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
        <div className="flex flex-col gap-1 py-1">
            <span className="font-bold text-primary leading-tight text-sm">{row.original.title}</span>
            <div className="flex items-center gap-2">
                 <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded border ${
                    row.original.type === 'Symposium' ? 'bg-gold/10 text-gold border-gold/20' :
                    row.original.type === 'Workshop' ? 'bg-primary/10 text-primary border-primary/20' :
                    'bg-slate-100 text-slate-500 border-slate-200'
                 }`}>
                    {row.original.type || 'Event'}
                </span>
                {row.original.registration_enabled && (
                    <span className="flex items-center gap-1 text-[9px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded uppercase leading-none">
                        <Users className="w-2.5 h-2.5" /> Reg. On
                    </span>
                )}
            </div>
        </div>
    )
  },
  {
    accessorKey: "date",
    header: "Date & Time",
    cell: ({ row }) => {
        const date = new Date(row.original.date);
        return (
            <div className="flex flex-col gap-0.5">
                <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Calendar className="w-3 h-3 text-gold" />
                    {date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                </span>
                <span className="text-[10px] text-foreground-muted ml-4">
                    {date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                </span>
            </div>
        )
    },
  },
  {
    accessorKey: "venue",
    header: "Venue",
    cell: ({ row }) => (
        <div className="flex items-center gap-1.5 text-xs text-foreground-muted font-medium">
            <MapPin className="w-3 h-3 text-primary/40" />
            {row.original.venue || "TBA"}
        </div>
    )
  },
  {
    accessorKey: "isVisible",
    header: "Status",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${row.original.isVisible ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]' : 'bg-slate-300'}`} />
        <span className={`text-[11px] font-bold uppercase tracking-wider ${row.original.isVisible ? 'text-primary' : 'text-slate-400'}`}>
          {row.original.isVisible ? "Visible" : "Hidden"}
        </span>
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
