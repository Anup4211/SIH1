import React, { useState } from "react";
import { Phone, MapPin, Save, Lock } from "lucide-react";
import { useRole } from "../../context/RoleContext";
import { useLanguage } from "../../context/LanguageContext";

export const ContactConsentManager = () => {
  const { activeTrainee, updateTraineeContact, toggleTraineeConsent } = useRole();
  const { t } = useLanguage();

  const [phone, setPhone] = useState(activeTrainee.phone);
  const [whatsapp, setWhatsapp] = useState(activeTrainee.whatsappNumber);
  const [location, setLocation] = useState(activeTrainee.currentLocation);
  const [district, setDistrict] = useState(activeTrainee.currentDistrict);

  const handleSaveContact = (e) => {
    e.preventDefault();
    updateTraineeContact({
      phone,
      whatsappNumber: whatsapp,
      currentLocation: location,
      currentDistrict: district
    });
  };

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-cyan-50 text-cyan-700">
            <Phone className="w-4 h-4" />
          </span>
          <h2 className="text-base sm:text-lg font-bold font-display text-slate-900">
            {t("contactConsentTitle")}
          </h2>
        </div>
        <p className="text-xs text-slate-500 mt-0.5">
          {t("contactConsentSubtitle")}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contact Info Form */}
        <form onSubmit={handleSaveContact} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
            <Phone className="w-3.5 h-3.5 text-cyan-600" />
            <span>Direct Phone & Address Update</span>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
              Primary Mobile Number
            </label>
            <input
              type="text"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:outline-hidden font-mono"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
              WhatsApp Number for Survey Reminders
            </label>
            <input
              type="text"
              required
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:outline-hidden font-mono"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Current Working District
              </label>
              <input
                type="text"
                required
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Current Area / MIDC
              </label>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:outline-hidden"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-2 bg-cyan-700 hover:bg-cyan-800 text-white text-xs font-semibold rounded-xl shadow-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Update Contact Details</span>
            </button>
          </div>
        </form>

        {/* Privacy & Consent Controls */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
            <Lock className="w-3.5 h-3.5 text-emerald-600" />
            <span>Digital Personal Data Protection (DPDP) Consents</span>
          </div>

          <p className="text-[11px] text-slate-500 leading-relaxed">
            You maintain 100% control over who can view your employment records. You can revoke consent at any time.
          </p>

          <div className="space-y-2.5 pt-1">
            <label className="flex items-start gap-3 p-2.5 rounded-xl bg-white border border-slate-200/80 cursor-pointer">
              <input
                type="checkbox"
                checked={activeTrainee.consent.shareWithEmployers}
                onChange={() => toggleTraineeConsent("shareWithEmployers")}
                className="mt-0.5 rounded text-cyan-600 focus:ring-cyan-500"
              />
              <div className="text-xs">
                <div className="font-semibold text-slate-800">Share Profile with Verified Employers</div>
                <div className="text-[10px] text-slate-500">
                  Allows MIDC manufacturing and healthcare recruiters to view your verified certificates.
                </div>
              </div>
            </label>

            <label className="flex items-start gap-3 p-2.5 rounded-xl bg-white border border-slate-200/80 cursor-pointer">
              <input
                type="checkbox"
                checked={activeTrainee.consent.shareWithResearchers}
                onChange={() => toggleTraineeConsent("shareWithResearchers")}
                className="mt-0.5 rounded text-cyan-600 focus:ring-cyan-500"
              />
              <div className="text-xs">
                <div className="font-semibold text-slate-800">Government Impact Study Participation</div>
                <div className="text-[10px] text-slate-500">
                  Anonymized data is used to improve course funding and state stipend policies.
                </div>
              </div>
            </label>

            <label className="flex items-start gap-3 p-2.5 rounded-xl bg-white border border-slate-200/80 cursor-pointer">
              <input
                type="checkbox"
                checked={activeTrainee.consent.allowWhatsAppPulse}
                onChange={() => toggleTraineeConsent("allowWhatsAppPulse")}
                className="mt-0.5 rounded text-cyan-600 focus:ring-cyan-500"
              />
              <div className="text-xs">
                <div className="font-semibold text-slate-800">WhatsApp 60-Second Check-in Alerts</div>
                <div className="text-[10px] text-slate-500">
                  Quarterly check-in prompt sent directly to your phone.
                </div>
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
