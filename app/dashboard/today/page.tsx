import type { Metadata } from "next";
import { RedirectClient } from "@/components/dashboard/RedirectClient";

export const metadata: Metadata = {
  title: "Redirecting... · SYNEX Control Center",
  other: {
    "http-equiv": "refresh",
    content: "0; url=/dashboard",
  },
};

export default function TodayRedirectPage() {
  return <RedirectClient to="/dashboard" />;
}
