import { useGuides, useSelectedFlexComponent } from '../../../hooks'
import { BoardState } from '../../../lib'
import { Offset } from '../../../types'

export type AlignmentGuidesProps = {
  boardState: BoardState
  boardTranslate: Offset
  scale: number
}

export function AlignmentGuides (props: AlignmentGuidesProps) {
  const { boardState, boardTranslate, scale } = props

  const selectedFlexComponent = useSelectedFlexComponent(boardState)
  const guides = useGuides(boardState)

  if (!selectedFlexComponent) return null

  const transform = (value: number) => value * scale

  return (
    <svg
      id="alignment-guides"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1000,
      }}
    >
      {guides.horizontal.map((guide, index) => {
        const yPos = transform(guide.lineGuide) + boardTranslate.y

        return (
          <line
            key={`horizontal-guide-${index}`}
            x1={-5000}
            y1={yPos}
            x2={5000}
            y2={yPos}
            stroke="rgba(30, 144, 255, 0.8)"
            strokeWidth={2}
            strokeDasharray="3,5"
          />
        )
      })}
      {guides.vertical.map((guide, index) => {
        const xPos = transform(guide.lineGuide) + boardTranslate.x

        return (
          <line
            key={`vertical-guide-${index}`}
            x1={xPos}
            y1={-5000}
            x2={xPos}
            y2={5000}
            stroke="rgba(30, 144, 255, 0.8)"
            strokeWidth={2}
            strokeDasharray="3,5"
          />
        )
      })}
    </svg>
  )
}
