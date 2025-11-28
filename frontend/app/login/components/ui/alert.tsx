// frontend/app/login/components/ui/alert.tsx
"use client";

import * as React from "react";
import { cn } from "./utils";

// You can customize these variants if you want different colors.
export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "destructive";
}

export function Alert({
  className = "",
  variant = "default",
  ...props
}: AlertProps) {
  // Base box styling
  const base =
    "relative w-full rounded-lg border px-4 py-3 text-sm";

  // Variant-specific colors (no Tailwind required – just simple class names)
  const variantClass =
    variant === "destructive"
      ? "alert-destructive" // define in CSS if you want
      : "alert-default";    // define in CSS if you want

  return (
    <div
      role="alert"
      className={cn(base, variantClass, className)}
      {...props}
    />
  );
}

export interface AlertDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

export function AlertDescription({
  className = "",
  ...props
}: AlertDescriptionProps) {
  return (
    <p className={cn("alert-description", className)} {...props} />
  );
}
