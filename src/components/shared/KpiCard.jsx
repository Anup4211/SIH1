import React from "react";
import { ArrowUpRight, ArrowDownRight, Info } from "lucide-react";

export const KpiCard = ({
  title,
  value,
  delta,
  isPositive = true,
  subtext,
  indicator,
  icon: Icon,
  gradientBorder = "border-slate-200/80",
  accentBg = "bg-cyan-50 text-cyan-700"
}) => {
  return (
    <div
      className={`relative overflow-hidden bg-white/90 backdrop-blur-xs rounded-2xl border ${gradientBorder} p-5 shadow-xs hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between group interactive-card`}
    >
      {/* Top subtle highlight */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 font-sans">
            {title}
          </h3>
          <div className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 font-display">
            {value}
          </div>
        </div>

        {Icon && (
          <div className={`p-3 rounded-2xl ${accentBg} shrink-0 transition-transform duration-300 group-hover:scale-110 shadow-2xs`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100/80 flex items-center justify-between text-xs">
        {delta && (
          <div
            className={`inline-flex items-center gap-1 font-bold px-2 py-0.5 rounded-lg text-[11px] font-mono ${
              isPositive
                ? "text-emerald-700 bg-emerald-50/80 border border-emerald-200/60"
                : "text-rose-700 bg-rose-50/80 border border-rose-200/60"
            }`}
          >
            {isPositive ? (
              <ArrowUpRight className="w-3.5 h-3.5" />
            ) : (
              <ArrowDownRight className="w-3.5 h-3.5" />
            )}
            <span>{delta}</span>
          </div>
        )}

        <span className="text-slate-500 truncate ml-2 text-[11px] font-medium" title={subtext}>
          {subtext}
        </span>
      </div>

      {indicator && (
        <div className="mt-1 text-[10px] text-slate-400 flex items-center gap-1">
          <Info className="w-3 h-3 shrink-0" />
          <span className="truncate">{indicator}</span>
        </div>
      )}
    </div>
  );
};
