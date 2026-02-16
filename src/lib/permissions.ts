import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export type Role = "SUPER_ADMIN" | "EDITOR" | "FACULTY_ADMIN";

// Resource-action permission matrix
const PERMISSIONS: Record<Role, Record<string, ("read" | "write" | "delete")[]>> = {
  SUPER_ADMIN: {
    // Super admin can do everything
    faculty: ["read", "write", "delete"],
    events: ["read", "write", "delete"],
    announcements: ["read", "write", "delete"],
    programs: ["read", "write", "delete"],
    research: ["read", "write", "delete"],
    gallery: ["read", "write", "delete"],
    placements: ["read", "write", "delete"],
    users: ["read", "write", "delete"],
    settings: ["read", "write", "delete"],
    contacts: ["read", "write", "delete"],
    pages: ["read", "write", "delete"],
    "audit-logs": ["read"],
    "login-logs": ["read"],
    "blocked-ips": ["read", "write", "delete"],
  },
  EDITOR: {
    faculty: ["read", "write", "delete"],
    events: ["read", "write", "delete"],
    announcements: ["read", "write", "delete"],
    programs: ["read", "write", "delete"],
    research: ["read", "write", "delete"],
    gallery: ["read", "write", "delete"],
    placements: ["read", "write", "delete"],
    contacts: ["read", "write"],
    pages: ["read", "write"],
    // No access to users, settings, audit-logs, login-logs, blocked-ips
  },
  FACULTY_ADMIN: {
    faculty: ["read", "write"],
    research: ["read", "write"],
    // No access to other resources
  },
};

export async function getCurrentUser() {
  const session = await getServerSession(authOptions);
  return session?.user;
}

export function hasPermission(
  userRole: string,
  resource: string,
  action: "read" | "write" | "delete"
): boolean {
  const role = userRole as Role;
  const rolePerms = PERMISSIONS[role];
  if (!rolePerms) return false;

  const resourcePerms = rolePerms[resource];
  if (!resourcePerms) return false;

  return resourcePerms.includes(action);
}

export function getAccessibleResources(userRole: string): string[] {
  const role = userRole as Role;
  const rolePerms = PERMISSIONS[role];
  if (!rolePerms) return [];
  return Object.keys(rolePerms);
}
