
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  Calendar,
  Megaphone,
  FileText,
  Settings,
  LogOut,
  Image as ImageIcon,
  Briefcase
} from "lucide-react";
import { cn } from "@/lib/utils";

const MENU_ITEMS = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Faculty", href: "/admin/faculty", icon: Users },
  { label: "Programs", href: "/admin/programs", icon: GraduationCap },
  { label: "Research", href: "/admin/research", icon: FileText },
  { label: "Events", href: "/admin/events", icon: Calendar },
  { label: "Announcements", href: "/admin/announcements", icon: Megaphone },
  { label: "Gallery", href: "/admin/gallery", icon: ImageIcon },
  { label: "Placements", href: "/admin/placements", icon: Briefcase },
  { label: "Users", href: "/admin/users", icon: Users },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-background-paper border-r border-border-light z-40 flex flex-col">
      <div className="h-16 flex items-center px-6 border-b border-border-light">
        <h2 className="text-xl font-heading font-bold text-primary">Admin Panel</h2>
      </div>

      <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
        {MENU_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-white"
                  : "text-foreground-muted hover:bg-background hover:text-primary"
              )}
            >
              <item.icon className={cn("w-5 h-5", isActive ? "text-white" : "text-foreground-muted")} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border-light">
        <button className="flex items-center gap-3 w-full px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md transition-colors">
          <LogOut className="w-5 h-5" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
