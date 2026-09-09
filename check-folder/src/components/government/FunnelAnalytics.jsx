import React, { useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
  AreaChart,
  Area
} from "recharts";
import { Filter, AlertCircle, ArrowDown, TrendingDown, Layers, HelpCircle } from "lucide-react";
import { FUNNEL_STAGES, RETENTION_CURVE, WAGE_PROGRESSION_DATA, SCHEME_FUNNEL_BREAKDOWN } from "../../data/cohortStats";
import { SCHEMES, SECTORS } from "../../data/schemes";
import { MAHARASHTRA_DISTRICTS } from "../../data/districts";
import { useRole } from "../../context/RoleContext";
import { useLanguage } from "../../context/LanguageContext";

export const FunnelAnalytics = () => {
  const { govFilters, setGovFilters } = useRole();
  const { t } = useLanguage();
  const [activeMetricView, setActiveMetricView] = useState("funnel"); // "funnel" | "retention" | "wageGrowth"

  // Derive filtered funnel data
  const currentFunnelData = useMemo(() => {
    if (govFilters.scheme !== "all" && SCHEME_FUNNEL_BREAKDOWN[govFilters.scheme]) {
      const schemeStages = SCHEME_FUNNEL_BREAKDOWN[govFilters.scheme];
      return schemeStages.map((stage, idx) => {
        const prevCount = idx > 0 ? schemeStages[idx - 1].count : stage.count;
        const dropPct = prevCount > 0 ? (((prevCount - stage.count) / prevCount) * 100).toFixed(1) : 0;
        return {
          stage: stage.name,
          count: stage.count,
          dropPct: Number(dropPct)
        };
      });
    }

    return FUNNEL_STAGES.map((s) => ({
      stage: s.stage,
      count: s.count,
      dropPct: s.dropPct
    }));
  }, [govFilters.scheme]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl border border-slate-700 text-xs space-y-1">
          <div className="font-bold font-display text-cyan-300">{label || data.stage}</div>
          <div className="text-slate-200">
            Trainees: <span className="font-semibold text-white">{payload[0].value.toLocaleString("en-IN")}</span>
          </div>
          {data.dropPct !== undefined && data.dropPct > 0 && (
            <div className="text-rose-300 flex items-center gap-1">
              <TrendingDown className="w-3 h-3" />
              <span>Drop-off from previous stage: {data.dropPct}%</span>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Header & Filter Control Bar */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-indigo-50 text-indigo-700">
                <Layers className="w-4 h-4" />
              </span>
              <h2 className="text-lg font-bold font-display text-slate-900">
                {t("funnelTitle")}
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {t("funnelSubtitle")}
            </p>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold self-start md:self-auto">
            <button
              onClick={() => setActiveMetricView("funnel")}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeMetricView === "funnel"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {t("viewFunnel")}
            </button>
            <button
              onClick={() => setActiveMetricView("retention")}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeMetricView === "retention"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {t("viewRetention")}
            </button>
            <button
              onClick={() => setActiveMetricView("wageGrowth")}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeMetricView === "wageGrowth"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {t("viewWageGrowth")}
            </button>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-3 border-t border-slate-100">
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
              {t("filterScheme")}
            </label>
            <select
              value={govFilters.scheme}
              onChange={(e) => setGovFilters({ ...govFilters, scheme: e.target.value })}
              className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:ring-2 focus:ring-cyan-500 focus:outline-hidden"
            >
              <option value="all">{t("allSchemes")}</option>
              {SCHEMES.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.code} — {s.name.slice(0, 32)}...
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
              {t("filterSector")}
            </label>
            <select
              value={govFilters.sector}
              onChange={(e) => setGovFilters({ ...govFilters, sector: e.target.value })}
              className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:ring-2 focus:ring-cyan-500 focus:outline-hidden"
            >
              {SECTORS.map((sec) => (
                <option key={sec} value={sec}>
                  {sec}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
              {t("filterDistrict")}
            </label>
            <select
              value={govFilters.district}
              onChange={(e) => setGovFilters({ ...govFilters, district: e.target.value })}
              className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:ring-2 focus:ring-cyan-500 focus:outline-hidden"
            >
              <option value="all">{t("allDistricts")}</option>
              {MAHARASHTRA_DISTRICTS.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name} — {d.division} Division
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
              {t("filterBatch")}
            </label>
            <select
              value={govFilters.batchYear}
              onChange={(e) => setGovFilters({ ...govFilters, batchYear: e.target.value })}
              className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:ring-2 focus:ring-cyan-500 focus:outline-hidden"
            >
              <option value="2024">FY 2024-25 (Current Cohort)</option>
              <option value="2023">FY 2023-24 (12M Longitudinal)</option>
              <option value="2022">FY 2022-23 (Historical Baseline)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Chart Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
        {activeMetricView === "funnel" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 font-display">
                  Statewide Funnel Volume & Drop-off Diagnostic
                </h3>
                <p className="text-xs text-slate-500">
                  Total volume moving through milestone gates with stage attrition
                </p>
              </div>
              <div className="hidden sm:flex items-center gap-4 text-xs">
                <span className="flex items-center gap-1.5 text-slate-600">
                  <span className="w-3 h-3 rounded bg-cyan-600" />
                  <span>Cohort Retained</span>
                </span>
                <span className="flex items-center gap-1.5 text-rose-600 font-medium">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Critical Drop: Post-Offer Joining (14.3%) & 6M Retention (38.2%)</span>
                </span>
              </div>
            </div>

            {/* Recharts Funnel Bar representation */}
            <div className="h-72 sm:h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={currentFunnelData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="stage" tick={{ fontSize: 11, fill: "#64748b" }} axisLine={{ stroke: "#e2e8f0" }} />
                  <YAxis tick={{ fontSize: 11, fill: "#64748b" }} axisLine={{ stroke: "#e2e8f0" }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="count" fill="#0891b2" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Stage Drop-off Chips */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 pt-4 border-t border-slate-100">
              {currentFunnelData.map((item) => (
                <div key={item.stage} className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/80">
                  <div className="text-[11px] font-semibold text-slate-500 truncate">{item.stage}</div>
                  <div className="text-base font-bold text-slate-900 font-display mt-0.5">
                    {item.count > 0 ? item.count.toLocaleString("en-IN") : "N/A"}
                  </div>
                  {item.dropPct > 0 ? (
                    <div className="text-[11px] font-medium text-rose-600 flex items-center gap-0.5 mt-1">
                      <TrendingDown className="w-3 h-3" />
                      <span>-{item.dropPct}% drop</span>
                    </div>
                  ) : (
                    <div className="text-[11px] font-medium text-emerald-600 mt-1">Baseline Cohort</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeMetricView === "retention" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 font-display">
                  12-Month Workforce Retention Decay Curves
                </h3>
                <p className="text-xs text-slate-500">
                  Formal wage placement vs self-employment sustainability vs national benchmark
                </p>
              </div>
            </div>

            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={RETENTION_CURVE} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#64748b" }} />
                  <YAxis unit="%" tick={{ fontSize: 11, fill: "#64748b" }} domain={[0, 100]} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }} />
                  <Line
                    type="monotone"
                    name="Formal Wage Retention"
                    dataKey="formalRetained"
                    stroke="#0891b2"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                  />
                  <Line
                    type="monotone"
                    name="Self-Employment Survival"
                    dataKey="selfEmpSustained"
                    stroke="#10b981"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                  />
                  <Line
                    type="monotone"
                    name="National MSDE Benchmark"
                    dataKey="overallBenchmark"
                    stroke="#94a3b8"
                    strokeDasharray="4 4"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeMetricView === "wageGrowth" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 font-display">
                  Longitudinal Sector Wage Progression (₹ / Month)
                </h3>
                <p className="text-xs text-slate-500">
                  Tracking trainee income progression from joining stipend to 12-month increments
                </p>
              </div>
            </div>

            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={WAGE_PROGRESSION_DATA} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <defs>
                    <linearGradient id="colorAuto" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0891b2" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#0891b2" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="colorIT" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#64748b" }} />
                  <YAxis tick={{ fontSize: 11, fill: "#64748b" }} tickFormatter={(val) => `₹${val / 1000}k`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }} />
                  <Area
                    type="monotone"
                    name="IT-ITeS & Digital"
                    dataKey="IT_ITeS"
                    stroke="#8b5cf6"
                    fill="url(#colorIT)"
                    strokeWidth={2}
                  />
                  <Area
                    type="monotone"
                    name="Automotive & EV"
                    dataKey="Automotive"
                    stroke="#0891b2"
                    fill="url(#colorAuto)"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    name="Statewide Average Benchmark"
                    dataKey="StateAvg"
                    stroke="#f59e0b"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
