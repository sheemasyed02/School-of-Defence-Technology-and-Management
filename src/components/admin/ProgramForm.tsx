"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { createRecord, updateRecord } from "@/app/actions";

type ProgramFormValues = {
  title: string;
  degree: string;
  duration: string;
  description: string;
  curriculum: string;
  eligibility: string;
  intake: string;
  outcomes: string;
  isVisible: boolean;
};

interface ProgramFormProps {
  initialData?: any;
}

// Helper to parse JSON string to new-line separated string
const jsonToText = (jsonStr: string | null): string => {
  if (!jsonStr) return "";
  try {
    const parsed = JSON.parse(jsonStr);
    if (Array.isArray(parsed)) {
      return parsed.join("\n");
    }
    return String(parsed);
  } catch (e) {
    return jsonStr;
  }
};

// Helper to convert new-line separated string to JSON string
const textToJson = (text: string): string => {
  if (!text) return "[]";
  const arr = text.split("\n").map(s => s.trim()).filter(Boolean);
  return JSON.stringify(arr);
};

export const ProgramForm: React.FC<ProgramFormProps> = ({ initialData }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const title = initialData ? "Edit Program" : "Create Program";
  const action = initialData ? "Save changes" : "Create";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProgramFormValues>({
    defaultValues: initialData ? {
        ...initialData,
        curriculum: jsonToText(initialData.curriculum),
        outcomes: jsonToText(initialData.outcomes),
    } : {
      title: "",
      degree: "M.Tech",
      duration: "2 Years",
      description: "",
      curriculum: "",
      eligibility: "",
      intake: "",
      outcomes: "",
      isVisible: true,
    },
  });

  const onSubmit = async (data: ProgramFormValues) => {
    try {
      setLoading(true);
      setError("");

      const payload = {
        ...data,
        curriculum: textToJson(data.curriculum),
        outcomes: textToJson(data.outcomes),
        updatedAt: new Date().toISOString()
      };

      if (initialData) {
        // USING SECURE SERVER ACTION (with Audit Log)
        const result = await updateRecord("Program", initialData.id, payload, "/admin/programs");
        if (!result.success) throw new Error(result.error);
      } else {
        // CREATE RECORD
        const result = await createRecord("Program", payload, "/admin/programs");
        if (!result.success) throw new Error(result.error);
      }

      router.refresh();
      router.push("/admin/programs");
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
            <label className="text-sm font-medium">Program Title</label>
            <Input disabled={loading} placeholder="M.Tech in Defence Technology" {...register("title", { required: true })} />
        </div>

        <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
                <label className="text-sm font-medium">Degree Level</label>
                <select
                    {...register("degree")}
                    className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={loading}
                >
                    <option value="M.Tech">M.Tech</option>
                    <option value="PhD">PhD</option>
                    <option value="Certificate">Certificate</option>
                </select>
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium">Duration</label>
                <Input disabled={loading} placeholder="2 Years" {...register("duration")} />
            </div>
        </div>

        <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <textarea
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                disabled={loading}
                placeholder="Overview of the program..."
                {...register("description")}
            />
        </div>

        <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
                <label className="text-sm font-medium">Intake Capacity</label>
                <Input disabled={loading} placeholder="30 students per year" {...register("intake")} />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium">Eligibility Criteria</label>
                <Input disabled={loading} placeholder="B.Tech with 60%..." {...register("eligibility")} />
            </div>
        </div>

        <div className="space-y-2">
            <label className="text-sm font-medium">Learning Outcomes (One item per line)</label>
            <textarea
                className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-mono"
                disabled={loading}
                placeholder="Advanced knowledge...&#10;Research skills..."
                {...register("outcomes")}
            />
        </div>

        <div className="space-y-2">
            <label className="text-sm font-medium">Curriculum (One semester per line, e.g. 'Semester 1: Subjects...')</label>
            <textarea
                className="flex min-h-[150px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-mono"
                disabled={loading}
                placeholder="Semester 1: Core Subjects, Math, Physics&#10;Semester 2: Electives, Chem"
                {...register("curriculum")}
            />
            <p className="text-xs text-muted-foreground">Each line represents a semester/module. Use format 'Title: Details'.</p>
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
