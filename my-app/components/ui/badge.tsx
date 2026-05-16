import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: "default" | "secondary" | "outline" | "destructive" | "success" | "warning" | "info";
};

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const base = "inline-flex items-center rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wide";
  const variants: Record<NonNullable<BadgeProps["variant"]>, string> = {
    default: "border-blue-600 bg-blue-600 text-white",
    secondary: "border-slate-200 bg-slate-100 text-slate-800",
    outline: "border-slate-300 bg-white text-slate-800",
    destructive: "border-red-200 bg-red-100 text-red-700",
    success: "border-emerald-200 bg-emerald-100 text-emerald-700",
    warning: "border-amber-200 bg-amber-100 text-amber-800",
    info: "border-blue-200 bg-blue-50 text-blue-700",
  };

  return <span className={cn(base, variants[variant], className)} {...props} />;
}
