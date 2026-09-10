import React, { useState, useEffect } from "react";
import { PlusCircle, Sparkles, BookOpen, MapPin, Users, Award, Tag, Check, X } from "lucide-react";
import { Modal } from "../shared/Modal";
import { SECTORS, SCHEMES } from "../../data/schemes";
import { MAHARASHTRA_DISTRICTS } from "../../data/districts";
import { useRole } from "../../context/RoleContext";
import { useLanguage } from "../../context/LanguageContext";

export const CreateCourseModal = ({ isOpen, onClose, preFillData }) => {
  const { role, createNewCourse } = useRole();
  const { t } = useLanguage();

  if (role !== "government" || !isOpen) return null;

  const [courseName, setCourseName] = useState("");
  const [sector, setSector] = useState("Automotive & EV");
  const [duration, setDuration] = useState("120 Hours (4 Weeks)");
  const [targetDistricts, setTargetDistricts] = useState(["Pune", "Nashik"]);
  const [schemeTag, setSchemeTag] = useState("MMYY");
  const [seats, setSeats] = useState(60);
  const [eligibility, setEligibility] = useState("10th / 12th Pass or ITI Trainees");
  const [skillTagsInput, setSkillTagsInput] = useState("");
  const [addressedGap, setAddressedGap] = useState("");

  useEffect(() => {
    if (preFillData) {
      setCourseName(preFillData.name || "");
      setSector(preFillData.sector || "Automotive & EV");
      setDuration(preFillData.duration || "120 Hours (4 Weeks)");
      setTargetDistricts(preFillData.targetDistricts || ["Pune", "Nashik"]);
      setSchemeTag(preFillData.schemeTag || "MMYY");
      setSeats(preFillData.seats || 60);
      setEligibility(preFillData.eligibility || "10th / 12th Pass or ITI Trainees");
      setSkillTagsInput(preFillData.skillTags ? preFillData.skillTags.join(", ") : "");
      setAddressedGap(preFillData.addressedSkillGap || "");
    } else {
      setCourseName("");
      setSector("Automotive & EV");
      setDuration("120 Hours (4 Weeks)");
      setTargetDistricts(["Pune", "Nashik"]);
      setSchemeTag("MMYY");
      setSeats(60);
      setEligibility("10th / 12th Pass or ITI Trainees");
      setSkillTagsInput("");
      setAddressedGap("");
    }
  }, [preFillData, isOpen]);

  const handleToggleDistrict = (districtName) => {
    if (targetDistricts.includes(districtName)) {
      if (targetDistricts.length > 1) {
        setTargetDistricts(targetDistricts.filter((d) => d !== districtName));
      }
    } else {
      setTargetDistricts([...targetDistricts, districtName]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!courseName.trim()) return;

    const parsedTags = skillTagsInput
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    createNewCourse({
      name: courseName.trim(),
      sector,
      duration,
      targetDistricts,
      schemeTag,
      seats: Number(seats) || 50,
      eligibility,
      skillTags: parsedTags.length > 0 ? parsedTags : [sector],
      addressedSkillGap: addressedGap || null
    });

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Targeted Skilling Course"
      subtitle="Operationalize skill-gap insights by sanctioning a new curriculum across Maharashtra districts"
      maxWidth="max-w-2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        {/* Addressed Gap Banner if pre-filled */}
        {addressedGap && (
          <div className="p-3 bg-cyan-50 border border-cyan-200 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-2 text-cyan-900">
              <Sparkles className="w-4 h-4 text-cyan-600 shrink-0" />
              <span>
                <span className="font-semibold">Closing Identified Skill Gap:</span> "{addressedGap}"
              </span>
            </div>
            <span className="text-[10px] uppercase tracking-wider font-bold bg-cyan-200/70 text-cyan-900 px-2 py-0.5 rounded">
              High Priority
            </span>
          </div>
        )}

        {/* Course Name */}
        <div>
          <label className="block text-slate-700 font-semibold mb-1">Course Name / Title *</label>
          <input
            type="text"
            required
            placeholder="e.g. EV Battery Management System & High-Voltage Diagnostics"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:outline-hidden font-medium text-slate-900"
          />
        </div>

        {/* Sector & Scheme Selection */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-slate-700 font-semibold mb-1">Industry Sector *</label>
            <select
              value={sector}
              onChange={(e) => setSector(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:outline-hidden"
            >
              {SECTORS.filter((s) => s !== "All Sectors").map((sec) => (
                <option key={sec} value={sec}>
                  {sec}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">Scheme Tag *</label>
            <select
              value={schemeTag}
              onChange={(e) => setSchemeTag(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:outline-hidden"
            >
              {SCHEMES.map((sch) => (
                <option key={sch.id} value={sch.code}>
                  {sch.code} — {sch.type}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Duration & Seats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-slate-700 font-semibold mb-1">Course Duration *</label>
            <input
              type="text"
              required
              placeholder="e.g. 120 Hours (4 Weeks)"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">Sanctioned Seats (Intake) *</label>
            <input
              type="number"
              required
              min={10}
              max={500}
              value={seats}
              onChange={(e) => setSeats(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:outline-hidden"
            />
          </div>
        </div>

        {/* Eligibility Criteria */}
        <div>
          <label className="block text-slate-700 font-semibold mb-1">Eligibility Criteria</label>
          <input
            type="text"
            required
            placeholder="e.g. 10th/12th Pass or ITI Machinist"
            value={eligibility}
            onChange={(e) => setEligibility(e.target.value)}
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:outline-hidden"
          />
        </div>

        {/* Target Maharashtra Districts */}
        <div>
          <label className="block text-slate-700 font-semibold mb-1.5">
            Target Rollout Districts (Select one or more)
          </label>
          <div className="flex flex-wrap gap-1.5 max-h-28 overflow-y-auto p-2 bg-slate-50 border border-slate-200 rounded-xl">
            {MAHARASHTRA_DISTRICTS.map((dist) => {
              const isSelected = targetDistricts.includes(dist.name);
              return (
                <button
                  type="button"
                  key={dist.id}
                  onClick={() => handleToggleDistrict(dist.name)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
                    isSelected
                      ? "bg-cyan-700 text-white shadow-2xs"
                      : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  {dist.name}
                  {isSelected && " ✓"}
                </button>
              );
            })}
          </div>
        </div>

        {/* Skill Tags */}
        <div>
          <label className="block text-slate-700 font-semibold mb-1">
            Industry Skill Tags (Comma-separated)
          </label>
          <input
            type="text"
            placeholder="e.g. EV Battery Diagnostics, BMS Calibration, CAN-bus"
            value={skillTagsInput}
            onChange={(e) => setSkillTagsInput(e.target.value)}
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:outline-hidden"
          />
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-slate-600 hover:text-slate-900 font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-cyan-700 text-white font-semibold hover:bg-cyan-800 shadow-xs transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Launch & Sanction Course</span>
          </button>
        </div>
      </form>
    </Modal>
  );
};
