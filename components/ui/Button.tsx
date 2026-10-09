import { ButtonHTMLAttributes, forwardRef } from "react";
import { buttonVariants, ButtonVariant } from "@/lib/button-variants";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", ...props }, ref) => (
    <button
      ref={ref}
      className={buttonVariants(variant, className)}
      {...props}
    />
  )
);

Button.displayName = "Button";
