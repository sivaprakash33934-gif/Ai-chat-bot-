export type ButtonVariant = "primary" | "ghost" | "outline";

const BASE =
  "inline-flex items-center justify-center min-h-[44px] min-w-[44px] px-5 text-sm font-medium rounded-md transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-signal)] focus-visible:ring-offset-2";

const VARIANTS: Record<ButtonVariant, string> = {
  primary: "bg-[var(--color-obsidian)] text-white hover:bg-black",
  ghost: "bg-transparent text-[var(--color-foreground)] hover:bg-black/5",
  outline:
    "bg-transparent border border-[var(--color-hairline)] text-[var(--color-foreground)] hover:border-[var(--color-signal)]",
};

export function buttonVariants(
  variant: ButtonVariant = "primary",
  className = ""
): string {
  return `${BASE} ${VARIANTS[variant]} ${className}`.trim();
}
