export interface NavItem {
  label: string;
  href: string;
  icon?: string;
}

export const MARKETING_NAV: NavItem[] = [
  { label: "Pipeline", href: "#pipeline" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Pricing", href: "#pricing" },
];

export const DASHBOARD_NAV: NavItem[] = [
  { label: "Demand Signals", href: "/dashboard", icon: "Activity" },
  { label: "Customer Intent", href: "/dashboard/customer-intent", icon: "Brain" },
  { label: "Orders", href: "/dashboard/orders", icon: "Package" },
  { label: "Knowledge Base", href: "/dashboard/knowledge-base", icon: "BookOpen" },
  { label: "API Keys", href: "/dashboard/api-keys", icon: "KeyRound" },
  { label: "Settings", href: "/dashboard/settings", icon: "Settings" },
];

export const INDIAN_LANGUAGES: string[] = [
  "English",
  "Hindi",
  "Bengali",
  "Telugu",
  "Marathi",
  "Tamil",
  "Urdu",
  "Gujarati",
  "Kannada",
  "Odia",
  "Malayalam",
  "Punjabi",
  "Assamese",
  "Maithili",
  "Sanskrit",
  "Konkani",
  "Nepali",
  "Sindhi",
  "Dogri",
  "Manipuri",
  "Bodo",
  "Santali",
  "Kashmiri",
];
