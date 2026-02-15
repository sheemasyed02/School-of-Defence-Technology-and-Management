"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { facultySchema } from "@/lib/validations";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Faculty } from "@prisma/client";
import { Loader2 } from "lucide-react";

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
  const router = useRouter(); // Correct hook for App Router
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
    // Treat publications and research as text for the form, but they might be stored as JSON
    // We rely on the jsonToText conversion for initial render
    publications: jsonToText(initialData?.publications ?? null),
    research: jsonToText(initialData?.research ?? null),
    order: initialData?.order ?? 0,
    isVisible: initialData?.isVisible ?? true,
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FacultyFormValues>({
    resolver: zodResolver(facultySchema),
    defaultValues,
  });

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
            <div className="space-y-2">
                <label className="text-sm font-medium">Image URL</label>
                <Input disabled={loading} placeholder="https://..." {...register("imageUrl")} />
                {errors.imageUrl && <p className="text-xs text-red-500">{errors.imageUrl.message}</p>}
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

        <Button disabled={loading} className="w-full" type="submit">
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {action}
        </Button>
      </form>
    </div>
  );
};
