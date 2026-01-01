import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: "default" | "secondary" | "outline" | "destructive";
};

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const base = "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide";
  const variants: Record<NonNullable<BadgeProps["variant"]>, string> = {
    default: "bg-blue-600 text-white",
    secondary: "bg-slate-100 text-slate-800 border border-slate-200",
    outline: "border border-slate-300 text-slate-800 bg-white",
    destructive: "bg-red-100 text-red-700 border border-red-200",
  };

  return <span className={cn(base, variants[variant], className)} {...props} />;
}
