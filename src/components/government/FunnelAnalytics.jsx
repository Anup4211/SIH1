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
import { AlertCircle, TrendingDown, Layers, HelpCircle, Filter } from "lucide-react";
import { FUNNEL_STAGES, RETENTION_CURVE, WAGE_PROGRESSION_DATA, SCHEME_FUNNEL_BREAKDOWN } from "../../data/cohortStats";
import { SCHEMES, SECTORS } from "../../data/schemes";
import { MAHARASHTRA_DISTRICTS } from "../../data/districts";
import { useRole } from "../../context/RoleContext";
import { useLanguage } from "../../context/LanguageContext";

const SECTOR_FACTORS = {
  "All Sectors": 1.0,
  "IT-ITeS & Digital": 0.28,
  "Automotive & EV": 0.23,
  "Solar & Electronics": 0.17,
  "Healthcare (GDA)": 0.19,
  "BFSI & Accounts": 0.12,
  "Retail & E-commerce": 0.14,
  "Apparel & Textiles": 0.08,
};

const DISTRICT_FACTORS = {
  all: 1.0,
  pune: 0.24,
  mumbai_suburban: 0.20,
  mumbai_city: 0.16,
  thane: 0.15,
  nagpur: 0.12,
  nashik: 0.10,
  aurangabad: 0.09,
  kolhapur: 0.07,
  solapur: 0.06,
  amravati: 0.05,
  nanded: 0.04,
  jalgaon: 0.04,
};

const BATCH_FACTORS = {
  "2024": 1.0,
  "2023": 0.88,
  "2022": 0.76,
};

// Custom Tooltip component defined at module scope to satisfy React Compiler requirements
const CustomTooltip = ({ active, payload, label, activeMetricView }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-slate-900 dark:bg-slate-950 text-white p-3 rounded-xl shadow-xl border border-slate-700 text-xs space-y-1">
        <div className="font-bold font-display text-cyan-300">{label || data.stage}</div>
        {payload.map((p, i) => (
          <div key={i} className="text-slate-200">
            {p.name || "Trainees"}: <span className="font-semibold text-white">{typeof p.value === "number" ? (activeMetricView === "wageGrowth" ? `₹${p.value.toLocaleString("en-IN")}` : activeMetricView === "retention" ? `${p.value}%` : p.value.toLocaleString("en-IN")) : p.value}</span>
          </div>
        ))}
        {data.dropPct !== undefined && data.dropPct > 0 && (
          <div className="text-rose-300 flex items-center gap-1 pt-1 border-t border-slate-800 mt-1">
            <TrendingDown className="w-3 h-3" />
            <span>Drop-off from previous stage: {data.dropPct}%</span>
          </div>
        )}
      </div>
    );
  }
  return null;
};

