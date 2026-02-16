"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { facultySchema } from "@/lib/validations";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Upload, X, ImageIcon } from "lucide-react";

// Faculty type matching Supabase schema
type Faculty = {
  id: string;
  name: string;
  designation: string;
  department: string;
  bio: string | null;
  email: string | null;
  imageUrl: string | null;
  publications: string | null;
  qualification: string | null;
  experience: string | null;
  research: string | null;
  phone: string | null;
  order: number | null;
  isVisible: boolean | null;
  createdAt: string;
  updatedAt: string;
};

type FacultyFormValues = z.infer<typeof facultySchema>;

interface FacultyFormProps {
  initialData?: Faculty | null;
}

// Helper to parse JSON string to new-line separated string for Textarea
const jsonToText = (jsonStr: string | null): string => {
  if (!jsonStr) return "";
  try {
    const parsed = JSON.parse(jsonStr);
    if (Array.isArray(parsed)) {
      return parsed.join("\n");
    }
    return String(parsed);
  } catch (e) {
    return jsonStr; // Return raw if not valid JSON
  }
};

// Helper to convert new-line separated string to JSON string array
const textToJson = (text: string): string => {
  if (!text) return "[]";
  const arr = text.split("\n").map(s => s.trim()).filter(Boolean);
  return JSON.stringify(arr);
};

