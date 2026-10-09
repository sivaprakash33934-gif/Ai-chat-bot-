export interface QueryVelocityPoint {
  hour: string;
  queries: number;
}

// Fixed, deterministic series — avoids SSR/CSR hydration mismatches (no Math.random).
export const queryVelocityData: QueryVelocityPoint[] = [
  { hour: "00:00", queries: 142 },
  { hour: "01:00", queries: 98 },
  { hour: "02:00", queries: 76 },
  { hour: "03:00", queries: 61 },
  { hour: "04:00", queries: 54 },
  { hour: "05:00", queries: 70 },
  { hour: "06:00", queries: 118 },
  { hour: "07:00", queries: 204 },
  { hour: "08:00", queries: 312 },
  { hour: "09:00", queries: 428 },
  { hour: "10:00", queries: 511 },
  { hour: "11:00", queries: 489 },
  { hour: "12:00", queries: 540 },
  { hour: "13:00", queries: 575 },
  { hour: "14:00", queries: 602 },
  { hour: "15:00", queries: 588 },
  { hour: "16:00", queries: 621 },
  { hour: "17:00", queries: 658 },
  { hour: "18:00", queries: 702 },
  { hour: "19:00", queries: 674 },
  { hour: "20:00", queries: 590 },
  { hour: "21:00", queries: 482 },
  { hour: "22:00", queries: 356 },
  { hour: "23:00", queries: 221 },
];

export type QueryIntent =
  | "PRICE_CHECK"
  | "POLICY"
  | "STOCK_CHECK"
  | "ORDER_STATUS"
  | "GENERAL";

export type InferenceStatus = "RESOLVED" | "ESCALATED";

export interface InferenceLog {
  id: string;
  timestamp: string;
  storeDomain: string;
  intent: QueryIntent;
  language: string;
  status: InferenceStatus;
}

// Static mock rows — deterministic, no Date.now() to preserve hydration parity.
export const inferenceLogs: InferenceLog[] = [
  { id: "inf_001", timestamp: "14:32:08", storeDomain: "blr-textiles.in", intent: "STOCK_CHECK", language: "TA", status: "RESOLVED" },
  { id: "inf_002", timestamp: "14:31:52", storeDomain: "chennai-spices.in", intent: "PRICE_CHECK", language: "TA", status: "RESOLVED" },
  { id: "inf_003", timestamp: "14:31:40", storeDomain: "delhi-fab.in", intent: "POLICY", language: "HI", status: "ESCALATED" },
  { id: "inf_004", timestamp: "14:31:21", storeDomain: "mysore-silks.in", intent: "ORDER_STATUS", language: "KN", status: "RESOLVED" },
  { id: "inf_005", timestamp: "14:30:58", storeDomain: "pune-crafts.in", intent: "GENERAL", language: "MR", status: "RESOLVED" },
  { id: "inf_006", timestamp: "14:30:33", storeDomain: "kolkata-handloom.in", intent: "PRICE_CHECK", language: "BN", status: "RESOLVED" },
  { id: "inf_007", timestamp: "14:30:11", storeDomain: "jaipur-gems.in", intent: "POLICY", language: "HI", status: "ESCALATED" },
  { id: "inf_008", timestamp: "14:29:47", storeDomain: "kochi-spices.in", intent: "STOCK_CHECK", language: "ML", status: "RESOLVED" },
  { id: "inf_009", timestamp: "14:29:22", storeDomain: "surat-textiles.in", intent: "ORDER_STATUS", language: "GU", status: "RESOLVED" },
  { id: "inf_010", timestamp: "14:29:03", storeDomain: "amritsar-foods.in", intent: "GENERAL", language: "PA", status: "RESOLVED" },
];
