import React, { useState, useMemo } from "react";
import { Users, Briefcase, TrendingUp, Building, Award, HeartHandshake, ShieldCheck, ArrowRight, Activity, MapPin, Sparkles } from "lucide-react";
import { KpiCard } from "../shared/KpiCard";
import { STATEWIDE_KPIS } from "../../data/cohortStats";
import { useLanguage } from "../../context/LanguageContext";

const REGIONAL_DIVISIONS = [
  { id: "all", label: "Statewide (All 36 Districts)", multiplier: 1, topSector: "Automotive & EV", wageScale: "₹18,450" },
  { id: "pune", label: "Pune Division", multiplier: 0.28, topSector: "Advanced Manufacturing", wageScale: "₹21,200" },
  { id: "konkan", label: "Konkan / Mumbai MMR", multiplier: 0.32, topSector: "IT / BFSI Services", wageScale: "₹23,500" },
  { id: "nashik", label: "Nashik Division", multiplier: 0.15, topSector: "Agri-Tech & Logistics", wageScale: "₹16,800" },
  { id: "aurangabad", label: "Chhatrapati Sambhajinagar", multiplier: 0.11, topSector: "Pharma & Auto Ancillaries", wageScale: "₹17,400" },
  { id: "nagpur", label: "Nagpur / Vidarbha", multiplier: 0.09, topSector: "Logistics & Solar Energy", wageScale: "₹16,200" },
  { id: "amravati", label: "Amravati Division", multiplier: 0.05, topSector: "Textiles & Agri-Processing", wageScale: "₹15,100" }
];

