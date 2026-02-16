"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

type AnnouncementFormValues = {
  title: string;
  body: string;
  date: string;
  expiresAt: string;
  priority: "IMPORTANT" | "REGULAR";
  isVisible: boolean;
  isScrolling: boolean;
  attachment_url?: string;
};

interface AnnouncementFormProps {
  initialData?: any;
}

export const AnnouncementForm: React.FC<AnnouncementFormProps> = ({ initialData }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const title = initialData ? "Edit Announcement" : "Create Announcement";
  const action = initialData ? "Save changes" : "Create";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AnnouncementFormValues>({
    defaultValues: initialData ? {
        ...initialData,
        date: initialData.date ? new Date(initialData.date).toISOString().slice(0, 16) : '',
        expiresAt: initialData.expiresAt ? new Date(initialData.expiresAt).toISOString().slice(0, 16) : '',
    } : {
      title: "",
      body: "",
      date: new Date().toISOString().slice(0, 16),
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16),
      priority: "REGULAR",
      isVisible: true,
      isScrolling: false,
    },
  });

  const onSubmit = async (data: AnnouncementFormValues) => {
    try {
      setLoading(true);
      setError("");

      const payload = {
        ...data,
        date: new Date(data.date).toISOString(),
        expiresAt: data.expiresAt ? new Date(data.expiresAt).toISOString() : null,
        updatedAt: new Date().toISOString()
      };

      if (initialData) {
        const { error } = await supabase
            .from("Announcement")
            .update(payload)
            .eq("id", initialData.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
            .from("Announcement")
            .insert([payload]);
        if (error) throw error;
      }

      router.refresh();
      router.push("/admin/announcements");
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
            <Input disabled={loading} placeholder="Results Announced" {...register("title", { required: true })} />
        </div>

        <div className="space-y-2">
            <label className="text-sm font-medium">Content</label>
            <textarea
                className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                disabled={loading}
                placeholder="Full announcement text..."
                {...register("body")}
            />
        </div>

        <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
                <label className="text-sm font-medium">Publish Date</label>
                <Input type="datetime-local" disabled={loading} {...register("date", { required: true })} />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium">Expiry Date</label>
                <Input type="datetime-local" disabled={loading} {...register("expiresAt")} />
            </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
             <div className="space-y-2">
                <label className="text-sm font-medium">Priority</label>
                <select
                    {...register("priority")}
                    className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={loading}
                >
                    <option value="REGULAR">Regular</option>
                    <option value="IMPORTANT">Important</option>
                </select>
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium">Attachment URL (Optional)</label>
                <Input disabled={loading} placeholder="/docs/notice.pdf" {...register("attachment_url")} />
            </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2 border p-3 rounded-md">
                <input
                    type="checkbox"
                    id="isVisible"
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    disabled={loading}
                    {...register("isVisible")}
                />
                <label htmlFor="isVisible" className="text-sm font-medium">Publicly Visible</label>
            </div>
            <div className="flex items-center space-x-2 border p-3 rounded-md">
                <input
                    type="checkbox"
                    id="isScrolling"
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    disabled={loading}
                    {...register("isScrolling")}
                />
                <label htmlFor="isScrolling" className="text-sm font-medium">Scroll on Home</label>
            </div>
        </div>

        <Button disabled={loading} className="w-full h-11" type="submit">
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {action}
        </Button>
      </form>
    </div>
  );
};
