import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp, ArrowUpRight } from "lucide-react";
import { useRole } from "../../context/RoleContext";
import { useLanguage } from "../../context/LanguageContext";

export const WageGrowthTracker = () => {
  const { activeTrainee } = useRole();
  const { t } = useLanguage();

  const data = activeTrainee.wageHistory || [];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const point = payload[0].payload;
      return (
        <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl border border-slate-700 text-xs space-y-1">
          <div className="font-bold text-cyan-300">{label}</div>
          <div>
            Monthly Wage: <span className="font-semibold text-emerald-400">₹{point.wage.toLocaleString("en-IN")}</span>
          </div>
          {point.event && <div className="text-[11px] text-slate-300 italic">{point.event}</div>}
        </div>
      );
    }
    return null;
  };

  const startingWage = data.length > 0 ? data[0].wage : 0;
  const currentWage = data.length > 0 ? data[data.length - 1].wage : 0;
  const growthPct = startingWage > 0 ? (((currentWage - startingWage) / startingWage) * 100).toFixed(1) : 0;

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700">
              <TrendingUp className="w-4 h-4" />
            </span>
            <h2 className="text-base sm:text-lg font-bold font-display text-slate-900">
              {t("wageGrowthTitle")}
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            {t("wageGrowthSubtitle")}
          </p>
        </div>

        {growthPct > 0 && (
          <div className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 self-start sm:self-auto">
            <ArrowUpRight className="w-4 h-4 text-emerald-600" />
            <span>+{growthPct}% Total Increase</span>
          </div>
        )}
      </div>

      {data.length > 0 ? (
        <>
          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 20, left: 10, bottom: 20 }}>
                <defs>
                  <linearGradient id="colorWage" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#64748b" }} />
                <YAxis tick={{ fontSize: 11, fill: "#64748b" }} tickFormatter={(v) => `₹${v / 1000}k`} />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="wage"
                  name="Monthly Wage"
                  stroke="#10b981"
                  strokeWidth={2.5}
                  fill="url(#colorWage)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-100">
            {data.map((item, idx) => (
              <div key={idx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/70 text-xs">
                <div className="text-[10px] text-slate-400 font-medium">{item.month}</div>
                <div className="font-bold text-slate-900 font-display text-sm mt-0.5">
                  ₹{item.wage.toLocaleString("en-IN")}
                </div>
                <div className="text-[11px] text-slate-600 truncate mt-0.5">{item.event}</div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-8 text-xs text-slate-500 bg-slate-50 rounded-xl border border-slate-200">
          No wage records yet. Once placed, your periodic check-ins will track your income progression here.
        </div>
      )}
    </div>
  );
};
