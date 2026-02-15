
import type { ElementType } from "react";
import { cn } from "@/lib/utils";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

interface StatProps {
  label: string;
  value: string | number;
  trend?: {
    value: number;
    label: string;
    positive: boolean;
  };
  icon?: ElementType;
}

export function StatCard({ label, value, trend, icon: Icon }: StatProps) {
  return (
    <div className="bg-background-paper p-6 rounded-brand shadow-brand border border-border-light relative overflow-hidden group hover:shadow-brand-lg transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm font-medium text-foreground-muted uppercase tracking-wider mb-1">{label}</p>
          <h3 className="text-3xl font-heading font-bold text-primary">{value}</h3>
        </div>
        {Icon && (
          <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center group-hover:bg-gold/10 transition-colors">
            <Icon className="w-6 h-6 text-primary group-hover:text-gold transition-colors" />
          </div>
        )}
      </div>

      {trend && (
        <div className="flex items-center gap-2 mt-2">
          <span className={cn(
            "flex items-center text-xs font-bold px-2 py-0.5 rounded-full",
            trend.positive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          )}>
            {trend.positive ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
            {trend.value}%
          </span>
          <span className="text-xs text-foreground-muted">{trend.label}</span>
        </div>
      )}

      <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-gradient-to-br from-primary/5 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </div>
  );
}
