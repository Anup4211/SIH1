import React, { useState } from "react";
import {
  LayoutDashboard,
  Filter,
  Building,
  AlertOctagon,
  ShieldCheck,
  Send,
  FileDown,
  Database,
  Compass,
  PlusCircle
} from "lucide-react";
import { StatewideOverview } from "./StatewideOverview";
import { FunnelAnalytics } from "./FunnelAnalytics";
import { ProviderLeaderboard } from "./ProviderLeaderboard";
import { DemographicHeatmap } from "./DemographicHeatmap";
import { SkillGapPanel } from "./SkillGapPanel";
import { VerificationQueue } from "./VerificationQueue";
import { CampaignManager } from "./CampaignManager";
import { DataQualityAudit } from "./DataQualityAudit";
import { PolicyReportModal } from "./PolicyReportModal";
import { CreateCourseModal } from "./CreateCourseModal";
import { useRole } from "../../context/RoleContext";
import { useLanguage } from "../../context/LanguageContext";

export const GovernmentDashboard = () => {
  const { isCourseModalOpen, setIsCourseModalOpen, courseModalPreFill } = useRole();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("overview");
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  const tabs = [
    { id: "overview", label: t("tabOverview"), icon: LayoutDashboard },
    { id: "funnel", label: t("tabFunnel"), icon: Filter },
    { id: "providers", label: t("tabProviders"), icon: Building },
    { id: "demographics", label: t("tabDemographics"), icon: Compass },
    { id: "skillGaps", label: t("tabSkillGaps"), icon: AlertOctagon },
    { id: "verification", label: t("tabVerification"), icon: ShieldCheck },
    { id: "campaigns", label: t("tabCampaigns"), icon: Send },
    { id: "dataQuality", label: t("tabDataQuality"), icon: Database }
  ];

  return (
    <div className="space-y-6">
      {/* Navigation Sub-Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        {/* Tab Navigation */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-150 cursor-pointer ${
                  isActive
                    ? "bg-slate-900 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-cyan-400" : "text-slate-400"}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Top Government Actions: Create Course & Generate Report */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => setIsCourseModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700 text-xs font-semibold shadow-xs transition-all cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{t("btnCreateCourse")}</span>
          </button>

          <button
            onClick={() => setIsReportModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-cyan-700 text-white hover:bg-cyan-800 text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            <FileDown className="w-4 h-4" />
            <span>{t("btnGenerateReport")}</span>
          </button>
        </div>
      </div>

      {/* Main Tab View Routing */}
      <div>
        {activeTab === "overview" && (
          <StatewideOverview
            onNavigateToFunnel={() => setActiveTab("funnel")}
            onNavigateToVerification={() => setActiveTab("verification")}
          />
        )}
        {activeTab === "funnel" && <FunnelAnalytics />}
        {activeTab === "providers" && <ProviderLeaderboard />}
        {activeTab === "demographics" && <DemographicHeatmap />}
        {activeTab === "skillGaps" && <SkillGapPanel />}
        {activeTab === "verification" && <VerificationQueue />}
        {activeTab === "campaigns" && <CampaignManager />}
        {activeTab === "dataQuality" && <DataQualityAudit />}
      </div>

      {/* Create New Course Modal (addresses skill gap loop) */}
      <CreateCourseModal
        isOpen={isCourseModalOpen}
        onClose={() => setIsCourseModalOpen(false)}
        preFillData={courseModalPreFill}
      />

      {/* Report Modal */}
      <PolicyReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
      />
    </div>
  );
};
