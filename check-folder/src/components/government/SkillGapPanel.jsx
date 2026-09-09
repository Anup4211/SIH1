import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Line,
  ComposedChart,
  Legend
} from "recharts";
import { AlertCircle, Tag, MessageSquare, Lightbulb, Zap, PlusCircle, CheckCircle } from "lucide-react";
import { NON_PLACEMENT_REASONS, EMERGING_SKILL_GAPS } from "../../data/skillGaps";
import { useRole } from "../../context/RoleContext";
import { useLanguage } from "../../context/LanguageContext";

export const SkillGapPanel = () => {
  const { openCreateCourseWithPreFill, courses } = useRole();
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-rose-50 text-rose-700">
                <AlertCircle className="w-4 h-4" />
              </span>
              <h2 className="text-lg font-bold font-display text-slate-900">
                {t("skillGapTitle")}
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {t("skillGapSubtitle")}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-cyan-50 text-cyan-800 border border-cyan-200">
              {courses.length} Active Courses Sanctioned
            </span>
          </div>
        </div>
      </div>

      {/* Pareto Chart Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-bold text-slate-900 font-display">
              {t("paretoTitle")}
            </h3>
            <p className="text-xs text-slate-500">
              {t("paretoSubtitle")}
            </p>
          </div>
          <div className="text-xs px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 font-semibold self-start sm:self-auto">
            Sample: 86,010 Surveyed Candidates
          </div>
        </div>

        {/* Pareto Chart */}
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={NON_PLACEMENT_REASONS}
              margin={{ top: 20, right: 30, left: 10, bottom: 40 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis
                dataKey="reason"
                tick={{ fontSize: 10, fill: "#64748b" }}
                angle={-20}
                textAnchor="end"
                interval={0}
              />
              <YAxis yAxisId="left" unit="%" domain={[0, 40]} tick={{ fontSize: 11, fill: "#64748b" }} />
              <YAxis
                yAxisId="right"
                orientation="right"
                unit="%"
                domain={[0, 100]}
                tick={{ fontSize: 11, fill: "#64748b" }}
              />
              <Tooltip
                formatter={(val, name) => [
                  `${val}%`,
                  name === "percentage" ? "Share of Responses" : "Cumulative Attrition Share"
                ]}
              />
              <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "15px" }} />
              <Bar
                yAxisId="left"
                dataKey="percentage"
                name="Trainee Response Share (%)"
                fill="#0891b2"
                radius={[4, 4, 0, 0]}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="cumulative"
                name="Cumulative Pareto (%)"
                stroke="#f43f5e"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Reason breakdown cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-4 border-t border-slate-100">
          {NON_PLACEMENT_REASONS.map((item) => (
            <div key={item.rank} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-200 text-slate-700">
                  Rank #{item.rank} • {item.category}
                </span>
                <span className="text-xs font-bold text-slate-900 font-display">{item.percentage}%</span>
              </div>
              <div className="text-xs font-semibold text-slate-800">{item.reason}</div>
              <p className="text-[11px] text-slate-600 italic bg-white p-2 rounded-lg border border-slate-100">
                "{item.insight}"
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Emerging Skill-Gap Tags from Employer Feedback with Course Launch Loop */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-cyan-600" />
              <h3 className="text-sm font-bold text-slate-900 font-display">
                {t("employerTagsTitle")}
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {t("employerTagsSubtitle")}
            </p>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-cyan-50 text-cyan-800 border border-cyan-200 font-semibold self-start sm:self-auto">
            Direct Curriculum Action Loop
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {EMERGING_SKILL_GAPS.map((gap) => {
            const hasExistingCourse = courses.some(
              (c) => c.addressedSkillGap === gap.tag || c.name.toLowerCase().includes(gap.tag.toLowerCase())
            );

            return (
              <div
                key={gap.tag}
                className="p-4 rounded-xl bg-gradient-to-br from-slate-50 to-white border border-slate-200 space-y-2.5 hover:border-cyan-300 transition-colors flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-cyan-900 px-2.5 py-1 rounded-lg bg-cyan-100 border border-cyan-200">
                      {gap.sector}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-amber-600 font-semibold">
                      <Zap className="w-3.5 h-3.5" />
                      <span>Industry Urgency: {gap.demandIndex}/100</span>
                    </div>
                  </div>

                  <div className="font-bold text-slate-900 text-sm font-display">{gap.tag}</div>

                  <div className="p-2.5 rounded-lg bg-slate-100 text-xs text-slate-700 italic border-l-3 border-cyan-600">
                    <MessageSquare className="w-3.5 h-3.5 inline mr-1 text-cyan-600" />
                    "{gap.employerQuotes}"
                  </div>

                  <div className="flex items-start gap-1.5 text-xs text-emerald-800 bg-emerald-50/70 p-2 rounded-lg border border-emerald-200">
                    <Lightbulb className="w-3.5 h-3.5 shrink-0 mt-0.5 text-emerald-600" />
                    <span>
                      <span className="font-semibold">Recommended Intervention:</span> {gap.suggestedIntervention}
                    </span>
                  </div>
                </div>

                {/* Direct Action Loop: Launch Targeted Course to address this exact gap */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  {hasExistingCourse ? (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700">
                      <CheckCircle className="w-4 h-4" />
                      <span>Curriculum Active in MIS</span>
                    </span>
                  ) : (
                    <span className="text-[11px] text-amber-700 font-medium">Unaddressed Gap Detected</span>
                  )}

                  <button
                    type="button"
                    onClick={() => openCreateCourseWithPreFill(gap)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-700 hover:bg-cyan-800 text-white text-xs font-semibold shadow-2xs transition-all cursor-pointer"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>{t("btnLaunchCourse")}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
