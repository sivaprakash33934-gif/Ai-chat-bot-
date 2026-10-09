"use client";

import { useState } from "react";

const CODE_EXAMPLES = {
  typescript: `import { NeuralCommerce } from "@neural-commerce/sdk";

// Initialize stateless client
const neural = new NeuralCommerce({
  businessId: "store_pune_organics_01",
});

// Every request is self-contained and independent
const answer = await neural.ask({
  message: "Do you deliver organic Alphonso mangoes to Pune?",
});

// Response contains verified factual answer + stock status
console.log(answer.text);
// "Yes, same-day delivery available across Pune for orders placed before 2 PM."

// No conversation ID.
// No previous messages.
// Every request is independent.`,

  curl: `curl -X POST https://api.neuralcommerce.ai/v1/ask \\
  -H "Authorization: Bearer nc_live_sec_9941a8" \\
  -H "Content-Type: application/json" \\
  -d '{
    "businessId": "store_pune_organics_01",
    "message": "Do you deliver organic Alphonso mangoes to Pune?"
  }'

# 100% Stateless: No thread_id, no history required`,

  python: `from neural_commerce import NeuralCommerce

# Stateless inference client
client = NeuralCommerce(business_id="store_pune_organics_01")

# Single self-contained question
response = client.ask(
    message="Do you deliver organic Alphonso mangoes to Pune?"
)

print(response.text)
# No session persistence or chat thread required`,
};

export default function DevTerminal() {
  const [tab, setTab] = useState<"typescript" | "curl" | "python">("typescript");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(CODE_EXAMPLES[tab]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section
      className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto bg-[#06080C] text-white"
      aria-label="Developer Platform"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/70 border border-indigo-800/60 text-indigo-400 font-mono text-xs mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            <span>Developer API</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
            Memoryless By Design. Built for Any Stack.
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-6 max-w-prose">
            Integrate enterprise AI directly into your storefront, mobile app, ERP, or WhatsApp
            webhook. Every request is stateless and verified against your real inventory graph.
          </p>
          <ul className="space-y-3 text-xs sm:text-sm text-slate-300 font-mono">
            <li className="flex items-center gap-2.5">
              <span className="text-emerald-400 font-bold">✓</span> Full TypeScript & Python SDKs
            </li>
            <li className="flex items-center gap-2.5">
              <span className="text-emerald-400 font-bold">✓</span> Zero server-side conversation storage
            </li>
            <li className="flex items-center gap-2.5">
              <span className="text-emerald-400 font-bold">✓</span> Grounded in real catalog & GSTIN knowledge
            </li>
          </ul>
        </div>

        <div className="lg:col-span-7 rounded-2xl bg-[#030508] border border-slate-800/90 shadow-2xl overflow-hidden">
          {/* Tabs header */}
          <div className="px-4 py-3 bg-[#0a0d14] border-b border-slate-800/80 flex items-center justify-between">
            <div className="flex gap-2" role="tablist" aria-label="Code language selection">
              {(["typescript", "curl", "python"] as const).map((t) => (
                <button
                  key={t}
                  role="tab"
                  aria-selected={tab === t}
                  onClick={() => setTab(t)}
                  className={`min-h-[44px] min-w-[44px] text-xs font-mono px-3.5 py-2 rounded-lg transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] ${
                    tab === t
                      ? "bg-[#4F46E5] text-white"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                  }`}
                >
                  {t.toUpperCase()}
                </button>
              ))}
            </div>

            <button
              onClick={handleCopy}
              className="min-h-[44px] min-w-[44px] text-xs font-mono text-slate-300 hover:text-white px-4 py-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5]"
              aria-label="Copy code snippet"
            >
              {copied ? "Copied! ✓" : "Copy Snippet"}
            </button>
          </div>

          {/* Code Window */}
          <div className="p-5 font-mono text-xs overflow-x-auto text-slate-300 leading-relaxed bg-[#030508]">
            <pre className="selection:bg-[#4F46E5]/40 selection:text-white">
              <code>{CODE_EXAMPLES[tab]}</code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
