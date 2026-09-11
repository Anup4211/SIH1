import React, { useState } from "react";
import { Download } from "lucide-react";
import { Modal } from "../shared/Modal";
import { SCHEMES } from "../../data/schemes";
import { DIVISIONS } from "../../data/districts";
import { useRole } from "../../context/RoleContext";

export const PolicyReportModal = ({ isOpen, onClose }) => {
  const { role, showToast } = useRole();
  const [reportType, setReportType] = useState("provider_audit"); // "provider_audit" | "district_equity" | "scheme_roi"
  const [format, setFormat] = useState("pdf"); // "pdf" | "csv" | "xlsx"
  const [scheme, setScheme] = useState("all");
  const [division, setDivision] = useState("All Divisions");
  const [includeUnverified, setIncludeUnverified] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  if (role !== "government" || !isOpen) return null;

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      onClose();
      showToast(
        `Generated: MSInS_Outcome_Report_${reportType.toUpperCase()}.${format.toUpperCase()}`,
        "success"
      );
    }, 1200);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Generate Government Skilling Outcome Report"
      subtitle="Export official MIS data for Cabinet Review, District Planning Committees (DPC), and CAG Audits"
      maxWidth="max-w-xl"
    >
      <div className="space-y-4">
        {/* Report Category Selection */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
            Report Scope & Template
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <button
              type="button"
              onClick={() => setReportType("provider_audit")}
              className={`p-3 rounded-xl border text-left transition-all ${
                reportType === "provider_audit"
                  ? "bg-cyan-50 border-cyan-500 text-cyan-900 shadow-xs"
                  : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
              }`}
            >
              <div className="text-xs font-bold font-display">Provider Performance</div>
              <div className="text-[10px] text-slate-500 mt-1">
                Retention 3M/6M/12M & Flag status
              </div>
            </button>

            <button
              type="button"
              onClick={() => setReportType("district_equity")}
              className={`p-3 rounded-xl border text-left transition-all ${
                reportType === "district_equity"
                  ? "bg-cyan-50 border-cyan-500 text-cyan-900 shadow-xs"
                  : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
              }`}
            >
              <div className="text-xs font-bold font-display">District Equity MIS</div>
              <div className="text-[10px] text-slate-500 mt-1">
                Spatial disparity, Gender & SC/ST ratios
              </div>
            </button>

            <button
              type="button"
              onClick={() => setReportType("scheme_roi")}
              className={`p-3 rounded-xl border text-left transition-all ${
                reportType === "scheme_roi"
                  ? "bg-cyan-50 border-cyan-500 text-cyan-900 shadow-xs"
                  : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
              }`}
            >
              <div className="text-xs font-bold font-display">Scheme ROI & Wages</div>
              <div className="text-[10px] text-slate-500 mt-1">
                Cost per placed trainee & wage curves
              </div>
            </button>
          </div>
        </div>

        {/* Filter Selection */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Select Scheme
            </label>
            <select
              value={scheme}
              onChange={(e) => setScheme(e.target.value)}
              className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
            >
              <option value="all">All Schemes (Cross-Scheme Consolidate)</option>
              {SCHEMES.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.code}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Administrative Division
            </label>
            <select
              value={division}
              onChange={(e) => setDivision(e.target.value)}
              className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
            >
              {DIVISIONS.map((div) => (
                <option key={div} value={div}>
                  {div}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Options */}
        <div className="pt-2">
          <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={includeUnverified}
              onChange={(e) => setIncludeUnverified(e.target.checked)}
              className="rounded text-cyan-600 focus:ring-cyan-500"
            />
            <span>Include unverified self-reported placements with caveat watermark</span>
          </label>
        </div>

        {/* Format Selection */}
        <div className="pt-2">
          <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Export Format
          </label>
          <div className="flex items-center gap-3">
            {["pdf", "csv", "xlsx"].map((fmt) => (
              <label key={fmt} className="flex items-center gap-1.5 text-xs text-slate-700 cursor-pointer">
                <input
                  type="radio"
                  name="format"
                  value={fmt}
                  checked={format === fmt}
                  onChange={(e) => setFormat(e.target.value)}
                  className="text-cyan-600 focus:ring-cyan-500"
                />
                <span className="uppercase font-semibold">{fmt}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleGenerate}
            disabled={isGenerating}
            className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-cyan-700 hover:bg-cyan-800 shadow-xs flex items-center gap-2 transition-all disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Compiling MIS Data...</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5" />
                <span>Download Report ({format.toUpperCase()})</span>
              </>
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
};
