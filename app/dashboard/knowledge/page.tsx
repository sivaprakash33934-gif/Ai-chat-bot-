import type { Metadata } from "next";
import { Knowledge } from "@/components/dashboard/Knowledge";

export const metadata: Metadata = {
  title: "Knowledge Base · SYNEX Control Center",
  description: "Self-hosted enterprise grounding index, source verification, and conflict reconciliation.",
};

export default function KnowledgePage() {
  return <Knowledge />;
}
