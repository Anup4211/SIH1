import React from "react";
import { Landmark, ShieldCheck, Sparkles, ArrowRight, MapPin } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

export const HeroLanding = ({ onOpenAuth }) => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between">
      <header className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-600 to-teal-500 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <Landmark className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-base font-bold tracking-wide font-display text-white">
              कौशल्य सेतू • Kaushal Setu
            </div>
            <div className="text-[10px] text-cyan-400 font-medium tracking-wider uppercase">
              Government of Maharashtra • MSInS
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => onOpenAuth("trainee")}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-300 hover:text-white bg-slate-900 border border-slate-800 cursor-pointer"
          >
            Sign In
          </button>
          <button
            onClick={() => onOpenAuth("trainee")}
            className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 shadow-lg shadow-cyan-600/20 cursor-pointer flex items-center gap-1.5"
          >
            <span>Get Started</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-800 text-cyan-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Maharashtra Skilling Platform</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight leading-tight">
            Bridging Skilling to <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">Verified Employment</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
            Connecting 3.2M+ trainees across 36 districts with real-time career tracking, DigiLocker credentials, and transparent industry alignment.
          </p>
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 max-w-xl shadow-xl">
            <div className="text-[11px] uppercase tracking-widest text-cyan-400 font-bold">
              State Motto • राज्य ध्येय वाक्य
            </div>
            <div className="text-sm font-semibold text-slate-100 font-display">
              "कौशल्याचा आधार, समृद्ध महाराष्ट्राचा अधिकार"
            </div>
            <div className="text-xs text-slate-400 italic">
              "Foundation of skilling, right to a prosperous Maharashtra."
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => onOpenAuth("trainee")}
              className="px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 shadow-xl shadow-cyan-600/25 cursor-pointer flex items-center gap-2"
            >
              <span>Explore Portal & Sign Up</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onOpenAuth("government")}
              className="px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700 cursor-pointer flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Government Sign In</span>
            </button>
          </div>
        </div>
        <div className="lg:col-span-5 relative flex items-center justify-center">
          <div className="w-full max-w-md p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
                  Maharashtra Skill Map
                </span>
              </div>
              <span className="text-[10px] px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                36 Districts Active
              </span>
            </div>
            <div className="h-44 rounded-2xl bg-slate-950 border border-slate-800 p-4 flex flex-col justify-between">
              <div className="space-y-1">
                <div className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">
                  Statewide Trainee Layer
                </div>
                <div className="text-sm font-bold text-white">
                  Pune • Nashik • Nagpur • Sambhajinagar
                </div>
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px] p-1.5 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-slate-300 font-medium">1. Enrolment & e-KYC</span>
                  <span className="text-emerald-400 font-bold font-mono">3,24,010 Verified</span>
                </div>
                <div className="flex items-center justify-between text-[11px] p-1.5 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-slate-300 font-medium">2. Skilling Outcome</span>
                  <span className="text-cyan-400 font-bold font-mono">89.4% Pass Rate</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="text-[10px] text-slate-400">Sanctioned Courses</div>
                <div className="text-base font-extrabold text-cyan-400 font-display">124 Active</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="text-[10px] text-slate-400">Employer Partners</div>
                <div className="text-base font-extrabold text-emerald-400 font-display">850+ MIDC</div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-xs text-slate-500 border-t border-slate-900">
        © 2025 Kaushal Setu • Maharashtra State Skill Development Society (MSInS).
      </footer>
    </div>
  );
};