export const FunnelAnalytics = () => {
  const { govFilters, setGovFilters } = useRole();
  const { t } = useLanguage();
  const [activeMetricView, setActiveMetricView] = useState("funnel"); // "funnel" | "retention" | "wageGrowth"

  // Derive dynamically filtered funnel data across all active filters
  const currentFunnelData = useMemo(() => {
    let baseStages = FUNNEL_STAGES.map((s) => ({ stage: s.stage, count: s.count }));

    if (govFilters.scheme !== "all" && SCHEME_FUNNEL_BREAKDOWN[govFilters.scheme]) {
      const schemeStages = SCHEME_FUNNEL_BREAKDOWN[govFilters.scheme];
      baseStages = schemeStages.map((s) => ({ stage: s.name, count: s.count }));
    }

    const sectorMult = SECTOR_FACTORS[govFilters.sector] || 0.15;
    const districtMult = DISTRICT_FACTORS[govFilters.district] || (govFilters.district === "all" ? 1.0 : 0.06);
    const batchMult = BATCH_FACTORS[govFilters.batchYear] || 1.0;

    const totalMultiplier =
      govFilters.sector === "All Sectors" && govFilters.district === "all" && govFilters.batchYear === "2024"
        ? 1.0
        : Math.max(0.02, sectorMult * districtMult * batchMult);

    return baseStages.map((stage, idx, arr) => {
      const adjustedCount = Math.round(stage.count * totalMultiplier);
      const prevCount = idx > 0 ? Math.round(arr[idx - 1].count * totalMultiplier) : adjustedCount;
      const dropPct = prevCount > 0 ? (((prevCount - adjustedCount) / prevCount) * 100).toFixed(1) : 0;
      return {
        stage: stage.stage,
        count: adjustedCount,
        dropPct: Number(dropPct)
      };
    });
  }, [govFilters.scheme, govFilters.sector, govFilters.district, govFilters.batchYear]);

  // Derive dynamically filtered retention curves across all active filters
  const currentRetentionData = useMemo(() => {
    let formalDelta = 0;
    let selfEmpDelta = 0;

    if (govFilters.sector === "IT-ITeS & Digital") {
      formalDelta += 6.5;
      selfEmpDelta -= 4.0;
    } else if (govFilters.sector === "Healthcare (GDA)") {
      formalDelta += 4.2;
      selfEmpDelta += 2.0;
    } else if (govFilters.sector === "Automotive & EV") {
      formalDelta += 2.8;
      selfEmpDelta -= 1.5;
    } else if (govFilters.sector === "Retail & E-commerce" || govFilters.sector === "Apparel & Textiles") {
      formalDelta -= 6.0;
      selfEmpDelta += 3.5;
    }

    if (govFilters.district === "pune" || govFilters.district === "mumbai_suburban" || govFilters.district === "thane") {
      formalDelta += 3.5;
    } else if (govFilters.district !== "all") {
      selfEmpDelta += 3.0;
    }

    if (govFilters.batchYear === "2023") {
      formalDelta -= 1.5;
    } else if (govFilters.batchYear === "2022") {
      formalDelta -= 3.2;
    }

    return RETENTION_CURVE.map((point, idx) => {
      if (idx === 0) return { ...point };
      const decayFactor = idx / (RETENTION_CURVE.length - 1);
      const adjFormal = Math.min(100, Math.max(20, Number((point.formalRetained + formalDelta * decayFactor).toFixed(1))));
      const adjSelfEmp = Math.min(100, Math.max(20, Number((point.selfEmpSustained + selfEmpDelta * decayFactor).toFixed(1))));
      return {
        month: point.month,
        formalRetained: adjFormal,
        selfEmpSustained: adjSelfEmp,
        overallBenchmark: point.overallBenchmark
      };
    });
  }, [govFilters.scheme, govFilters.sector, govFilters.district, govFilters.batchYear]);

  // Derive dynamically filtered wage progression across all active filters
  const currentWageProgressionData = useMemo(() => {
    const batchWageMult = govFilters.batchYear === "2022" ? 0.84 : govFilters.batchYear === "2023" ? 0.92 : 1.0;
    const districtWageMult =
      govFilters.district === "pune" || govFilters.district === "mumbai_suburban" || govFilters.district === "mumbai_city"
        ? 1.15
        : govFilters.district === "thane" || govFilters.district === "nagpur" || govFilters.district === "nashik"
        ? 1.06
        : govFilters.district !== "all"
        ? 0.95
        : 1.0;
    const wageMultiplier = batchWageMult * districtWageMult;

    return WAGE_PROGRESSION_DATA.map((row) => {
      return {
        month: row.month,
        Automotive: Math.round(row.Automotive * wageMultiplier),
        Healthcare: Math.round(row.Healthcare * wageMultiplier),
        IT_ITeS: Math.round(row.IT_ITeS * wageMultiplier),
        Solar_Elec: Math.round(row.Solar_Elec * wageMultiplier),
        Retail: Math.round(row.Retail * wageMultiplier),
        StateAvg: Math.round(row.StateAvg * wageMultiplier)
      };
    });
  }, [govFilters.scheme, govFilters.sector, govFilters.district, govFilters.batchYear]);

  const CustomTooltip = ({ active, payload, label, activeMetricView }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-900 dark:bg-slate-950 text-white p-3 rounded-xl shadow-xl border border-slate-700 text-xs space-y-1">
          <div className="font-bold font-display text-cyan-300">{label || data.stage}</div>
          {payload.map((p, i) => (
            <div key={i} className="text-slate-200">
              {p.name || "Trainees"}: <span className="font-semibold text-white">{typeof p.value === "number" ? (activeMetricView === "wageGrowth" ? `₹${p.value.toLocaleString("en-IN")}` : activeMetricView === "retention" ? `${p.value}%` : p.value.toLocaleString("en-IN")) : p.value}</span>
            </div>
          ))}
          {data.dropPct !== undefined && data.dropPct > 0 && (
            <div className="text-rose-300 flex items-center gap-1 pt-1 border-t border-slate-800 mt-1">
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
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4 transition-colors duration-300">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/50 dark:border-indigo-800/50">
                <Layers className="w-4 h-4" />
              </span>
              <h2 className="text-lg font-bold font-display text-slate-900 dark:text-white">
                {t("funnelTitle")}
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {t("funnelSubtitle")}
            </p>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl text-xs font-semibold self-start md:self-auto border border-slate-200/50 dark:border-slate-700/50">
            <button
              onClick={() => setActiveMetricView("funnel")}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeMetricView === "funnel"
                  ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-bold"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {t("viewFunnel")}
            </button>
            <button
              onClick={() => setActiveMetricView("retention")}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeMetricView === "retention"
                  ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-bold"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {t("viewRetention")}
            </button>
            <button
              onClick={() => setActiveMetricView("wageGrowth")}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeMetricView === "wageGrowth"
                  ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-bold"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {t("viewWageGrowth")}
            </button>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <div>
            <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
              {t("filterScheme")}
            </label>
            <select
              value={govFilters.scheme}
              onChange={(e) => setGovFilters({ ...govFilters, scheme: e.target.value })}
              className="w-full text-xs font-medium bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-cyan-500 focus:outline-hidden transition-colors"
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
            <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
              {t("filterSector")}
            </label>
            <select
              value={govFilters.sector}
              onChange={(e) => setGovFilters({ ...govFilters, sector: e.target.value })}
              className="w-full text-xs font-medium bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-cyan-500 focus:outline-hidden transition-colors"
            >
              {SECTORS.map((sec) => (
                <option key={sec} value={sec}>
                  {sec}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
              {t("filterDistrict")}
            </label>
            <select
              value={govFilters.district}
              onChange={(e) => setGovFilters({ ...govFilters, district: e.target.value })}
              className="w-full text-xs font-medium bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-cyan-500 focus:outline-hidden transition-colors"
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
            <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
              {t("filterBatch")}
            </label>
            <select
              value={govFilters.batchYear}
              onChange={(e) => setGovFilters({ ...govFilters, batchYear: e.target.value })}
              className="w-full text-xs font-medium bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-cyan-500 focus:outline-hidden transition-colors"
            >
              <option value="2024">FY 2024-25 (Current Cohort)</option>
              <option value="2023">FY 2023-24 (12M Longitudinal)</option>
              <option value="2022">FY 2022-23 (Historical Baseline)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Chart Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-6 transition-colors duration-300">
        {activeMetricView === "funnel" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-display">
                  Statewide Funnel Volume & Drop-off Diagnostic
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Total volume moving through milestone gates with real-time stage attrition
                </p>
              </div>
              <div className="flex items-center gap-4 text-xs">
                <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                  <span className="w-3 h-3 rounded bg-cyan-600" />
                  <span>Filtered Cohort</span>
                </span>
                <span className="hidden sm:flex items-center gap-1.5 text-rose-600 dark:text-rose-400 font-medium">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Live Multi-Filter Calculation Active</span>
                </span>
              </div>
            </div>

            {/* Recharts Funnel Bar representation */}
            <div className="h-72 sm:h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={currentFunnelData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#cbd5e1" opacity={0.3} />
                  <XAxis dataKey="stage" tick={{ fontSize: 11, fill: "#64748b" }} axisLine={{ stroke: "#94a3b8" }} />
                  <YAxis tick={{ fontSize: 11, fill: "#64748b" }} axisLine={{ stroke: "#94a3b8" }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="count" fill="#0891b2" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Stage Drop-off Chips */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 pt-4 border-t border-slate-100 dark:border-slate-800">
              {currentFunnelData.map((item) => (
                <div key={item.stage} className="bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-2xl border border-slate-200/80 dark:border-slate-700/60">
                  <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 truncate">{item.stage}</div>
                  <div className="text-base font-extrabold text-slate-900 dark:text-white font-display mt-0.5">
                    {item.count > 0 ? item.count.toLocaleString("en-IN") : "0"}
                  </div>
                  {item.dropPct > 0 ? (
                    <div className="text-[11px] font-semibold text-rose-600 dark:text-rose-400 flex items-center gap-0.5 mt-1">
                      <TrendingDown className="w-3 h-3" />
                      <span>-{item.dropPct}% drop</span>
                    </div>
                  ) : (
                    <div className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 mt-1">Baseline Cohort</div>
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
                <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-display">
                  12-Month Workforce Retention Decay Curves
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Formal wage placement vs self-employment sustainability vs national benchmark
                </p>
              </div>
            </div>

            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={currentRetentionData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#cbd5e1" opacity={0.3} />
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
                <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-display">
                  Longitudinal Sector Wage Progression (₹ / Month)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Tracking trainee income progression from joining stipend to 12-month increments
                </p>
              </div>
            </div>

            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={currentWageProgressionData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
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
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#cbd5e1" opacity={0.3} />
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


