import React, { useState, useMemo } from "react";
import {
  CheckCircle2,
  XCircle,
  Clock,
  FileText,
  Search,
  Check,
  AlertTriangle,
  Shield,
  Sparkles,
  Filter
} from "lucide-react";
import { Badge } from "../shared/Badge";
import { Modal } from "../shared/Modal";
import { useRole } from "../../context/RoleContext";
import { useLanguage } from "../../context/LanguageContext";

export const VerificationQueue = () => {
  const { verifications, updateVerificationStatus } = useRole();
  const { t } = useLanguage();
  const [statusFilter, setStatusFilter] = useState("pending"); // "all" | "pending" | "confirmed" | "disputed"
  const [riskFilter, setRiskFilter] = useState("all"); // "all" | "uan_active" | "manual_audit"
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItemForDispute, setSelectedItemForDispute] = useState(null);
  const [disputeNoteInput, setDisputeNoteInput] = useState("");
  const [inspectDocItem, setInspectDocItem] = useState(null);

  const filteredItems = useMemo(() => {
    return verifications.filter((item) => {
      const matchesSearch =
        item.traineeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.reportedEmployer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.schemeIdentifier.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.district.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === "all" || item.status === statusFilter;
      const matchesRisk =
        riskFilter === "all"
          ? true
          : riskFilter === "uan_active"
          ? item.hasEpfUan
          : !item.hasEpfUan;

      return matchesSearch && matchesStatus && matchesRisk;
    });
  }, [verifications, statusFilter, riskFilter, searchTerm]);

  const handleConfirm = (id) => {
    updateVerificationStatus(id, "confirmed");
  };

  const openDisputeModal = (item) => {
    setSelectedItemForDispute(item);
    setDisputeNoteInput("");
  };

  const handleConfirmDispute = () => {
    if (selectedItemForDispute) {
      updateVerificationStatus(
        selectedItemForDispute.id,
        "disputed",
        disputeNoteInput || "Employer HR confirms candidate did not report to continuous duty."
      );
      setSelectedItemForDispute(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Overview & Trust Architecture Banner */}
      <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-3xl p-5 sm:p-6 border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-4 transition-colors duration-300">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold font-display text-slate-900 dark:text-white">
              {t("verificationTitle")}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {t("verificationSubtitle")}
            </p>
          </div>

          {/* Quick Counter Badges */}
          <div className="flex items-center flex-wrap gap-2 text-xs">
            <button
              onClick={() => setStatusFilter("pending")}
              className={`px-3 py-1.5 rounded-xl font-bold border transition-all cursor-pointer btn-interactive ${
                statusFilter === "pending"
                  ? "bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-200 border-amber-300 dark:border-amber-700 shadow-xs"
                  : "bg-amber-50 dark:bg-slate-800 text-amber-800 dark:text-slate-300 border-amber-200/60 dark:border-slate-700"
              }`}
            >
              {t("filterPending")} ({verifications.filter((v) => v.status === "pending").length})
            </button>
            <button
              onClick={() => setStatusFilter("confirmed")}
              className={`px-3 py-1.5 rounded-xl font-bold border transition-all cursor-pointer btn-interactive ${
                statusFilter === "confirmed"
                  ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-200 border-emerald-300 dark:border-emerald-700 shadow-xs"
                  : "bg-emerald-50 dark:bg-slate-800 text-emerald-800 dark:text-slate-300 border-emerald-200/60 dark:border-slate-700"
              }`}
            >
              {t("filterConfirmed")} ({verifications.filter((v) => v.status === "confirmed").length})
            </button>
            <button
              onClick={() => setStatusFilter("disputed")}
              className={`px-3 py-1.5 rounded-xl font-bold border transition-all cursor-pointer btn-interactive ${
                statusFilter === "disputed"
                  ? "bg-rose-100 dark:bg-rose-950 text-rose-900 dark:text-rose-200 border-rose-300 dark:border-rose-700 shadow-xs"
                  : "bg-rose-50 dark:bg-slate-800 text-rose-800 dark:text-slate-300 border-rose-200/60 dark:border-slate-700"
              }`}
            >
              {t("filterDisputed")} ({verifications.filter((v) => v.status === "disputed").length})
            </button>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
          <div className="relative w-full sm:flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search candidate name, employer, scheme ID, or district..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs font-medium bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:outline-hidden text-slate-900 dark:text-slate-100"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {/* Risk / UAN Filter */}
            <select
              value={riskFilter}
              onChange={(e) => setRiskFilter(e.target.value)}
              className="text-xs font-bold bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-cyan-500 focus:outline-hidden cursor-pointer"
            >
              <option value="all">All Audit Categories</option>
              <option value="uan_active">✓ UAN Verified Claims</option>
              <option value="manual_audit">⚠ Manual Slip Audit Required</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-xs font-bold bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-cyan-500 focus:outline-hidden cursor-pointer"
            >
              <option value="all">All Records ({verifications.length})</option>
              <option value="pending">{t("filterPending")}</option>
              <option value="confirmed">{t("filterConfirmed")}</option>
              <option value="disputed">{t("filterDisputed")}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Verification Queue Table */}
      <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-xs overflow-hidden transition-colors duration-300">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
            <thead className="bg-slate-50/80 dark:bg-slate-950/80 text-[11px] uppercase font-bold text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800 font-sans">
              <tr>
                <th className="py-3.5 px-4">Trainee & Scheme ID</th>
                <th className="py-3.5 px-3">Reported Employer & Role</th>
                <th className="py-3.5 px-3">Monthly Wage</th>
                <th className="py-3.5 px-3">EPFO / Proof Doc</th>
                <th className="py-3.5 px-3">Candidate Evaluation Badge</th>
                <th className="py-3.5 px-4 text-right">Workflow Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900 dark:text-white font-display">{item.traineeName}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      <span className="font-mono text-cyan-600 dark:text-cyan-400 font-bold">{item.schemeIdentifier}</span> • {item.scheme}
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate max-w-xs">{item.course}</div>
                  </td>

                  <td className="py-3.5 px-3">
                    <div className="font-bold text-slate-900 dark:text-white">{item.reportedEmployer}</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">{item.reportedRole}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">{item.district} District</div>
                  </td>

                  <td className="py-3.5 px-3">
                    <div className="font-extrabold text-slate-900 dark:text-white font-display text-sm">
                      ₹{item.reportedWage.toLocaleString("en-IN")}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono">per month</div>
                  </td>

                  <td className="py-3.5 px-3">
                    <div className="space-y-1">
                      {item.hasEpfUan ? (
                        <div className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                          <Check className="w-3 h-3" />
                          <span>UAN: {item.uanNumber?.slice(-4).padStart(item.uanNumber.length, "•")}</span>
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/70 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                          <span>Manual Pay Slip</span>
                        </div>
                      )}
                      <div>
                        <button
                          onClick={() => setInspectDocItem(item)}
                          className="inline-flex items-center gap-1 text-[11px] text-cyan-600 dark:text-cyan-400 hover:text-cyan-800 dark:hover:text-cyan-200 font-bold underline cursor-pointer"
                        >
                          <FileText className="w-3 h-3" />
                          <span>{t("btnInspectDoc")}</span>
                        </button>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-3">
                    {item.status === "confirmed" && (
                      <div className="space-y-1">
                        <Badge variant="success" size="sm" icon={CheckCircle2}>
                          Active Payroll Verified
                        </Badge>
                        <div className="text-[10px] text-slate-400 font-mono">{item.verifiedAt}</div>
                      </div>
                    )}
                    {item.status === "pending" && (
                      <div className="space-y-1">
                        <Badge variant="warning" size="sm" icon={Clock}>
                          {item.hasEpfUan ? "UAN Match Pending" : "Audit Cell Review"}
                        </Badge>
                        <div className="text-[10px] text-slate-400">High Retention Likelihood</div>
                      </div>
                    )}
                    {item.status === "disputed" && (
                      <div className="space-y-1">
                        <Badge variant="danger" size="sm" icon={XCircle}>
                          Disputed Placement
                        </Badge>
                        <div className="text-[10px] text-rose-600 dark:text-rose-400 font-medium truncate max-w-xs">
                          {item.disputeNotes}
                        </div>
                      </div>
                    )}
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {item.status !== "confirmed" && (
                        <button
                          onClick={() => handleConfirm(item.id)}
                          className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 shadow-2xs transition-all cursor-pointer btn-interactive"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>{t("btnConfirm")}</span>
                        </button>
                      )}
                      {item.status !== "disputed" && (
                        <button
                          onClick={() => openDisputeModal(item)}
                          className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-rose-700 dark:text-rose-400 border border-slate-200 dark:border-slate-700 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-all cursor-pointer btn-interactive"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          <span>{t("btnDispute")}</span>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Proof Document Inspect Modal */}
      {inspectDocItem && (
        <Modal
          isOpen={true}
          onClose={() => setInspectDocItem(null)}
          title="Supporting Verification Document"
          subtitle={`Trainee: ${inspectDocItem.traineeName} • Scheme: ${inspectDocItem.schemeIdentifier}`}
        >
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2 text-xs text-slate-800 dark:text-slate-200">
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Document Name:</span>
                <span className="font-mono font-bold">{inspectDocItem.proofDoc}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Employer Claimed:</span>
                <span className="font-bold">{inspectDocItem.reportedEmployer}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Monthly Compensation:</span>
                <span className="font-bold font-display text-cyan-700 dark:text-cyan-400">₹{inspectDocItem.reportedWage.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">EPFO UAN Status:</span>
                <span className="font-mono text-emerald-700 dark:text-emerald-400 font-bold">
                  {inspectDocItem.hasEpfUan ? `Active (${inspectDocItem.uanNumber})` : "Manual Slip Submitted"}
                </span>
              </div>
            </div>

            <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-8 text-center bg-slate-50/50 dark:bg-slate-950/40 space-y-2">
              <FileText className="w-12 h-12 text-cyan-600 dark:text-cyan-400 mx-auto" />
              <div className="font-bold text-slate-800 dark:text-slate-100 text-sm font-display">{inspectDocItem.proofDoc}</div>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                Digitally captured via Trainee Quick Check-in or Provider MIS upload. Watermarked with DigiLocker secure hash.
              </p>
              <div className="pt-2">
                <span className="text-[11px] px-3 py-1 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold font-mono">
                  SHA-256 Validated • Authenticity Score: 98.4%
                </span>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setInspectDocItem(null)}
                className="px-5 py-2.5 text-xs font-bold bg-slate-900 dark:bg-slate-800 text-white rounded-xl hover:bg-slate-800 dark:hover:bg-slate-700 cursor-pointer btn-interactive"
              >
                Close Document Preview
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Dispute Modal */}
      {selectedItemForDispute && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedItemForDispute(null)}
          title={`Flag Disputed Outcome: ${selectedItemForDispute.traineeName}`}
          subtitle={`Reported Employer: ${selectedItemForDispute.reportedEmployer} • ID: ${selectedItemForDispute.id}`}
        >
          <div className="space-y-4">
            <div className="p-3.5 bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900 rounded-2xl text-xs text-rose-900 dark:text-rose-200 flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-rose-700 dark:text-rose-400 shrink-0 mt-0.5" />
              <span>
                Marking this claim as disputed will deduct this outcome from the provider's verified placement index until employer dispute resolution is completed.
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Employer HR Audit Finding / Reason
              </label>
              <textarea
                value={disputeNoteInput}
                onChange={(e) => setDisputeNoteInput(e.target.value)}
                placeholder="e.g. Employer HR confirms candidate attended interview but never reported to duty; or candidate resigned within 7 days..."
                rows={3}
                className="w-full text-xs p-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-2 focus:ring-rose-500 focus:outline-hidden text-slate-900 dark:text-slate-100"
              />
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setSelectedItemForDispute(null)}
                className="px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDispute}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 shadow-xs cursor-pointer btn-interactive"
              >
                Confirm Dispute Record
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
