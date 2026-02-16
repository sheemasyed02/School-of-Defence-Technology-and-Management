import { supabase } from "@/lib/supabase";
import { FileText, Plus, Pencil } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export const dynamic = 'force-dynamic';

async function getPageContent() {
  const { data, error } = await supabase
    .from("PageContent")
    .select("*")
    .order("page", { ascending: true })
    .order("section", { ascending: true }); // Then by section name

  if (error) {
    console.error("Error fetching pages:", error);
    return [];
  }
  return data;
}

export default async function PagesPage() {
  const rawPages = await getPageContent();

  // Normalize data (snake_case -> camelCase)
  const pages = rawPages?.map((p: any) => ({
    ...p,
    isVisible: p.is_visible,
    updatedAt: p.updated_at,
  })) || [];

  // Group by page name
  const grouped: Record<string, any[]> = {};
  pages.forEach((p) => {
    if (!grouped[p.page]) grouped[p.page] = [];
    grouped[p.page].push(p);
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <FileText className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-primary">
              Page Content
            </h1>
            <p className="text-sm text-gray-500">
              Manage dynamic content sections across your website. (
              {pages.length} sections)
            </p>
          </div>
        </div>
        <Link href="/admin/pages/new">
          <Button className="gap-2">
            <Plus className="w-4 h-4" /> Add Section
          </Button>
        </Link>
      </div>

      {Object.keys(grouped).length === 0 ? (
        <div className="bg-white rounded-lg border shadow-sm p-12 text-center">
          <FileText className="w-10 h-10 mx-auto mb-3 text-gray-300" />
          <p className="text-gray-500">
            No page content sections defined yet.
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Click "Add Section" to create your first content block.
          </p>
          <div className="mt-4">
            <Link href="/admin/pages/new">
              <Button variant="outline">Create Initial Content</Button>
            </Link>
          </div>
        </div>
      ) : (
        Object.entries(grouped).map(([pageName, sections]) => (
          <div
            key={pageName}
            className="bg-white rounded-lg border shadow-sm overflow-hidden"
          >
            <div className="bg-gray-50 border-b px-6 py-3 flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-800 capitalize">
                  {pageName} Page
                </h3>
                <p className="text-xs text-gray-500">
                  {sections.length} section
                  {sections.length > 1 ? "s" : ""}
                </p>
              </div>
            </div>
            <div className="divide-y">
              {sections.map((section: any) => (
                <div
                  key={section.id}
                  className="p-6 hover:bg-gray-50 transition-colors group relative"
                >
                  <div className="flex items-start justify-between pr-10">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800 capitalize flex items-center gap-2">
                        {section.section}
                        { !section.isVisible && (
                          <span className="text-[10px] bg-gray-200 text-gray-600 px-1.5 py-0.5 rounded">Hidden</span>
                        )}
                      </h4>
                      <p className="text-sm text-gray-500 mt-1 line-clamp-3 whitespace-pre-wrap">
                        {section.content || "No content"}
                      </p>
                    </div>
                  </div>
                  <p className="text-[10px] text-gray-400 mt-2">
                    Last updated:{" "}
                    {section.updatedAt ? new Date(section.updatedAt).toLocaleString() : 'N/A'}
                  </p>

                  {/* Edit Action */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link href={`/admin/pages/${section.id}`}>
                      <Button size="icon" variant="ghost" className="h-8 w-8 text-blue-600">
                        <Pencil className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
