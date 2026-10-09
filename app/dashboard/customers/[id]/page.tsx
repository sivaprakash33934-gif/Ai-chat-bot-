import { notFound } from "next/navigation";
import { INITIAL_CUSTOMERS, Customer } from "@/lib/fixtures";
import { CustomerProfile } from "@/components/dashboard/CustomerProfile";

export function generateStaticParams() {
  const ids = [
    ...INITIAL_CUSTOMERS.map((c) => ({ id: c.id })),
    { id: "senthil-traders" },
    { id: "kavin-exports" },
    { id: "murugan-textiles" },
    { id: "cst_001" },
    { id: "cst_002" },
  ];
  return ids;
}

interface PageProps {
  params: { id: string };
}

function resolveCustomer(paramId: string): Customer | undefined {
  const normalized = paramId.toLowerCase();

  // Direct ID match
  const direct = INITIAL_CUSTOMERS.find(
    (c) => c.id.toLowerCase() === normalized
  );
  if (direct) return direct;

  // Slug aliases
  if (normalized.includes("kavin")) {
    return INITIAL_CUSTOMERS.find((c) => c.id === "CUST-001");
  }
  if (normalized.includes("murugan")) {
    return INITIAL_CUSTOMERS.find((c) => c.id === "CUST-002");
  }
  if (normalized.includes("senthil") || normalized.includes("001")) {
    return INITIAL_CUSTOMERS[0];
  }
  if (normalized.includes("002")) {
    return INITIAL_CUSTOMERS[1];
  }
  if (normalized.includes("003")) {
    return INITIAL_CUSTOMERS[2];
  }

  return INITIAL_CUSTOMERS[0];
}

export default function CustomerProfilePage({ params }: PageProps) {
  const customer = resolveCustomer(params.id);

  if (!customer) {
    notFound();
  }

  return <CustomerProfile customer={customer} />;
}
