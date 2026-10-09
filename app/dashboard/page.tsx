import type { Metadata } from "next";
import { OverviewPanels } from "@/components/dashboard/OverviewPanels";

export const metadata: Metadata = {
  title: "Overview · SYNEX Control Center",
  description: "Real-time summary of leads, discounts, and customer conversations.",
};

export default function DashboardOverviewPage() {
  return <OverviewPanels />;
}
