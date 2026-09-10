import React from "react";
import { User, Award, MapPin, Building, CheckCircle2, ShieldAlert, Sparkles } from "lucide-react";
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
      <div className="p-8 text-center bg-rose-50/90 backdrop-blur-md border border-rose-200/80 rounded-3xl my-6 shadow-sm">
        <div className="w-14 h-14 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-inner">
          <ShieldAlert className="w-7 h-7" />
        </div>
        <h2 className="text-lg font-bold text-rose-900 font-display">Access Restricted</h2>
        <p className="text-xs text-rose-700 mt-1 max-w-md mx-auto">
          Candidate / Trainee credentials are required to view personal learning journeys, check-ins, and wage progression.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Trainee Hero Profile Header with Glassmorphism & Ambient Glow */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950 text-white rounded-3xl p-6 sm:p-7 border border-amber-500/20 shadow-lg relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-start gap-4 relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-rose-600 flex items-center justify-center font-extrabold text-xl font-display text-white shadow-md shrink-0 border border-amber-300/30">
            {activeTrainee.name.charAt(0)}
          </div>
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-xl sm:text-2xl font-extrabold font-display text-white tracking-tight">
                {activeTrainee.name}
              </h1>
              <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-inner">
                {activeTrainee.schemeIdentifier}
              </span>
            </div>

            <p className="text-xs text-slate-300 font-medium">
              {activeTrainee.course} • <span className="text-amber-300/90 font-semibold">{activeTrainee.nsqfLevel}</span>
            </p>

            <div className="flex flex-wrap items-center gap-3.5 pt-1 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>{activeTrainee.currentLocation}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-cyan-400" />
                <span>{activeTrainee.providerName}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Right Status Pill */}
        <div className="flex flex-col sm:items-end gap-2 shrink-0 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold shadow-inner">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Active Candidate Profile</span>
          </div>
          <span className="text-[11px] text-slate-400 font-mono">
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
