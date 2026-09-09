import React, { useState } from "react";
import { Award, Download, Share2, ShieldCheck, QrCode } from "lucide-react";
import { Modal } from "../shared/Modal";
import { useRole } from "../../context/RoleContext";
import { useLanguage } from "../../context/LanguageContext";

export const CredentialWallet = () => {
  const { activeTrainee, showToast } = useRole();
  const { t } = useLanguage();
  const [selectedCert, setSelectedCert] = useState(null);

  const handleDownload = (title) => {
    showToast(`Downloading: ${title}.pdf`, "success");
  };

  const handleShare = (credentialId) => {
    navigator.clipboard?.writeText(`https://kaushalsetu.maharashtra.gov.in/verify/${credentialId}`);
    showToast("Verifiable credential link copied to clipboard!", "info");
  };

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-purple-50 text-purple-700">
              <Award className="w-4 h-4" />
            </span>
            <h2 className="text-base sm:text-lg font-bold font-display text-slate-900">
              {t("credentialWalletTitle")}
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            {t("credentialWalletSubtitle")}
          </p>
        </div>

        <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold hidden sm:inline">
          {activeTrainee.certificates.length} Verified Credentials
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {activeTrainee.certificates.map((cert) => (
          <div
            key={cert.id}
            className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-850 to-indigo-950 text-white shadow-md border border-slate-700/80 flex flex-col justify-between space-y-4 relative overflow-hidden"
          >
            <div className="space-y-2 relative z-10">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono tracking-wider px-2 py-0.5 rounded bg-white/10 text-cyan-300 border border-white/10">
                  {cert.nsqfLevel}
                </span>
                <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>DigiLocker Verified</span>
                </span>
              </div>

              <h3 className="text-sm font-bold font-display text-white line-clamp-2">
                {cert.title}
              </h3>
              <div className="text-[11px] text-slate-300">
                Issued by: <span className="text-white font-medium">{cert.issuingBody}</span>
              </div>
              <div className="text-[10px] font-mono text-slate-400">
                ID: {cert.credentialId} • Issued: {cert.issueDate}
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between relative z-10">
              <button
                onClick={() => setSelectedCert(cert)}
                className="flex items-center gap-1 text-xs text-cyan-300 hover:text-cyan-200 font-medium cursor-pointer"
              >
                <QrCode className="w-3.5 h-3.5" />
                <span>Verify QR</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleShare(cert.credentialId)}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  title="Share Link"
                >
                  <Share2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDownload(cert.title)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>PDF</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* QR Code Verification Modal */}
      {selectedCert && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedCert(null)}
          title="Verifiable Government Credential"
          subtitle={`Credential ID: ${selectedCert.credentialId}`}
          maxWidth="max-w-md"
        >
          <div className="text-center space-y-4">
            <div className="w-48 h-48 mx-auto p-4 bg-white border-2 border-slate-900 rounded-2xl flex flex-col items-center justify-center space-y-2 shadow-inner">
              <QrCode className="w-32 h-32 text-slate-900" />
              <div className="text-[10px] font-mono font-bold text-slate-600">
                SCAN TO AUDIT ON MSINS VAULT
              </div>
            </div>

            <div className="text-xs text-slate-600 space-y-1">
              <div className="font-bold text-slate-900 text-sm font-display">{selectedCert.title}</div>
              <div>Recipient: <span className="font-semibold text-slate-800">{activeTrainee.name}</span></div>
              <div>Grade: <span className="font-semibold text-emerald-700">{selectedCert.grade}</span></div>
              <div className="text-[11px] text-slate-400 font-mono break-all pt-1">
                {selectedCert.verificationUrl}
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setSelectedCert(null)}
                className="w-full py-2 bg-slate-900 text-white text-xs font-semibold rounded-xl hover:bg-slate-800 cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
