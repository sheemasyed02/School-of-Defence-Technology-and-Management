"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

type UserFormValues = {
  name: string;
  email: string;
  password?: string;
  role: "SUPER_ADMIN" | "EDITOR" | "FACULTY_ADMIN";
};

interface UserFormProps {
  initialData?: any;
}

export const UserForm: React.FC<UserFormProps> = ({ initialData }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const title = initialData ? "Edit User" : "Create User";
  const action = initialData ? "Save changes" : "Create";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormValues>({
    defaultValues: initialData || {
      name: "",
      email: "",
      role: "EDITOR",
    },
  });

  const onSubmit = async (data: UserFormValues) => {
    try {
      setLoading(true);
      setError("");

      let res;
      if (initialData) {
        // Updated
        const payload: any = {
            name: data.name,
            email: data.email,
            role: data.role,
        };
        if (data.password) {
            payload.password = data.password;
        }

        res = await fetch(`/api/admin/users/${initialData.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });
      } else {
        // Create
        if (!data.password) {
            setError("Password is required for new users");
            setLoading(false);
            return;
        }

        res = await fetch("/api/admin/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
      }

      if (!res.ok) {
          const body = await res.json();
          throw new Error(body.error || "Failed to save user");
      }

      router.refresh();
      router.push("/admin/users");
    } catch (error: any) {
      console.error(error);
      setError(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{title}</h1>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        <div className="space-y-2">
            <label className="text-sm font-medium">Name</label>
            <Input disabled={loading} placeholder="Jane Doe" {...register("name", { required: true })} />
        </div>

        <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <Input disabled={loading} type="email" placeholder="jane@example.com" {...register("email", { required: true })} />
        </div>

        <div className="space-y-2">
            <label className="text-sm font-medium">Role</label>
            <select
                {...register("role")}
                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={loading}
            >
                <option value="EDITOR">Editor</option>
                <option value="FACULTY_ADMIN">Faculty Admin</option>
                <option value="SUPER_ADMIN">Super Admin</option>
            </select>
        </div>

        <div className="space-y-2">
            <label className="text-sm font-medium">{initialData ? "New Password (Optional)" : "Password"}</label>
            <Input
                disabled={loading}
                type="password"
                placeholder={initialData ? "Leave blank to keep current" : "Secure password"}
                {...register("password")}
            />
        </div>

        <Button disabled={loading} className="w-full" type="submit">
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {action}
        </Button>
      </form>
    </div>
  );
};
