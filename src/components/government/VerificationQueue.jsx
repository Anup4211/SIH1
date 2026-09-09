import React, { useState, useMemo } from "react";
import {
  CheckCircle2,
  XCircle,
  Clock,
  FileText,
  Search,
  Check,
  AlertTriangle
} from "lucide-react";
import { Badge } from "../shared/Badge";
import { Modal } from "../shared/Modal";
import { useRole } from "../../context/RoleContext";
import { useLanguage } from "../../context/LanguageContext";

export const VerificationQueue = () => {
  const { verifications, updateVerificationStatus } = useRole();
  const { t } = useLanguage();
  const [statusFilter, setStatusFilter] = useState("pending"); // "all" | "pending" | "confirmed" | "disputed"
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

      if (statusFilter === "all") return matchesSearch;
      return matchesSearch && item.status === statusFilter;
    });
  }, [verifications, statusFilter, searchTerm]);

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
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold font-display text-slate-900">
              {t("verificationTitle")}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              {t("verificationSubtitle")}
            </p>
          </div>

          {/* Quick Counter Badges */}
          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={() => setStatusFilter("pending")}
              className={`px-3 py-1.5 rounded-xl font-semibold border transition-all cursor-pointer ${
                statusFilter === "pending"
                  ? "bg-amber-100 text-amber-900 border-amber-300 shadow-xs"
                  : "bg-amber-50 text-amber-800 border-amber-200"
              }`}
            >
              {t("filterPending")} ({verifications.filter((v) => v.status === "pending").length})
            </button>
            <button
              onClick={() => setStatusFilter("confirmed")}
              className={`px-3 py-1.5 rounded-xl font-semibold border transition-all cursor-pointer ${
                statusFilter === "confirmed"
                  ? "bg-emerald-100 text-emerald-900 border-emerald-300 shadow-xs"
                  : "bg-emerald-50 text-emerald-800 border-emerald-200"
              }`}
            >
              {t("filterConfirmed")} ({verifications.filter((v) => v.status === "confirmed").length})
            </button>
            <button
              onClick={() => setStatusFilter("disputed")}
              className={`px-3 py-1.5 rounded-xl font-semibold border transition-all cursor-pointer ${
                statusFilter === "disputed"
                  ? "bg-rose-100 text-rose-900 border-rose-300 shadow-xs"
                  : "bg-rose-50 text-rose-800 border-rose-200"
              }`}
            >
              {t("filterDisputed")} ({verifications.filter((v) => v.status === "disputed").length})
            </button>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-3 border-t border-slate-100">
          <div className="relative w-full sm:flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search candidate name, employer, scheme ID, or district..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:outline-hidden"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full sm:w-auto text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:ring-2 focus:ring-cyan-500 focus:outline-hidden"
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
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50/80 text-[11px] uppercase font-semibold text-slate-500 border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4">Trainee & Scheme ID</th>
                <th className="py-3.5 px-3">Reported Employer & Role</th>
                <th className="py-3.5 px-3">Monthly Wage</th>
                <th className="py-3.5 px-3">EPFO / Proof Doc</th>
                <th className="py-3.5 px-3">Verification State</th>
                <th className="py-3.5 px-4 text-right">Workflow Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-900">{item.traineeName}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      <span className="font-mono text-cyan-700">{item.schemeIdentifier}</span> • {item.scheme}
                    </div>
                    <div className="text-[11px] text-slate-500 truncate max-w-xs">{item.course}</div>
                  </td>

                  <td className="py-3.5 px-3">
                    <div className="font-semibold text-slate-900">{item.reportedEmployer}</div>
                    <div className="text-[11px] text-slate-500">{item.reportedRole}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">{item.district} District</div>
                  </td>

                  <td className="py-3.5 px-3">
                    <div className="font-bold text-slate-900 font-display text-sm">
                      ₹{item.reportedWage.toLocaleString("en-IN")}
                    </div>
                    <div className="text-[10px] text-slate-400">per month</div>
                  </td>

                  <td className="py-3.5 px-3">
                    <div className="space-y-1">
                      {item.hasEpfUan ? (
                        <div className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <Check className="w-3 h-3" />
                          <span>UAN: {item.uanNumber?.slice(-4).padStart(item.uanNumber.length, "•")}</span>
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200">
                          <span>No UAN Linked</span>
                        </div>
                      )}
                      <div>
                        <button
                          onClick={() => setInspectDocItem(item)}
                          className="inline-flex items-center gap-1 text-[11px] text-cyan-600 hover:text-cyan-800 underline cursor-pointer"
                        >
                          <FileText className="w-3 h-3" />
                          <span>{t("btnInspectDoc")}</span>
                        </button>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-3">
                    {item.status === "confirmed" && (
                      <div>
                        <Badge variant="success" size="sm" icon={CheckCircle2}>
                          {t("filterConfirmed")}
                        </Badge>
                        <div className="text-[10px] text-slate-400 mt-1">{item.verifiedAt}</div>
                      </div>
                    )}
                    {item.status === "pending" && (
                      <Badge variant="warning" size="sm" icon={Clock}>
                        {t("filterPending")}
                      </Badge>
                    )}
                    {item.status === "disputed" && (
                      <div>
                        <Badge variant="danger" size="sm" icon={XCircle}>
                          {t("filterDisputed")}
                        </Badge>
                        <div className="text-[10px] text-rose-600 font-medium mt-1 truncate max-w-xs">
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
                          className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 shadow-2xs transition-colors cursor-pointer"
                        >
                          <Check className="w-3 h-3" />
                          <span>{t("btnConfirm")}</span>
                        </button>
                      )}
                      {item.status !== "disputed" && (
                        <button
                          onClick={() => openDisputeModal(item)}
                          className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-slate-100 text-rose-700 border border-slate-200 hover:bg-rose-50 hover:border-rose-200 transition-colors cursor-pointer"
                        >
                          <XCircle className="w-3 h-3" />
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
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Document Name:</span>
                <span className="font-mono font-semibold text-slate-800">{inspectDocItem.proofDoc}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Employer Claimed:</span>
                <span className="font-semibold text-slate-800">{inspectDocItem.reportedEmployer}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Monthly Compensation:</span>
                <span className="font-bold text-slate-900 font-display">₹{inspectDocItem.reportedWage}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">EPFO UAN Status:</span>
                <span className="font-mono text-emerald-700 font-medium">
                  {inspectDocItem.hasEpfUan ? `Active (${inspectDocItem.uanNumber})` : "Manual Slip Submitted"}
                </span>
              </div>
            </div>

            <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center bg-slate-50/50 space-y-2">
              <FileText className="w-12 h-12 text-cyan-600 mx-auto" />
              <div className="font-bold text-slate-800 text-sm font-display">{inspectDocItem.proofDoc}</div>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Digitally captured via Trainee Quick Check-in or Provider MIS upload. Watermarked with DigiLocker secure hash.
              </p>
              <div className="pt-2">
                <span className="text-[11px] px-2.5 py-1 rounded bg-slate-200 text-slate-700 font-semibold">
                  SHA-256 Validated • Authenticity Score: 98.4%
                </span>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setInspectDocItem(null)}
                className="px-4 py-2 text-xs font-semibold bg-slate-800 text-white rounded-xl hover:bg-slate-700 cursor-pointer"
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
            <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-900 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-700 shrink-0 mt-0.5" />
              <span>
                Marking this claim as disputed will deduct this outcome from the provider's verified placement index until employer dispute resolution is completed.
              </span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Employer HR Audit Finding / Reason
              </label>
              <textarea
                value={disputeNoteInput}
                onChange={(e) => setDisputeNoteInput(e.target.value)}
                placeholder="e.g. Employer HR confirms candidate attended interview but never reported to duty; or candidate resigned within 7 days..."
                rows={3}
                className="w-full text-xs p-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:outline-hidden"
              />
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setSelectedItemForDispute(null)}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDispute}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 shadow-xs cursor-pointer"
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
