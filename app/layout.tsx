import type { Metadata } from "next";
import type { ReactNode } from "react";
import { sourceSerif, jetbrainsMono } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "SYNEX — Control Center",
  description: "AI Business Intelligence & Action Engine",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${sourceSerif.variable} ${jetbrainsMono.variable}`}>
      <body className="font-serif antialiased bg-paper text-ink min-h-screen">
        {children}
      </body>
    </html>
  );
}
