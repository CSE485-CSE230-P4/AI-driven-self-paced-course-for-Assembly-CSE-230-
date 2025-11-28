// frontend/app/login/components/ui/button.tsx
"use client";

import * as React from "react";

type ButtonVariant = "primary" | "outline";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  block?: boolean; // full width
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", block = false, className = "", ...props }, ref) => {
    const base = "btn";
    const variantClass =
      variant === "primary" ? "btn-primary" : "btn-outline";
    const blockClass = block ? "btn-block" : "";
    const classes = [base, variantClass, blockClass, className]
      .filter(Boolean)
      .join(" ");

    return <button ref={ref} className={classes} {...props} />;
  }
);

Button.displayName = "Button";
