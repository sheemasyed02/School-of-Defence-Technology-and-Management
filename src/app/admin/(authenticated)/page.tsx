import { supabase } from "@/lib/supabase";
import { StatCard } from "@/components/admin/StatCard";
import {
  Users,
  BookOpen,
  GraduationCap,
  Calendar,
  Megaphone,
  Image,
  Award,
  FlaskConical,
  ScrollText,
  Mail,
  Shield,
  MapPin,
} from "lucide-react";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

async function getDashboardStats() {
  const [
    facultyRes,
    eventsRes,
    announcementsRes,
    programsRes,
    researchRes,
    galleryRes,
    placementsRes,
    usersRes,
    contactsRes,
    auditRes,
    loginRes,
    blockedRes,
  ] = await Promise.all([
    supabase.from("Faculty").select("*", { count: "exact", head: true }),
    supabase.from("Event").select("*", { count: "exact", head: true }),
    supabase.from("Announcement").select("*", { count: "exact", head: true }),
    supabase.from("Program").select("*", { count: "exact", head: true }),
    supabase.from("Research").select("*", { count: "exact", head: true }),
    supabase.from("Gallery").select("*", { count: "exact", head: true }),
    supabase.from("Placement").select("*", { count: "exact", head: true }),
    supabase.from("User").select("*", { count: "exact", head: true }),
    supabase
      .from("Contact")
      .select("*", { count: "exact", head: true })
      .eq("status", "NEW"),
    supabase.from("AuditLog").select("*", { count: "exact", head: true }),
    supabase
      .from("LoginLog")
      .select("*", { count: "exact", head: true })
      .gte("createdAt", new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()),
    supabase
      .from("BlockedIP")
      .select("*", { count: "exact", head: true })
      .eq("isActive", true),
  ]);

  return {
    faculty: facultyRes.count || 0,
    events: eventsRes.count || 0,
    announcements: announcementsRes.count || 0,
    programs: programsRes.count || 0,
    research: researchRes.count || 0,
    gallery: galleryRes.count || 0,
    placements: placementsRes.count || 0,
    users: usersRes.count || 0,
    newContacts: contactsRes.count || 0,
    auditLogs: auditRes.count || 0,
    recentLogins: loginRes.count || 0,
    blockedIPs: blockedRes.count || 0,
  };
}

async function getRecentActivity() {
  const { data } = await supabase
    .from("AuditLog")
    .select("*")
    .order("createdAt", { ascending: false })
    .limit(8);
  return data || [];
}

