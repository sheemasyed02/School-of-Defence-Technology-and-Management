"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { studentSchema, StudentFormValues } from "@/lib/validations";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Upload, X, ImageIcon } from "lucide-react";

type Student = {
  id: string;
  name: string;
  image_url: string | null;
  program_type: "M.Tech" | "Ph.D";
  order: number | null;
  created_at?: string;
};

interface StudentFormProps {
  initialData?: Student | null;
}

export const StudentForm: React.FC<StudentFormProps> = ({ initialData }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(initialData?.image_url || null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const title = initialData ? "Edit Student" : "Add Student";
  const action = initialData ? "Save changes" : "Create";

  const defaultValues: StudentFormValues = {
    name: initialData?.name ?? "",
    program_type: (initialData?.program_type as "M.Tech" | "Ph.D") ?? "M.Tech",
    imageUrl: initialData?.image_url ?? "",
    order: initialData?.order ?? 0,
  };

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<StudentFormValues>({
    resolver: zodResolver(studentSchema) as any,
    defaultValues,
  });

  const programType = watch("program_type");

  const handleImageUpload = useCallback(async (file: File) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      setError("Invalid file type. Allowed: JPEG, PNG, WebP, GIF");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("File too large. Maximum size is 5MB");
      return;
    }

    try {
      setUploading(true);
      setError("");
      const localPreview = URL.createObjectURL(file);
      setImagePreview(localPreview);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "students"); // Use students folder

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();
      setValue("imageUrl", data.url);
      setImagePreview(data.url);
      URL.revokeObjectURL(localPreview);
    } catch (err: any) {
      console.error(err);
      setError("Failed to upload image");
      setImagePreview(initialData?.image_url || null);
    } finally {
      setUploading(false);
    }
  }, [setValue, initialData?.image_url]);

  const handleRemoveImage = () => {
    setImagePreview(null);
    setValue("imageUrl", "");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

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

  const onSubmit = async (data: StudentFormValues) => {
    try {
      setLoading(true);
      setError("");
      const url = initialData ? `/api/students/${initialData.id}` : `/api/students`;
      const method = initialData ? "PUT" : "POST";

      // Map form values to DB columns
      const payload = {
        name: data.name,
        program_type: data.program_type,
        imageUrl: data.imageUrl,
        order: data.order,
      };

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Something went wrong");

      router.refresh();
      router.push("/admin/students");
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto space-y-6 pb-10">
      <div className="flex items-center justify-between border-b pb-4">
        <h1 className="text-2xl font-bold">{title}</h1>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Image Upload Block */}
        <div className="space-y-4 bg-gray-50 p-4 rounded-lg border">
          <h3 className="font-semibold text-lg">Student Photo</h3>
          <div className="flex items-start gap-6">
             <div className="flex-shrink-0">
               {imagePreview ? (
                 <div className="relative group">
                   <img src={imagePreview} alt="Preview" className="w-32 h-32 rounded-full object-cover border-2 border-gray-200" />
                   <button type="button" onClick={handleRemoveImage} className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                     <X className="w-3.5 h-3.5" />
                   </button>
                   {uploading && <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center"><Loader2 className="w-6 h-6 text-white animate-spin" /></div>}
                 </div>
               ) : (
                 <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center border-2 border-dashed border-gray-300">
                   <ImageIcon className="w-10 h-10 text-gray-400" />
                 </div>
               )}
             </div>

             <div className="flex-1">
               <div
                 onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}
                 onClick={() => fileInputRef.current?.click()}
                 className={`cursor-pointer rounded-xl border-dashed border-2 p-6 text-center ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:bg-gray-100'}`}
               >
                 <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])} disabled={uploading} />
                 <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                 <p className="text-sm font-medium text-gray-700">{uploading ? "Uploading..." : "Click or drop to upload"}</p>
               </div>
             </div>
          </div>
          <input type="hidden" {...register("imageUrl")} />
        </div>

        {/* Info */}
        <div className="space-y-4 bg-gray-50 p-4 rounded-lg border">
          <h3 className="font-semibold text-lg">Details</h3>
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium">Name *</label>
              <Input disabled={loading} placeholder="Student Name" {...register("name")} />
              {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
            </div>
             <div>
              <label className="text-sm font-medium">Program Stream *</label>
              <div className="flex gap-4 mt-2">
                 <label className="flex items-center gap-2 cursor-pointer">
                   <input
                    type="radio"
                    value="M.Tech"
                    {...register("program_type")}
                    className="w-4 h-4 text-primary"
                   />
                   <span>M.Tech</span>
                 </label>
                 <label className="flex items-center gap-2 cursor-pointer">
                   <input
                    type="radio"
                    value="Ph.D"
                    {...register("program_type")}
                    className="w-4 h-4 text-primary"
                   />
                   <span>Ph.D</span>
                 </label>
              </div>
              {errors.program_type && <p className="text-xs text-red-500 mt-1">{errors.program_type.message}</p>}
            </div>
            <div>
              <label className="text-sm font-medium">Display Order</label>
              <Input type="number" disabled={loading} {...register("order", { valueAsNumber: true })} />
            </div>
          </div>
        </div>

        <Button disabled={loading || uploading} className="w-full" type="submit">
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {action}
        </Button>
      </form>
    </div>
  );
};
