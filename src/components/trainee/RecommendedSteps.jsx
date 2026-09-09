import React, { useState } from "react";
import { Compass, Calendar, Building, Sparkles, CheckCircle2 } from "lucide-react";
import { RECOMMENDATIONS } from "../../data/recommendations";
import { useRole } from "../../context/RoleContext";
import { useLanguage } from "../../context/LanguageContext";

export const RecommendedSteps = () => {
  const { activeTrainee, showToast } = useRole();
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("bridge"); // "bridge" | "jobFairs" | "apprenticeships"
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [registeredFairs, setRegisteredFairs] = useState([]);

  const handleEnrollBridge = (course) => {
    setEnrolledCourses((prev) => [...prev, course.id]);
    showToast(`Registered for Bridge Course: ${course.title}`, "success");
  };

  const handleRegisterFair = (fair) => {
    setRegisteredFairs((prev) => [...prev, fair.id]);
    showToast(`Pass Generated for ${fair.title}! Sent to your WhatsApp.`, "success");
  };

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-50 text-amber-700">
              <Compass className="w-4 h-4" />
            </span>
            <h2 className="text-base sm:text-lg font-bold font-display text-slate-900">
              {t("recommendedStepsTitle")}
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            {t("recommendedStepsSubtitle")}: <span className="font-semibold text-slate-700">{activeTrainee.course}</span>
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold self-start sm:self-auto">
          <button
            onClick={() => setActiveCategory("bridge")}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeCategory === "bridge"
                ? "bg-white text-slate-900 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Bridge Courses ({RECOMMENDATIONS.bridgeCourses.length})
          </button>
          <button
            onClick={() => setActiveCategory("jobFairs")}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeCategory === "jobFairs"
                ? "bg-white text-slate-900 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            District Job Melas ({RECOMMENDATIONS.jobFairs.length})
          </button>
          <button
            onClick={() => setActiveCategory("apprenticeships")}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeCategory === "apprenticeships"
                ? "bg-white text-slate-900 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Apprenticeships ({RECOMMENDATIONS.apprenticeshipOpenings.length})
          </button>
        </div>
      </div>

      {/* Bridge Courses */}
      {activeCategory === "bridge" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {RECOMMENDATIONS.bridgeCourses.map((course) => {
            const isEnrolled = enrolledCourses.includes(course.id);
            return (
              <div
                key={course.id}
                className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 flex flex-col justify-between space-y-3 hover:border-cyan-400 transition-colors"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-cyan-100 text-cyan-800">
                      {course.duration}
                    </span>
                    <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      <span>{course.matchScore}% Skill Match</span>
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 font-display line-clamp-1">
                    {course.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {course.description}
                  </p>
                  <div className="text-[11px] text-slate-500">
                    Provider: <span className="font-semibold text-slate-700">{course.provider}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 font-medium">
                    {course.stipendEligible ? "✓ Stipend Eligible" : "Free Govt Course"}
                  </span>
                  {isEnrolled ? (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Enrolled</span>
                    </span>
                  ) : (
                    <button
                      onClick={() => handleEnrollBridge(course)}
                      className="px-3 py-1.5 rounded-lg bg-cyan-700 hover:bg-cyan-800 text-white text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
                    >
                      Enroll Free
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* District Job Fairs */}
      {activeCategory === "jobFairs" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {RECOMMENDATIONS.jobFairs.map((fair) => {
            const isReg = registeredFairs.includes(fair.id);
            return (
              <div
                key={fair.id}
                className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 flex flex-col justify-between space-y-3 hover:border-amber-400 transition-colors"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-800">
                      {fair.openingsCount}+ Vacancies
                    </span>
                    <span className="text-xs font-semibold text-slate-600 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-cyan-600" />
                      <span>{fair.date}</span>
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 font-display">
                    {fair.title}
                  </h3>
                  <div className="text-xs text-slate-600 flex items-start gap-1">
                    <Building className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                    <span>Venue: {fair.venue}</span>
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Salary Range: <span className="font-semibold text-slate-800">{fair.expectedSalaryRange}</span> • {fair.registeredEmployers} Employers
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between">
                  <span className="text-[10px] text-emerald-700 font-semibold">Free Entry for MSInS Trainees</span>
                  {isReg ? (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Pass Generated</span>
                    </span>
                  ) : (
                    <button
                      onClick={() => handleRegisterFair(fair)}
                      className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
                    >
                      Get Free Pass
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Apprenticeships */}
      {activeCategory === "apprenticeships" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {RECOMMENDATIONS.apprenticeshipOpenings.map((app) => (
            <div
              key={app.id}
              className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 flex flex-col justify-between space-y-3"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-purple-100 text-purple-800">
                    {app.scheme}
                  </span>
                  <span className="text-xs font-bold text-emerald-700 font-display">
                    {app.stipend}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 font-display">{app.role}</h3>
                <div className="text-xs font-semibold text-slate-700">{app.company}</div>
                <div className="text-[11px] text-slate-500">Location: {app.location} • Duration: {app.duration}</div>
              </div>

              <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-400">Apply by {app.deadline}</span>
                <button
                  onClick={() => showToast(`Application initiated for ${app.company}!`, "success")}
                  className="px-3 py-1.5 rounded-lg bg-purple-700 hover:bg-purple-800 text-white text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
                >
                  Apply Online
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
