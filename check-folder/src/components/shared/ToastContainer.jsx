import React from "react";
import { CheckCircle2, AlertTriangle, Info, X } from "lucide-react";
import { useRole } from "../../context/RoleContext";

export const ToastContainer = () => {
  const { toasts, removeToast } = useRole();

  if (!toasts.length) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-md w-full pointer-events-none">
      {toasts.map((toast) => {
        const isSuccess = toast.type === "success";
        const isWarning = toast.type === "warning";

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl shadow-lg border text-sm transition-all duration-300 animate-slide-in ${
              isSuccess
                ? "bg-slate-900 text-white border-slate-800"
                : isWarning
                ? "bg-amber-900 text-white border-amber-800"
                : "bg-cyan-950 text-white border-cyan-800"
            }`}
          >
            <div className="shrink-0 mt-0.5">
              {isSuccess ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              ) : isWarning ? (
                <AlertTriangle className="w-5 h-5 text-amber-400" />
              ) : (
                <Info className="w-5 h-5 text-cyan-400" />
              )}
            </div>

            <div className="flex-1 text-xs sm:text-sm">{toast.message}</div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-white shrink-0 p-0.5 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
