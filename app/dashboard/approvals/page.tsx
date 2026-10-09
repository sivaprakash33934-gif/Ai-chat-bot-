import type { Metadata } from "next";
import { RedirectClient } from "@/components/dashboard/RedirectClient";

export const metadata: Metadata = {
  title: "Redirecting to Approvals... · SYNEX Control Center",
  other: {
    "http-equiv": "refresh",
    content: "0; url=/dashboard/queue?tab=approvals",
  },
};

export default function ApprovalsRedirectPage() {
  return <RedirectClient to="/dashboard/queue?tab=approvals" />;
}
