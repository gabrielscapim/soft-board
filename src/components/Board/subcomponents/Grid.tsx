import { PropsWithChildren } from 'react'

export type GridProps = PropsWithChildren

const SMALLER_GRID = 10
const BIGGER_GRID = 10 * SMALLER_GRID

// https://stackoverflow.com/questions/14208673/how-to-draw-grid-using-html5-and-canvas-or-svg
export function Grid (props: GridProps) {
  return (
    <svg
      width="100%"
      height="100%"
    >
      <defs>
        {/* Smaller squares */}
        <pattern
          id="smallGrid"
          width={SMALLER_GRID}
          height={SMALLER_GRID}
          patternUnits="userSpaceOnUse"
        >
          <path
            d={`M ${SMALLER_GRID} 0 L 0 0 0 ${SMALLER_GRID}`}
            fill="none"
            stroke="gray"
            stroke-width="0.5"
          />
        </pattern>

        {/* Bigger squares */}
        <pattern
          id="grid"
          width={BIGGER_GRID}
          height={BIGGER_GRID}
          patternUnits="userSpaceOnUse"
        >
          <rect
            width={BIGGER_GRID}
            height={BIGGER_GRID}
            fill="url(#smallGrid)"
          />
          <path
            d={`M ${BIGGER_GRID} 0 L 0 0 0 ${BIGGER_GRID}`}
            fill="none"
            stroke="gray"
            stroke-width="1"
          />
        </pattern>
      </defs>
      <rect
        width="100%"
        height="100%"
        fill="url(#grid)"
      />
      {props.children}
    </svg>
  )
}
