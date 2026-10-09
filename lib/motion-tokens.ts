export const MOTION = {
  duration: {
    micro: 0.15,      // 100-200ms: buttons, focus rings, toggles
    short: 0.2,       // 150-250ms: tab switches, link lines, status pills
    medium: 0.35,     // 300-450ms: card accordion, drawer, panel reveals
    long: 0.5,        // 400-550ms: section entrance, container transitions
    extended: 0.85,   // 700-950ms: hero headline line mask, SVG trace draw
  },
  easing: {
    // Editorial ease: sharp acceleration, long gradual settle
    easeOut: [0.16, 1, 0.3, 1] as const,
    easeInOut: [0.4, 0, 0.2, 1] as const,
    // Step function for terminal/ledger mechanical tick
    step: 'steps(3, end)',
  },
  stagger: {
    fast: 0.05,       // 50ms per item (evidence chips, table rows)
    medium: 0.1,      // 100ms per item (rule ladder, major cards)
  },
  distance: {
    subtle: 6,        // 6px micro-translate
    medium: 12,       // 12px card entrance
  },
} as const;
