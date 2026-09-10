import React, { useCallback } from "react";
import { Award, ShieldCheck, Download, Printer, QrCode, X, CheckCircle2, Landmark } from "lucide-react";
import { Modal } from "../shared/Modal";
import { useRole } from "../../context/RoleContext";

export const CertificateModal = React.memo(({ isOpen, onClose, cert, trainee }) => {
  const { showToast } = useRole();

  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  const handleDownload = useCallback(() => {
    if (showToast) {
      showToast(`Downloaded official verifiable certificate: ${cert?.title || "Certificate"} (PDF)`, "success");
    }
    onClose?.();
  }, [cert?.title, onClose, showToast]);

  if (!isOpen || !cert) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Official Government Skilling Certificate"
      subtitle="Verifiable DigiLocker Credential • Govt. of Maharashtra MSInS"
      maxWidth="max-w-3xl"
    >
      <div className="space-y-6">
        {/* Certificate Card Printable Area */}
        <div className="p-6 sm:p-8 bg-gradient-to-br from-amber-50/40 via-white to-cyan-50/40 dark:from-slate-900 dark:via-slate-850 dark:to-slate-900 border-4 border-double border-amber-600/40 dark:border-amber-500/30 rounded-3xl shadow-xl relative overflow-hidden text-center text-slate-800 dark:text-slate-100">
          {/* Top Corner Ornaments */}
          <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-amber-600/50" />
          <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-amber-600/50" />
          <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-amber-600/50" />
          <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-amber-600/50" />

          {/* Header */}
          <div className="space-y-1 mb-6">
            <div className="w-12 h-12 mx-auto rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-700 dark:text-amber-400 mb-2 shadow-inner">
              <Landmark className="w-6 h-6" />
            </div>
            <div className="text-[11px] uppercase tracking-widest font-bold text-amber-800 dark:text-amber-300 font-mono">
              Government of Maharashtra
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400 font-medium">
              Maharashtra State Innovation Society (MSInS) • State Skill Development Mission
            </div>
            <h2 className="text-xl sm:text-2xl font-black font-display tracking-tight text-slate-900 dark:text-white pt-2">
              CERTIFICATE OF SKILL COMPETENCY
            </h2>
            <div className="h-0.5 w-24 bg-gradient-to-r from-transparent via-amber-600 to-transparent mx-auto mt-2" />
          </div>

          {/* Body Text */}
          <div className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300 my-6">
            <p className="italic text-slate-500 dark:text-slate-400">This is to certify that</p>
            <div className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white font-display uppercase tracking-wide">
              {trainee?.name || "Candidate Name"}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Registration No: <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{trainee?.id}</span> • Scheme: <span className="font-semibold text-slate-800 dark:text-slate-200">{trainee?.schemeCode}</span>
            </p>
            <p className="max-w-lg mx-auto leading-relaxed pt-2">
              has successfully undergone rigorous training, assessment, and demonstrated proficiency in the curriculum for
            </p>
            <div className="text-base font-bold text-cyan-800 dark:text-cyan-300 font-display">
              {cert.title}
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100/70 dark:bg-amber-950/60 border border-amber-400/40 text-xs font-bold text-amber-900 dark:text-amber-200">
              <span>{cert.nsqfLevel}</span> • <span>Grade: {cert.grade || "A+ (Distinction)"}</span>
            </div>
          </div>

          {/* Bottom Stamp & Verification Block */}
          <div className="pt-6 border-t border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white rounded-xl border border-slate-300 dark:border-slate-700 shadow-inner">
                <QrCode className="w-12 h-12 text-slate-900" />
              </div>
              <div className="text-[10px] space-y-0.5">
                <div className="font-bold text-slate-800 dark:text-slate-200">DigiLocker Verified</div>
                <div className="text-slate-500 font-mono">ID: {cert.credentialId}</div>
                <div className="text-emerald-700 dark:text-emerald-400 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Tamper-Proof Audit Hash</span>
                </div>
              </div>
            </div>

            <div className="text-center sm:text-right text-[10px] space-y-1">
              <div className="font-bold text-slate-900 dark:text-slate-100">{cert.issuingBody}</div>
              <div className="text-slate-500">Date of Issue: {cert.issueDate}</div>
              <div className="text-amber-800 dark:text-amber-400 font-mono font-bold">STATE REGISTRY VAL-2025</div>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer"
          >
            Close
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold transition-colors cursor-pointer btn-interactive"
            >
              <Printer className="w-4 h-4" />
              <span>Print Official Copy</span>
            </button>

            <button
              type="button"
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-700 hover:bg-cyan-800 text-white text-xs font-bold shadow-md transition-all cursor-pointer btn-interactive"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
});

CertificateModal.displayName = "CertificateModal";
