import React, { useState } from "react";
import { Compass, Calendar, Building, Sparkles, CheckCircle2, HelpCircle, Check, X, Award, RotateCcw } from "lucide-react";
import { RECOMMENDATIONS } from "../../data/recommendations";
import { useRole } from "../../context/RoleContext";
import { useLanguage } from "../../context/LanguageContext";

const SKILL_QUIZ_QUESTIONS = [
  {
    id: "q1",
    question: "When performing high-voltage safety de-energization on an Electric Vehicle (EV), which tool must be verified first?",
    options: [
      "CAT-III 1000V Insulated Multimeter with Proving Unit",
      "Standard 12V automotive test light",
      "Pneumatic impact wrench",
      "Digital infrared thermometer"
    ],
    correctIndex: 0,
    explanation: "High-voltage diagnostics require CAT-III/IV rated 1000V insulated meters cross-verified against an active proving unit before touching terminal contacts."
  },
  {
    id: "q2",
    question: "In CNC G-code programming, what is the primary function of command 'G00'?",
    options: [
      "Linear feedrate interpolation cutting motion",
      "Rapid non-cutting positioning traverse",
      "Circular clockwise radius arc",
      "Spindle coolant activation"
    ],
    correctIndex: 1,
    explanation: "G00 commands the cutting head to travel at maximum machine rapid traverse speed without material engagement."
  },
  {
    id: "q3",
    question: "What is the primary indicator of shop-floor 5S methodology compliance during post-training placement audit?",
    options: [
      "Unmarked storage bins with mixed components",
      "Color-coded visual shadow boards and standardized floor markings",
      "Verbal instructions without documented SOPs",
      "Random tool placement after shift completion"
    ],
    correctIndex: 1,
    explanation: "Standardized visual management, shadow tool boards, and yellow demarcations represent Seiton (Set in Order) and Seiketsu (Standardize)."
  }
];

