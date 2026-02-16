"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { Check, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { pageContentSchema, PageContentFormValues } from "@/lib/validations";

type PageContent = {
  id: string;
  page: string;
  section: string;
  content: string;
  isVisible: boolean;
  updatedAt: string;
};

interface PageContentFormProps {
  initialData?: PageContent | null;
}

export function PageContentForm({ initialData }: PageContentFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorDialog, setErrorDialog] = useState<string | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const form = useForm<PageContentFormValues>({
    resolver: zodResolver(pageContentSchema),
    defaultValues: {
      page: initialData?.page || "",
      section: initialData?.section || "",
      content: initialData?.content || "",
      isVisible: initialData?.isVisible ?? true,
    },
  });

  const onSubmit = async (data: PageContentFormValues) => {
    try {
      setLoading(true);

      const url = initialData
        ? `/api/page-content/${initialData.id}`
        : `/api/page-content`;

      const method = initialData ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to save content");
      }

      router.refresh();
      router.push("/admin/pages");
    } catch (error) {
      console.error(error);
      setErrorDialog(error instanceof Error ? error.message : "An unexpected error occurred while saving.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/page-content/${initialData?.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      router.refresh();
      router.push("/admin/pages");
    } catch (error) {
      console.error(error);
      setIsDeleteOpen(false);
      setErrorDialog("Failed to delete the content section.");
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg border shadow-sm p-6 max-w-2xl">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Page Name</label>
            <Input
              disabled={loading}
              placeholder="e.g. Home, About Us..."
              {...form.register("page")}
            />
            {form.formState.errors.page && (
              <p className="text-xs text-red-500">{form.formState.errors.page.message}</p>
            )}
            <p className="text-xs text-gray-400">Identify which page this content belongs to.</p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Section Identifier</label>
            <Input
              disabled={loading}
              placeholder="e.g. Hero Title, Mission Text..."
              {...form.register("section")}
            />
            {form.formState.errors.section && (
              <p className="text-xs text-red-500">{form.formState.errors.section.message}</p>
            )}
            <p className="text-xs text-gray-400">Unique name key for this content block.</p>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Content</label>
          <Textarea
            disabled={loading}
            placeholder="Enter the text content here..."
            className="h-32"
            {...form.register("content")}
          />
          {form.formState.errors.content && (
            <p className="text-xs text-red-500">{form.formState.errors.content.message}</p>
          )}
        </div>

        <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isVisible"
              className="rounded border-gray-300 text-primary focus:ring-primary h-4 w-4"
              disabled={loading}
              {...form.register("isVisible")}
            />
            <label htmlFor="isVisible" className="text-sm font-medium text-gray-700 select-none cursor-pointer">
              Visible on website
            </label>
        </div>

        <div className="flex justify-between pt-4 border-t">
          {initialData && (
             <Button
               type="button"
               variant="destructive"
               disabled={loading}
               onClick={() => setIsDeleteOpen(true)}
             >
               Delete Section
             </Button>
          )}
          <div className="flex gap-3 ml-auto">
            <Button
                type="button"
                variant="outline"
                disabled={loading}
                onClick={() => router.back()}
            >
                Cancel
            </Button>
            <Button type="submit" disabled={loading} className="min-w-[100px]">
                {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
                ) : initialData ? (
                "Update Content"
                ) : (
                "Create Content"
                )}
            </Button>
          </div>
        </div>
      </form>
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the content section.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                handleDelete();
              }}
              className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
              disabled={loading}
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Error Dialog */}
      <AlertDialog open={!!errorDialog} onOpenChange={() => setErrorDialog(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-red-600">Error</AlertDialogTitle>
            <AlertDialogDescription>{errorDialog}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setErrorDialog(null)}>OK</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
