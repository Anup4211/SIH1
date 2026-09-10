import React from "react";
import { User, Award, MapPin, Building, CheckCircle2, ShieldAlert } from "lucide-react";
import { JourneyTimeline } from "./JourneyTimeline";
import { EmploymentStatusCard } from "./EmploymentStatusCard";
import { QuickCheckInSurvey } from "./QuickCheckInSurvey";
import { WageGrowthTracker } from "./WageGrowthTracker";
import { CredentialWallet } from "./CredentialWallet";
import { RecommendedSteps } from "./RecommendedSteps";
import { ContactConsentManager } from "./ContactConsentManager";
import { ProviderTransparencyCard } from "./ProviderTransparencyCard";
import { useRole } from "../../context/RoleContext";
import { useLanguage } from "../../context/LanguageContext";

export const TraineeDashboard = () => {
  const { role, activeTrainee } = useRole();
  const { t } = useLanguage();

  // Strict Role Isolation Guard
  if (role !== "trainee") {
    return (
      <div className="p-8 text-center bg-rose-50 border border-rose-200 rounded-2xl my-6">
        <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-xl flex items-center justify-center mx-auto mb-3">
          <ShieldAlert className="w-6 h-6" />
        </div>
        <h2 className="text-base font-bold text-rose-900">Access Restricted</h2>
        <p className="text-xs text-rose-700 mt-1 max-w-md mx-auto">
          Candidate / Trainee credentials are required to view personal learning journeys, check-ins, and wage progression.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Trainee Hero Profile Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-amber-950 text-white rounded-2xl p-5 sm:p-6 border border-amber-500/20 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-rose-500 flex items-center justify-center font-bold text-lg font-display text-white shadow-sm shrink-0">
            {activeTrainee.name.charAt(0)}
          </div>
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-lg sm:text-xl font-bold font-display text-white">
                {activeTrainee.name}
              </h1>
              <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                {activeTrainee.schemeIdentifier}
              </span>
            </div>

            <p className="text-xs text-slate-300">
              {activeTrainee.course} • {activeTrainee.nsqfLevel}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-slate-400">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-amber-400" />
                <span>{activeTrainee.currentLocation}</span>
              </span>
              <span className="flex items-center gap-1">
                <Building className="w-3 h-3 text-cyan-400" />
                <span>{activeTrainee.providerName}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Right Status Pill */}
        <div className="flex flex-col sm:items-end gap-1.5 shrink-0">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Active Candidate Profile</span>
          </div>
          <span className="text-[10px] text-slate-400 font-mono">
            Scheme: {activeTrainee.schemeCode} (Batch {activeTrainee.batchYear})
          </span>
        </div>
      </div>

      {/* Main 2-Column Trainee Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (Main Interaction & Outcomes) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Feature 2: My Employment Status Card with Contextual Panel */}
          <EmploymentStatusCard />

          {/* Feature 3: 60-Second Quick Check-In Micro-Survey */}
          <QuickCheckInSurvey />

          {/* Feature 4: Wage Growth Tracker (Personal Area Chart) */}
          <WageGrowthTracker />

          {/* Feature 6: Recommended Next Steps (Bridge, Job Melas, Apprenticeships) */}
          <RecommendedSteps />
        </div>

        {/* Right Column (Credentials, Stepper & Privacy) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Feature 1: My Training Journey Timeline */}
          <JourneyTimeline />

          {/* Feature 5: Skill Credential Wallet */}
          <CredentialWallet />

          {/* Feature 7: Contact & Consent Management */}
          <ContactConsentManager />

          {/* Feature 8: Provider Transparency Card (Peer Ratings) */}
          <ProviderTransparencyCard />
        </div>
      </div>
    </div>
  );
};
