import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export type Role = "SUPER_ADMIN" | "EDITOR" | "FACULTY_ADMIN";

export async function getCurrentUser() {
  const session = await getServerSession(authOptions);
  return session?.user;
}

export function hasPermission(userRole: string, resource: string, action: "read" | "write" | "delete") {
  if (userRole === "SUPER_ADMIN") return true;

  if (userRole === "EDITOR") {
    // Editor can read/write most content, but maybe specific restrictions on users/settings
    if (resource === "users" || resource === "settings") return false;
    return true;
  }

  if (userRole === "FACULTY_ADMIN") {
    // Only faculty and research
    if (["faculty", "research"].includes(resource)) return true;
    return false;
  }

  return false;
}
