import { PageContentForm } from "@/components/admin/PageContentForm";

export default function NewPageContentPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-heading font-bold text-primary">New Content Section</h1>
      </div>
      <PageContentForm />
    </div>
  );
}
