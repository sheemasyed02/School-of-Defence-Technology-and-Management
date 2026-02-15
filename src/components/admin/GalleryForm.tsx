"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

type GalleryFormValues = {
  title: string;
  type: "image" | "video";
  url: string;
  category: "campus" | "events" | "convocation";
  date: string;
  isVisible: boolean;
};

interface GalleryFormProps {
  initialData?: any;
}

export const GalleryForm: React.FC<GalleryFormProps> = ({ initialData }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const title = initialData ? "Edit Media" : "Add Media";
  const action = initialData ? "Save changes" : "Create";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GalleryFormValues>({
    defaultValues: initialData ? {
        ...initialData,
        date: initialData.date ? new Date(initialData.date).toISOString().slice(0, 10) : ''
    } : {
      title: "",
      type: "image",
      url: "",
      category: "events",
      date: new Date().toISOString().slice(0, 10),
      isVisible: true,
    },
  });

  const onSubmit = async (data: GalleryFormValues) => {
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
            .from("Gallery")
            .update(payload)
            .eq("id", initialData.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
            .from("Gallery")
            .insert([payload]);
        if (error) throw error;
      }

      router.refresh();
      router.push("/admin/gallery");
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
            <label className="text-sm font-medium">Title/Caption</label>
            <Input disabled={loading} placeholder="Annual Day 2024" {...register("title", { required: true })} />
        </div>

        <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
                <label className="text-sm font-medium">Type</label>
                <select
                    {...register("type")}
                    className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={loading}
                >
                    <option value="image">Image</option>
                    <option value="video">Video</option>
                </select>
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <select
                    {...register("category")}
                    className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={loading}
                >
                    <option value="campus">Campus</option>
                    <option value="events">Events</option>
                    <option value="convocation">Convocation</option>
                </select>
            </div>
        </div>

        <div className="space-y-2">
            <label className="text-sm font-medium">Media URL</label>
            <Input disabled={loading} placeholder="https://..." {...register("url", { required: true })} />
        </div>

        <div className="space-y-2">
            <label className="text-sm font-medium">Date</label>
            <Input type="date" disabled={loading} {...register("date")} />
        </div>

        <div className="flex items-center space-x-2 border p-4 rounded-md">
            <input
                type="checkbox"
                id="isVisible"
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                disabled={loading}
                {...register("isVisible")}
            />
            <label htmlFor="isVisible" className="text-sm font-medium">Visible in Gallery</label>
        </div>

        <Button disabled={loading} className="w-full" type="submit">
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {action}
        </Button>
      </form>
    </div>
  );
};
