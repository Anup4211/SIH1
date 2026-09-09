import React from "react";

export const Badge = ({ children, variant = "default", size = "md", icon: Icon }) => {
  const variantClasses = {
    default: "bg-slate-100 text-slate-700 border-slate-200",
    primary: "bg-cyan-50 text-cyan-800 border-cyan-200",
    success: "bg-emerald-50 text-emerald-800 border-emerald-200",
    warning: "bg-amber-50 text-amber-800 border-amber-200",
    danger: "bg-rose-50 text-rose-800 border-rose-200",
    indigo: "bg-indigo-50 text-indigo-800 border-indigo-200",
    purple: "bg-purple-50 text-purple-800 border-purple-200"
  };

  const sizeClasses = {
    sm: "text-xs px-2 py-0.5",
    md: "text-xs px-2.5 py-1",
    lg: "text-sm px-3 py-1.5"
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-full border ${variantClasses[variant] || variantClasses.default} ${sizeClasses[size] || sizeClasses.md}`}
    >
      {Icon && <Icon className="w-3.5 h-3.5 shrink-0" />}
      <span>{children}</span>
    </span>
  );
};
