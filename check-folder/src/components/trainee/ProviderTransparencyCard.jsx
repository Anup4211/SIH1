import React from "react";
import { Star, Building, CheckCircle2, ThumbsUp } from "lucide-react";
import { useRole } from "../../context/RoleContext";
import { useLanguage } from "../../context/LanguageContext";

export const ProviderTransparencyCard = () => {
  const { activeTrainee } = useRole();
  const { t } = useLanguage();

  const data = activeTrainee.providerTransparency;

  if (!data) return null;

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-50 text-amber-700">
              <Star className="w-4 h-4" />
            </span>
            <h2 className="text-base sm:text-lg font-bold font-display text-slate-900">
              {t("providerFeedbackTitle")}
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            {t("providerFeedbackSubtitle")}
          </p>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 text-amber-900 border border-amber-200 self-start sm:self-auto">
          <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
          <span className="font-bold text-sm font-display">{data.overallRating}</span>
          <span className="text-xs text-amber-700">/ 5.0 Rating</span>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
          <Building className="w-3.5 h-3.5 text-cyan-600" />
          <span>{data.providerName}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-200/60">
          <div className="bg-white p-3 rounded-xl border border-slate-200/80">
            <div className="text-[11px] text-slate-500">Practical Lab Equipment</div>
            <div className="flex items-center gap-1 mt-1">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span className="font-bold text-slate-900 font-display text-sm">{data.practicalLabScore} / 5</span>
            </div>
          </div>

          <div className="bg-white p-3 rounded-xl border border-slate-200/80">
            <div className="text-[11px] text-slate-500">Trainer Teaching Quality</div>
            <div className="flex items-center gap-1 mt-1">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span className="font-bold text-slate-900 font-display text-sm">{data.trainerInstructionScore} / 5</span>
            </div>
          </div>

          <div className="bg-white p-3 rounded-xl border border-slate-200/80">
            <div className="text-[11px] text-slate-500">Placement Assistance</div>
            <div className="flex items-center gap-1 mt-1">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span className="font-bold text-slate-900 font-display text-sm">{data.placementAssistanceScore} / 5</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
          <div className="flex items-center gap-2 text-xs text-slate-700 bg-white p-2.5 rounded-xl border border-slate-200/80">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              <span className="font-bold text-slate-900">{data.workplaceRelevancePct}%</span> trainees say skills were directly usable in their job.
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-700 bg-white p-2.5 rounded-xl border border-slate-200/80">
            <ThumbsUp className="w-4 h-4 text-cyan-600 shrink-0" />
            <span>
              <span className="font-bold text-slate-900">{data.recommendToFriendPct}%</span> would recommend this center to peers.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
