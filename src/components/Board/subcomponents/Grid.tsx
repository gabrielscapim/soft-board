import { useGrid } from '../../../hooks/use-grid'
import { BoardState } from '../../../lib'

export type GridProps = {
  boardState: BoardState
}

// https://stackoverflow.com/questions/14208673/how-to-draw-grid-using-html5-and-canvas-or-svg
export function Grid (props: GridProps) {
  const { boardState } = props

  const smallGrid = useGrid(boardState)
  const largeGrid = 10 * smallGrid

  return (
    <>
      <defs>
        {/* Small squares */}
        <pattern
          id="smallGrid"
          width={smallGrid}
          height={smallGrid}
          patternUnits="userSpaceOnUse"
        >
          <path
            d={`M ${smallGrid} 0 L 0 0 0 ${smallGrid}`}
            fill="none"
            stroke="gray"
            strokeWidth="0.5"
          />
        </pattern>

        {/* Big squares */}
        <pattern
          id="largeGrid"
          width={largeGrid}
          height={largeGrid}
          patternUnits="userSpaceOnUse"
        >
          <rect
            width={largeGrid}
            height={largeGrid}
            fill="url(#smallGrid)"
          />
          <path
            d={`M ${largeGrid} 0 L 0 0 0 ${largeGrid}`}
            fill="none"
            stroke="gray"
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect
        width="100%"
        height="100%"
        fill="url(#largeGrid)"
      />
    </>
  )
}
