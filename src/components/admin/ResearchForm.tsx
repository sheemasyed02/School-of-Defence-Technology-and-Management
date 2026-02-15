"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

type ResearchFormValues = {
  title: string;
  authors: string;
  publicationDate: string;
  journal: string;
  link: string;
  abstract: string;
  isVisible: boolean;
};

interface ResearchFormProps {
  initialData?: any;
}

export const ResearchForm: React.FC<ResearchFormProps> = ({ initialData }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const title = initialData ? "Edit Research" : "Create Research";
  const action = initialData ? "Save changes" : "Create";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResearchFormValues>({
    defaultValues: initialData ? {
        ...initialData,
        publicationDate: initialData.publicationDate ? new Date(initialData.publicationDate).toISOString().slice(0, 10) : ''
    } : {
      title: "",
      authors: "",
      publicationDate: "",
      journal: "",
      link: "",
      abstract: "",
      isVisible: true,
    },
  });

  const onSubmit = async (data: ResearchFormValues) => {
    try {
      setLoading(true);
      setError("");

      // Ensure date is ISO-8601 compliant
      let pubDate = null;
      if (data.publicationDate) {
           pubDate = new Date(data.publicationDate).toISOString();
      }

      const payload = {
        ...data,
        publicationDate: pubDate,
        updatedAt: new Date().toISOString()
      };

      if (initialData) {
        const { error } = await supabase
            .from("Research")
            .update(payload)
            .eq("id", initialData.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
            .from("Research")
            .insert([payload]);
        if (error) throw error;
      }

      router.refresh();
      router.push("/admin/research");
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
            <label className="text-sm font-medium">Research Title</label>
            <Input disabled={loading} placeholder="AI in Defence Systems" {...register("title", { required: true })} />
        </div>

        <div className="space-y-2">
            <label className="text-sm font-medium">Authors</label>
            <Input disabled={loading} placeholder="Dr. Smith, Lt. Col. Jones" {...register("authors")} />
        </div>

        <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
                <label className="text-sm font-medium">Publication Date</label>
                <Input type="date" disabled={loading} {...register("publicationDate")} />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium">Journal/Publisher</label>
                <Input disabled={loading} placeholder="IEEE Transactions" {...register("journal")} />
            </div>
        </div>

        <div className="space-y-2">
            <label className="text-sm font-medium">Link (DOI/URL)</label>
            <Input type="url" disabled={loading} placeholder="https://doi.org/..." {...register("link")} />
        </div>

        <div className="space-y-2">
            <label className="text-sm font-medium">Abstract</label>
            <textarea
                className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                disabled={loading}
                placeholder="Brief summary of the research..."
                {...register("abstract")}
            />
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
