"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Calendar, MapPin, Image as ImageIcon, Shield, Plus, Trash2, Settings2, Upload, X } from "lucide-react";
import { createRecord, updateRecord } from "@/app/actions";
import { eventSchema, EventFormValues } from "@/lib/validations";
import CreatableSelect from "@/components/admin/CreatableSelect";

const DEFAULT_EVENT_TYPES = ["Workshop", "Symposium", "Seminar", "Conference", "Panel Discussion", "Hackathon"];

interface EventFormProps {
  initialData?: any;
}

export const EventForm: React.FC<EventFormProps> = ({ initialData }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(initialData?.imageUrl || null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const title = initialData ? "Edit Event" : "Create Event";
  const action = initialData ? "Save changes" : "Create Event";

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<EventFormValues>({
    // @ts-ignore - mismatch in zod version vs resolver types
    resolver: zodResolver(eventSchema),
    defaultValues: initialData ? {
        ...initialData,
        date: initialData.date ? new Date(initialData.date).toISOString().slice(0, 16) : '',
        form_config: initialData.form_config || []
    } : {
      title: "",
      description: "",
      date: "",
      venue: "",
      imageUrl: "",
      type: "Workshop",
      status: "UPCOMING", // Added status default value
      registration_enabled: false,
      form_config: [],
      isVisible: true,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "form_config",
  });

  const registrationEnabled = watch("registration_enabled");

  async function onSubmit(data: EventFormValues) {
    try {
      setLoading(true);
      setError("");

      const payload = {
        ...data,
        date: data.date ? new Date(data.date).toISOString() : null,
        updatedAt: new Date().toISOString()
      };

      if (initialData) {
        const result = await updateRecord("Event", initialData.id, payload, "/admin/events");
        if (!result.success) throw new Error(result.error);
      } else {
        const result = await createRecord("Event", payload, "/admin/events");
        if (!result.success) throw new Error(result.error);
      }

      router.refresh();
      router.push("/admin/events");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong. Please check your network and permissions.");
    } finally {
      setLoading(false);
    }
  }

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
      formData.append("folder", "events");

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
      setImagePreview(initialData?.imageUrl || null);
    } finally {
      setUploading(false);
    }
  }, [setValue, initialData?.imageUrl]);

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

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-10">
      <div className="flex flex-col gap-2 border-b border-primary/10 pb-6">
        <h1 className="text-3xl font-heading font-bold text-primary">{title}</h1>
        <p className="text-foreground-muted text-sm">
          Plan and organize campus activities, workshops, and symposiums.
        </p>
      </div>

      {error && (
        <div className="bg-accent/10 border border-accent/20 text-accent px-4 py-3 rounded-brand flex items-center gap-3 animate-fade-in" role="alert">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-sm font-medium">{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit as any)} className="space-y-8">

        {/* Core Details Card */}
        <div className="bg-white p-6 sm:p-8 rounded-brand shadow-brand border border-border-light space-y-8">
            <div className="flex items-center gap-2 border-b border-gray-100 pb-2">
                <div className="w-1 h-4 bg-gold rounded-full" />
                <h3 className="font-heading font-bold text-lg text-primary">Core Details</h3>
            </div>

            <div className="space-y-5">
                <div>
                    <label className="text-sm font-semibold text-primary/80 block mb-1.5 uppercase tracking-wider">Event Title *</label>
                    <Input disabled={loading} placeholder="e.g. Annual Tech Symposium 2026" className="focus-visible:ring-primary h-11" {...register("title")} />
                    {errors.title && <p className="text-xs text-accent mt-1.5 font-medium">{errors.title.message}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div>
                        <label className="text-sm font-semibold text-primary/80 block mb-1.5 uppercase tracking-wider">Event Type</label>
                        <CreatableSelect
                            settingsKey="custom_event_types"
                            defaultOptions={DEFAULT_EVENT_TYPES}
                            value={watch("type") || "Workshop"}
                            onChange={(v) => setValue("type", v)}
                            disabled={loading}
                        />
                    </div>
                    <div>
                        <label className="text-sm font-semibold text-primary/80 block mb-1.5 uppercase tracking-wider">Event Status</label>
                        <select
                            className="flex h-11 w-full rounded-brand border border-input bg-background px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2214%22%20height%3D%228%22%20viewBox%3D%220%200%2014%208%22%20fill%3D%22none%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M1%201L7%207L13%201%22%20stroke%3D%22%23667085%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22/%3E%3C/svg%3E')] bg-[length:12px_8px] bg-[right_1rem_center] bg-no-repeat"
                            {...register("status")}
                            disabled={loading}
                        >
                            <option value="UPCOMING">Upcoming Event</option>
                            <option value="PAST">Past Event (Archive)</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-sm font-semibold text-primary/80 block mb-1.5 uppercase tracking-wider">Date & Time</label>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary/40" />
                            <Input type="datetime-local" disabled={loading} className="pl-10 focus-visible:ring-primary h-11" {...register("date")} />
                        </div>
                        {errors.date && <p className="text-xs text-accent mt-1.5 font-medium">{errors.date.message}</p>}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="text-sm font-semibold text-primary/80 block mb-1.5 uppercase tracking-wider">Venue</label>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary/40" />
                            <Input disabled={loading} placeholder="Main Auditorium" className="pl-10 focus-visible:ring-primary h-11" {...register("venue")} />
                        </div>
                    </div>
                    <div>
                         <label className="text-sm font-semibold text-primary/80 block mb-1.5 uppercase tracking-wider">Event Image</label>
                         <div className="flex items-start gap-4">
                            {imagePreview ? (
                              <div className="relative group w-24 h-24 sm:w-32 sm:h-32">
                                <img
                                  src={imagePreview}
                                  alt="Event preview"
                                  className="w-full h-full rounded-xl object-cover border-2 border-gray-200 shadow-sm"
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
                              <div
                                onDragEnter={handleDrag}
                                onDragLeave={handleDrag}
                                onDragOver={handleDrag}
                                onDrop={handleDrop}
                                onClick={() => fileInputRef.current?.click()}
                                className={`
                                  flex-1 cursor-pointer rounded-xl border-2 border-dashed p-6 text-center transition-all duration-200
                                  ${dragActive ? "border-primary bg-primary/5" : "border-gray-200 hover:border-primary/30 hover:bg-gray-50"}
                                  ${uploading ? "pointer-events-none opacity-60" : ""}
                                `}
                              >
                                <input
                                  ref={fileInputRef}
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) handleImageUpload(file);
                                  }}
                                />
                                <Upload className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                                <p className="text-xs font-medium text-gray-600">Click or drag image to upload</p>
                              </div>
                            )}
                            <input type="hidden" {...register("imageUrl")} />
                         </div>
                    </div>
                </div>

                <div>
                    <label className="text-sm font-semibold text-primary/80 block mb-1.5 uppercase tracking-wider">Brief Description</label>
                    <textarea
                        className="flex min-h-[120px] w-full rounded-brand border border-input bg-background px-3 py-3 text-sm focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all"
                        disabled={loading}
                        placeholder="Detail what attendees can expect..."
                        {...register("description")}
                    />
                </div>
            </div>
        </div>

        {/* Registration & Form Builder Card */}
        <div className="bg-white p-6 sm:p-8 rounded-brand shadow-brand border border-border-light space-y-8">
            <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                <div className="flex items-center gap-2">
                    <div className="w-1 h-4 bg-gold rounded-full" />
                    <h3 className="font-heading font-bold text-lg text-primary">Registration Settings</h3>
                </div>
                <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setValue("registration_enabled", !registrationEnabled)}>
                    <div className={`w-10 h-6 rounded-full transition-all duration-300 relative ${registrationEnabled ? "bg-primary" : "bg-gray-200"}`}>
                        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-300 ${registrationEnabled ? "left-5" : "left-1"}`} />
                    </div>
                    <span className="text-sm font-bold text-primary select-none">Accept Registrations</span>
                </div>
            </div>

            {registrationEnabled && (
                <div className="space-y-6 animate-fade-in">
                    <div className="bg-primary/5 p-4 rounded-brand border border-primary/10 flex items-start gap-3">
                        <Settings2 className="w-5 h-5 text-primary mt-0.5" />
                        <div>
                            <p className="text-sm font-bold text-primary">Dynamic Form Builder</p>
                            <p className="text-xs text-primary/60">Define the fields attendees must fill to register for this event.</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {fields.map((field, index) => (
                            <div key={field.id} className="flex flex-col sm:flex-row gap-3 p-4 bg-gray-50 rounded-brand border border-gray-200 relative group transition-all">
                                <div className="flex-1 space-y-3">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        <div>
                                            <label className="text-[10px] font-bold text-primary/60 uppercase mb-1 block">Field Label</label>
                                            <Input
                                                disabled={loading}
                                                placeholder="e.g. Full Name"
                                                className="h-9 text-xs"
                                                {...register(`form_config.${index}.label` as const)}
                                            />
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-bold text-primary/60 uppercase mb-1 block">Input Type</label>
                                            <select
                                                className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-xs appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2214%22%20height%3D%228%22%20viewBox%3D%220%200%2014%208%22%20fill%3D%22none%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M1%201L7%207L13%201%22%20stroke%3D%22%23667085%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22/%3E%3C/svg%3E')] bg-[length:10px_6px] bg-[right_0.5rem_center] bg-no-repeat"
                                                {...register(`form_config.${index}.type` as const)}
                                            >
                                                <option value="text">Text Input</option>
                                                <option value="email">Email</option>
                                                <option value="textarea">Large Text</option>
                                                <option value="select">Dropdown</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input type="checkbox" className="w-3.5 h-3.5 rounded border-gray-300 text-primary" {...register(`form_config.${index}.required` as const)} />
                                            <span className="text-[11px] font-medium text-primary/80">Required Field</span>
                                        </label>

                                        {watch(`form_config.${index}.type`) === 'select' && (
                                            <div className="flex-1 transition-all">
                                                <Input
                                                    disabled={loading}
                                                    placeholder="Options (comma separated)"
                                                    className="h-8 text-[10px]"
                                                    {...register(`form_config.${index}.options` as const)}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="text-accent hover:text-accent/80 hover:bg-accent/5 self-start sm:self-center"
                                    onClick={() => remove(index)}
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        ))}

                        <Button
                            type="button"
                            variant="outline"
                            className="w-full border-dashed border-2 hover:bg-primary/5 hover:border-primary/50 text-primary/60 hover:text-primary gap-2 h-12"
                            onClick={() => append({ label: "", type: "text", required: true })}
                        >
                            <Plus className="w-4 h-4" />
                            Add Form Field
                        </Button>
                    </div>
                </div>
            )}
        </div>

        {/* Global Options & Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6">
            <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => setValue("isVisible", !watch("isVisible"))}>
                <div className={`w-10 h-6 rounded-full transition-all duration-300 relative ${watch("isVisible") ? "bg-primary" : "bg-gray-200"}`}>
                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-300 ${watch("isVisible") ? "left-5" : "left-1"}`} />
                </div>
                <input type="checkbox" className="hidden" {...register("isVisible")} />
                <span className="text-sm font-bold text-primary group-hover:text-primary/70 select-none">Publicly Visible</span>
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
