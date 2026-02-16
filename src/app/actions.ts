"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { hasPermission } from "@/lib/permissions";
import { getClientIP, getUserAgent } from "@/lib/security";

// ─── Security Utils ────────────────────────────────────────────────────────
async function getAuthenticatedUser() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    throw new Error("Unauthorized");
  }
  return session.user;
}

async function logAudit(
  action: string,
  entity: string,
  entityId: string,
  details: any
) {
  try {
    const user = await getAuthenticatedUser();
    const ip = getClientIP();
    const ua = getUserAgent();

    await supabase.from("AuditLog").insert({
      userId: user.id,
      action,
      entity,
      entityId,
      details: JSON.stringify(details),
      ipAddress: ip,
      userAgent: ua,
      createdAt: new Date().toISOString(),
    });
  } catch (e) {
    console.error("Audit Log Error:", e);
  }
}

// ─── Resource name mapping ─────────────────────────────────────────────────
function tableToResource(table: string): string {
  const map: Record<string, string> = {
    Faculty: "faculty",
    Event: "events",
    Announcement: "announcements",
    Program: "programs",
    Research: "research",
    Gallery: "gallery",
    Placement: "placements",
    User: "users",
    Settings: "settings",
    Contact: "contacts",
    PageContent: "pages",
  };
  return map[table] || table.toLowerCase();
}

// ─── Generic Mutations ─────────────────────────────────────────────────────
type MutationResult =
  | { success: true; data?: any }
  | { success: false; error: string };

export async function createRecord(
  table: string,
  data: any,
  path: string
): Promise<MutationResult> {
  try {
    const user = await getAuthenticatedUser();
    const resource = tableToResource(table);

    if (!hasPermission(user.role, resource, "write")) {
      return { success: false, error: "Insufficient permissions" };
    }

    const { data: result, error } = await supabase
      .from(table)
      .insert(data)
      .select()
      .single();

    if (error) throw error;

    await logAudit("CREATE", table, result.id, data);
    revalidatePath(path);
    return { success: true, data: result };
  } catch (error: any) {
    console.error(`Create ${table} Error:`, error);
    return { success: false, error: error.message };
  }
}

export async function updateRecord(
  table: string,
  id: string,
  data: any,
  path: string
): Promise<MutationResult> {
  try {
    const user = await getAuthenticatedUser();
    const resource = tableToResource(table);

    if (!hasPermission(user.role, resource, "write")) {
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

export async function deleteRecord(
  table: string,
  id: string,
  path: string
): Promise<MutationResult> {
  try {
    const user = await getAuthenticatedUser();
    const resource = tableToResource(table);

    if (!hasPermission(user.role, resource, "delete")) {
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

// ─── Block/Unblock IP ──────────────────────────────────────────────────────
export async function blockIPAction(
  ipAddress: string,
  reason: string,
  expiresAt?: string
): Promise<MutationResult> {
  try {
    const user = await getAuthenticatedUser();
    if (!hasPermission(user.role, "blocked-ips", "write")) {
      return { success: false, error: "Insufficient permissions" };
    }

    const { error } = await supabase.from("BlockedIP").upsert(
      {
        ipAddress,
        reason,
        blockedBy: user.id,
        expiresAt: expiresAt || null,
        isActive: true,
        blockedAt: new Date().toISOString(),
      },
      { onConflict: "ipAddress" }
    );

    if (error) throw error;

    await logAudit("BLOCK_IP", "BlockedIP", ipAddress, { reason });
    revalidatePath("/admin/blocked-ips");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function unblockIPAction(
  id: string
): Promise<MutationResult> {
  try {
    const user = await getAuthenticatedUser();
    if (!hasPermission(user.role, "blocked-ips", "delete")) {
      return { success: false, error: "Insufficient permissions" };
    }

    const { error } = await supabase
      .from("BlockedIP")
      .update({ isActive: false })
      .eq("id", id);

    if (error) throw error;

    await logAudit("UNBLOCK_IP", "BlockedIP", id, {});
    revalidatePath("/admin/blocked-ips");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
