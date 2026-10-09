import type { Metadata } from "next";
import { RedirectClient } from "@/components/dashboard/RedirectClient";

export const metadata: Metadata = {
  title: "Redirecting to Audit Log... · SYNEX Control Center",
  other: {
    "http-equiv": "refresh",
    content: "0; url=/dashboard/admin?tab=audit",
  },
};

export default function AuditRedirectPage() {
  return <RedirectClient to="/dashboard/admin?tab=audit" />;
}
