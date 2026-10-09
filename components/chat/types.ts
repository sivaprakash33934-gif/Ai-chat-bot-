export type ChatRole = "user" | "assistant" | "system";

export interface Citation {
  source: string;
  section: string;
  passage: string;
}

export interface Clarify {
  question: string;
  options: string[];
}

export interface ActionField {
  label: string;
  value: string;
}

export type ActionStatus =
  | "pending_confirmation"
  | "requested"
  | "authorized"
  | "executing"
  | "succeeded"
  | "failed"
  | "unknown"
  | "cancelled";

export interface ActionData {
  id: string;
  actionType: "create_lead" | "book_appointment";
  title: string;
  fields: ActionField[];
  status: ActionStatus;
  errorMessage?: string;
  retryCount: number;
}

export interface HandoffData {
  customer: string;
  intent: string;
  summary: string[];
  sources: string[];
  assignedTo: string;
}

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  timestamp: string;
  citations?: Citation[];
  clarify?: Clarify;
  isActionNotice?: boolean;
  action?: ActionData;
  handoff?: HandoffData;
  rulesApplied?: string[];
  customerContext?: string[];
}

export type PipelinePhase =
  | "idle"
  | "understanding"
  | "retrieving"
  | "reasoning"
  | "drafting"
  | "needs_clarification"
  | "awaiting_approval";

export interface ChatContextType {
  isOpen: boolean;
  openChat: () => void;
  closeChat: () => void;
  messages: ChatMessage[];
  sendMessage: (text: string) => void;
  currentPhase: PipelinePhase;
  isStreaming: boolean;
  cancelStreaming: () => void;
  uniqueSourcesCount: number;
}
