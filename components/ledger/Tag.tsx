import styles from "./Tag.module.css";
import type { ReactNode } from "react";

interface TagProps {
  children: ReactNode;
  variant?: "default" | "amber";
  className?: string;
}

export function Tag({ children, variant = "default", className = "" }: TagProps) {
  return (
    <span
      className={`${styles.tag} ${className}`.trim()}
      data-variant={variant}
    >
      {children}
    </span>
  );
}
