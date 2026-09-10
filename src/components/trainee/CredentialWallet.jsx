import React, { useState, useCallback } from "react";
import { Award, Download, Share2, ShieldCheck, QrCode, FileText, CheckCircle2, Sparkles, TrendingUp } from "lucide-react";
import { Modal } from "../shared/Modal";
import { CertificateModal } from "./CertificateModal";
import { useRole } from "../../context/RoleContext";
import { useLanguage } from "../../context/LanguageContext";

export const CredentialWallet = React.memo(() => {
  const { activeTrainee, showToast } = useRole();
  const { t } = useLanguage();
  const [selectedCertForQR, setSelectedCertForQR] = useState(null);
  const [selectedCertForPreview, setSelectedCertForPreview] = useState(null);

  const handleDownload = useCallback((cert) => {
    setSelectedCertForPreview(cert);
    showToast(`Opening official certificate: ${cert.title}`, "info");
  }, [showToast]);

  const handleShare = useCallback((credentialId) => {
    navigator.clipboard?.writeText(`https://kaushalsetu.maharashtra.gov.in/verify/${credentialId}`);
    showToast("Verifiable credential link copied to clipboard!", "info");
  }, [showToast]);

  const handleClosePreview = useCallback(() => {
    setSelectedCertForPreview(null);
  }, []);

  const handleCloseQR = useCallback(() => {
    setSelectedCertForQR(null);
  }, []);

  return (
    <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-3xl p-5 sm:p-6 border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-5 transition-colors duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200/50 dark:border-purple-800/50 shadow-2xs">
              <Award className="w-4 h-4" />
            </span>
            <h2 className="text-base sm:text-lg font-bold font-display text-slate-900 dark:text-white">
              {t("credentialWalletTitle")}
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {t("credentialWalletSubtitle")}
          </p>
        </div>

        <span className="text-xs px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800/80 font-bold self-start sm:self-auto shadow-2xs">
          {activeTrainee.certificates.length} Verified Credentials
        </span>
      </div>

      {/* Interactive NSQF Competency Progress Bar */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-50 via-indigo-50 to-cyan-50 dark:from-slate-950 dark:via-purple-950/40 dark:to-cyan-950/40 border border-purple-200/60 dark:border-purple-900/40 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-200">
            <Sparkles className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
            <span>NSQF Pathway: Level 4 → Level 5 Upgrade</span>
          </div>
          <span className="font-mono font-bold text-purple-700 dark:text-purple-300">85% Complete</span>
        </div>
        <div className="w-full h-2.5 bg-slate-200/70 dark:bg-slate-800 rounded-full overflow-hidden p-0.5">
          <div className="h-full bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 rounded-full transition-all duration-500 w-[85%]" />
        </div>
        <div className="flex justify-between text-[10px] text-slate-500 dark:text-slate-400 font-medium">
          <span>Core Practical (Completed)</span>
          <span>Shop-Floor Assessment (Completed)</span>
          <span className="text-purple-700 dark:text-purple-300 font-bold">Bridge Module (In Progress)</span>
        </div>
      </div>

      {/* Credentials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {activeTrainee.certificates.map((cert) => (
          <div
            key={cert.id}
            className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-850 to-indigo-950 text-white shadow-md border border-slate-700/80 flex flex-col justify-between space-y-4 relative overflow-hidden interactive-card"
          >
            <div className="space-y-2 relative z-10">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono tracking-wider px-2.5 py-0.5 rounded-full bg-white/10 text-cyan-300 border border-white/10 shadow-inner">
                  {cert.nsqfLevel}
                </span>
                <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-semibold">
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
                onClick={() => setSelectedCertForQR(cert)}
                className="flex items-center gap-1.5 text-xs text-cyan-300 hover:text-cyan-200 font-bold cursor-pointer btn-interactive"
              >
                <QrCode className="w-3.5 h-3.5" />
                <span>Verify QR</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleShare(cert.credentialId)}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer btn-interactive"
                  title="Share Link"
                >
                  <Share2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDownload(cert)}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 text-white text-xs font-bold shadow-xs transition-all cursor-pointer btn-interactive"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Certificate</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Official Certificate Viewer Modal */}
      {selectedCertForPreview && (
        <CertificateModal
          isOpen={true}
          onClose={handleClosePreview}
          cert={selectedCertForPreview}
          trainee={activeTrainee}
        />
      )}

      {/* QR Code Verification Modal */}
      {selectedCertForQR && (
        <Modal
          isOpen={true}
          onClose={handleCloseQR}
          title="Verifiable Government Credential"
          subtitle={`Credential ID: ${selectedCertForQR.credentialId}`}
          maxWidth="max-w-md"
        >
          <div className="text-center space-y-4 text-slate-800 dark:text-slate-100">
            <div className="w-48 h-48 mx-auto p-4 bg-white border-2 border-slate-900 dark:border-slate-700 rounded-2xl flex flex-col items-center justify-center space-y-2 shadow-inner">
              <QrCode className="w-32 h-32 text-slate-900" />
              <div className="text-[10px] font-mono font-bold text-slate-600">
                SCAN TO AUDIT ON MSINS VAULT
              </div>
            </div>

            <div className="text-xs text-slate-600 dark:text-slate-300 space-y-1">
              <div className="font-bold text-slate-900 dark:text-white text-sm font-display">{selectedCertForQR.title}</div>
              <div>Recipient: <span className="font-semibold text-slate-800 dark:text-slate-200">{activeTrainee.name}</span></div>
              <div>Grade: <span className="font-semibold text-emerald-700 dark:text-emerald-400">{selectedCertForQR.grade}</span></div>
              <div className="text-[11px] text-slate-400 font-mono break-all pt-1">
                {selectedCertForQR.verificationUrl}
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={handleCloseQR}
                className="w-full py-2.5 bg-slate-900 dark:bg-slate-800 text-white text-xs font-bold rounded-xl hover:bg-slate-800 dark:hover:bg-slate-700 cursor-pointer btn-interactive"
              >
                Done
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
});

CredentialWallet.displayName = "CredentialWallet";
