"use client";

import { useState } from "react";
import AnimateIn from "@/components/animation/AnimateIn";
import { Calendar, MapPin, X, Loader2, CheckCircle2, Clock } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  venue: string;
  imageUrl: string;
  type: string;
  registration_enabled: boolean;
  form_config: any[];
}

interface EventsClientProps {
  events: Event[];
}

export const EventsClient: React.FC<EventsClientProps> = ({ events }) => {
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  const [pastLimit, setPastLimit] = useState(3);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [regStatus, setRegStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [regError, setRegError] = useState("");

  const now = new Date();

  const upcomingEvents = events
    .filter(e => new Date(e.date) >= now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const pastEvents = events
    .filter(e => new Date(e.date) < now)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const displayedPastEvents = pastEvents.slice(0, pastLimit);

  const formatDate = (dateStr: string, options: Intl.DateTimeFormatOptions) => {
    return new Intl.DateTimeFormat('en-US', options).format(new Date(dateStr));
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedEvent) return;

    setRegStatus("loading");
    setRegError("");

    const formData = new FormData(e.currentTarget);
    const userData: Record<string, any> = {};

    selectedEvent.form_config.forEach(field => {
      userData[field.label] = formData.get(field.label);
    });

    try {
      const { error } = await supabase
        .from("EventRegistration")
        .insert([{
          event_id: selectedEvent.id,
          user_data: userData
        }]);

      if (error) throw error;
      setRegStatus("success");
      setTimeout(() => {
          setSelectedEvent(null);
          setRegStatus("idle");
      }, 2500);
    } catch (err: any) {
      console.error(err);
      setRegStatus("error");
      setRegError(err.message || "Failed to submit registration. Please try again.");
    }
  };

  return (
    <div className="space-y-12">
      {/* Tab Switcher */}
      <div className="flex justify-center">
        <div className="inline-flex p-1 bg-white/50 backdrop-blur-md rounded-full border border-primary/10 shadow-lg">
          <button
            onClick={() => setActiveTab("upcoming")}
            className={`px-8 py-2.5 rounded-full text-sm font-bold transition-all duration-500 flex items-center gap-2 ${
              activeTab === "upcoming"
                ? "bg-primary text-white shadow-brand-lg scale-105"
                : "text-primary/60 hover:text-primary hover:bg-primary/5"
            }`}
          >
            <Calendar className={`w-4 h-4 ${activeTab === "upcoming" ? "animate-bounce" : ""}`} />
            Upcoming Events
            <span className={`ml-1 text-[10px] px-1.5 py-0.5 rounded-full ${activeTab === "upcoming" ? "bg-white/20" : "bg-primary/10"}`}>
                {upcomingEvents.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab("past")}
            className={`px-8 py-2.5 rounded-full text-sm font-bold transition-all duration-500 flex items-center gap-2 ${
              activeTab === "past"
                ? "bg-primary text-white shadow-brand-lg scale-105"
                : "text-primary/60 hover:text-primary hover:bg-primary/5"
            }`}
          >
            <Clock className="w-4 h-4" />
            Past Events
            <span className={`ml-1 text-[10px] px-1.5 py-0.5 rounded-full ${activeTab === "past" ? "bg-white/20" : "bg-primary/10"}`}>
                {pastEvents.length}
            </span>
          </button>
        </div>
      </div>

      {/* Events Grid/List */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {activeTab === "upcoming" ? (
          <div className="space-y-10">
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map((evt, i) => (
                <EventCard
                   key={evt.id}
                   evt={evt}
                   index={i}
                   onRegister={() => setSelectedEvent(evt)}
                   formatDate={formatDate}
                />
              ))
            ) : (
              <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-primary/10 shadow-brand">
                <Calendar className="w-16 h-16 text-primary/10 mx-auto mb-4" />
                <h3 className="text-xl font-heading font-bold text-primary">No Events Found</h3>
                <p className="text-foreground-muted max-w-sm mx-auto mt-2 font-medium">We are currently planning more exciting events. Please check back later!</p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-8">
            {pastEvents.length > 0 ? (
              <>
                <div className="grid grid-cols-1 gap-8">
                    {displayedPastEvents.map((evt, i) => (
                    <EventCard key={evt.id} evt={evt} index={i} isPast formatDate={formatDate} />
                    ))}
                </div>
                {pastLimit < pastEvents.length && (
                  <div className="flex justify-center pt-10">
                    <Button
                      variant="outline"
                      className="rounded-full px-12 h-14 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-500 font-black tracking-widest uppercase text-xs"
                      onClick={() => setPastLimit(prev => prev + 3)}
                    >
                      Archive Explorer: View More
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-primary/10">
                <Clock className="w-16 h-16 text-primary/10 mx-auto mb-4" />
                <p className="text-foreground-muted font-bold text-lg">No past events in our archive.</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Registration Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-primary/40 backdrop-blur-xl animate-fade-in overflow-y-auto">
          <div className="bg-white w-full max-w-xl rounded-[2rem] shadow-brand-lg border border-white/20 overflow-hidden relative my-auto animate-scale-in">
            <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-primary/5 text-primary/40 hover:text-primary transition-all duration-300 z-10"
            >
                <X className="w-6 h-6" />
            </button>

            {regStatus === "success" ? (
                <div className="p-16 text-center space-y-6 animate-fade-in">
                    <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8 border border-green-100">
                        <CheckCircle2 className="w-12 h-12 text-green-500" />
                    </div>
                    <h3 className="text-3xl font-heading font-black text-primary">Mission Accomplished!</h3>
                    <p className="text-foreground-muted text-lg font-medium leading-relaxed">
                        Registration complete for <br/><span className="text-primary font-bold">"{selectedEvent.title}"</span>.
                        Check your email for details.
                    </p>
                </div>
            ) : (
                <div className="p-8 sm:p-10">
                    <div className="mb-10 relative">
                        <div className="absolute -left-10 top-0 w-1 h-12 bg-gold rounded-r-full" />
                        <span className="inline-block px-3 py-1 rounded-full bg-gold/10 text-gold text-[10px] font-black uppercase tracking-[0.2em] mb-4">
                            Operational Enrollment
                        </span>
                        <h3 className="text-3xl font-heading font-black text-primary leading-tight tracking-tight">{selectedEvent.title}</h3>
                        <div className="mt-4 flex flex-wrap items-center gap-6 text-xs font-bold text-foreground-muted uppercase tracking-widest">
                            <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-gold" /> {formatDate(selectedEvent.date, { dateStyle: 'long' })}</span>
                            <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-gold" /> {selectedEvent.venue}</span>
                        </div>
                    </div>

                    {regStatus === "error" && (
                        <div className="mb-8 p-5 bg-accent/5 border border-accent/10 rounded-2xl text-accent text-sm font-bold flex items-center gap-3 animate-shake">
                            <span className="w-2 h-2 bg-accent rounded-full shrink-0" />
                            {regError}
                        </div>
                    )}

                    <form onSubmit={handleRegister} className="space-y-6">
                        {selectedEvent.form_config.map((field: any, idx: number) => (
                            <div key={idx} className="space-y-2">
                                <label className="text-[10px] font-black text-primary/80 uppercase tracking-[0.15em] ml-1">
                                    {field.label} {field.required && <span className="text-accent">*</span>}
                                </label>
                                {field.type === "textarea" ? (
                                    <Textarea
                                        name={field.label}
                                        required={field.required}
                                        placeholder={`Enter your ${field.label.toLowerCase()}...`}
                                        className="focus-visible:ring-primary min-h-[120px] rounded-2xl bg-gray-50 border-gray-100 shadow-inner"
                                    />
                                ) : field.type === "select" ? (
                                    <select
                                        name={field.label}
                                        required={field.required}
                                        className="flex h-12 w-full rounded-2xl border border-gray-100 bg-gray-50 px-4 py-2 text-sm font-medium focus-visible:ring-2 focus-visible:ring-primary appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2214%22%20height%3D%228%22%20viewBox%3D%220%200%2014%208%22%20fill%3D%22none%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M1%201L7%207L13%201%22%20stroke%3D%22%23667085%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22/%3E%3C/svg%3E')] bg-[length:12px_8px] bg-[right_1.25rem_center] bg-no-repeat shadow-inner"
                                    >
                                        <option value="">Choose an option</option>
                                        {(field.options || "").split(",").map((opt: string) => (
                                            <option key={opt.trim()} value={opt.trim()}>{opt.trim()}</option>
                                        ))}
                                    </select>
                                ) : (
                                    <Input
                                        type={field.type}
                                        name={field.label}
                                        required={field.required}
                                        placeholder={`Enter your ${field.label.toLowerCase()}...`}
                                        className="h-12 focus-visible:ring-primary rounded-2xl bg-gray-50 border-gray-100 shadow-inner px-4 font-medium"
                                    />
                                )}
                            </div>
                        ))}

                        <div className="pt-6">
                            <Button
                                disabled={regStatus === "loading"}
                                className="w-full h-14 bg-primary hover:bg-primary/95 shadow-brand-lg text-white font-black uppercase tracking-[0.2em] text-xs rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                                type="submit"
                            >
                                {regStatus === "loading" ? (
                                    <Loader2 className="w-6 h-6 animate-spin" />
                                ) : (
                                    "Confirm Enrollment"
                                )}
                            </Button>
                        </div>
                    </form>
                </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const EventCard = ({ evt, index, isPast, onRegister, formatDate }: { evt: Event, index: number, isPast?: boolean, onRegister?: () => void, formatDate: any }) => {
    const eventDate = new Date(evt.date);

    return (
        <AnimateIn type={index % 2 === 0 ? "slideLeft" : "slideRight"}>
            <div className={`group bg-white rounded-3xl shadow-brand border border-border-light overflow-hidden flex flex-col md:flex-row transition-all duration-500 relative ${!isPast ? 'hover:shadow-brand-2xl hover:-translate-y-1' : 'opacity-70 saturate-50'}`}>
                {/* Date panel */}
                <div className={`md:w-56 lg:w-64 p-8 flex flex-row md:flex-col items-center justify-center text-center shrink-0 gap-4 md:gap-0 ${isPast ? 'bg-slate-50 border-r border-border-light' : 'bg-gradient-to-br from-primary via-primary/90 to-secondary text-white'}`}>
                    <span className={`inline-block rounded-full px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] mb-4 ${isPast ? 'bg-slate-200 text-slate-500' : 'bg-white/10 text-gold border border-white/5 shadow-brand'}`}>
                        {evt.type}
                    </span>
                    <div className="flex flex-col items-center">
                        <p className={`text-6xl font-heading font-black leading-none tracking-tighter ${isPast ? 'text-slate-300' : 'text-white'}`}>
                            {formatDate(evt.date, { day: '2-digit' })}
                        </p>
                        <p className={`text-sm font-black uppercase tracking-[0.25em] mt-3 ${isPast ? 'text-slate-400' : 'text-gold'}`}>
                            {formatDate(evt.date, { month: 'long', year: 'numeric' })}
                        </p>
                    </div>
                    <div className="mt-8 flex items-center gap-2 pt-6 border-t border-white/10 w-full justify-center">
                        <MapPin className={`w-4 h-4 ${isPast ? 'text-slate-300' : 'text-gold/80 animate-pulse'}`} />
                        <span className={`text-[10px] font-black uppercase tracking-widest max-w-[140px] truncate ${isPast ? 'text-slate-400' : 'text-white/70'}`}>{evt.venue}</span>
                    </div>
                </div>

                {/* Content */}
                <div className="p-8 sm:p-10 flex-1 flex flex-col justify-center relative bg-white">
                    {!isPast && (
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl pointer-events-none group-hover:bg-gold/10 transition-colors duration-500" />
                    )}
                    <h3 className={`text-2xl sm:text-3xl font-heading font-black mb-4 transition-colors ${isPast ? 'text-slate-500' : 'text-primary group-hover:text-primary-600'}`}>
                        {evt.title}
                    </h3>
                    <p className="text-base text-foreground-muted leading-relaxed mb-8 line-clamp-3 font-medium opacity-80">
                        {evt.description}
                    </p>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-auto pt-6 gap-6 border-t border-gray-50">
                        <div className="flex items-center gap-6 text-[11px] font-black text-primary/30 uppercase tracking-[0.2em]">
                            <span className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full"><Clock className="w-3.5 h-3.5" /> {formatDate(evt.date, { hour: 'numeric', minute: '2-digit', hour12: true })}</span>
                        </div>

                        {!isPast && (
                             evt.registration_enabled ? (
                                <Button
                                    onClick={onRegister}
                                    className="bg-primary hover:bg-primary-600 text-white h-12 px-8 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-brand transition-all hover:scale-110 active:scale-95 border-b-4 border-primary-800"
                                >
                                    Register Now
                                </Button>
                             ) : (
                                <span className="text-[10px] font-black text-primary/40 uppercase tracking-[0.2em] bg-primary/5 px-6 py-3 rounded-full border border-primary/10">Coming Soon</span>
                             )
                        )}
                        {isPast && (
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] bg-slate-100 px-6 py-3 rounded-full">Archive View Only</span>
                        )}
                    </div>
                </div>
            </div>
        </AnimateIn>
    );
}
