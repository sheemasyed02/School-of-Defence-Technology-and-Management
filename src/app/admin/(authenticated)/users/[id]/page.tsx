import { supabase } from "@/lib/supabase";
import { UserForm } from "@/components/admin/UserForm";
import { notFound } from "next/navigation";

export default async function EditUserPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data: user, error } = await supabase
    .from("User")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !user) {
    notFound();
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <UserForm initialData={user} />
    </div>
  );
}
