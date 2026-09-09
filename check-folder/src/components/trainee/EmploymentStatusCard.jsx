import React, { useState } from "react";
import { Briefcase, Building, CheckCircle2, Clock, Edit3, Sparkles, Info, ArrowRight, ShieldCheck } from "lucide-react";
import { Modal } from "../shared/Modal";
import { Badge } from "../shared/Badge";
import { STATUS_INFO_MAP } from "../../data/statusInfo";
import { useRole } from "../../context/RoleContext";
import { useLanguage } from "../../context/LanguageContext";

export const EmploymentStatusCard = () => {
  const { activeTrainee, updateTraineeStatus } = useRole();
  const { language, t } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form states
  const [status, setStatus] = useState(activeTrainee.employmentStatus || "Employed");
  const [jobTitle, setJobTitle] = useState(activeTrainee.jobTitle || "");
  const [employerName, setEmployerName] = useState(activeTrainee.employerName || "");
  const [wage, setWage] = useState(activeTrainee.currentMonthlyWage || "");
  const [isCourseRelated, setIsCourseRelated] = useState(activeTrainee.isCourseRelated || "Directly Related");

  const handleSave = (e) => {
    e.preventDefault();
    updateTraineeStatus({
      employmentStatus: status,
      jobTitle: status === "Seeking" || status === "Studying" ? null : jobTitle,
      employerName: status === "Seeking" || status === "Studying" ? null : employerName,
      currentMonthlyWage: status === "Seeking" || status === "Studying" ? 0 : Number(wage),
      isCourseRelated: status === "Seeking" || status === "Studying" ? null : isCourseRelated
    });
    setIsModalOpen(false);
  };

  const getStatusBadge = () => {
    switch (activeTrainee.employmentStatus) {
      case "Employed":
        return <Badge variant="success" size="md" icon={CheckCircle2}>{t("statusEmployed")}</Badge>;
      case "Self-employed":
        return <Badge variant="primary" size="md" icon={Sparkles}>{t("statusSelfEmployed")}</Badge>;
      case "Apprenticeship":
        return <Badge variant="purple" size="md" icon={Briefcase}>{t("statusApprenticeship")}</Badge>;
      case "Seeking":
        return <Badge variant="warning" size="md" icon={Clock}>{t("statusSeeking")}</Badge>;
      case "Studying":
        return <Badge variant="indigo" size="md" icon={Clock}>{t("statusStudying")}</Badge>;
      default:
        return <Badge size="md">{activeTrainee.employmentStatus}</Badge>;
    }
  };

  const currentInfo = STATUS_INFO_MAP[status] || STATUS_INFO_MAP.Employed;

  return (
    <>
      <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              {t("traineeStatusTitle")}
            </span>
            <div className="pt-1">{getStatusBadge()}</div>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-cyan-50 text-slate-700 hover:text-cyan-800 border border-slate-200 hover:border-cyan-200 text-xs font-semibold transition-all shadow-2xs cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>{t("btnUpdateStatus")}</span>
          </button>
        </div>

        {activeTrainee.employmentStatus !== "Seeking" && activeTrainee.employmentStatus !== "Studying" ? (
          <div className="space-y-3 pt-2">
            <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 space-y-1">
              <div className="text-xs text-slate-500">Designation / Role</div>
              <div className="font-bold text-slate-900 text-sm font-display">
                {activeTrainee.jobTitle || "Technician"}
              </div>
              <div className="text-xs text-slate-600 flex items-center gap-1 mt-0.5">
                <Building className="w-3.5 h-3.5 text-slate-400" />
                <span>{activeTrainee.employerName || "Direct Employment"}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-white p-3 rounded-xl border border-slate-200/80">
                <div className="text-[11px] text-slate-400">Monthly In-Hand</div>
                <div className="font-bold text-slate-900 font-display text-base text-emerald-700 mt-0.5">
                  ₹{activeTrainee.currentMonthlyWage?.toLocaleString("en-IN") || 0}
                </div>
              </div>

              <div className="bg-white p-3 rounded-xl border border-slate-200/80">
                <div className="text-[11px] text-slate-400">Verification Status</div>
                <div className="font-semibold text-slate-800 text-xs mt-1 truncate">
                  {activeTrainee.verificationStatus}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 space-y-2">
            <div className="font-semibold">{t("statusSeeking")}</div>
            <p className="text-[11px] text-amber-800">
              Your profile is registered with the District Skill Employment Center. Explore recommended job melas and bridge courses below.
            </p>
          </div>
        )}

        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <span>Last confirmed: {activeTrainee.lastVerifiedDate}</span>
          <span className="text-cyan-700 font-medium">Auto-synced with MSInS MIS</span>
        </div>
      </div>

      {/* Edit Employment Status Modal with Contextual Info Panel */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Update Employment Status"
        subtitle="Low-burden outcome reporting with zero bureaucratic paperwork"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Select your current work status:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { id: "Employed", label: "Employed", desc: "Full-time or contract salary job" },
                { id: "Self-employed", label: "Self-Employed", desc: "Own repair unit, trade, freelance" },
                { id: "Apprenticeship", label: "Apprenticeship", desc: "Formal NAPS / NATS / MMYY contract" },
                { id: "Seeking", label: "Seeking Employment", desc: "Looking for job openings" },
                { id: "Studying", label: "Further Studies", desc: "Degree / Advanced Diploma" }
              ].map((opt) => (
                <button
                  type="button"
                  key={opt.id}
                  onClick={() => setStatus(opt.id)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    status === opt.id
                      ? "bg-cyan-50 border-cyan-500 text-cyan-900 shadow-xs ring-1 ring-cyan-400"
                      : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <div className="font-bold text-xs">{opt.label}</div>
                  <div className="text-[10px] text-slate-500">{opt.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Contextual Info Panel: explains meaning, what happens next, and suggested proof */}
          {currentInfo && (
            <div className="p-3.5 rounded-xl bg-gradient-to-r from-slate-50 to-cyan-50/40 border border-cyan-200/80 space-y-2 text-xs animate-fade-in">
              <div className="flex items-center gap-1.5 font-bold text-cyan-950">
                <Info className="w-4 h-4 text-cyan-600 shrink-0" />
                <span>{currentInfo.title[language] || currentInfo.title.en}</span>
              </div>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                {currentInfo.meaning[language] || currentInfo.meaning.en}
              </p>
              <div className="pt-1 border-t border-cyan-200/40 space-y-1">
                <div className="text-[11px] text-cyan-900 font-semibold flex items-start gap-1">
                  <ArrowRight className="w-3.5 h-3.5 shrink-0 text-cyan-600 mt-0.5" />
                  <span>
                    <span className="font-bold">What happens next:</span>{" "}
                    {currentInfo.whatHappensNext[language] || currentInfo.whatHappensNext.en}
                  </span>
                </div>
                <div className="text-[10px] text-slate-500 pl-4">
                  💡 {currentInfo.suggestedProof[language] || currentInfo.suggestedProof.en}
                </div>
              </div>
            </div>
          )}

          {status !== "Seeking" && status !== "Studying" && (
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Company / Organization / Business Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tata AutoComp Systems Ltd"
                  value={employerName}
                  onChange={(e) => setEmployerName(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Job Title / Role
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Junior Assembly Operator"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Monthly In-Hand Salary (₹)
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 16500"
                    value={wage}
                    onChange={(e) => setWage(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Is this work related to your skilling course?
                </label>
                <select
                  value={isCourseRelated}
                  onChange={(e) => setIsCourseRelated(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:outline-hidden"
                >
                  <option value="Directly Related">Directly Related</option>
                  <option value="Somewhat Related">Somewhat Related</option>
                  <option value="Not Related">Not Related</option>
                </select>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 cursor-pointer"
            >
              {t("cancel")}
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-cyan-700 hover:bg-cyan-800 shadow-xs transition-all cursor-pointer"
            >
              {t("save")}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};
