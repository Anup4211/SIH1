import React from "react";
import { Shield, Building2, User, Languages, Check, LogOut } from "lucide-react";
import { useRole } from "../../context/RoleContext";
import { useLanguage } from "../../context/LanguageContext";

export const Header = ({ onLogout }) => {
  const { role, setRole, activeTraineeId, setActiveTraineeId, traineeList } = useRole();
  const { language, setLanguage, t } = useLanguage();

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
                    {/* Language Selector (English / Hindi / Marathi) */}
          <div className="flex items-center bg-slate-900/90 p-0.5 rounded-xl border border-slate-700/80 shadow-inner">
            <button
              onClick={() => setLanguage("en")}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                language === "en" ? "bg-cyan-600 text-white shadow-xs" : "text-slate-400 hover:text-white"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage("hi")}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                language === "hi" ? "bg-cyan-600 text-white shadow-xs" : "text-slate-400 hover:text-white"
              }`}
            >
              हिन्दी
            </button>
            <button
              onClick={() => setLanguage("mr")}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                language === "mr" ? "bg-cyan-600 text-white shadow-xs" : "text-slate-400 hover:text-white"
              }`}
            >
              मराठी
            </button>
          </div>

          {/* Active Portal Badge (Strict Role Separation) */}
          {role === "government" && (
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-cyan-950/60 border border-cyan-500/40 text-xs text-cyan-200 shadow-inner">
              <Building2 className="w-3.5 h-3.5 text-cyan-400" />
              <span className="font-semibold">{t("roleGov")}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="hidden lg:inline text-slate-400 font-normal ml-1">
                • {t("officerBadge")}
              </span>
            </div>
          )}

          {role === "trainee" && (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-amber-950/60 border border-amber-500/40 text-xs text-amber-200 shadow-inner">
                <User className="w-3.5 h-3.5 text-amber-400" />
                <span className="font-semibold">{t("roleTrainee")}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              </div>

              {/* Trainee profile selector (for testing candidate personas) */}
              <div className="flex items-center gap-1.5 bg-slate-900/90 border border-slate-700/80 px-2.5 py-1 rounded-xl text-xs">
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
            </div>
          )}

          {/* Sign Out Action Button */}
          {onLogout && (
            <button
              onClick={onLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-700/80 hover:border-rose-500/50 hover:bg-rose-950/40 text-slate-300 hover:text-rose-200 text-xs font-semibold transition-all cursor-pointer shadow-inner"
              title="Sign Out of Session"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t("signOut") || "Sign Out"}</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