export const StatewideOverview = ({ onNavigateToFunnel, onNavigateToVerification }) => {
  const { t } = useLanguage();
  const [selectedDivision, setSelectedDivision] = useState("all");

  const currentDivision = useMemo(() => {
    return REGIONAL_DIVISIONS.find((d) => d.id === selectedDivision) || REGIONAL_DIVISIONS[0];
  }, [selectedDivision]);

  // Scaled dynamic stats based on selected division
  const scaledStats = useMemo(() => {
    const mult = currentDivision.multiplier;
    const enrolled = Math.round(STATEWIDE_KPIS.totalEnrolled.value * mult);
    const placed = Math.round(STATEWIDE_KPIS.totalPlaced.value * mult);
    const selfEmp = Math.round(STATEWIDE_KPIS.totalSelfEmployed.value * mult);
    const app = Math.round(STATEWIDE_KPIS.inApprenticeship.value * mult);
    const providers = Math.max(12, Math.round(STATEWIDE_KPIS.activeProviders.value * mult));

    return {
      enrolled: enrolled.toLocaleString("en-IN"),
      placed: placed.toLocaleString("en-IN"),
      selfEmp: selfEmp.toLocaleString("en-IN"),
      app: app.toLocaleString("en-IN"),
      providers: providers.toLocaleString("en-IN"),
      avgWage: currentDivision.wageScale
    };
  }, [currentDivision]);

  return (
    <section className="space-y-6">
      {/* Strategic Command Banner with Ambient Glow & Glassmorphism */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-7 border border-indigo-500/30 shadow-lg relative overflow-hidden flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="absolute top-0 right-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-2 relative z-10">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-inner flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {t("macroAuditBadge")}
            </span>
            <span className="text-xs text-slate-400 font-mono tracking-wide">{t("statewideCommandTitle")}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold font-display text-white tracking-tight leading-snug">
            {t("macroHeadline")}
          </h2>
          <p className="text-xs text-slate-300 max-w-2xl font-sans leading-relaxed">
            {t("macroSubtext")}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 relative z-10 w-full lg:w-auto">
          <button
            onClick={onNavigateToVerification}
            className="flex-1 lg:flex-none flex items-center justify-center gap-2 text-xs font-bold px-4 py-2.5 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30 transition-all cursor-pointer btn-interactive shadow-xs"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{t("btnVerificationDesk")}</span>
          </button>
          <button
            onClick={onNavigateToFunnel}
            className="flex-1 lg:flex-none flex items-center justify-center gap-2 text-xs font-bold px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 text-white transition-all shadow-md hover:shadow-lg cursor-pointer btn-interactive"
          >
            <span>{t("btnCohortFunnel")}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Regional Division Metrics Selector Toolbar */}
      <div className="p-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-cyan-50 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 border border-cyan-200/60 dark:border-cyan-800/60">
            <MapPin className="w-4 h-4" />
          </span>
          <div>
            <div className="text-xs font-bold text-slate-900 dark:text-white font-display">Regional Administrative Breakdown</div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400">Filtering outcome indicators for {currentDivision.label}</div>
          </div>
        </div>

        <div className="flex items-center flex-wrap gap-1.5 w-full sm:w-auto">
          {REGIONAL_DIVISIONS.map((div) => {
            const isSelected = selectedDivision === div.id;
            return (
              <button
                key={div.id}
                onClick={() => setSelectedDivision(div.id)}
                className={`px-3 py-1 rounded-xl text-[11px] font-bold transition-all cursor-pointer btn-interactive ${
                  isSelected
                    ? "bg-cyan-700 text-white shadow-xs"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                {div.label.split(" (")[0]}
              </button>
            );
          })}
        </div>
      </div>

      {/* KPI Cards Grid with Dynamic Regional Values */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <KpiCard
          title={t("kpiEnrolled")}
          value={scaledStats.enrolled}
          delta={STATEWIDE_KPIS.totalEnrolled.delta}
          isPositive={STATEWIDE_KPIS.totalEnrolled.isPositive}
          subtext={`Region: ${currentDivision.label.split(" (")[0]}`}
          indicator={STATEWIDE_KPIS.totalEnrolled.indicator}
          icon={Users}
          accentBg="bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300"
          gradientBorder="border-blue-100 dark:border-blue-900/40"
        />

        <KpiCard
          title={t("kpiPlaced")}
          value={scaledStats.placed}
          delta={STATEWIDE_KPIS.totalPlaced.delta}
          isPositive={STATEWIDE_KPIS.totalPlaced.isPositive}
          subtext={`Top Sector: ${currentDivision.topSector}`}
          indicator={STATEWIDE_KPIS.totalPlaced.indicator}
          icon={Briefcase}
          accentBg="bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300"
          gradientBorder="border-emerald-100 dark:border-emerald-900/40"
        />

        <KpiCard
          title={t("kpiSelfEmployed")}
          value={scaledStats.selfEmp}
          delta={STATEWIDE_KPIS.totalSelfEmployed.delta}
          isPositive={STATEWIDE_KPIS.totalSelfEmployed.isPositive}
          subtext={STATEWIDE_KPIS.totalSelfEmployed.subtext}
          indicator={STATEWIDE_KPIS.totalSelfEmployed.indicator}
          icon={HeartHandshake}
          accentBg="bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300"
          gradientBorder="border-amber-100 dark:border-amber-900/40"
        />

        <KpiCard
          title={t("kpiApprenticeship")}
          value={scaledStats.app}
          delta={STATEWIDE_KPIS.inApprenticeship.delta}
          isPositive={STATEWIDE_KPIS.inApprenticeship.isPositive}
          subtext={STATEWIDE_KPIS.inApprenticeship.subtext}
          indicator={STATEWIDE_KPIS.inApprenticeship.indicator}
          icon={Award}
          accentBg="bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300"
          gradientBorder="border-purple-100 dark:border-purple-900/40"
        />

        <KpiCard
          title={t("kpiStartingWage")}
          value={scaledStats.avgWage}
          delta={STATEWIDE_KPIS.avgStartingWage.delta}
          isPositive={STATEWIDE_KPIS.avgStartingWage.isPositive}
          subtext={`Median in ${currentDivision.label.split(" (")[0]}`}
          indicator={STATEWIDE_KPIS.avgStartingWage.indicator}
          icon={TrendingUp}
          accentBg="bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300"
          gradientBorder="border-teal-100 dark:border-teal-900/40"
        />

        <KpiCard
          title={t("kpiWageGrowth")}
          value={STATEWIDE_KPIS.wageProgressionIndex.formatted}
          delta={STATEWIDE_KPIS.wageProgressionIndex.delta}
          isPositive={STATEWIDE_KPIS.wageProgressionIndex.isPositive}
          subtext={STATEWIDE_KPIS.wageProgressionIndex.subtext}
          indicator={STATEWIDE_KPIS.wageProgressionIndex.indicator}
          icon={TrendingUp}
          accentBg="bg-cyan-50 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300"
          gradientBorder="border-cyan-100 dark:border-cyan-900/40"
        />

        <KpiCard
          title={t("kpiRetention")}
          value={STATEWIDE_KPIS.retentionAtSixMonths.formatted}
          delta={STATEWIDE_KPIS.retentionAtSixMonths.delta}
          isPositive={STATEWIDE_KPIS.retentionAtSixMonths.isPositive}
          subtext={STATEWIDE_KPIS.retentionAtSixMonths.subtext}
          indicator={STATEWIDE_KPIS.retentionAtSixMonths.indicator}
          icon={ShieldCheck}
          accentBg="bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300"
          gradientBorder="border-emerald-100 dark:border-emerald-900/40"
        />

        <KpiCard
          title={t("kpiActiveProviders")}
          value={scaledStats.providers}
          delta={STATEWIDE_KPIS.activeProviders.delta}
          isPositive={STATEWIDE_KPIS.activeProviders.isPositive}
          subtext={STATEWIDE_KPIS.activeProviders.subtext}
          indicator={STATEWIDE_KPIS.activeProviders.indicator}
          icon={Building}
          accentBg="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
          gradientBorder="border-slate-200 dark:border-slate-800"
        />
      </div>
    </section>
  );
};
