// frontend/app/login/components/ui/label.tsx
"use client";

import * as React from "react";

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className = "", ...props }, ref) => {
    const classes = ["login-label", className].filter(Boolean).join(" ");
    return <label ref={ref} className={classes} {...props} />;
  }
);

Label.displayName = "Label";
