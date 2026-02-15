"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

// --- SECURITY UTILS ---
async function getAuthenticatedUser() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    throw new Error("Unauthorized");
  }
  return session.user;
}

async function logAudit(action: string, entity: string, entityId: string, details: any) {
  try {
    const user = await getAuthenticatedUser();
    await supabase.from("AuditLog").insert({
      userId: user.id, // Store NextAuth User ID (UUID)
      action,
      entity,
      entityId,
      details: JSON.stringify(details),
      ipAddress: "server-side", // In real deployment, extract from headers if needed
      createdAt: new Date().toISOString(),
    });
  } catch (e) {
    console.error("Audit Log Error:", e);
    // Don't fail the main action if logging fails, but alert admins in real prod.
  }
}

// --- GENERIC MUTATIONS ---

type MutationResult = { success: true; data?: any } | { success: false; error: string };

export async function createRecord(table: string, data: any, path: string): Promise<MutationResult> {
  try {
    const user = await getAuthenticatedUser();
    if (user.role !== "SUPER_ADMIN" && user.role !== "EDITOR" && user.role !== "FACULTY_ADMIN") {
         return { success: false, error: "Insufficient permissions" };
    }

    const { data: result, error } = await supabase.from(table).insert(data).select().single();

    if (error) throw error;

    await logAudit("CREATE", table, result.id, data);
    revalidatePath(path);
    return { success: true, data: result };
  } catch (error: any) {
    console.error(`Create ${table} Error:`, error);
    return { success: false, error: error.message };
  }
}

export async function updateRecord(table: string, id: string, data: any, path: string): Promise<MutationResult> {
  try {
    const user = await getAuthenticatedUser();
     if (user.role !== "SUPER_ADMIN" && user.role !== "EDITOR" && user.role !== "FACULTY_ADMIN") {
         return { success: false, error: "Insufficient permissions" };
    }

    const { error } = await supabase.from(table).update(data).eq("id", id);

    if (error) throw error;

    await logAudit("UPDATE", table, id, data);
    revalidatePath(path);
    return { success: true };
  } catch (error: any) {
     console.error(`Update ${table} Error:`, error);
    return { success: false, error: error.message };
  }
}

export async function deleteRecord(table: string, id: string, path: string): Promise<MutationResult> {
  try {
    const user = await getAuthenticatedUser();
    // Only Super Admins can delete critical data? Or standard roles?
    // Let's stick to standard roles for now but log heavily.
     if (user.role !== "SUPER_ADMIN" && user.role !== "EDITOR") {
         return { success: false, error: "Insufficient permissions" };
    }

    const { error } = await supabase.from(table).delete().eq("id", id);

    if (error) throw error;

    await logAudit("DELETE", table, id, { deletedAt: new Date() });
    revalidatePath(path);
    return { success: true };
  } catch (error: any) {
      console.error(`Delete ${table} Error:`, error);
    return { success: false, error: error.message };
  }
}
