import type { Metadata } from "next";
import { RedirectClient } from "@/components/dashboard/RedirectClient";

export const metadata: Metadata = {
  title: "Redirecting to Handoffs... · SYNEX Control Center",
  other: {
    "http-equiv": "refresh",
    content: "0; url=/dashboard/queue?tab=handoffs",
  },
};

export default function HandoffRedirectPage() {
  return <RedirectClient to="/dashboard/queue?tab=handoffs" />;
}
