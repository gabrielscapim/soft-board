const SMALL_GRID = 10
const LARGE_GRID = 10 * SMALL_GRID

// https://stackoverflow.com/questions/14208673/how-to-draw-grid-using-html5-and-canvas-or-svg
export function Grid () {
  return (
    <>
      <defs>
        {/* Small squares */}
        <pattern
          id="smallGrid"
          width={SMALL_GRID}
          height={SMALL_GRID}
          patternUnits="userSpaceOnUse"
        >
          <path
            d={`M ${SMALL_GRID} 0 L 0 0 0 ${SMALL_GRID}`}
            fill="none"
            stroke="gray"
            strokeWidth="0.5"
          />
        </pattern>

        {/* Big squares */}
        <pattern
          id="largeGrid"
          width={LARGE_GRID}
          height={LARGE_GRID}
          patternUnits="userSpaceOnUse"
        >
          <rect
            width={LARGE_GRID}
            height={LARGE_GRID}
            fill="url(#smallGrid)"
          />
          <path
            d={`M ${LARGE_GRID} 0 L 0 0 0 ${LARGE_GRID}`}
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
