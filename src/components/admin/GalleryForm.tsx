"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Upload, X, ImageIcon, Video } from "lucide-react";
import { supabase } from "@/lib/supabase";
import CreatableSelect from "@/components/admin/CreatableSelect";

const DEFAULT_GALLERY_CATEGORIES = ["CAMPUS", "EVENTS", "LABS", "VISITS"];

type GalleryFormValues = {
  title: string;
  type: "image" | "video";
  url: string;
  category: "EVENTS" | "LABS" | "VISITS" | "CAMPUS";
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
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const title = initialData ? "Edit Media" : "Add Media";
  const action = initialData ? "Save changes" : "Create";

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<GalleryFormValues>({
    defaultValues: initialData ? {
        ...initialData,
        date: initialData.date ? new Date(initialData.date).toISOString().slice(0, 10) : ''
    } : {
      title: "",
      type: "image",
      url: "",
      category: "EVENTS",
      date: new Date().toISOString().slice(0, 10),
      isVisible: true,
    },
  });

  const mediaType = watch("type");
  const mediaUrl = watch("url");

  const handleImageUpload = useCallback(async (file: File) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      setError("Invalid file type. Allowed: JPEG, PNG, WebP, GIF");
      return;
    }
    if (file.size > 10 * 1024 * 1024) { // 10MB for gallery images
      setError("File too large. Maximum size is 10MB");
      return;
    }

    try {
      setUploading(true);
      setError("");

      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "gallery");

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();
      setValue("url", data.url);
    } catch (err: any) {
      console.error(err);
      setError("Failed to upload image");
    } finally {
      setUploading(false);
    }
  }, [setValue]);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) handleImageUpload(e.dataTransfer.files[0]);
  }, [handleImageUpload]);

  const onSubmit = async (data: GalleryFormValues) => {
    try {
      setLoading(true);
      setError("");

      const payload = {
        ...data,
        date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
      };

      const url = "/api/admin/gallery";
      const method = initialData ? "PUT" : "POST";
      const body = initialData ? { ...payload, id: initialData.id } : payload;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to save gallery item");
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
    <div className="max-w-xl mx-auto space-y-4 pb-20">
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
                <label className="text-sm font-medium">Media Type</label>
                <select
                    {...register("type")}
                    className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={loading}
                >
                    <option value="image">Image</option>
                    <option value="video">Video (YouTube)</option>
                </select>
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <CreatableSelect
                    settingsKey="custom_gallery_categories"
                    defaultOptions={DEFAULT_GALLERY_CATEGORIES}
                    value={watch("category") || "EVENTS"}
                    onChange={(v) => setValue("category", v as any)}
                    disabled={loading}
                />
            </div>
        </div>

        {mediaType === "image" && (
           <div className="space-y-4 p-4 rounded-lg border bg-gray-50">
             <div className="flex items-center justify-between">
               <label className="text-sm font-medium">Image Upload</label>
               {mediaUrl && (
                 <button type="button" onClick={() => setValue("url", "")} className="text-xs text-red-500 flex items-center gap-1 hover:underline">
                    <X className="w-3 h-3" /> Remove
                 </button>
               )}
             </div>

             {mediaUrl ? (
               <div className="relative aspect-video rounded-lg overflow-hidden border bg-white">
                 <img src={mediaUrl} alt="Preview" className="w-full h-full object-cover" />
               </div>
             ) : (
               <div
                 onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}
                 onClick={() => fileInputRef.current?.click()}
                 className={`cursor-pointer rounded-lg border-2 border-dashed p-10 text-center transition-all ${dragActive ? 'border-primary bg-primary/5' : 'border-gray-300 hover:bg-gray-100'}`}
               >
                 <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])} disabled={uploading} />
                 {uploading ? (
                   <div className="flex flex-col items-center gap-2">
                     <Loader2 className="w-8 h-8 text-primary animate-spin" />
                     <p className="text-sm font-medium">Uploading image...</p>
                   </div>
                 ) : (
                   <div className="flex flex-col items-center gap-2">
                     <Upload className="w-8 h-8 text-gray-400" />
                     <p className="text-sm font-medium text-gray-600">Click or drag image to upload</p>
                     <p className="text-xs text-gray-400">JPEG, PNG, WebP up to 10MB</p>
                   </div>
                 )}
               </div>
             )}
           </div>
        )}

        {mediaType === "video" && (
          <div className="space-y-2">
            <label className="text-sm font-medium">YouTube Link</label>
            <Input disabled={loading} placeholder="https://youtube.com/watch?v=..." {...register("url", { required: true })} />
          </div>
        )}
        {mediaType === "image" && <input type="hidden" {...register("url")} />}

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

        <Button disabled={loading || uploading} className="w-full h-11" type="submit">
          {(loading || uploading) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {action}
        </Button>
      </form>
    </div>
  );
};
