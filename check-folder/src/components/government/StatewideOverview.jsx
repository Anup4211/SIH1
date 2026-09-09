import React from "react";
import { Users, Briefcase, TrendingUp, Building, Award, HeartHandshake, ShieldCheck, ArrowRight } from "lucide-react";
import { KpiCard } from "../shared/KpiCard";
import { STATEWIDE_KPIS } from "../../data/cohortStats";
import { useLanguage } from "../../context/LanguageContext";

export const StatewideOverview = ({ onNavigateToFunnel, onNavigateToVerification }) => {
  const { t } = useLanguage();

  return (
    <section className="space-y-6">
      {/* Strategic Callout Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-5 border border-indigo-800/40 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              {t("macroAuditBadge")}
            </span>
            <span className="text-xs text-slate-400">{t("statewideCommandTitle")}</span>
          </div>
          <h2 className="text-xl font-bold font-display text-white">
            {t("macroHeadline")}
          </h2>
          <p className="text-xs text-slate-300 max-w-2xl">
            {t("macroSubtext")}
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={onNavigateToVerification}
            className="flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30 transition-colors cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{t("btnVerificationDesk")}</span>
          </button>
          <button
            onClick={onNavigateToFunnel}
            className="flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-xl bg-cyan-600 text-white hover:bg-cyan-500 transition-colors shadow-xs cursor-pointer"
          >
            <span>{t("btnCohortFunnel")}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <KpiCard
          title={t("kpiEnrolled")}
          value={STATEWIDE_KPIS.totalEnrolled.formatted}
          delta={STATEWIDE_KPIS.totalEnrolled.delta}
          isPositive={STATEWIDE_KPIS.totalEnrolled.isPositive}
          subtext={STATEWIDE_KPIS.totalEnrolled.subtext}
          indicator={STATEWIDE_KPIS.totalEnrolled.indicator}
          icon={Users}
          accentBg="bg-blue-50 text-blue-700"
          gradientBorder="border-blue-100"
        />

        <KpiCard
          title={t("kpiPlaced")}
          value={STATEWIDE_KPIS.totalPlaced.formatted}
          delta={STATEWIDE_KPIS.totalPlaced.delta}
          isPositive={STATEWIDE_KPIS.totalPlaced.isPositive}
          subtext={STATEWIDE_KPIS.totalPlaced.subtext}
          indicator={STATEWIDE_KPIS.totalPlaced.indicator}
          icon={Briefcase}
          accentBg="bg-emerald-50 text-emerald-700"
          gradientBorder="border-emerald-100"
        />

        <KpiCard
          title={t("kpiSelfEmployed")}
          value={STATEWIDE_KPIS.totalSelfEmployed.formatted}
          delta={STATEWIDE_KPIS.totalSelfEmployed.delta}
          isPositive={STATEWIDE_KPIS.totalSelfEmployed.isPositive}
          subtext={STATEWIDE_KPIS.totalSelfEmployed.subtext}
          indicator={STATEWIDE_KPIS.totalSelfEmployed.indicator}
          icon={HeartHandshake}
          accentBg="bg-amber-50 text-amber-700"
          gradientBorder="border-amber-100"
        />

        <KpiCard
          title={t("kpiApprenticeship")}
          value={STATEWIDE_KPIS.inApprenticeship.formatted}
          delta={STATEWIDE_KPIS.inApprenticeship.delta}
          isPositive={STATEWIDE_KPIS.inApprenticeship.isPositive}
          subtext={STATEWIDE_KPIS.inApprenticeship.subtext}
          indicator={STATEWIDE_KPIS.inApprenticeship.indicator}
          icon={Award}
          accentBg="bg-purple-50 text-purple-700"
          gradientBorder="border-purple-100"
        />

        <KpiCard
          title={t("kpiStartingWage")}
          value={STATEWIDE_KPIS.avgStartingWage.formatted}
          delta={STATEWIDE_KPIS.avgStartingWage.delta}
          isPositive={STATEWIDE_KPIS.avgStartingWage.isPositive}
          subtext={STATEWIDE_KPIS.avgStartingWage.subtext}
          indicator={STATEWIDE_KPIS.avgStartingWage.indicator}
          icon={TrendingUp}
          accentBg="bg-teal-50 text-teal-700"
          gradientBorder="border-teal-100"
        />

        <KpiCard
          title={t("kpiWageGrowth")}
          value={STATEWIDE_KPIS.wageProgressionIndex.formatted}
          delta={STATEWIDE_KPIS.wageProgressionIndex.delta}
          isPositive={STATEWIDE_KPIS.wageProgressionIndex.isPositive}
          subtext={STATEWIDE_KPIS.wageProgressionIndex.subtext}
          indicator={STATEWIDE_KPIS.wageProgressionIndex.indicator}
          icon={TrendingUp}
          accentBg="bg-cyan-50 text-cyan-700"
          gradientBorder="border-cyan-100"
        />

        <KpiCard
          title={t("kpiRetention")}
          value={STATEWIDE_KPIS.retentionAtSixMonths.formatted}
          delta={STATEWIDE_KPIS.retentionAtSixMonths.delta}
          isPositive={STATEWIDE_KPIS.retentionAtSixMonths.isPositive}
          subtext={STATEWIDE_KPIS.retentionAtSixMonths.subtext}
          indicator={STATEWIDE_KPIS.retentionAtSixMonths.indicator}
          icon={ShieldCheck}
          accentBg="bg-emerald-50 text-emerald-700"
          gradientBorder="border-emerald-100"
        />

        <KpiCard
          title={t("kpiActiveProviders")}
          value={STATEWIDE_KPIS.activeProviders.formatted}
          delta={STATEWIDE_KPIS.activeProviders.delta}
          isPositive={STATEWIDE_KPIS.activeProviders.isPositive}
          subtext={STATEWIDE_KPIS.activeProviders.subtext}
          indicator={STATEWIDE_KPIS.activeProviders.indicator}
          icon={Building}
          accentBg="bg-slate-100 text-slate-700"
          gradientBorder="border-slate-200"
        />
      </div>
    </section>
  );
};
