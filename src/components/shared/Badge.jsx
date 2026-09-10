import React from "react";

export const Badge = ({ children, variant = "default", size = "md", icon: Icon }) => {
  const variantClasses = {
    default: "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700",
    primary: "bg-cyan-50 dark:bg-cyan-950/70 text-cyan-800 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800",
    success: "bg-emerald-50 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
    warning: "bg-amber-50 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800",
    danger: "bg-rose-50 dark:bg-rose-950/70 text-rose-800 dark:text-rose-300 border-rose-200 dark:border-rose-800",
    indigo: "bg-indigo-50 dark:bg-indigo-950/70 text-indigo-800 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800",
    purple: "bg-purple-50 dark:bg-purple-950/70 text-purple-800 dark:text-purple-300 border-purple-200 dark:border-purple-800"
  };

  const sizeClasses = {
    sm: "text-[10px] px-2 py-0.5",
    md: "text-xs px-2.5 py-1",
    lg: "text-sm px-3 py-1.5"
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-bold rounded-full border shadow-2xs ${variantClasses[variant] || variantClasses.default} ${sizeClasses[size] || sizeClasses.md}`}
    >
      {Icon && <Icon className="w-3.5 h-3.5 shrink-0" />}
      <span>{children}</span>
    </span>
  );
};
