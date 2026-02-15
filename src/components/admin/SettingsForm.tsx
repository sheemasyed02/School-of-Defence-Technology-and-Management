"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

type SettingsFormValues = {
  siteName: string;
  siteDescription: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
};

// We will store these as key-value pairs in the 'Settings' table
// key: 'general_settings' -> value: JSON string

export const SettingsForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
  } = useForm<SettingsFormValues>();

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data, error } = await supabase
            .from("Settings")
            .select("value")
            .eq("key", "general_settings")
            .single();

        if (data && data.value) {
            const parsed = JSON.parse(data.value);
            setValue("siteName", parsed.siteName || "");
            setValue("siteDescription", parsed.siteDescription || "");
            setValue("contactEmail", parsed.contactEmail || "");
            setValue("contactPhone", parsed.contactPhone || "");
            setValue("address", parsed.address || "");
        }
      } catch (e) {
        console.error("Error fetching settings", e);
      } finally {
        setFetching(false);
      }
    };
    fetchSettings();
  }, [setValue]);

  const onSubmit = async (data: SettingsFormValues) => {
    try {
      setLoading(true);
      setError("");

      const payload = {
        key: "general_settings",
        value: JSON.stringify(data),
        category: "general",
        updatedAt: new Date().toISOString()
      };

      const { error } = await supabase
        .from("Settings")
        .upsert(payload)
        .select();

      if (error) throw error;

      router.refresh();
      alert("Settings saved successfully!");
    } catch (error: any) {
      console.error(error);
      setError(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
      return (
          <div className="flex h-40 items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
      );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between border-b pb-4">
        <div>
            <h1 className="text-2xl font-bold text-primary">General Settings</h1>
            <p className="text-foreground-muted text-sm mt-1">Configure global website details.</p>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        <div className="space-y-4 bg-white p-6 rounded-lg border shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Site Identity</h3>
            <div className="space-y-2">
                <label className="text-sm font-medium">Site Name</label>
                <Input disabled={loading} placeholder="School of Defence Technology" {...register("siteName")} />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium">Site Description (SEO)</label>
                <textarea
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    disabled={loading}
                    placeholder="A premier institution for..."
                    {...register("siteDescription")}
                />
            </div>
        </div>

        <div className="space-y-4 bg-white p-6 rounded-lg border shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Contact Email</label>
                    <Input type="email" disabled={loading} placeholder="info@example.com" {...register("contactEmail")} />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium">Contact Phone</label>
                    <Input disabled={loading} placeholder="+91 98765 43210" {...register("contactPhone")} />
                </div>
            </div>
             <div className="space-y-2">
                <label className="text-sm font-medium">Address</label>
                <textarea
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    disabled={loading}
                    placeholder="123, Defence Colony, New Delhi..."
                    {...register("address")}
                />
            </div>
        </div>

        <div className="flex justify-end">
            <Button disabled={loading} className="w-40" type="submit">
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Settings
            </Button>
        </div>
      </form>
    </div>
  );
};