export const FacultyForm: React.FC<FacultyFormProps> = ({ initialData }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(initialData?.imageUrl || null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const title = initialData ? "Edit Faculty" : "Add Faculty";
  const action = initialData ? "Save changes" : "Create";

  const defaultValues: FacultyFormValues = {
    name: initialData?.name ?? "",
    designation: initialData?.designation ?? "",
    department: initialData?.department ?? "",
    email: initialData?.email ?? "",
    phone: initialData?.phone ?? "",
    bio: initialData?.bio ?? "",
    imageUrl: initialData?.imageUrl ?? "",
    qualification: initialData?.qualification ?? "",
    experience: initialData?.experience ?? "",
    publications: jsonToText(initialData?.publications ?? null),
    research: jsonToText(initialData?.research ?? null),
    order: initialData?.order ?? 0,
    isVisible: initialData?.isVisible ?? true,
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FacultyFormValues>({
    resolver: zodResolver(facultySchema) as any,
    defaultValues,
  });

  // Image upload handler
  const handleImageUpload = useCallback(async (file: File) => {
    // Validate client-side
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

      // Show local preview immediately
      const localPreview = URL.createObjectURL(file);
      setImagePreview(localPreview);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "faculty");

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => null);
        throw new Error(errData?.error || "Upload failed");
      }

      const data = await res.json();
      setValue("imageUrl", data.url);
      setImagePreview(data.url);

      // Clean up the local object URL
      URL.revokeObjectURL(localPreview);
    } catch (err: any) {
      console.error("Upload error:", err);
      setError(err.message || "Failed to upload image");
      setImagePreview(initialData?.imageUrl || null);
    } finally {
      setUploading(false);
    }
  }, [setValue, initialData?.imageUrl]);

  const handleRemoveImage = () => {
    setImagePreview(null);
    setValue("imageUrl", "");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Drag & Drop handlers
  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) {
      handleImageUpload(e.dataTransfer.files[0]);
    }
  }, [handleImageUpload]);

  const onSubmit = async (data: FacultyFormValues) => {
    try {
      setLoading(true);
      setError("");

      const url = initialData ? `/api/faculty/${initialData.id}` : `/api/faculty`;
      const method = initialData ? "PUT" : "POST";

      // Transform textareas back to JSON arrays
      const payload = {
        ...data,
        publications: textToJson(data.publications || ""),
        research: textToJson(data.research || ""),
      };

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        if (res.status === 401) throw new Error("Unauthorized");
        if (res.status === 403) throw new Error("Forbidden");
        throw new Error("Something went wrong");
      }

      router.refresh();
      router.push("/admin/faculty");
    } catch (error: any) {
      console.error(error);
      setError(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-10">
      <div className="flex items-center justify-between border-b pb-4">
        <h1 className="text-2xl font-bold">{title}</h1>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        {/* Profile Photo Upload */}
        <div className="space-y-4 bg-gray-50 p-4 rounded-lg border">
          <h3 className="font-semibold text-lg">Profile Photo</h3>
          <div className="flex items-start gap-6">
            {/* Preview */}
            <div className="flex-shrink-0">
              {imagePreview ? (
                <div className="relative group">
                  <img
                    src={imagePreview}
                    alt="Faculty preview"
                    className="w-32 h-32 rounded-xl object-cover border-2 border-gray-200 shadow-sm"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    disabled={uploading}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 shadow-md"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                  {uploading && (
                    <div className="absolute inset-0 bg-black/40 rounded-xl flex items-center justify-center">
                      <Loader2 className="w-6 h-6 text-white animate-spin" />
                    </div>
                  )}
                </div>
              ) : (
                <div className="w-32 h-32 rounded-xl bg-gray-200 flex items-center justify-center border-2 border-dashed border-gray-300">
                  <ImageIcon className="w-10 h-10 text-gray-400" />
                </div>
              )}
            </div>

            {/* Upload dropzone */}
            <div className="flex-1">
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`
                  relative cursor-pointer rounded-xl border-2 border-dashed p-6 text-center transition-all duration-200
                  ${dragActive
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-300 hover:border-gray-400 hover:bg-gray-100"
                  }
                  ${uploading ? "pointer-events-none opacity-60" : ""}
                `}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleImageUpload(file);
                  }}
                  disabled={uploading}
                />
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-700">
                  {uploading ? "Uploading..." : "Click or drag & drop to upload"}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  JPEG, PNG, WebP or GIF • Max 5MB
                </p>
              </div>
            </div>
          </div>
          {/* Hidden field for imageUrl managed by upload */}
          <input type="hidden" {...register("imageUrl")} />
        </div>

        {/* Core Info Group */}
        <div className="space-y-4 bg-gray-50 p-4 rounded-lg border">
          <h3 className="font-semibold text-lg">Identity</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Name *</label>
              <Input disabled={loading} placeholder="Dr. John Doe" {...register("name")} />
              {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Designation *</label>
              <Input disabled={loading} placeholder="Professor" {...register("designation")} />
              {errors.designation && <p className="text-xs text-red-500">{errors.designation.message}</p>}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Department *</label>
              <Input disabled={loading} placeholder="Computer Science" {...register("department")} />
              {errors.department && <p className="text-xs text-red-500">{errors.department.message}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Order</label>
              <Input
                type="number"
                disabled={loading}
                {...register("order", { valueAsNumber: true })}
              />
              {errors.order && <p className="text-xs text-red-500">{errors.order.message}</p>}
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-4 bg-gray-50 p-4 rounded-lg border">
          <h3 className="font-semibold text-lg">Contact</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input disabled={loading} placeholder="john@example.com" {...register("email")} />
              {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Phone</label>
              <Input disabled={loading} placeholder="+1 234 567 890" {...register("phone")} />
              {errors.phone && <p className="text-xs text-red-500">{errors.phone.message}</p>}
            </div>
          </div>
        </div>

        {/* Professional Details */}
        <div className="space-y-4 bg-gray-50 p-4 rounded-lg border">
          <h3 className="font-semibold text-lg">Professional Details</h3>
          <div className="space-y-2">
            <label className="text-sm font-medium">Qualification</label>
            <Input disabled={loading} placeholder="Ph.D. in ..." {...register("qualification")} />
            {errors.qualification && <p className="text-xs text-red-500">{errors.qualification.message}</p>}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Experience</label>
            <Input disabled={loading} placeholder="10 years..." {...register("experience")} />
            {errors.experience && <p className="text-xs text-red-500">{errors.experience.message}</p>}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Bio</label>
            <textarea
              className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              disabled={loading}
              placeholder="Full biography..."
              {...register("bio")}
            />
            {errors.bio && <p className="text-xs text-red-500">{errors.bio.message}</p>}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Publications (One per line)</label>
            <textarea
              className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              disabled={loading}
              placeholder="Enter each publication on a new line"
              {...register("publications")}
            />
            <p className="text-xs text-gray-500">Separated by new lines</p>
            {errors.publications && <p className="text-xs text-red-500">{errors.publications.message}</p>}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Research Interests (One per line)</label>
            <textarea
              className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              disabled={loading}
              placeholder="AI, Machine Learning, etc..."
              {...register("research")}
            />
            {errors.research && <p className="text-xs text-red-500">{errors.research.message}</p>}
          </div>
        </div>

        {/* Checkbox for Visibility */}
        <div className="flex items-center space-x-2 border p-4 rounded-md">
          <input
            type="checkbox"
            id="isVisible"
            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            disabled={loading}
            {...register("isVisible")}
          />
          <label
            htmlFor="isVisible"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Visible on Public Site
          </label>
        </div>

        <Button disabled={loading || uploading} className="w-full" type="submit">
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {action}
        </Button>
      </form>
    </div>
  );
};
