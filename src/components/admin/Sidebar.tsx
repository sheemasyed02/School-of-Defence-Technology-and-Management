"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Calendar,
  Megaphone,
  GraduationCap,
  FlaskConical,
  Image,
  Award,
  Settings,
  Shield,
  ScrollText,
  MapPin,
  Ban,
  Mail,
  FileText,
  Briefcase,
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: any;
  roles: string[]; // Which roles can see this
  badge?: string;
}

const NAV_ITEMS: NavItem[] = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
    roles: ["SUPER_ADMIN", "EDITOR", "FACULTY_ADMIN"],
  },
  {
    label: "Faculty",
    href: "/admin/faculty",
    icon: Users,
    roles: ["SUPER_ADMIN", "EDITOR", "FACULTY_ADMIN"],
  },
  {
    label: "Programs",
    href: "/admin/programs",
    icon: GraduationCap,
    roles: ["SUPER_ADMIN", "EDITOR"],
  },
  {
    label: "Students",
    href: "/admin/students",
    icon: BookOpen,
    roles: ["SUPER_ADMIN", "EDITOR"],
  },
  {
    label: "Alumni",
    href: "/admin/alumni",
    icon: Briefcase,
    roles: ["SUPER_ADMIN", "EDITOR"],
  },
  {
    label: "Research",
    href: "/admin/research",
    icon: FlaskConical,
    roles: ["SUPER_ADMIN", "EDITOR", "FACULTY_ADMIN"],
  },
  {
    label: "Events",
    href: "/admin/events",
    icon: Calendar,
    roles: ["SUPER_ADMIN", "EDITOR"],
  },
  {
    label: "Announcements",
    href: "/admin/announcements",
    icon: Megaphone,
    roles: ["SUPER_ADMIN", "EDITOR"],
  },
  {
    label: "Gallery",
    href: "/admin/gallery",
    icon: Image,
    roles: ["SUPER_ADMIN", "EDITOR"],
  },
  {
    label: "Placements",
    href: "/admin/placements",
    icon: Award,
    roles: ["SUPER_ADMIN", "EDITOR"],
  },
  {
    label: "Contacts",
    href: "/admin/contacts",
    icon: Mail,
    roles: ["SUPER_ADMIN", "EDITOR"],
  },
  {
    label: "Pages",
    href: "/admin/pages",
    icon: FileText,
    roles: ["SUPER_ADMIN", "EDITOR"],
  },
  // ─── Security Section (SUPER_ADMIN only) ───
  {
    label: "Users",
    href: "/admin/users",
    icon: Shield,
    roles: ["SUPER_ADMIN"],
  },
  {
    label: "Audit Logs",
    href: "/admin/audit-logs",
    icon: ScrollText,
    roles: ["SUPER_ADMIN"],
  },
  {
    label: "Login History",
    href: "/admin/login-logs",
    icon: MapPin,
    roles: ["SUPER_ADMIN"],
  },
  {
    label: "Blocked IPs",
    href: "/admin/blocked-ips",
    icon: Ban,
    roles: ["SUPER_ADMIN"],
  },
  {
    label: "Settings",
    href: "/admin/settings",
    icon: Settings,
    roles: ["SUPER_ADMIN"],
  },
];

export const Sidebar = () => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const userRole = (session?.user as any)?.role || "EDITOR";

  const filteredItems = NAV_ITEMS.filter((item) =>
    item.roles.includes(userRole)
  );

  // Group: Content items vs Security items
  const contentItems = filteredItems.filter(
    (item) =>
      !["Users", "Audit Logs", "Login History", "Blocked IPs", "Settings"].includes(
        item.label
      )
  );
  const securityItems = filteredItems.filter((item) =>
    ["Users", "Audit Logs", "Login History", "Blocked IPs", "Settings"].includes(
      item.label
    )
  );

  return (
    <aside className="fixed inset-y-0 left-0 w-64 bg-[#0A1F44] text-white flex flex-col z-50">
      {/* Logo Area */}
      <div className="h-16 flex items-center px-6 border-b border-white/10">
        <Link href="/admin" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-[#0A1F44] font-black text-sm">
            D
          </div>
          <div>
            <span className="font-bold text-sm tracking-wide">DIAT</span>
            <span className="text-[10px] text-white/50 block -mt-0.5">
              Admin Panel
            </span>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {/* Content Management */}
        <p className="px-3 text-[10px] uppercase tracking-wider text-white/30 font-semibold mb-2">
          Content
        </p>
        {contentItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/admin" && pathname.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 group ${
                isActive
                  ? "bg-white/10 text-amber-400 font-medium shadow-sm"
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon
                className={`w-4 h-4 flex-shrink-0 ${
                  isActive
                    ? "text-amber-400"
                    : "text-white/40 group-hover:text-white/70"
                }`}
              />
              <span>{item.label}</span>
              {item.badge && (
                <span className="ml-auto bg-amber-500/20 text-amber-400 text-[10px] px-1.5 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}

        {/* Security Section */}
        {securityItems.length > 0 && (
          <>
            <div className="my-4 border-t border-white/10" />
            <p className="px-3 text-[10px] uppercase tracking-wider text-white/30 font-semibold mb-2">
              Security & Admin
            </p>
            {securityItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/admin" && pathname.startsWith(item.href));
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 group ${
                    isActive
                      ? "bg-red-500/10 text-red-400 font-medium shadow-sm"
                      : "text-white/70 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 flex-shrink-0 ${
                      isActive
                        ? "text-red-400"
                        : "text-white/40 group-hover:text-white/70"
                    }`}
                  />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </>
        )}
      </nav>

      {/* User Info */}
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-amber-400">
            {(session?.user?.name || "A").charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">
              {session?.user?.name || "Admin"}
            </p>
            <p className="text-[10px] text-white/40">
              {userRole.replace("_", " ")}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};