export const RecommendedSteps = () => {
  const { activeTrainee, showToast } = useRole();
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("bridge"); // "bridge" | "jobFairs" | "apprenticeships" | "skillChallenge"
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [registeredFairs, setRegisteredFairs] = useState([]);

  // Quiz State
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const handleEnrollBridge = (course) => {
    setEnrolledCourses((prev) => [...prev, course.id]);
    showToast(`Registered for Bridge Course: ${course.title}`, "success");
  };

  const handleRegisterFair = (fair) => {
    setRegisteredFairs((prev) => [...prev, fair.id]);
    showToast(`Pass Generated for ${fair.title}! Sent to your WhatsApp.`, "success");
  };

  const handleSelectAnswer = (qId, optionIdx) => {
    if (quizSubmitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
  };

  const handleSubmitQuiz = () => {
    if (Object.keys(selectedAnswers).length < SKILL_QUIZ_QUESTIONS.length) {
      showToast("Please answer all diagnostic questions to complete evaluation.", "warning");
      return;
    }
    setQuizSubmitted(true);
    const score = SKILL_QUIZ_QUESTIONS.reduce((acc, q) => {
      return selectedAnswers[q.id] === q.correctIndex ? acc + 1 : acc;
    }, 0);
    showToast(`Assessment Complete! Score: ${score}/${SKILL_QUIZ_QUESTIONS.length} (${Math.round((score/3)*100)}%)`, "success");
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setQuizSubmitted(false);
  };

  return (
    <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-3xl p-5 sm:p-6 border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-5 transition-colors duration-300">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200/50 dark:border-amber-800/50 shadow-2xs">
              <Compass className="w-4 h-4" />
            </span>
            <h2 className="text-base sm:text-lg font-bold font-display text-slate-900 dark:text-white">
              {t("recommendedStepsTitle")}
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {t("recommendedStepsSubtitle")}: <span className="font-semibold text-slate-700 dark:text-slate-200">{activeTrainee.course}</span>
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex items-center flex-wrap gap-1 bg-slate-100/90 dark:bg-slate-800/90 p-1 rounded-2xl text-xs font-bold self-start lg:self-auto border border-slate-200/60 dark:border-slate-700/60">
          <button
            onClick={() => setActiveCategory("bridge")}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer btn-interactive ${
              activeCategory === "bridge"
                ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            Bridge Courses ({RECOMMENDATIONS.bridgeCourses.length})
          </button>
          <button
            onClick={() => setActiveCategory("jobFairs")}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer btn-interactive ${
              activeCategory === "jobFairs"
                ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            Job Melas ({RECOMMENDATIONS.jobFairs.length})
          </button>
          <button
            onClick={() => setActiveCategory("apprenticeships")}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer btn-interactive ${
              activeCategory === "apprenticeships"
                ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            Apprenticeships ({RECOMMENDATIONS.apprenticeshipOpenings.length})
          </button>
          <button
            onClick={() => setActiveCategory("skillChallenge")}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer btn-interactive flex items-center gap-1.5 ${
              activeCategory === "skillChallenge"
                ? "bg-gradient-to-r from-cyan-600 to-teal-600 text-white shadow-xs"
                : "text-cyan-700 dark:text-cyan-400 hover:bg-cyan-100/50 dark:hover:bg-slate-700"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Skill Challenge</span>
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
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/90 dark:border-slate-800 flex flex-col justify-between space-y-3 hover:border-cyan-400 dark:hover:border-cyan-600 transition-all interactive-card"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-cyan-100 dark:bg-cyan-950/70 text-cyan-800 dark:text-cyan-300">
                      {course.duration}
                    </span>
                    <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      <span>{course.matchScore}% Skill Match</span>
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 dark:text-white font-display line-clamp-1">
                    {course.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {course.description}
                  </p>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    Provider: <span className="font-semibold text-slate-700 dark:text-slate-200">{course.provider}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 font-medium">
                    {course.stipendEligible ? "✓ Stipend Eligible" : "Free Govt Course"}
                  </span>
                  {isEnrolled ? (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Enrolled</span>
                    </span>
                  ) : (
                    <button
                      onClick={() => handleEnrollBridge(course)}
                      className="px-3.5 py-1.5 rounded-xl bg-cyan-700 hover:bg-cyan-800 text-white text-xs font-bold shadow-2xs transition-all cursor-pointer btn-interactive"
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
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/90 dark:border-slate-800 flex flex-col justify-between space-y-3 hover:border-amber-400 dark:hover:border-amber-600 transition-all interactive-card"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300">
                      {fair.openingsCount}+ Vacancies
                    </span>
                    <span className="text-xs font-semibold text-slate-600 dark:text-slate-300 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                      <span>{fair.date}</span>
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 dark:text-white font-display">
                    {fair.title}
                  </h3>
                  <div className="text-xs text-slate-600 dark:text-slate-400 flex items-start gap-1">
                    <Building className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                    <span>Venue: {fair.venue}</span>
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    Salary Range: <span className="font-semibold text-slate-800 dark:text-slate-200">{fair.expectedSalaryRange}</span> • {fair.registeredEmployers} Employers
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-bold">Free Entry for MSInS Trainees</span>
                  {isReg ? (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Pass Generated</span>
                    </span>
                  ) : (
                    <button
                      onClick={() => handleRegisterFair(fair)}
                      className="px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-2xs transition-all cursor-pointer btn-interactive"
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
              className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/90 dark:border-slate-800 flex flex-col justify-between space-y-3 interactive-card"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950/70 text-purple-800 dark:text-purple-300">
                    {app.scheme}
                  </span>
                  <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 font-display">
                    {app.stipend}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 dark:text-white font-display">{app.role}</h3>
                <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">{app.company}</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">Location: {app.location} • Duration: {app.duration}</div>
              </div>

              <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-400">Apply by {app.deadline}</span>
                <button
                  onClick={() => showToast(`Application initiated for ${app.company}!`, "success")}
                  className="px-3.5 py-1.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold shadow-2xs transition-all cursor-pointer btn-interactive"
                >
                  Apply Online
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Interactive Skill Assessment & Quiz Challenge */}
      {activeCategory === "skillChallenge" && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-900 via-slate-900 to-indigo-950 text-white flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-300">Shop-Floor Readiness Challenge</span>
              </div>
              <p className="text-xs text-slate-300 max-w-md">
                Test your practical problem-solving knowledge. Complete this 3-question diagnostic to boost your verified employer match score.
              </p>
            </div>
            {quizSubmitted && (
              <button
                onClick={handleResetQuiz}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-all cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake</span>
              </button>
            )}
          </div>

          <div className="space-y-4">
            {SKILL_QUIZ_QUESTIONS.map((q, qIndex) => {
              const selectedOpt = selectedAnswers[q.id];
              const isAnswered = selectedOpt !== undefined;
              const isCorrect = isAnswered && selectedOpt === q.correctIndex;

              return (
                <div
                  key={q.id}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/90 dark:border-slate-800 space-y-3"
                >
                  <div className="flex items-start gap-2.5">
                    <span className="w-6 h-6 rounded-lg bg-cyan-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {qIndex + 1}
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-sans leading-snug">
                      {q.question}
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-8">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = selectedOpt === optIdx;
                      let btnStyle = "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800";

                      if (isSelected) {
                        btnStyle = "bg-cyan-50 dark:bg-cyan-950/80 border-cyan-500 text-cyan-900 dark:text-cyan-200 font-bold ring-2 ring-cyan-500/20";
                      }
                      if (quizSubmitted) {
                        if (optIdx === q.correctIndex) {
                          btnStyle = "bg-emerald-50 dark:bg-emerald-950/80 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-bold";
                        } else if (isSelected && !isCorrect) {
                          btnStyle = "bg-rose-50 dark:bg-rose-950/80 border-rose-500 text-rose-900 dark:text-rose-200";
                        }
                      }

                      return (
                        <button
                          key={optIdx}
                          type="button"
                          disabled={quizSubmitted}
                          onClick={() => handleSelectAnswer(q.id, optIdx)}
                          className={`p-3 rounded-xl border text-left text-xs transition-all cursor-pointer flex items-center justify-between ${btnStyle}`}
                        >
                          <span>{opt}</span>
                          {quizSubmitted && optIdx === q.correctIndex && (
                            <Check className="w-4 h-4 text-emerald-600 shrink-0 ml-2" />
                          )}
                          {quizSubmitted && isSelected && !isCorrect && (
                            <X className="w-4 h-4 text-rose-600 shrink-0 ml-2" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {quizSubmitted && (
                    <div className="pl-8 pt-1 text-[11px] text-slate-600 dark:text-slate-400 bg-slate-100/70 dark:bg-slate-900/60 p-2.5 rounded-xl border border-slate-200/50 dark:border-slate-800">
                      <span className="font-bold text-slate-800 dark:text-slate-200">Explanation: </span>
                      {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {!quizSubmitted ? (
            <button
              onClick={handleSubmitQuiz}
              className="w-full py-3 bg-gradient-to-r from-cyan-700 to-teal-700 hover:from-cyan-800 hover:to-teal-800 text-white text-xs font-bold rounded-2xl shadow-md hover:shadow-lg transition-all cursor-pointer btn-interactive"
            >
              Submit Diagnostic & Unlock Micro-Badge
            </button>
          ) : (
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <div className="text-xs">
                  <div className="font-bold text-emerald-900 dark:text-emerald-200">Competency Verification Synced</div>
                  <div className="text-emerald-700 dark:text-emerald-400 text-[11px]">Skill index updated on your DigiLocker candidate registry.</div>
                </div>
              </div>
              <span className="text-xs font-mono font-bold px-3 py-1 bg-emerald-200/60 dark:bg-emerald-900 text-emerald-900 dark:text-emerald-100 rounded-full">
                MSInS Verified
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
