import React from "react";
import { Send, PhoneCall, MessageCircle, Smartphone, Headphones, CheckCircle, Clock, Zap } from "lucide-react";
import { Badge } from "../shared/Badge";
import { useRole } from "../../context/RoleContext";

export const CampaignManager = () => {
  const { campaigns, dispatchAssistedCampaign } = useRole();

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-2">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-cyan-50 text-cyan-700">
            <Send className="w-4 h-4" />
          </span>
          <h2 className="text-lg font-bold font-display text-slate-900">
            Multi-Channel Follow-Up Campaign Engine
          </h2>
        </div>
        <p className="text-xs text-slate-500">
          Automates 3, 6, and 12-month post-completion micro-surveys via WhatsApp, IVR voice bots, and SMS. Solves low-response rates by dispatching assisted human call-center desks for non-responders.
        </p>
      </div>

      {/* Campaign Cycle Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {campaigns.map((camp) => (
          <div
            key={camp.id}
            className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-cyan-100 text-cyan-900">
                  {camp.interval} Cycle
                </span>
                <Badge
                  variant={camp.status === "active" ? "success" : "warning"}
                  size="sm"
                  icon={camp.status === "active" ? CheckCircle : Clock}
                >
                  {camp.status === "active" ? "Active Cycle" : "Scheduled"}
                </Badge>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-900 font-display line-clamp-1">{camp.name}</h3>
                <p className="text-[11px] text-slate-500 mt-0.5">{camp.cohort}</p>
              </div>

              {/* Response Rate Bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-600">Overall Response Rate:</span>
                  <span className="text-cyan-800 font-display">{camp.overallResponseRate}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-cyan-600 to-teal-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${camp.overallResponseRate}%` }}
                  />
                </div>
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>{camp.totalResponses.toLocaleString("en-IN")} Responded</span>
                  <span>{camp.totalEligible.toLocaleString("en-IN")} Eligible</span>
                </div>
              </div>

              {/* Channel Performance Grid */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-center">
                <div className="p-2 rounded-xl bg-emerald-50/70 border border-emerald-100">
                  <MessageCircle className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
                  <div className="text-[10px] text-slate-500 font-medium">WhatsApp</div>
                  <div className="text-xs font-bold text-slate-900 font-display">{camp.channels.whatsapp.rate}%</div>
                </div>

                <div className="p-2 rounded-xl bg-blue-50/70 border border-blue-100">
                  <PhoneCall className="w-4 h-4 text-blue-600 mx-auto mb-1" />
                  <div className="text-[10px] text-slate-500 font-medium">IVR Bot</div>
                  <div className="text-xs font-bold text-slate-900 font-display">{camp.channels.ivr.rate}%</div>
                </div>

                <div className="p-2 rounded-xl bg-purple-50/70 border border-purple-100">
                  <Smartphone className="w-4 h-4 text-purple-600 mx-auto mb-1" />
                  <div className="text-[10px] text-slate-500 font-medium">SMS Link</div>
                  <div className="text-xs font-bold text-slate-900 font-display">{camp.channels.sms.rate}%</div>
                </div>
              </div>
            </div>

            {/* Non-Responders & Assisted Call Center Action */}
            <div className="pt-3 border-t border-slate-100 space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Unreached / Non-Responders:</span>
                <span className="font-bold text-rose-600 font-display">
                  {camp.nonResponders.toLocaleString("en-IN")} youth
                </span>
              </div>

              {camp.assistedCallCenterActive ? (
                <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Headphones className="w-4 h-4 text-emerald-700" />
                    <span className="font-semibold">Call Center Deployed</span>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-800">
                    {camp.callCenterDispatchedCount.toLocaleString("en-IN")} queued
                  </span>
                </div>
              ) : (
                <button
                  onClick={() => dispatchAssistedCampaign(camp.id)}
                  className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-slate-900 to-cyan-900 text-white text-xs font-semibold hover:from-slate-800 hover:to-cyan-800 shadow-xs flex items-center justify-center gap-2 transition-all"
                >
                  <Headphones className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Dispatch Assisted Call Center</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
