import { DataTable } from "@/components/admin/DataTable";
import { columns, User } from "./columns";
import { Button } from "@/components/ui/Button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export const dynamic = 'force-dynamic';

async function getData(): Promise<User[]> {
  const { data: users, error } = await supabase
    .from("User")
    .select("*")
    .order("createdAt", { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }
  return (users as User[]) || [];
}

export default async function UsersPage() {
  const data = await getData();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
           <h1 className="text-3xl font-heading font-bold text-primary">User Management</h1>
           <p className="text-foreground-muted mt-1">Manage admin access and roles.</p>
        </div>
        <Link href="/admin/users/new">
          <Button className="gap-2">
              <Plus className="w-4 h-4" />
               New User
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-lg border shadow-sm p-4">
        <DataTable columns={columns} data={data} searchKey="email" />
      </div>
    </div>
  );
}
