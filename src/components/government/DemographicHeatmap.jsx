import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";
import { Compass } from "lucide-react";
import { MAHARASHTRA_DISTRICTS } from "../../data/districts";
import {
  GENDER_BREAKDOWN,
  SOCIAL_CATEGORY_BREAKDOWN,
  LOCATION_TYPE_BREAKDOWN
} from "../../data/demographics";
import { useLanguage } from "../../context/LanguageContext";

export const DemographicHeatmap = () => {
  const { t } = useLanguage();
  const [activeSubTab, setActiveSubTab] = useState("districts"); // "districts" | "gender" | "social" | "urbanRural"

  return (
    <div className="space-y-6">
      {/* Overview Card & Equity Mandate */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700">
                <Compass className="w-4 h-4" />
              </span>
              <h2 className="text-lg font-bold font-display text-slate-900">
                District Equity & Demographic Disparity Matrix
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Supports equity-based budget allocation across regional divisions and underrepresented social categories.
            </p>
          </div>

          {/* Sub-tab pills */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold overflow-x-auto">
            <button
              onClick={() => setActiveSubTab("districts")}
              className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                activeSubTab === "districts"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Districts & Tiers
            </button>
            <button
              onClick={() => setActiveSubTab("gender")}
              className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                activeSubTab === "gender"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Gender Parity
            </button>
            <button
              onClick={() => setActiveSubTab("social")}
              className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                activeSubTab === "social"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Social Category (SC/ST/OBC)
            </button>
            <button
              onClick={() => setActiveSubTab("urbanRural")}
              className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                activeSubTab === "urbanRural"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Urban vs Rural
            </button>
          </div>
        </div>
      </div>

      {/* Main Demographic Views */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
        {activeSubTab === "districts" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 font-display">
                  Placement Rate & Starting Wage by Maharashtra District
                </h3>
                <p className="text-xs text-slate-500">
                  Highlighting Tier 1 industrial hubs vs underserved Tier 3 blocks
                </p>
              </div>
            </div>

            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={MAHARASHTRA_DISTRICTS} margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 11, fill: "#64748b" }}
                    angle={-25}
                    textAnchor="end"
                    interval={0}
                  />
                  <YAxis unit="%" domain={[0, 100]} tick={{ fontSize: 11, fill: "#64748b" }} />
                  <Tooltip
                    formatter={(val, name) => [
                      name === "placementRate" ? `${val}%` : `₹${val.toLocaleString("en-IN")}`,
                      name === "placementRate" ? "Placement Rate" : "Average Starting Wage"
                    ]}
                  />
                  <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "15px" }} />
                  <Bar dataKey="placementRate" name="Placement Rate (%)" fill="#0891b2" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* District Heatmap Table */}
            <div className="overflow-x-auto border-t border-slate-100 pt-4">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-slate-50 text-[11px] uppercase font-semibold text-slate-500">
                  <tr>
                    <th className="py-2.5 px-3">District</th>
                    <th className="py-2.5 px-3">Division</th>
                    <th className="py-2.5 px-3">Tier</th>
                    <th className="py-2.5 px-3">Enrolled</th>
                    <th className="py-2.5 px-3">Placement %</th>
                    <th className="py-2.5 px-3">Avg Starting Wage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {MAHARASHTRA_DISTRICTS.map((d) => (
                    <tr key={d.id} className="hover:bg-slate-50">
                      <td className="py-2.5 px-3 font-semibold text-slate-900">{d.name}</td>
                      <td className="py-2.5 px-3">{d.division}</td>
                      <td className="py-2.5 px-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                            d.tier === "Tier 1"
                              ? "bg-purple-50 text-purple-700"
                              : d.tier === "Tier 2"
                              ? "bg-blue-50 text-blue-700"
                              : "bg-amber-50 text-amber-700"
                          }`}
                        >
                          {d.tier}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 font-display">{d.trainees.toLocaleString("en-IN")}</td>
                      <td className="py-2.5 px-3 font-semibold text-slate-900">{d.placementRate}%</td>
                      <td className="py-2.5 px-3 font-semibold text-slate-900">₹{d.avgWage.toLocaleString("en-IN")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeSubTab === "gender" && (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-bold text-slate-900 font-display">
                Gender Parity in Outcomes & Longitudinal Retention
              </h3>
              <p className="text-xs text-slate-500">
                Placement rates are near equal (53% vs 53.6%), but women face lower 6-month retention (58.4% vs 64.5%) and starting wage disparity
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {GENDER_BREAKDOWN.map((g) => (
                <div key={g.name} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 font-display">{g.name} Candidates</span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-cyan-100 text-cyan-800">
                      {g.enrolled.toLocaleString("en-IN")} Enrolled
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Placement Rate:</span>
                      <span className="font-bold text-slate-900">{g.rate}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">6M Retention:</span>
                      <span className={`font-bold ${g.retention6M < 60 ? "text-rose-600" : "text-emerald-600"}`}>
                        {g.retention6M}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Avg Monthly Wage:</span>
                      <span className="font-bold text-slate-900">₹{g.avgWage.toLocaleString("en-IN")}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSubTab === "social" && (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-bold text-slate-900 font-display">
                Social Category Distribution & Outcome Equity
              </h3>
              <p className="text-xs text-slate-500">
                SC, ST, and VJNT participation rates and post-certification workforce uptake
              </p>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={SOCIAL_CATEGORY_BREAKDOWN} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="category" tick={{ fontSize: 11, fill: "#64748b" }} />
                  <YAxis unit="%" domain={[0, 100]} tick={{ fontSize: 11, fill: "#64748b" }} />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }} />
                  <Bar dataKey="rate" name="Placement Rate (%)" fill="#0891b2" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="retention6M" name="6-Month Retention (%)" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeSubTab === "urbanRural" && (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-bold text-slate-900 font-display">
                Spatial Divide: Urban vs Rural Block Outcomes
              </h3>
              <p className="text-xs text-slate-500">
                Rural & tribal blocks suffer a 24.4% placement gap and lower wage levels compared to MMR/Pune
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {LOCATION_TYPE_BREAKDOWN.map((loc) => (
                <div key={loc.location} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="font-bold text-slate-900 text-sm font-display">{loc.location}</div>
                  <div className="text-2xl font-extrabold text-cyan-800 font-display">{loc.rate}%</div>
                  <div className="text-xs text-slate-500">Placement Rate</div>
                  <div className="pt-2 border-t border-slate-200 text-xs flex justify-between">
                    <span>Avg Wage:</span>
                    <span className="font-semibold text-slate-900">₹{loc.avgWage.toLocaleString("en-IN")}/mo</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
