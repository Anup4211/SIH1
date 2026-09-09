import React, { useState } from "react";
import { CheckCircle2, Star, ArrowRight, ArrowLeft, Send, Sparkles, Info, ShieldCheck } from "lucide-react";
import { STATUS_INFO_MAP } from "../../data/statusInfo";
import { useRole } from "../../context/RoleContext";
import { useLanguage } from "../../context/LanguageContext";

export const QuickCheckInSurvey = () => {
  const { activeTrainee, updateTraineeStatus, showToast } = useRole();
  const { language, t } = useLanguage();
  const [step, setStep] = useState(1);
  const [isCompleted, setIsCompleted] = useState(false);

  // Form states
  const [selectedStatus, setSelectedStatus] = useState(
    activeTrainee.employmentStatus === "Self-employed" ? "Self-employed" : "Employed"
  );
  const [incomeRange, setIncomeRange] = useState("₹15,000 - ₹20,000");
  const [jobTitle, setJobTitle] = useState(activeTrainee.jobTitle || "");
  const [courseRelevance, setCourseRelevance] = useState("Directly Related");
  const [unemployedReason, setUnemployedReason] = useState("Wage offered was below local living expenses");
  const [starRating, setStarRating] = useState(5);
  const [feedbackNote, setFeedbackNote] = useState("");

  const isWorking = selectedStatus === "Employed" || selectedStatus === "Self-employed" || selectedStatus === "Apprenticeship";

  const handleNext = () => {
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setStep((prev) => Math.max(1, prev - 1));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsCompleted(true);

    const wageEst =
      incomeRange === "Under ₹10,000"
        ? 9500
        : incomeRange === "₹10,000 - ₹15,000"
        ? 13500
        : incomeRange === "₹15,000 - ₹20,000"
        ? 17500
        : 23000;

    updateTraineeStatus({
      employmentStatus: selectedStatus,
      jobTitle: isWorking ? jobTitle || "Technician" : null,
      currentMonthlyWage: isWorking ? wageEst : 0,
      isCourseRelated: isWorking ? courseRelevance : null,
      trainingRelevanceRating: starRating
    });

    showToast("Periodic 60-Second Check-in submitted to Kaushal Setu.", "success");
  };

  const resetSurvey = () => {
    setStep(1);
    setIsCompleted(false);
  };

  const currentInfo = STATUS_INFO_MAP[selectedStatus] || STATUS_INFO_MAP.Employed;

  if (isCompleted) {
    return (
      <div className="bg-gradient-to-br from-emerald-50 to-cyan-50 rounded-2xl p-6 border border-emerald-200 text-center space-y-3 shadow-xs">
        <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-sm">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-slate-900 font-display">
          Check-in Recorded Successfully!
        </h3>
        <p className="text-xs text-slate-600 max-w-md mx-auto">
          Your feedback directly updates your state profile and helps MSInS ensure training centers deliver real industry-aligned careers.
        </p>
        <div className="pt-2">
          <button
            onClick={resetSurvey}
            className="text-xs text-cyan-700 hover:text-cyan-900 font-semibold underline cursor-pointer"
          >
            Review or update survey responses
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-4">
      {/* Top Banner */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <h2 className="text-base font-bold font-display text-slate-900">
              {t("quickCheckInTitle")}
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            {t("quickCheckInSubtitle")}
          </p>
        </div>

        {/* Progress Pill */}
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
          Step {step} of 3
        </span>
      </div>

      {/* Stepper Bar */}
      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
        <div
          className="bg-cyan-600 h-full rounded-full transition-all duration-300"
          style={{ width: `${(step / 3) * 100}%` }}
        />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 pt-1">
        {/* Step 1: Work Status with Contextual Info Panel */}
        {step === 1 && (
          <div className="space-y-3 animate-fade-in">
            <label className="block text-xs font-bold text-slate-800">
              1. What is your current work status?
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                { id: "Employed", label: "Employed", desc: "Regular wage job" },
                { id: "Self-employed", label: "Self-Employed", desc: "Own trade/service" },
                { id: "Apprenticeship", label: "Apprentice", desc: "NAPS/MMYY contract" },
                { id: "Seeking", label: "Seeking Job", desc: "Looking for placement" },
                { id: "Studying", label: "Further Studies", desc: "College/Exams" }
              ].map((opt) => (
                <button
                  type="button"
                  key={opt.id}
                  onClick={() => setSelectedStatus(opt.id)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    selectedStatus === opt.id
                      ? "bg-cyan-50 border-cyan-500 text-cyan-900 ring-2 ring-cyan-500/20 shadow-xs"
                      : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <div className="text-xs font-bold">{opt.label}</div>
                  <div className="text-[10px] text-slate-500">{opt.desc}</div>
                </button>
              ))}
            </div>

            {/* Contextual Info Panel for Selected Status */}
            {currentInfo && (
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-slate-900">
                  <Info className="w-4 h-4 text-cyan-600 shrink-0" />
                  <span>{currentInfo.title[language] || currentInfo.title.en}</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  {currentInfo.meaning[language] || currentInfo.meaning.en}
                </p>
                <div className="pt-1 border-t border-slate-200 text-[11px] text-cyan-900 font-semibold flex items-start gap-1">
                  <ArrowRight className="w-3.5 h-3.5 shrink-0 text-cyan-600 mt-0.5" />
                  <span>
                    <span className="font-bold">What happens next:</span>{" "}
                    {currentInfo.whatHappensNext[language] || currentInfo.whatHappensNext.en}
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 2: Conditional on Employment */}
        {step === 2 && (
          <div className="space-y-3 animate-fade-in">
            {isWorking ? (
              <>
                <label className="block text-xs font-bold text-slate-800">
                  2. What is your monthly income range and is the job related to your course?
                </label>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Monthly In-hand Salary Band:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {["Under ₹10,000", "₹10,000 - ₹15,000", "₹15,000 - ₹20,000", "Above ₹20,000"].map((range) => (
                      <button
                        type="button"
                        key={range}
                        onClick={() => setIncomeRange(range)}
                        className={`p-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                          incomeRange === range
                            ? "bg-cyan-50 border-cyan-500 text-cyan-900 shadow-2xs"
                            : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        {range}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Is this job related to your training?
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: "Directly Related", label: "Directly" },
                      { id: "Somewhat Related", label: "Somewhat" },
                      { id: "Not Related", label: "Different Sector" }
                    ].map((rel) => (
                      <button
                        type="button"
                        key={rel.id}
                        onClick={() => setCourseRelevance(rel.id)}
                        className={`p-2 rounded-xl border text-center text-xs font-medium transition-all cursor-pointer ${
                          courseRelevance === rel.id
                            ? "bg-cyan-50 border-cyan-500 text-cyan-900 font-bold"
                            : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                        }`}
                      >
                        {rel.label}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <>
                <label className="block text-xs font-bold text-slate-800">
                  2. What is the primary reason for not currently working in a job?
                </label>

                <div className="space-y-2">
                  {[
                    "Wage offered was below local living expenses",
                    "Workplace was too far / no safe accommodation available",
                    "Family or caregiving responsibilities",
                    "Preparing for competitive exams (MPSC/Police/Banking)",
                    "Need more practical machinery / tool hands-on training"
                  ].map((r) => (
                    <button
                      type="button"
                      key={r}
                      onClick={() => setUnemployedReason(r)}
                      className={`w-full p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                        unemployedReason === r
                          ? "bg-amber-50 border-amber-500 text-amber-900 font-semibold"
                          : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* Step 3: Training Feedback */}
        {step === 3 && (
          <div className="space-y-4 animate-fade-in">
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-2">
                3. Rate the practical usefulness of your training institute (1 to 5 Stars)
              </label>

              <div className="flex items-center gap-2 justify-center py-2 bg-slate-50 rounded-xl border border-slate-200">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setStarRating(star)}
                    className="p-2 transition-transform hover:scale-125 focus:outline-hidden cursor-pointer"
                  >
                    <Star
                      className={`w-7 h-7 ${
                        star <= starRating
                          ? "text-amber-400 fill-amber-400"
                          : "text-slate-300 fill-transparent"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Any recommendation or skill you wish was taught? (Optional feedback)
              </label>
              <input
                type="text"
                placeholder="e.g. More practical hands-on time with real machinery..."
                value={feedbackNote}
                onChange={(e) => setFeedbackNote(e.target.value)}
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:outline-hidden"
              />
            </div>
          </div>
        )}

        {/* Action Controls */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          {step > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{t("back")}</span>
            </button>
          ) : (
            <div />
          )}

          {step < 3 ? (
            <button
              type="button"
              onClick={handleNext}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-cyan-700 text-white rounded-xl hover:bg-cyan-800 shadow-xs cursor-pointer"
            >
              <span>{t("next")}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-2 text-xs font-semibold bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 shadow-xs cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{t("submit")}</span>
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
