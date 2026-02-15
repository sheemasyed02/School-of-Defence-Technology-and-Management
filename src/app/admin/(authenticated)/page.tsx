
import { StatCard } from "@/components/admin/StatCard";
import { Users, BookOpen, GraduationCap, Calendar } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-heading font-bold text-primary">Dashboard Overview</h1>
        <p className="text-foreground-muted mt-2">Welcome back, get an overview of your institution's content.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          label="Total Faculty"
          value="48"
          trend={{ value: 12, label: "from last month", positive: true }}
          icon={Users}
        />
        <StatCard
          label="Publications"
          value="156"
          trend={{ value: 8, label: "new this week", positive: true }}
          icon={BookOpen}
        />
        <StatCard
          label="Active Students"
          value="1,240"
          trend={{ value: 4, label: "vs last year", positive: true }}
          icon={GraduationCap}
        />
        <StatCard
          label="Upcoming Events"
          value="12"
          trend={{ value: 2, label: "scheduled", positive: true }}
          icon={Calendar}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-background-paper p-6 rounded-brand shadow-brand border border-border-light h-[400px]">
          <h3 className="text-xl font-heading font-bold text-primary mb-6">Recent Activities</h3>
          <div className="flex items-center justify-center h-full text-foreground-muted">
            Activity Graph Placeholder
          </div>
        </div>

        <div className="bg-background-paper p-6 rounded-brand shadow-brand border border-border-light">
          <h3 className="text-xl font-heading font-bold text-primary mb-6">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 rounded-lg bg-background hover:bg-primary/5 border border-border-light transition-colors text-left group">
              <span className="block text-primary font-bold mb-1 group-hover:text-gold transition-colors">Add Faculty</span>
              <span className="text-xs text-foreground-muted">Create a new faculty profile</span>
            </button>
            <button className="p-4 rounded-lg bg-background hover:bg-primary/5 border border-border-light transition-colors text-left group">
              <span className="block text-primary font-bold mb-1 group-hover:text-gold transition-colors">New Event</span>
              <span className="text-xs text-foreground-muted">Schedule upcoming event</span>
            </button>
            <button className="p-4 rounded-lg bg-background hover:bg-primary/5 border border-border-light transition-colors text-left group">
              <span className="block text-primary font-bold mb-1 group-hover:text-gold transition-colors">Waitlist</span>
              <span className="text-xs text-foreground-muted">Manage student admissions</span>
            </button>
            <button className="p-4 rounded-lg bg-background hover:bg-primary/5 border border-border-light transition-colors text-left group">
              <span className="block text-primary font-bold mb-1 group-hover:text-gold transition-colors">Settings</span>
              <span className="text-xs text-foreground-muted">Configure site options</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
