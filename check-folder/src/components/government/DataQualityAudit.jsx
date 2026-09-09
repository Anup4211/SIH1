import React from "react";
import { ShieldCheck, CheckCircle, AlertTriangle, Fingerprint, Lock, Database, FileCheck } from "lucide-react";
import { DATA_QUALITY_METRICS } from "../../data/followUpCampaigns";

export const DataQualityAudit = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-2">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700">
            <ShieldCheck className="w-4 h-4" />
          </span>
          <h2 className="text-lg font-bold font-display text-slate-900">
            Data Quality, Privacy Consent & Integrity Audit
          </h2>
        </div>
        <p className="text-xs text-slate-500">
          Evaluates data trustworthiness, DPDP Act 2023 compliance, Aadhaar deduplication, and the verified-to-self-reported ratio.
        </p>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Valid DPDP Consent
            </span>
            <Lock className="w-4 h-4 text-cyan-600" />
          </div>
          <div className="text-2xl font-bold font-display text-slate-900">
            {DATA_QUALITY_METRICS.validConsentRate}%
          </div>
          <div className="text-xs text-slate-500">
            {DATA_QUALITY_METRICS.validConsentCount.toLocaleString("en-IN")} records with active opt-in consent for government tracking and employer sharing.
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div
              className="bg-cyan-600 h-full rounded-full"
              style={{ width: `${DATA_QUALITY_METRICS.validConsentRate}%` }}
            />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Employer Verified Index
            </span>
            <FileCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold font-display text-emerald-700">
            {DATA_QUALITY_METRICS.employerVerifiedRate}%
          </div>
          <div className="text-xs text-slate-500">
            {DATA_QUALITY_METRICS.employerVerifiedCount.toLocaleString("en-IN")} outcomes backed by HR confirmation, offer letter, or EPFO deposit.
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div
              className="bg-emerald-600 h-full rounded-full"
              style={{ width: `${DATA_QUALITY_METRICS.employerVerifiedRate}%` }}
            />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Self-Reported Only
            </span>
            <AlertTriangle className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-bold font-display text-amber-700">
            {DATA_QUALITY_METRICS.selfReportedOnlyRate}%
          </div>
          <div className="text-xs text-slate-500">
            {DATA_QUALITY_METRICS.selfReportedOnlyCount.toLocaleString("en-IN")} trainees awaiting employer audit or working in informal micro-units.
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div
              className="bg-amber-500 h-full rounded-full"
              style={{ width: `${DATA_QUALITY_METRICS.selfReportedOnlyRate}%` }}
            />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Deduplication Accuracy
            </span>
            <Fingerprint className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-bold font-display text-purple-700">
            {DATA_QUALITY_METRICS.deduplicationIndex}%
          </div>
          <div className="text-xs text-slate-500">
            Aadhaar biometric matching prevents duplicate subsidy claims across PMKVY, MMYY, and State ITIs.
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div
              className="bg-purple-600 h-full rounded-full"
              style={{ width: `${DATA_QUALITY_METRICS.deduplicationIndex}%` }}
            />
          </div>
        </div>
      </div>

      {/* Administrative Trust Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900 text-white border border-slate-800 space-y-2.5">
          <div className="flex items-center gap-2 text-cyan-300 font-bold text-sm font-display">
            <Database className="w-4 h-4" />
            <span>Harmonized Unified Identifier System</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Previously, PMKVY used SDMS Candidate IDs, DDU-GKY used Kaushal Panjee IDs, and ITIs used NCVT Roll Numbers. Kaushal Setu synthesizes these under a single state-wide Aadhaar-vault hashed identifier (e.g. <code className="text-cyan-400">MH-MMYY-2024-XXXX</code>), eliminating multi-scheme double-counting.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-emerald-950/50 text-white border border-emerald-800/60 space-y-2.5">
          <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm font-display">
            <CheckCircle className="w-4 h-4" />
            <span>EPFO Triangulation Engine</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            61.2% of wage-employed records now match with monthly Provident Fund remittances via the EPFO API bridge. This provides automated, longitudinal proof of employment retention without requiring phone outreach to employers.
          </p>
        </div>
      </div>
    </div>
  );
};