async function getRecentLogins() {
  const { data } = await supabase
    .from("LoginLog")
    .select("*")
    .order("createdAt", { ascending: false })
    .limit(5);
  return data || [];
}

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);
  const isSuperAdmin = session?.user?.role === "SUPER_ADMIN";

  const stats = await getDashboardStats();
  const recentActivity = await getRecentActivity();
  const recentLogins = await getRecentLogins();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-heading font-bold text-primary">
          Dashboard Overview
        </h1>
        <p className="text-foreground-muted mt-2">
          Live data from your institution&apos;s database.
        </p>
      </div>

      {/* Primary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          label="Faculty Members"
          value={stats.faculty.toString()}
          trend={{
            value: stats.faculty,
            label: "total active",
            positive: true,
          }}
          icon={Users}
        />
        <StatCard
          label="Research Papers"
          value={stats.research.toString()}
          trend={{
            value: stats.research,
            label: "publications",
            positive: true,
          }}
          icon={FlaskConical}
        />
        <StatCard
          label="Programs"
          value={stats.programs.toString()}
          trend={{
            value: stats.programs,
            label: "offered",
            positive: true,
          }}
          icon={GraduationCap}
        />
        <StatCard
          label="Events"
          value={stats.events.toString()}
          trend={{
            value: stats.events,
            label: "scheduled",
            positive: true,
          }}
          icon={Calendar}
        />
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <MiniStat
          label="Announcements"
          value={stats.announcements}
          icon={Megaphone}
          href="/admin/announcements"
        />
        <MiniStat
          label="Gallery Items"
          value={stats.gallery}
          icon={Image}
          href="/admin/gallery"
        />
        <MiniStat
          label="Placements"
          value={stats.placements}
          icon={Award}
          href="/admin/placements"
        />
        <MiniStat
          label="New Contacts"
          value={stats.newContacts}
          icon={Mail}
          href="/admin/contacts"
          highlight={stats.newContacts > 0}
        />
        {isSuperAdmin && (
          <>
            <MiniStat
              label="Admin Users"
              value={stats.users}
              icon={Shield}
              href="/admin/users"
            />
            <MiniStat
              label="Blocked IPs"
              value={stats.blockedIPs}
              icon={MapPin}
              href="/admin/blocked-ips"
              highlight={stats.blockedIPs > 0}
              highlightColor="red"
            />
          </>
        )}
      </div>

      {/* Activity & Logins */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div className="bg-background-paper p-6 rounded-brand shadow-brand border border-border-light">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-heading font-bold text-primary">
              Recent Activity
            </h3>
            <Link
              href="/admin/audit-logs"
              className="text-xs text-primary/60 hover:text-primary transition-colors"
            >
              View All →
            </Link>
          </div>
          {recentActivity.length === 0 ? (
            <p className="text-foreground-muted text-sm text-center py-8">
              No activity recorded yet.
            </p>
          ) : (
            <div className="space-y-3">
              {recentActivity.map((log: any) => (
                <div
                  key={log.id}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div
                    className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                      log.action === "CREATE"
                        ? "bg-green-500"
                        : log.action === "UPDATE"
                        ? "bg-blue-500"
                        : log.action === "DELETE"
                        ? "bg-red-500"
                        : "bg-gray-400"
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800">
                      {log.action}{" "}
                      <span className="text-gray-500">{log.entity}</span>
                    </p>
                    <p className="text-xs text-gray-400">
                      {new Date(log.createdAt).toLocaleString()} •{" "}
                      {log.ipAddress}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Logins */}
        <div className="bg-background-paper p-6 rounded-brand shadow-brand border border-border-light">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-heading font-bold text-primary">
              Login Activity
            </h3>
            <Link
              href="/admin/login-logs"
              className="text-xs text-primary/60 hover:text-primary transition-colors"
            >
              View All →
            </Link>
          </div>
          {recentLogins.length === 0 ? (
            <p className="text-foreground-muted text-sm text-center py-8">
              No login activity recorded yet.
            </p>
          ) : (
            <div className="space-y-3">
              {recentLogins.map((login: any) => (
                <div
                  key={login.id}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div
                    className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                      login.status === "SUCCESS"
                        ? "bg-green-500"
                        : login.status === "BLOCKED"
                        ? "bg-red-500"
                        : "bg-yellow-500"
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800">
                      {login.email}
                    </p>
                    <p className="text-xs text-gray-400">
                      {login.status} •{" "}
                      {[login.city, login.country]
                        .filter(Boolean)
                        .join(", ") || login.ipAddress}{" "}
                      • {new Date(login.createdAt).toLocaleString()}
                    </p>
                    {login.failReason && (
                      <p className="text-xs text-red-500 mt-0.5">
                        {login.failReason}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-background-paper p-6 rounded-brand shadow-brand border border-border-light">
        <h3 className="text-xl font-heading font-bold text-primary mb-6">
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <QuickAction
            label="Add Faculty"
            desc="Create a new faculty profile"
            href="/admin/faculty/new"
          />
          <QuickAction
            label="New Event"
            desc="Schedule upcoming event"
            href="/admin/events/new"
          />
          <QuickAction
            label="New Announcement"
            desc="Post an announcement"
            href="/admin/announcements/new"
          />
          <QuickAction
            label="Settings"
            desc="Configure site options"
            href="/admin/settings"
          />
        </div>
      </div>
    </div>
  );
}

// ─── Sub-components ─────────────────────────────────────────────────────────

function MiniStat({
  label,
  value,
  icon: Icon,
  href,
  highlight = false,
  highlightColor = "amber",
}: {
  label: string;
  value: number;
  icon: any;
  href: string;
  highlight?: boolean;
  highlightColor?: string;
}) {
  return (
    <Link
      href={href}
      className={`p-4 rounded-lg border transition-all hover:shadow-md group ${
        highlight
          ? highlightColor === "red"
            ? "border-red-200 bg-red-50/50"
            : "border-amber-200 bg-amber-50/50"
          : "border-border-light bg-background-paper hover:border-primary/20"
      }`}
    >
      <Icon
        className={`w-4 h-4 mb-2 ${
          highlight
            ? highlightColor === "red"
              ? "text-red-500"
              : "text-amber-500"
            : "text-gray-400 group-hover:text-primary"
        } transition-colors`}
      />
      <p className="text-2xl font-bold text-primary">{value}</p>
      <p className="text-[10px] text-gray-500 uppercase tracking-wider">
        {label}
      </p>
    </Link>
  );
}

function QuickAction({
  label,
  desc,
  href,
}: {
  label: string;
  desc: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="p-4 rounded-lg bg-background hover:bg-primary/5 border border-border-light transition-colors text-left group"
    >
      <span className="block text-primary font-bold mb-1 group-hover:text-gold transition-colors">
        {label}
      </span>
      <span className="text-xs text-foreground-muted">{desc}</span>
    </Link>
  );
}
