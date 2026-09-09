import React, { useState, useMemo } from "react";
import {
  ArrowUpDown,
  Search,
  Flag,
  CheckCircle,
  AlertTriangle,
  Star,
  Building,
  SlidersHorizontal
} from "lucide-react";
import { Badge } from "../shared/Badge";
import { Modal } from "../shared/Modal";
import { useRole } from "../../context/RoleContext";
import { useLanguage } from "../../context/LanguageContext";

export const ProviderLeaderboard = () => {
  const { providers, toggleProviderFlag } = useRole();
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("placementRate");
  const [sortDirection, setSortDirection] = useState("desc"); // "asc" | "desc"
  const [statusFilter, setStatusFilter] = useState("all"); // "all" | "good_standing" | "flagged"
  const [selectedProviderForFlag, setSelectedProviderForFlag] = useState(null);
  const [flagReasonInput, setFlagReasonInput] = useState("");

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const filteredAndSortedProviders = useMemo(() => {
    return providers
      .filter((p) => {
        const matchesSearch =
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.sectors.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()));

        if (statusFilter === "good_standing") {
          return matchesSearch && p.status === "good_standing";
        }
        if (statusFilter === "flagged") {
          return matchesSearch && (p.status === "flagged_for_review" || p.status === "under_scrutiny");
        }
        return matchesSearch;
      })
      .sort((a, b) => {
        const factor = sortDirection === "asc" ? 1 : -1;
        return (a[sortField] > b[sortField] ? 1 : -1) * factor;
      });
  }, [providers, searchTerm, sortField, sortDirection, statusFilter]);

  const openFlagModal = (provider) => {
    setSelectedProviderForFlag(provider);
    setFlagReasonInput(provider.flagReason || "");
  };

  const handleConfirmFlagToggle = () => {
    if (selectedProviderForFlag) {
      toggleProviderFlag(selectedProviderForFlag.id, flagReasonInput);
      setSelectedProviderForFlag(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Accountability Brief */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-cyan-50 text-cyan-700">
                <Building className="w-4 h-4" />
              </span>
              <h2 className="text-lg font-bold font-display text-slate-900">
                {t("providerTitle")}
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {t("providerSubtitle")}
            </p>
          </div>

          {/* Quick status summary counts */}
          <div className="flex items-center gap-2 text-xs">
            <span className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold">
              {t("goodStandingCount")}: {providers.filter((p) => p.status === "good_standing").length}
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-rose-50 text-rose-800 border border-rose-200 font-semibold">
              {t("auditFlaggedCount")}: {providers.filter((p) => p.status !== "good_standing").length}
            </span>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-3 border-t border-slate-100">
          <div className="relative w-full sm:flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={t("searchProviderPlaceholder")}
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
              <option value="all">{t("filterAllProviders")} ({providers.length})</option>
              <option value="good_standing">{t("goodStandingCount")}</option>
              <option value="flagged">{t("auditFlaggedCount")}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Leaderboard Table Container */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50/80 text-[11px] uppercase font-semibold text-slate-500 border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4">{t("thProvider")}</th>
                <th className="py-3.5 px-3 cursor-pointer hover:text-slate-900" onClick={() => handleSort("placementRate")}>
                  <div className="flex items-center gap-1">
                    <span>{t("thPlacementRate")}</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3.5 px-3 cursor-pointer hover:text-slate-900" onClick={() => handleSort("avgStartingWage")}>
                  <div className="flex items-center gap-1">
                    <span>{t("thAvgWage")}</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3.5 px-3 cursor-pointer hover:text-slate-900" onClick={() => handleSort("retention6M")}>
                  <div className="flex items-center gap-1">
                    <span>{t("thRetention6M")}</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3.5 px-3 cursor-pointer hover:text-slate-900" onClick={() => handleSort("relevanceScore")}>
                  <div className="flex items-center gap-1">
                    <span>{t("thRelevance")}</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3.5 px-3 cursor-pointer hover:text-slate-900" onClick={() => handleSort("verifiedPct")}>
                  <div className="flex items-center gap-1">
                    <span>{t("thVerifiedRate")}</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3.5 px-3">{t("thCompliance")}</th>
                <th className="py-3.5 px-4 text-right">{t("thAction")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredAndSortedProviders.map((provider) => {
                const isFlagged = provider.status !== "good_standing";
                return (
                  <tr
                    key={provider.id}
                    className={`hover:bg-slate-50/80 transition-colors ${
                      isFlagged ? "bg-rose-50/30" : ""
                    }`}
                  >
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-900 line-clamp-1">
                        {provider.name}
                      </div>
                      <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-400">
                        <span className="font-medium text-cyan-700">{provider.district}</span>
                        <span>•</span>
                        <span>ID: {provider.id}</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {provider.sectors.map((sec) => (
                          <span
                            key={sec}
                            className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-600"
                          >
                            {sec}
                          </span>
                        ))}
                      </div>
                    </td>

                    <td className="py-3.5 px-3">
                      <div className="font-bold text-slate-900 font-display text-sm">
                        {provider.placementRate}%
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {provider.placed.toLocaleString("en-IN")} / {provider.certified.toLocaleString("en-IN")}
                      </div>
                    </td>

                    <td className="py-3.5 px-3">
                      <div className="font-semibold text-slate-900 font-display">
                        ₹{provider.avgStartingWage.toLocaleString("en-IN")}
                      </div>
                      <div className="text-[10px] text-emerald-600 font-medium">
                        +{provider.wageGrowth12M}% @12M
                      </div>
                    </td>

                    <td className="py-3.5 px-3">
                      <div
                        className={`font-semibold ${
                          provider.retention6M >= 60 ? "text-slate-900" : "text-rose-600"
                        }`}
                      >
                        {provider.retention6M}%
                      </div>
                      <div className="text-[10px] text-slate-400">
                        3M: {provider.retention3M}% • 12M: {provider.retention12M}%
                      </div>
                    </td>

                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-1 font-semibold text-slate-900">
                        <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                        <span>{provider.relevanceScore}</span>
                      </div>
                      <div className="text-[10px] text-slate-400">Trainee survey</div>
                    </td>

                    <td className="py-3.5 px-3">
                      <div
                        className={`font-semibold ${
                          provider.verifiedPct >= 70 ? "text-emerald-700" : "text-amber-700"
                        }`}
                      >
                        {provider.verifiedPct}%
                      </div>
                      <div className="text-[10px] text-slate-400">Employer cross-check</div>
                    </td>

                    <td className="py-3.5 px-3">
                      {provider.status === "good_standing" && (
                        <Badge variant="success" size="sm" icon={CheckCircle}>
                          Good Standing
                        </Badge>
                      )}
                      {provider.status === "flagged_for_review" && (
                        <Badge variant="warning" size="sm" icon={AlertTriangle}>
                          Flagged
                        </Badge>
                      )}
                      {provider.status === "under_scrutiny" && (
                        <Badge variant="danger" size="sm" icon={Flag}>
                          Under Scrutiny
                        </Badge>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => openFlagModal(provider)}
                        className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1.5 rounded-lg border transition-colors cursor-pointer ${
                          isFlagged
                            ? "bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100"
                            : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        <Flag className="w-3 h-3" />
                        <span>{isFlagged ? t("btnReviewAudit") : t("btnFlagReview")}</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Flag / Audit Review Modal */}
      {selectedProviderForFlag && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedProviderForFlag(null)}
          title={`Audit & Compliance Action: ${selectedProviderForFlag.name}`}
          subtitle={`Institute ID: ${selectedProviderForFlag.id} • District: ${selectedProviderForFlag.district}`}
        >
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
              <div className="font-semibold text-slate-800">Institute Outcome Metrics:</div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <div>
                  <span className="text-slate-400">Placement:</span>{" "}
                  <span className="font-bold text-slate-900">{selectedProviderForFlag.placementRate}%</span>
                </div>
                <div>
                  <span className="text-slate-400">6M Retention:</span>{" "}
                  <span className="font-bold text-slate-900">{selectedProviderForFlag.retention6M}%</span>
                </div>
                <div>
                  <span className="text-slate-400">Verified Rate:</span>{" "}
                  <span className="font-bold text-slate-900">{selectedProviderForFlag.verifiedPct}%</span>
                </div>
                <div>
                  <span className="text-slate-400">Relevance:</span>{" "}
                  <span className="font-bold text-slate-900">{selectedProviderForFlag.relevanceScore}/5</span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Reason for Flagging / Audit Notice
              </label>
              <textarea
                value={flagReasonInput}
                onChange={(e) => setFlagReasonInput(e.target.value)}
                placeholder="Specify regulatory non-compliance, ghost placement suspicion, low retention, or stipend dispute..."
                rows={3}
                className="w-full text-xs p-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:outline-hidden"
              />
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setSelectedProviderForFlag(null)}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmFlagToggle}
                className={`px-4 py-2 rounded-xl text-xs font-semibold text-white shadow-xs cursor-pointer ${
                  selectedProviderForFlag.status === "good_standing"
                    ? "bg-rose-600 hover:bg-rose-700"
                    : "bg-emerald-600 hover:bg-emerald-700"
                }`}
              >
                {selectedProviderForFlag.status === "good_standing"
                  ? "Confirm Flag for District Review"
                  : "Restore to Good Standing"}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
