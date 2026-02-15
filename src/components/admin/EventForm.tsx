"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

// Defining basic types manually since validation package doesn't have Event schema yet
type EventFormValues = {
  title: string;
  description: string;
  date: string;
  venue: string;
  imageUrl: string;
  isVisible: boolean;
};

interface EventFormProps {
  initialData?: any;
}

export const EventForm: React.FC<EventFormProps> = ({ initialData }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const title = initialData ? "Edit Event" : "Create Event";
  const action = initialData ? "Save changes" : "Create";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EventFormValues>({
    defaultValues: initialData ? {
        ...initialData,
        date: initialData.date ? new Date(initialData.date).toISOString().slice(0, 16) : ''
    } : {
      title: "",
      description: "",
      date: "",
      venue: "",
      imageUrl: "",
      isVisible: true,
    },
  });

  const onSubmit = async (data: EventFormValues) => {
    try {
      setLoading(true);
      setError("");

      const payload = {
        ...data,
        date: new Date(data.date).toISOString(),
        updatedAt: new Date().toISOString()
      };

      if (initialData) {
        const { error } = await supabase
            .from("Event")
            .update(payload)
            .eq("id", initialData.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
            .from("Event")
            .insert([payload]);
        if (error) throw error;
      }

      router.refresh();
      router.push("/admin/events");
    } catch (error: any) {
      console.error(error);
      setError(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{title}</h1>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        <div className="space-y-2">
            <label className="text-sm font-medium">Title</label>
            <Input disabled={loading} placeholder="Annual Science Fair" {...register("title", { required: true })} />
        </div>

        <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <textarea
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                disabled={loading}
                placeholder="Event details..."
                {...register("description")}
            />
        </div>

        <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
                <label className="text-sm font-medium">Date & Time</label>
                <Input type="datetime-local" disabled={loading} {...register("date", { required: true })} />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium">Venue</label>
                <Input disabled={loading} placeholder="Main Auditorium" {...register("venue")} />
            </div>
        </div>

        <div className="space-y-2">
            <label className="text-sm font-medium">Image URL</label>
            <Input disabled={loading} placeholder="https://..." {...register("imageUrl")} />
        </div>

        <div className="flex items-center space-x-2 border p-4 rounded-md">
            <input
                type="checkbox"
                id="isVisible"
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                disabled={loading}
                {...register("isVisible")}
            />
            <label htmlFor="isVisible" className="text-sm font-medium">Visible</label>
        </div>

        <Button disabled={loading} className="w-full" type="submit">
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {action}
        </Button>
      </form>
    </div>
  );
};
