"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2, BookOpen, FlaskConical, Lightbulb, ExternalLink, Shield } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { researchSchema, ResearchFormValues } from "@/lib/validations";

interface ResearchFormProps {
  initialData?: any;
}

export const ResearchForm: React.FC<ResearchFormProps> = ({ initialData }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeType, setActiveType] = useState<"PUBLICATION" | "PROJECT" | "PATENT">("PUBLICATION");

  const title = initialData ? "Edit Research Item" : "Add Research Item";
  const action = initialData ? "Save changes" : "Create";

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ResearchFormValues>({
    resolver: zodResolver(researchSchema),
    defaultValues: initialData ? {
        ...initialData,
        publicationDate: initialData.publicationDate ? new Date(initialData.publicationDate).toISOString().slice(0, 10) : '',
        startDate: initialData.startDate ? new Date(initialData.startDate).toISOString().slice(0, 10) : '',
        endDate: initialData.endDate ? new Date(initialData.endDate).toISOString().slice(0, 10) : '',
    } : {
      type: "PUBLICATION",
      title: "",
      authors: "",
      publicationDate: "",
      startDate: "",
      endDate: "",
      journal: "",
      status: "PUBLISHED",
      link: "",
      abstract: "",
      isVisible: true,
    },
  });

  // Watch type change to update UI state if form state changes (e.g. valid default)
  const formType = watch("type");
  useEffect(() => {
    if (formType) setActiveType(formType as any);
  }, [formType]);

  const handleTypeChange = (type: "PUBLICATION" | "PROJECT" | "PATENT") => {
    setValue("type", type);
    setActiveType(type);
    // Set default status based on type
    if (type === "PROJECT") setValue("status", "ONGOING");
    else if (type === "PATENT") setValue("status", "FILED");
    else setValue("status", "PUBLISHED");
  };

  const onSubmit = async (data: ResearchFormValues) => {
    try {
      setLoading(true);
      setError("");

      // Ensure dates are ISO-8601 compliant
      const formatDate = (dateStr?: string | null) => dateStr ? new Date(dateStr).toISOString() : null;

      const payload = {
        ...data,
        publicationDate: formatDate(data.publicationDate),
        startDate: formatDate(data.startDate),
        endDate: formatDate(data.endDate),
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
      setError(error.message || "Something went wrong. Please check if database columns exist (type, status, startDate, endDate).");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-10">
      <div className="flex flex-col gap-2 border-b border-primary/10 pb-6">
        <h1 className="text-3xl font-heading font-bold text-primary">{title}</h1>
        <p className="text-foreground-muted text-sm sm:text-base">
          Manage your academic portfolio with Publications, Projects, and Patents.
        </p>
      </div>

      {error && (
        <div className="bg-accent/10 border border-accent/20 text-accent px-4 py-3 rounded-brand flex items-center gap-3" role="alert">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-sm font-medium">{error}</span>
        </div>
      )}

      {/* Type Selector - More Premium Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { id: "PUBLICATION", label: "Publication", icon: BookOpen, color: "primary" },
          { id: "PROJECT", label: "Project", icon: FlaskConical, color: "accent" },
          { id: "PATENT", label: "Patent", icon: Lightbulb, color: "gold" },
        ].map((type) => {
          const Icon = type.icon;
          const isActive = activeType === type.id;

          return (
            <button
              key={type.id}
              type="button"
              onClick={() => handleTypeChange(type.id as any)}
              className={`flex items-center gap-4 p-4 rounded-brand border-2 transition-all duration-300 group ${
                isActive
                  ? "border-primary bg-primary text-white shadow-brand-lg"
                  : "border-border-light bg-white hover:border-primary/30 hover:shadow-brand"
              }`}
            >
              <div className={`p-2 rounded-lg transition-colors ${
                isActive ? "bg-white/20" : "bg-gray-100 group-hover:bg-primary/10"
              }`}>
                <Icon className={`w-5 h-5 ${isActive ? "text-white" : "text-primary/60"}`} />
              </div>
              <span className="font-bold tracking-wide">{type.label}</span>
            </button>
          );
        })}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 bg-white p-6 sm:p-8 rounded-brand shadow-brand border border-border-light relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl pointer-events-none" />

        <input type="hidden" {...register("type")} />

        {/* Section: Basic Info */}
        <div className="space-y-6">
            <div className="flex items-center gap-2 border-b border-gray-100 pb-2">
                <div className="w-1 h-4 bg-gold rounded-full" />
                <h3 className="font-heading font-bold text-lg text-primary">Essential Details</h3>
            </div>

            <div className="space-y-5">
                <div>
                    <label className="text-sm font-semibold text-primary/80 block mb-1.5 uppercase tracking-wider">
                        {activeType === "PUBLICATION" ? "Paper Title" : activeType === "PROJECT" ? "Project Title" : "Invention Title"} *
                    </label>
                    <Input
                        disabled={loading}
                        placeholder="e.g. Advancements in Defence Tech..."
                        className="focus-visible:ring-primary h-11"
                        {...register("title")}
                    />
                    {errors.title && <p className="text-xs text-accent mt-1.5 font-medium">{errors.title.message}</p>}
                </div>

                <div>
                    <label className="text-sm font-semibold text-primary/80 block mb-1.5 uppercase tracking-wider">
                        {activeType === "PUBLICATION" ? "Authors" : activeType === "PROJECT" ? "Lead Investigators / PI" : "Inventors"}
                    </label>
                    <Input
                        disabled={loading}
                        placeholder="e.g. Dr. Sarah Johnson, Prof. Mike Chen"
                        className="focus-visible:ring-primary h-11"
                        {...register("authors")}
                    />
                </div>
            </div>
        </div>

        {/* Section: Specific Context */}
        <div className="space-y-6">
            <div className="flex items-center gap-2 border-b border-gray-100 pb-2">
                <div className="w-1 h-4 bg-gold rounded-full" />
                <h3 className="font-heading font-bold text-lg text-primary">Context & Timing</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {activeType === "PUBLICATION" && (
                    <>
                        <div>
                            <label className="text-sm font-semibold text-primary/80 block mb-1.5 uppercase tracking-wider">Publication Date</label>
                            <Input type="date" disabled={loading} className="focus-visible:ring-primary h-11" {...register("publicationDate")} />
                        </div>
                        <div>
                            <label className="text-sm font-semibold text-primary/80 block mb-1.5 uppercase tracking-wider">Journal / Conference</label>
                            <Input disabled={loading} placeholder="e.g. IEEE Transactions..." className="focus-visible:ring-primary h-11" {...register("journal")} />
                        </div>
                    </>
                )}

                {activeType === "PROJECT" && (
                    <>
                        <div>
                            <label className="text-sm font-semibold text-primary/80 block mb-1.5 uppercase tracking-wider">Start Date</label>
                            <Input type="date" disabled={loading} className="focus-visible:ring-primary h-11" {...register("startDate")} />
                        </div>
                        <div>
                            <label className="text-sm font-semibold text-primary/80 block mb-1.5 uppercase tracking-wider">End Date (Expected)</label>
                            <Input type="date" disabled={loading} className="focus-visible:ring-primary h-11" {...register("endDate")} />
                        </div>
                        <div className="md:col-span-1">
                             <label className="text-sm font-semibold text-primary/80 block mb-1.5 uppercase tracking-wider">Status</label>
                             <select
                                className="flex h-11 w-full rounded-brand border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2214%22%20height%3D%228%22%20viewBox%3D%220%200%2014%208%22%20fill%3D%22none%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M1%201L7%207L13%201%22%20stroke%3D%22%23667085%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22/%3E%3C/svg%3E')] bg-[length:12px_8px] bg-[right_1rem_center] bg-no-repeat"
                                {...register("status")}
                                disabled={loading}
                             >
                                <option value="ONGOING">Ongoing</option>
                                <option value="COMPLETED">Completed</option>
                                <option value="PROPOSED">Proposed</option>
                             </select>
                        </div>
                        <div className="md:col-span-1">
                            <label className="text-sm font-semibold text-primary/80 block mb-1.5 uppercase tracking-wider">Funding Agency</label>
                            <Input disabled={loading} placeholder="e.g. DST, DRDO" className="focus-visible:ring-primary h-11" {...register("journal")} />
                        </div>
                    </>
                )}

                {activeType === "PATENT" && (
                    <>
                        <div>
                            <label className="text-sm font-semibold text-primary/80 block mb-1.5 uppercase tracking-wider">Filing / Grant Date</label>
                            <Input type="date" disabled={loading} className="focus-visible:ring-primary h-11" {...register("publicationDate")} />
                        </div>
                        <div>
                             <label className="text-sm font-semibold text-primary/80 block mb-1.5 uppercase tracking-wider">Status</label>
                             <select
                                className="flex h-11 w-full rounded-brand border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2214%22%20height%3D%228%22%20viewBox%3D%220%200%2014%208%22%20fill%3D%22none%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M1%201L7%207L13%201%22%20stroke%3D%22%23667085%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22/%3E%3C/svg%3E')] bg-[length:12px_8px] bg-[right_1rem_center] bg-no-repeat"
                                {...register("status")}
                                disabled={loading}
                             >
                                <option value="FILED">Filed / Pending</option>
                                <option value="GRANTED">Granted</option>
                                <option value="PUBLISHED">Published</option>
                             </select>
                        </div>
                        <div className="md:col-span-2">
                            <label className="text-sm font-semibold text-primary/80 block mb-1.5 uppercase tracking-wider">Patent Office / Number</label>
                            <Input disabled={loading} placeholder="e.g. USPTO, Indian Patent Office" className="focus-visible:ring-primary h-11" {...register("journal")} />
                        </div>
                    </>
                )}
            </div>
        </div>

        {/* Section: Links & Narrative */}
        <div className="space-y-6">
            <div className="flex items-center gap-2 border-b border-gray-100 pb-2">
                <div className="w-1 h-4 bg-gold rounded-full" />
                <h3 className="font-heading font-bold text-lg text-primary">Links & Summary</h3>
            </div>

             <div className="space-y-5">
                <div>
                    <label className="text-sm font-semibold text-primary/80 block mb-1.5 uppercase tracking-wider">DOI / Project URL</label>
                    <div className="relative group">
                        <ExternalLink className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary/40 group-focus-within:text-primary transition-colors" />
                        <Input className="pl-10 focus-visible:ring-primary h-11" disabled={loading} placeholder="https://doi.org/..." {...register("link")} />
                    </div>
                </div>

                <div>
                    <label className="text-sm font-semibold text-primary/80 block mb-1.5 uppercase tracking-wider">
                        {activeType === "PROJECT" ? "Project Overview" : "Technical Abstract"}
                    </label>
                    <textarea
                        className="flex min-h-[140px] w-full rounded-brand border border-input bg-background px-3 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all border-gray-200"
                        disabled={loading}
                        placeholder="Provide a brief summary of the work..."
                        {...register("abstract")}
                    />
                </div>
            </div>
        </div>

        {/* Visibility & Actions */}
        <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => setValue("isVisible", !watch("isVisible"))}>
                <div className={`w-10 h-6 rounded-full transition-all duration-300 relative ${watch("isVisible") ? "bg-primary" : "bg-gray-200"}`}>
                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-300 ${watch("isVisible") ? "left-5" : "left-1"}`} />
                </div>
                <input type="checkbox" className="hidden" {...register("isVisible")} />
                <span className="text-sm font-bold text-primary group-hover:text-primary/70 select-none">Visible on Site</span>
            </div>

            <Button disabled={loading} className="w-full sm:w-auto min-w-[200px] h-12 bg-primary hover:bg-primary/90 text-white shadow-brand-lg" type="submit">
                {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Shield className="mr-2 h-5 w-5" />}
                {action}
            </Button>
        </div>
      </form>
    </div>
  );
};
