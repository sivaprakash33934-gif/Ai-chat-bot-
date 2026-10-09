import { pipelineSteps } from '@/lib/pipeline-data'

const COLS = 4
const BOX_W = 200
const BOX_H = 84
const GAP_X = 36
const GAP_Y = 64
const PAD = 24

// Decorative-redundant: the authoritative, accessible version of this
// content is the <SpecList> rendered immediately below it on the page.
export function PipelineDiagramSVG() {
  const rows = Math.ceil(pipelineSteps.length / COLS)
  const width = PAD * 2 + COLS * BOX_W + (COLS - 1) * GAP_X
  const height = PAD * 2 + rows * BOX_H + (rows - 1) * GAP_Y

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-hidden="true"
      style={{ width: '100%', height: 'auto', display: 'block' }}
    >
      <defs>
        <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 z" fill="var(--color-hairline)" />
        </marker>
      </defs>

      {pipelineSteps.map((step, i) => {
        const col = i % COLS
        const row = Math.floor(i / COLS)
        const x = PAD + col * (BOX_W + GAP_X)
        const y = PAD + row * (BOX_H + GAP_Y)
        const isApproval = Boolean(step.isApprovalStep)
        const connectsRight = col < COLS - 1 && i < pipelineSteps.length - 1
        const wrapsToNextRow = col === COLS - 1 && i < pipelineSteps.length - 1

        return (
          <g key={step.id}>
            <rect
              x={x}
              y={y}
              width={BOX_W}
              height={BOX_H}
              fill="var(--color-paper)"
              stroke={isApproval ? 'var(--color-signal-amber)' : 'var(--color-hairline)'}
              strokeWidth={isApproval ? 2 : 1}
            />
            <text x={x + 16} y={y + 28} fontFamily="var(--font-mono)" fontSize="11" fill="var(--color-ink-muted)">
              {String(i + 1).padStart(2, '0')}
            </text>
            {/* Amber signals approval via the 2px border only (non-text UI,
                3:1 threshold per WCAG 1.4.11). Text stays ink for AA 4.5:1. */}
            <text
              x={x + 16}
              y={y + 52}
              fontFamily="var(--font-mono)"
              fontSize="13"
              fontWeight={isApproval ? 600 : 400}
              fill="var(--color-ink)"
            >
              {step.label}
            </text>

            {connectsRight && (
              <line
                x1={x + BOX_W}
                y1={y + BOX_H / 2}
                x2={x + BOX_W + GAP_X}
                y2={y + BOX_H / 2}
                stroke="var(--color-hairline)"
                strokeWidth="1"
                markerEnd="url(#arrow)"
              />
            )}

            {wrapsToNextRow && (
              <path
                d={`M ${x + BOX_W / 2} ${y + BOX_H} V ${y + BOX_H + GAP_Y / 2} H ${PAD + BOX_W / 2} V ${
                  y + BOX_H + GAP_Y
                }`}
                fill="none"
                stroke="var(--color-hairline)"
                strokeWidth="1"
                markerEnd="url(#arrow)"
              />
            )}
          </g>
        )
      })}
    </svg>
  )
}
