"use client";

import { signOut, useSession } from "next-auth/react";
import { LogOut, Bell, Shield } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const Topbar = () => {
  const { data: session } = useSession();
  const userRole = (session?.user as any)?.role || "";

  const roleColors: Record<string, string> = {
    SUPER_ADMIN: "bg-red-500/10 text-red-600 border-red-200",
    EDITOR: "bg-blue-500/10 text-blue-600 border-blue-200",
    FACULTY_ADMIN: "bg-green-500/10 text-green-600 border-green-200",
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Administration
        </h2>
        {userRole && (
          <span
            className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-full border ${
              roleColors[userRole] || "bg-gray-100 text-gray-600"
            }`}
          >
            <Shield className="w-3 h-3 inline mr-1" />
            {userRole.replace("_", " ")}
          </span>
        )}
      </div>

      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-400 hover:text-gray-600 relative"
        >
          <Bell className="w-4 h-4" />
        </Button>

        <div className="h-6 w-px bg-gray-200" />

        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-700">
              {session?.user?.name || "Admin"}
            </p>
            <p className="text-[10px] text-gray-400">
              {session?.user?.email}
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-4 h-4 mr-1" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
};
