import { PageContentForm } from "@/components/admin/PageContentForm";
import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";

interface EditPageContentPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditPageContentPage({ params }: EditPageContentPageProps) {
  const { id } = await params;
  const { data } = await supabase
    .from("PageContent")
    .select("*")
    .eq("id", id)
    .single();

  if (!data) {
    notFound();
  }

  // Transform snake_case to camelCase for form compatibility
  const content = {
    ...data,
    isVisible: data.is_visible,
    updatedAt: data.updated_at,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-heading font-bold text-primary">Edit Content Section</h1>
      </div>
      <PageContentForm initialData={content} />
    </div>
  );
}
