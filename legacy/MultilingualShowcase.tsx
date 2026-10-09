"use client";

import React, { useState } from "react";
import { MessageSquare, Mic, Volume2, ArrowRightLeft, Sparkles, CheckCheck } from "lucide-react";

export function MultilingualShowcase() {
  const [activeTab, setActiveTab] = useState<"tamil" | "english">("tamil");

  return (
    <section className="py-20 bg-canvas-deep border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="eyebrow mb-2">VERNACULAR COMMERCE COGNITION // NOTO SANS TAMIL</div>
            <h2 className="text-section font-display font-semibold text-ink-primary tracking-tight">
              Native Indic Voice &amp; Chat Ordering Engine
            </h2>
          </div>

          <div className="flex items-center gap-2 p-1 rounded-micro bg-surface-2 border border-border">
            <button
              onClick={() => setActiveTab("tamil")}
              className={`px-3 py-1 rounded-micro text-xs font-mono transition-colors ${
                activeTab === "tamil"
                  ? "bg-signal-commerce text-canvas-deep font-bold"
                  : "text-ink-secondary hover:text-ink-primary"
              }`}
            >
              தமிழ் (Tamil)
            </button>
            <button
              onClick={() => setActiveTab("english")}
              className={`px-3 py-1 rounded-micro text-xs font-mono transition-colors ${
                activeTab === "english"
                  ? "bg-signal-ai text-white font-bold"
                  : "text-ink-secondary hover:text-ink-primary"
              }`}
            >
              English
            </button>
          </div>
        </div>

        {/* Dual Mock View: Vernacular WhatsApp Flow vs AI Structured Output */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* Left: WhatsApp Voice & Chat Interaction */}
          <div className="p-6 rounded-panel bg-surface-1 border border-border flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-border text-telemetry font-mono text-ink-muted">
                <span className="flex items-center gap-2 text-signal-growth">
                  <span className="w-2 h-2 rounded-pill bg-signal-growth animate-pulse" />
                  WHATSAPP COMMERCE INGEST
                </span>
                <span>CUSTOMER: KANDASAMY TRADERS, MADURAI</span>
              </div>

              {/* Chat Bubbles */}
              <div className="space-y-4">
                {/* Incoming User Message */}
                <div className="p-3.5 rounded-card bg-surface-2 border border-border max-w-[90%]">
                  <div className="flex items-center gap-2 mb-1.5 text-micro font-mono text-signal-commerce">
                    <Mic className="w-3 h-3 text-signal-commerce" />
                    <span>VOICE NOTE TRANSCRIBED (14 SECONDS)</span>
                  </div>
                  {activeTab === "tamil" ? (
                    <p className="font-tamil text-ink-primary text-sm leading-relaxed">
                      &quot;தம்பி, திருப்பூர் ஆலைக்கு 50 மூட்டை பொன்னி அரிசி மற்றும் 20 மூட்டை புழுங்கல் அரிசி அவசரமா வேணும். வண்டி நாளைக்கு காலை 8 மணிக்குள்ள வரணும். பில் போட்டு WhatsApp-ல அனுப்புங்க.&quot;
                    </p>
                  ) : (
                    <p className="text-ink-primary text-sm leading-relaxed font-body">
                      &quot;Brother, urgent requirement for Tiruppur mill: 50 bags Ponni rice and 20 bags boiled rice. Vehicle must arrive by 8:00 AM tomorrow. Generate bill and send on WhatsApp.&quot;
                    </p>
                  )}
                  <div className="text-[10px] text-ink-muted text-right font-mono mt-1">10:14 AM</div>
                </div>

                {/* AI Automated Bot Response */}
                <div className="p-3.5 rounded-card bg-surface-3 border border-border-strong max-w-[90%] ml-auto">
                  <div className="flex items-center justify-between mb-1.5 text-micro font-mono text-signal-ai">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> NEURAL BOT AUTONOMOUS CONFIRMATION
                    </span>
                    <CheckCheck className="w-3.5 h-3.5 text-signal-growth" />
                  </div>
                  {activeTab === "tamil" ? (
                    <p className="font-tamil text-ink-primary text-sm leading-relaxed">
                      &quot;வணக்கம் கந்தசாமி அண்ணா! உங்கள் ஆணை பதிவு செய்யப்பட்டது (Order #NCC-892). மொத்த மதிப்பு ₹1,82,400 (வரி உட்பட). சரக்கு லாரி நாளை காலை 7:30-க்கு புறப்படும். உடனடி ரசீது மற்றும் UPI QR கீழே இணைக்கப்பட்டுள்ளது.&quot;
                    </p>
                  ) : (
                    <p className="text-ink-primary text-sm leading-relaxed font-body">
                      &quot;Greetings Kandasamy! Your order is logged (#NCC-892). Total value ₹1,82,400 (incl. GST). Delivery vehicle departs at 7:30 AM tomorrow. Instant invoice and UPI QR attached below.&quot;
                    </p>
                  )}
                  <div className="text-[10px] text-ink-muted text-right font-mono mt-1">10:14 AM [0.4s response]</div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-telemetry font-mono text-ink-tertiary">
              <span>INDIC SPEECH-TO-TEXT:</span>
              <span className="text-signal-growth">99.4% ACCURACY</span>
            </div>
          </div>

          {/* Right: Realtime Parsed Telemetry Data Structure */}
          <div className="p-6 rounded-panel bg-surface-2 border border-border strong:border-border-strong font-mono flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-border text-telemetry text-ink-muted">
                <span className="text-signal-ai">EXTRACTED SCHEMA // JSON V2</span>
                <span className="text-signal-commerce">PARSER: TAMIL-INDIC-V1</span>
              </div>

              {/* Code JSON representation */}
              <div className="bg-canvas-deep p-4 rounded-input border border-border text-xs text-ink-secondary space-y-1.5 overflow-x-auto">
                <div>&#123;</div>
                <div className="pl-4">
                  <span className="text-signal-ai">&quot;buyer_legal_name&quot;</span>: &quot;Kandasamy Modern Traders&quot;,
                </div>
                <div className="pl-4">
                  <span className="text-signal-ai">&quot;gstin&quot;</span>: &quot;33AAAFK0912Q1ZX&quot;,
                </div>
                <div className="pl-4">
                  <span className="text-signal-ai">&quot;delivery_destination&quot;</span>: &quot;Tiruppur Mill Cluster&quot;,
                </div>
                <div className="pl-4">
                  <span className="text-signal-ai">&quot;line_items&quot;</span>: [
                </div>
                <div className="pl-8 text-ink-primary">
                  &#123; &quot;sku&quot;: &quot;RICE-PONNI-50KG&quot;, &quot;qty&quot;: 50, &quot;unit_inr&quot;: 2400 &#125;,
                </div>
                <div className="pl-8 text-ink-primary">
                  &#123; &quot;sku&quot;: &quot;RICE-BOILED-50KG&quot;, &quot;qty&quot;: 20, &quot;unit_inr&quot;: 2100 &#125;
                </div>
                <div className="pl-4">],</div>
                <div className="pl-4">
                  <span className="text-signal-ai">&quot;subtotal_inr&quot;</span>: 162000,
                </div>
                <div className="pl-4">
                  <span className="text-signal-ai">&quot;gst_5_percent&quot;</span>: 8100,
                </div>
                <div className="pl-4">
                  <span className="text-signal-ai">&quot;freight_charge&quot;</span>: 12300,
                </div>
                <div className="pl-4">
                  <span className="text-signal-commerce">&quot;total_payable&quot;</span>: 182400,
                </div>
                <div className="pl-4">
                  <span className="text-signal-growth">&quot;eway_bill_status&quot;</span>: &quot;READY_FOR_DISPATCH&quot;
                </div>
                <div>&#125;</div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-telemetry text-ink-tertiary">
              <span>ZERO DATA ENTRY ERROR</span>
              <span className="text-signal-commerce">1-CLICK TALLY VOUCHER</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
