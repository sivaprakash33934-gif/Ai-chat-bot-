export interface ProductCardData {
  title: string;
  price: string;
  specs: string;
  sku: string;
  badge?: string;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: string;
  productCard?: ProductCardData;
  inferenceMetadata?: {
    latency: string;
    confidence: number;
    sku: string;
  };
}

/**
 * Initial in-memory state.
 * STRICT NON-NEGOTIABLE RULE:
 * Absolutely NO persistence (zero localStorage, sessionStorage, IndexedDB, or cookies).
 * Resets cleanly to this initial array on page reload.
 */
export const INITIAL_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: "init-1",
    sender: "bot",
    text: "Connected to Apex Outdoor Catalog (12,480 SKUs). Query waterproof ratings, sizing, or stock across our product mesh with zero hallucination.",
    timestamp: "10:00 AM",
  },
];

/**
 * Pure deterministic client-side reasoning engine.
 * Pure stateless function. Takes query string, returns ChatMessage object.
 */
export function executeStatelessChatTurn(query: string): ChatMessage {
  const normalized = query.toLowerCase();
  const timeStr = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  if (normalized.includes("waterproof") || normalized.includes("trail runner") || normalized.includes("vibram")) {
    return {
      id: `bot-${Date.now()}`,
      sender: "bot",
      text: "Based on real-time spec indexing, the Apex Terra-Shield GTX is IPX-7 waterproof certified with a 4.5mm Vibram Megagrip lug outsole, fitting within your $160 parameter.",
      timestamp: timeStr,
      productCard: {
        title: "Apex Terra-Shield GTX Trail Runner",
        price: "$154.00",
        specs: "IPX-7 Waterproof • Vibram Megagrip • 290g weight",
        sku: "SKU-AT-902",
        badge: "In Stock (42 pairs)",
      },
      inferenceMetadata: {
        latency: "48ms",
        confidence: 99.8,
        sku: "AT-TS-092",
      },
    };
  }

  if (normalized.includes("alpine shell") || normalized.includes("layering") || normalized.includes("size")) {
    return {
      id: `bot-${Date.now()}`,
      sender: "bot",
      text: "The Nordic Alpine Shell has an articulated standard fit engineered specifically to accommodate a 200–300gsm mid-layer. We recommend choosing your true chest size.",
      timestamp: timeStr,
      productCard: {
        title: "Nordic Apex Hardshell Pro",
        price: "$380.00",
        specs: "3-Layer GORE-TEX Pro • 28,000mm Breathability • Helmet Hood",
        sku: "SKU-NA-401",
        badge: "Low Stock (3 left)",
      },
      inferenceMetadata: {
        latency: "54ms",
        confidence: 99.4,
        sku: "NA-HSP-401",
      },
    };
  }

  if (normalized.includes("compare") || normalized.includes("merino") || normalized.includes("synthetic")) {
    return {
      id: `bot-${Date.now()}`,
      sender: "bot",
      text: "Comparison: Merino Wool offers superior natural odor resistance and thermoregulation when damp, whereas the Synthetic Thermal excels at rapid moisture evacuation during high-output alpine ascents.",
      timestamp: timeStr,
      productCard: {
        title: "Merino 220 Thermal Crew",
        price: "$92.00",
        specs: "100% 18.5µ Merino • 220gsm • Flatlock seams",
        sku: "SKU-MC-220",
        badge: "Best Seller",
      },
      inferenceMetadata: {
        latency: "62ms",
        confidence: 98.9,
        sku: "MC-TH-220",
      },
    };
  }

  return {
    id: `bot-${Date.now()}`,
    sender: "bot",
    text: `Semantic vector search resolved for "${query}". Cross-referenced against 12,480 catalog attributes, customer feedback vectors, and live warehouse inventory.`,
    timestamp: timeStr,
    productCard: {
      title: "Alpine Summit Pack 38L",
      price: "$189.00",
      specs: "Ultra-high molecular weight polyethylene grid • 840g",
      sku: "SKU-ASP-38",
      badge: "In Stock",
    },
    inferenceMetadata: {
      latency: "58ms",
      confidence: 98.7,
      sku: "ASP-38L",
    },
  };
}
