import type { Metadata } from "next";
import { RedirectClient } from "@/components/dashboard/RedirectClient";

export const metadata: Metadata = {
  title: "Redirecting to Leads... · SYNEX Control Center",
  other: {
    "http-equiv": "refresh",
    content: "0; url=/dashboard/queue?tab=leads",
  },
};

export default function LeadsRedirectPage() {
  return <RedirectClient to="/dashboard/queue?tab=leads" />;
}
