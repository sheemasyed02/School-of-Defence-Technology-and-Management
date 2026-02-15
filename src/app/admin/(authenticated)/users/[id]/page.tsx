import { supabase } from "@/lib/supabase";
import { UserForm } from "@/components/admin/UserForm";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function EditUserPage({ params }: PageProps) {
  const { data: user, error } = await supabase
    .from("User")
    .select("*")
    .eq("id", params.id)
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
