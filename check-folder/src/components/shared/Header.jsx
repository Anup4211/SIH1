import React from "react";
import { Shield, Building2, User, Languages, Check } from "lucide-react";
import { useRole } from "../../context/RoleContext";
import { useLanguage } from "../../context/LanguageContext";

export const Header = () => {
  const { role, setRole, activeTraineeId, setActiveTraineeId, traineeList } = useRole();
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <header className="bg-gradient-to-r from-slate-950 via-slate-900 to-cyan-950 text-white border-b border-slate-800/80 sticky top-0 z-40 shadow-md">
      {/* Top micro-bar for official gazette feel */}
      <div className="bg-black/40 text-[11px] px-4 py-1 flex items-center justify-between border-b border-white/5 text-slate-400 font-mono">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>MAHARASHTRA STATE SKILL OUTCOME MONITORING NETWORK (MSInS • MSSDS)</span>
        </div>
        <div className="hidden sm:flex items-center gap-4">
          <span>{t("systemStatus")}</span>
          <span>DEDICATED HELPLINE: 1800-120-8040</span>
        </div>
      </div>

      {/* Main Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo & Department Brand */}
        <div className="flex items-center gap-3.5 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-3">
            {/* Emblem / Seal Chip */}
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500/20 via-cyan-500/20 to-emerald-500/20 border border-cyan-500/30 flex items-center justify-center p-1.5 shadow-inner">
              <Shield className="w-6 h-6 text-cyan-400" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg sm:text-xl font-extrabold tracking-tight font-display bg-gradient-to-r from-white via-slate-100 to-cyan-200 bg-clip-text text-transparent">
                  {t("appTitle")}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-semibold tracking-wide">
                  Skill Bridge
                </span>
              </div>
              <p className="text-[11px] text-slate-300 tracking-tight line-clamp-1">
                {t("deptTitle")}
              </p>
            </div>
          </div>
        </div>

        {/* Action Controls: Language Toggle & Persona Switchers */}
        <div className="flex items-center flex-wrap gap-2.5 w-full md:w-auto justify-end">
          {/* Language Toggle Button (English ⇄ Hindi) */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-850 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold transition-all shadow-inner"
            title="Toggle Interface Language (English / Hindi)"
          >
            <Languages className="w-3.5 h-3.5 text-cyan-400" />
            <span>{language === "en" ? "English" : "हिन्दी"}</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-cyan-900/60 text-cyan-300 border border-cyan-700">
              {language === "en" ? "HI" : "EN"}
            </span>
          </button>

          {/* Persona Switch Buttons */}
          <div className="bg-slate-900/90 p-1 rounded-xl border border-slate-700/80 flex items-center shadow-inner">
            <button
              onClick={() => setRole("government")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                role === "government"
                  ? "bg-gradient-to-r from-cyan-600 to-teal-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>{t("roleGov")}</span>
              {role === "government" && (
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              )}
            </button>

            <button
              onClick={() => setRole("trainee")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                role === "trainee"
                  ? "bg-gradient-to-r from-amber-600 to-rose-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>{t("roleTrainee")}</span>
              {role === "trainee" && (
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              )}
            </button>
          </div>

          {/* If Trainee role is active, allow switching between personas */}
          {role === "trainee" && (
            <div className="flex items-center gap-1.5 bg-amber-950/40 border border-amber-500/30 px-3 py-1 rounded-xl text-xs">
              <span className="text-amber-300 font-medium text-[11px] hidden sm:inline">
                {t("activeTraineeLabel")}
              </span>
              <select
                value={activeTraineeId}
                onChange={(e) => setActiveTraineeId(e.target.value)}
                className="bg-transparent text-white font-semibold text-xs focus:outline-hidden cursor-pointer"
              >
                {traineeList.map((t) => (
                  <option key={t.id} value={t.id} className="bg-slate-900 text-white">
                    {t.name} ({t.employmentStatus})
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Status pill for Government */}
          {role === "government" && (
            <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-xs text-cyan-200">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>{t("officerBadge")}</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
