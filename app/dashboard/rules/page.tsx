import type { Metadata } from "next";
import { RulesPermissions } from "@/components/dashboard/RulesPermissions";

export const metadata: Metadata = {
  title: "Rules & Permissions · SYNEX Control Center",
  description: "Autonomous policy constraints, permission gates, and margin floor guardrails.",
};

export default function RulesPage() {
  return <RulesPermissions />;
}
