export function NeuralCoreFallback() {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 640 520"
        className="h-full w-full max-h-[500px]"
        role="presentation"
      >
        <defs>
          <radialGradient id="core-halo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
          </radialGradient>
        </defs>

        <ellipse
          cx="320"
          cy="260"
          rx="276"
          ry="210"
          fill="#EEF2FF"
          fillOpacity="0.34"
          stroke="#E2E8F0"
          strokeOpacity="0.8"
        />

        <g
          fill="none"
          stroke="#94A3B8"
          strokeWidth="1"
          strokeOpacity="0.42"
        >
          <path d="M84 140 L190 115 L290 165 L390 120 L540 165" />
          <path d="M72 250 L185 215 L290 260 L405 215 L552 255" />
          <path d="M88 356 L200 325 L300 360 L410 328 L535 365" />

          <path d="M84 140 L185 215 L200 325" />
          <path d="M190 115 L290 260 L300 360" />
          <path d="M290 165 L405 215 L410 328" />
          <path d="M390 120 L552 255 L535 365" />

          <path d="M185 215 L290 165" />
          <path d="M290 260 L390 120" />
          <path d="M300 360 L405 215" />
        </g>

        {/* Input Layer (Amber) */}
        <g fill="#F59E0B">
          <circle cx="72" cy="250" r="5" />
          <circle cx="84" cy="140" r="4" />
          <circle cx="88" cy="356" r="4" />
        </g>

        {/* Hidden / Organize Layers (Indigo) */}
        <g fill="#4F46E5">
          <circle cx="190" cy="115" r="5" />
          <circle cx="185" cy="215" r="5" />
          <circle cx="200" cy="325" r="5" />

          <circle cx="290" cy="165" r="6" />
          <circle cx="290" cy="260" r="7" />
          <circle cx="300" cy="360" r="5" />

          <circle cx="390" cy="120" r="5" />
          <circle cx="405" cy="215" r="6" />
          <circle cx="410" cy="328" r="5" />
        </g>

        {/* Output Core Glow */}
        <circle cx="535" cy="260" r="72" fill="url(#core-halo)" />

        {/* Output / Act Layer (Emerald) */}
        <g fill="#10B981">
          <circle cx="540" cy="165" r="5" />
          <circle cx="552" cy="255" r="9" />
          <circle cx="535" cy="365" r="5" />
        </g>

        <g
          fontFamily="var(--font-mono), monospace"
          fontSize="10"
          letterSpacing="3.5"
        >
          <text x="58" y="455" fill="#B45309" fontWeight="bold">
            DATA ENTERS
          </text>
          <text x="250" y="455" fill="#4338CA" fontWeight="bold">
            ORGANIZES
          </text>
          <text x="475" y="455" fill="#047857" fontWeight="bold">
            ACTS
          </text>
        </g>
      </svg>
    </div>
  );
}

export default NeuralCoreFallback;
