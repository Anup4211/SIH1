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
  gradientBorder = "border-slate-200",
  accentBg = "bg-cyan-50 text-cyan-700"
}) => {
  return (
    <div
      className={`relative overflow-hidden bg-white rounded-2xl border ${gradientBorder} p-5 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            {title}
          </h3>
          <div className="mt-2 text-2xl font-bold tracking-tight text-slate-900 font-display">
            {value}
          </div>
        </div>

        {Icon && (
          <div className={`p-2.5 rounded-xl ${accentBg} shrink-0 transition-transform duration-200 group-hover:scale-105`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
        {delta && (
          <div
            className={`inline-flex items-center gap-0.5 font-semibold px-2 py-0.5 rounded-md ${
              isPositive
                ? "text-emerald-700 bg-emerald-50"
                : "text-rose-700 bg-rose-50"
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

        <span className="text-slate-500 truncate ml-2" title={subtext}>
          {subtext}
        </span>
      </div>

      {indicator && (
        <div className="mt-1 text-[11px] text-slate-400 flex items-center gap-1">
          <Info className="w-3 h-3 shrink-0" />
          <span className="truncate">{indicator}</span>
        </div>
      )}
    </div>
  );
};
