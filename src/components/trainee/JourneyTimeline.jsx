import React from "react";
import { CheckCircle2, Award, Briefcase, BookOpen, Calendar, ShieldCheck } from "lucide-react";
import { useRole } from "../../context/RoleContext";
import { useLanguage } from "../../context/LanguageContext";

export const JourneyTimeline = () => {
  const { activeTrainee } = useRole();
  const { t } = useLanguage();

  const getStepIcon = (index) => {
    switch (index) {
      case 0:
        return BookOpen;
      case 1:
        return Calendar;
      case 2:
        return Award;
      case 3:
        return ShieldCheck;
      case 4:
        return Briefcase;
      default:
        return CheckCircle2;
    }
  };

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-5">
      <div>
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-cyan-50 text-cyan-700">
            <Award className="w-4 h-4" />
          </span>
          <h2 className="text-base sm:text-lg font-bold font-display text-slate-900">
            {t("traineeJourneyTitle")}
          </h2>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          {activeTrainee.course} ({activeTrainee.nsqfLevel}) • {activeTrainee.providerName}
        </p>
      </div>

      {/* Stepper Timeline */}
      <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
        {activeTrainee.journey.map((step, idx) => {
          const isCompleted = step.status === "completed";
          const isCurrent = step.status === "current";
          const StepIcon = getStepIcon(idx);

          return (
            <div key={step.id} className="relative group">
              {/* Marker Icon */}
              <div
                className={`absolute -left-6 sm:-left-8 top-0.5 w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 flex items-center justify-center transition-all ${
                  isCompleted
                    ? "bg-emerald-600 border-emerald-600 text-white shadow-xs"
                    : isCurrent
                    ? "bg-cyan-600 border-cyan-600 text-white animate-pulse"
                    : "bg-white border-slate-300 text-slate-400"
                }`}
              >
                <StepIcon className="w-3.5 h-3.5" />
              </div>

              {/* Card */}
              <div
                className={`p-3.5 sm:p-4 rounded-xl border transition-colors ${
                  isCurrent
                    ? "bg-cyan-50/50 border-cyan-300"
                    : "bg-slate-50/70 border-slate-200/80 group-hover:border-slate-300"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div className="font-bold text-slate-900 text-xs sm:text-sm font-display">
                    {step.stage}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-slate-400">{step.date}</span>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        isCompleted
                          ? "bg-emerald-100 text-emerald-800"
                          : isCurrent
                          ? "bg-cyan-100 text-cyan-800"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {step.badge}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{step.details}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
