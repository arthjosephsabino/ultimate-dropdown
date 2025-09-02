"use client";

import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", children, disabled, ...props }, ref) => {
    const baseStyles =
      "px-4 py-2.5 rounded-md font-semibold transition-colors shadow-md focus:outline-none focus:ring-2 cursor-pointer";

    const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
      primary:
        "bg-fuchsia-600 text-white hover:bg-fuchsia-700 focus:ring-fuchsia-400",
      secondary:
        "bg-violet-700 text-white hover:bg-violet-800 focus:ring-violet-500",
    };

    const disabledStyles = `opacity-50 !cursor-not-allowed ${
      variant === "primary" ? "hover:bg-fuchsia-600" : "bg-violet-700"
    } hover:cursor-not-allowed`;

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          baseStyles,
          variants[variant],
          disabled && disabledStyles,
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
