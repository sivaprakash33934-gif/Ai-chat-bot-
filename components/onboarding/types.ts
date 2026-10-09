export interface OnboardingData {
  companyName: string;
  gstin: string;
  currency: string;
  state: string;
  selectedSources: string[];
  selectedRules: string[];
  enabledActions: string[];
  inviteEmail: string;
  inviteRole: "owner" | "ops_lead" | "viewer";
}

export const INITIAL_ONBOARDING_DATA: OnboardingData = {
  companyName: "Senthil Industrial Traders",
  gstin: "33AABCS1429B1Z8",
  currency: "INR (₹)",
  state: "Tamil Nadu",
  selectedSources: ["PRICE-LIST-2026.pdf", "TERMS-CREDIT-POLICY.pdf"],
  selectedRules: ["RL-01", "RL-03", "RL-04"],
  enabledActions: ["create_lead", "book_appointment", "check_stock"],
  inviteEmail: "ops@senthiltraders.com",
  inviteRole: "ops_lead",
};
