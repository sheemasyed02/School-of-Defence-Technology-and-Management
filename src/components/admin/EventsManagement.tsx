"use client";

import { useState } from "react";
import { DataTable } from "@/components/admin/DataTable";
import { columns as eventColumns } from "@/app/admin/(authenticated)/events/columns";
import { Button } from "@/components/ui/Button";
import { Plus, Users, Calendar, BarChart3, Search, Download, Trash2, ShieldCheck, Mail, Info } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/Input";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

interface EventsManagementProps {
  initialEvents: any[];
  initialRegistrations: any[];
}

export const EventsManagement: React.FC<EventsManagementProps> = ({
  initialEvents,
  initialRegistrations
}) => {
  const [activeTab, setActiveTab] = useState<"list" | "registrations" | "analytics">("list");
  const [regSearch, setRegSearch] = useState("");
  const router = useRouter();

  // Filter registrations based on search
  const filteredRegs = initialRegistrations.filter(reg => {
    const searchStr = regSearch.toLowerCase();
    const event = initialEvents.find(e => e.id === reg.event_id);
    const eventTitle = event?.title?.toLowerCase() || "";
    const userDataStr = JSON.stringify(reg.user_data).toLowerCase();
    return eventTitle.includes(searchStr) || userDataStr.includes(searchStr);
  });

  const analytics = {
    totalEvents: initialEvents.length,
    activeEvents: initialEvents.filter(e => e.isVisible).length,
    totalRegistrations: initialRegistrations.length,
    registrationsByEvent: initialEvents.map(e => ({
      title: e.title,
      count: initialRegistrations.filter(r => r.event_id === e.id).length
    })).sort((a, b) => b.count - a.count)
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-primary/10 pb-6">
        <div>
           <h1 className="text-4xl font-heading font-bold text-primary tracking-tight">Events Command Center</h1>
           <p className="text-foreground-muted mt-1.5 flex items-center gap-2">
             <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
             Strategic management of campus activities and operational enrollment.
           </p>
        </div>
        <div className="flex items-center gap-3">
            <Link href="/admin/events/new">
                <Button className="bg-primary hover:bg-primary/90 text-white shadow-brand-lg gap-2 h-11 px-6">
                    <Plus className="w-5 h-5" />
                    <span className="font-bold">New Mission</span>
                </Button>
            </Link>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 bg-gray-100/50 p-1 rounded-xl w-fit border border-gray-200 shadow-inner">
        <button
            onClick={() => setActiveTab("list")}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-xs font-black uppercase tracking-widest transition-all duration-300 ${activeTab === 'list' ? 'bg-white text-primary shadow-sm border border-gray-200' : 'text-primary/40 hover:text-primary/60'}`}
        >
            <Calendar className="w-4 h-4" />
            Events Archive
        </button>
        <button
            onClick={() => setActiveTab("registrations")}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-xs font-black uppercase tracking-widest transition-all duration-300 ${activeTab === 'registrations' ? 'bg-white text-primary shadow-sm border border-gray-200' : 'text-primary/40 hover:text-primary/60'}`}
        >
            <Users className="w-4 h-4" />
            Enrollment Logs
        </button>
        <button
            onClick={() => setActiveTab("analytics")}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-xs font-black uppercase tracking-widest transition-all duration-300 ${activeTab === 'analytics' ? 'bg-white text-primary shadow-sm border border-gray-200' : 'text-primary/40 hover:text-primary/60'}`}
        >
            <BarChart3 className="w-4 h-4" />
            Strategic Intel
        </button>
      </div>

      {/* Content Area */}
      <div className="bg-white rounded-brand shadow-brand border border-border-light overflow-hidden transition-all duration-500 min-h-[500px]">
        <div className="h-1 w-full bg-gold-accent" />

        <div className="p-6">
            {activeTab === "list" && (
                <div className="animate-fade-in">
                    {/* @ts-ignore */}
                    <DataTable columns={eventColumns} data={initialEvents} searchKey="title" />
                </div>
            )}

            {activeTab === "registrations" && (
                <div className="space-y-6 animate-fade-in">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-primary/5 p-4 rounded-xl border border-primary/10">
                        <div className="relative w-full sm:w-96">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/40" />
                            <Input
                                placeholder="Search by event or user detail..."
                                className="pl-10 h-10 bg-white border-primary/10 focus-visible:ring-primary"
                                value={regSearch}
                                onChange={(e) => setRegSearch(e.target.value)}
                            />
                        </div>
                        <Button variant="outline" className="gap-2 h-10 border-primary/10 text-primary hover:bg-primary hover:text-white transition-all">
                             <Download className="w-4 h-4" />
                             Export CSV
                        </Button>
                    </div>

                    <div className="space-y-4">
                        {filteredRegs.length > 0 ? (
                            filteredRegs.map((reg) => (
                                <RegistrationCard
                                    key={reg.id}
                                    reg={reg}
                                    event={initialEvents.find(e => e.id === reg.event_id)}
                                    onDelete={async () => {
                                        if (confirm("Permanently delete this enrollment?")) {
                                            await supabase.from("EventRegistration").delete().eq("id", reg.id);
                                            router.refresh();
                                        }
                                    }}
                                />
                            ))
                        ) : (
                            <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                                <Users className="w-12 h-12 text-gray-200 mx-auto mb-3" />
                                <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">No enrollment records found matching your query</p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {activeTab === "analytics" && (
                <div className="space-y-8 animate-fade-in">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10 relative overflow-hidden group">
                            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-primary/5 rounded-full group-hover:scale-150 transition-transform duration-700" />
                            <p className="text-[10px] font-black uppercase text-primary/40 tracking-[0.2em] mb-2">Total Deployments</p>
                            <p className="text-4xl font-heading font-black text-primary">{analytics.totalEvents}</p>
                            <div className="mt-4 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-[10px] font-bold text-primary/60">{analytics.activeEvents} Active & Public</span>
                            </div>
                        </div>
                        <div className="bg-gold/5 p-6 rounded-2xl border border-gold/20 relative overflow-hidden group">
                             <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-gold/5 rounded-full group-hover:scale-150 transition-transform duration-700" />
                             <p className="text-[10px] font-black uppercase text-gold/60 tracking-[0.2em] mb-2">Total Enrollments</p>
                             <p className="text-4xl font-heading font-black text-gold">{analytics.totalRegistrations}</p>
                             <div className="mt-4 flex items-center gap-2">
                                <Users className="w-3.5 h-3.5 text-gold/60" />
                                <span className="text-[10px] font-bold text-gold/60">Cross-Event Participation</span>
                            </div>
                        </div>
                        <div className="bg-primary text-white p-6 rounded-2xl border border-primary relative overflow-hidden group">
                             <div className="absolute right-0 top-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl" />
                             <p className="text-[10px] font-black uppercase text-white/40 tracking-[0.2em] mb-2">Success Rate</p>
                             <p className="text-4xl font-heading font-black">100%</p>
                             <div className="mt-4 flex items-center gap-2">
                                <ShieldCheck className="w-3.5 h-3.5 text-gold" />
                                <span className="text-[10px] font-bold text-white/60">Verified Registrations</span>
                            </div>
                        </div>
                    </div>

                    {/* Popular Events */}
                    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                        <h4 className="text-xs font-black uppercase text-primary/60 tracking-widest mb-6 flex items-center gap-2">
                            <BarChart3 className="w-4 h-4 text-gold" />
                            Enrollment Distribution by Event
                        </h4>
                        <div className="space-y-5">
                            {analytics.registrationsByEvent.map((item, idx) => (
                                <div key={idx} className="space-y-2">
                                    <div className="flex justify-between items-end">
                                        <span className="text-sm font-bold text-primary truncate max-w-[80%]">{item.title}</span>
                                        <span className="text-xs font-black text-gold">{item.count}</span>
                                    </div>
                                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-primary transition-all duration-1000"
                                            style={{ width: `${analytics.totalRegistrations ? (item.count / analytics.totalRegistrations) * 100 : 0}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

const RegistrationCard = ({ reg, event, onDelete }: { reg: any, event: any, onDelete: () => void }) => {
    return (
        <div className="group bg-white border border-gray-100 p-5 rounded-2xl hover:border-primary/20 hover:shadow-brand transition-all flex flex-col sm:flex-row gap-6 relative overflow-hidden">
             <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 group-hover:h-full bg-gold transition-all duration-500 rounded-r-full" />

             {/* Event Info */}
             <div className="sm:w-64 flex flex-col justify-center gap-1 border-b sm:border-b-0 sm:border-r border-gray-100 pb-3 sm:pb-0 sm:pr-6 shrink-0">
                <span className="text-[9px] font-black text-gold uppercase tracking-[0.1em]">{event?.type || 'EVENT'}</span>
                <h5 className="text-sm font-bold text-primary line-clamp-1">{event?.title || 'Unknown Event'}</h5>
                <p className="text-[10px] text-foreground-muted flex items-center gap-1.5 mt-1 font-medium italic">
                    <Calendar className="w-3 h-3 opcaity-40" />
                    {new Date(reg.created_at).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}
                </p>
             </div>

             {/* Dynamic User Data */}
             <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(reg.user_data).map(([label, value]: [string, any], idx) => (
                    <div key={idx} className="flex flex-col gap-0.5">
                        <span className="text-[10px] font-bold text-primary/40 uppercase tracking-tighter">{label}</span>
                        <div className="flex items-center gap-2">
                             {label.toLowerCase().includes('email') && <Mail className="w-3 h-3 text-primary/20" />}
                             <span className="text-xs font-bold text-primary/80 break-all">{value || 'N/A'}</span>
                        </div>
                    </div>
                ))}
             </div>

             {/* Actions */}
             <div className="flex sm:flex-col items-center justify-center gap-2 shrink-0 border-t sm:border-t-0 sm:border-l border-gray-100 pt-3 sm:pt-0 sm:pl-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Button size="icon" variant="ghost" className="hover:bg-primary/5 hover:text-primary transition-all">
                    <Info className="w-4 h-4" />
                </Button>
                <Button size="icon" variant="ghost" className="text-accent hover:text-accent/80 hover:bg-accent/5 transition-all" onClick={onDelete}>
                    <Trash2 className="w-4 h-4" />
                </Button>
             </div>
        </div>
    );
};
