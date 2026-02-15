"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

type PlacementFormValues = {
  studentName: string;
  company: string;
  role: string;
  batch: string;
  package: string;
  imageUrl: string;
  isVisible: boolean;
};

interface PlacementFormProps {
  initialData?: any;
}

export const PlacementForm: React.FC<PlacementFormProps> = ({ initialData }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const title = initialData ? "Edit Placement" : "Add Placement Record";
  const action = initialData ? "Save changes" : "Create";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PlacementFormValues>({
    defaultValues: initialData || {
      studentName: "",
      company: "",
      role: "",
      batch: new Date().getFullYear().toString(),
      package: "",
      imageUrl: "",
      isVisible: true,
    },
  });

  const onSubmit = async (data: PlacementFormValues) => {
    try {
      setLoading(true);
      setError("");

      const payload = {
        ...data,
        updatedAt: new Date().toISOString()
      };

      if (initialData) {
        const { error } = await supabase
            .from("Placement")
            .update(payload)
            .eq("id", initialData.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
            .from("Placement")
            .insert([payload]);
        if (error) throw error;
      }

      router.refresh();
      router.push("/admin/placements");
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
            <label className="text-sm font-medium">Student Name</label>
            <Input disabled={loading} placeholder="John Doe" {...register("studentName", { required: true })} />
        </div>

        <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
                <label className="text-sm font-medium">Company</label>
                <Input disabled={loading} placeholder="Google" {...register("company", { required: true })} />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium">Role</label>
                <Input disabled={loading} placeholder="Software Engineer" {...register("role")} />
            </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
           <div className="space-y-2">
                <label className="text-sm font-medium">Batch (Year)</label>
                <Input disabled={loading} placeholder="2024" {...register("batch")} />
            </div>
             <div className="space-y-2">
                <label className="text-sm font-medium">Package (CTC)</label>
                <Input disabled={loading} placeholder="12 LPA" {...register("package")} />
            </div>
        </div>

        <div className="space-y-2">
            <label className="text-sm font-medium">Student Photo URL</label>
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
            <label htmlFor="isVisible" className="text-sm font-medium">Visible on Website</label>
        </div>

        <Button disabled={loading} className="w-full" type="submit">
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {action}
        </Button>
      </form>
    </div>
  );
};
