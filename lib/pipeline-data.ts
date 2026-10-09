export interface PipelineStep {
  id: string;
  label: string;
  isApprovalStep?: boolean;
}

export const pipelineSteps: PipelineStep[] = [
  { id: "know", label: "01 / KNOW" },
  { id: "understand", label: "02 / UNDERSTAND" },
  { id: "reason", label: "03 / REASON" },
  { id: "gate", label: "04 / GATE", isApprovalStep: true },
  { id: "act", label: "05 / ACT" },
  { id: "measure", label: "06 / MEASURE" },
  { id: "improve", label: "07 / IMPROVE" },
];
