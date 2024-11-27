import { useGuides, useSelectedFlexComponent } from '../../../hooks'
import { BoardState } from '../../../lib'

export type AlignmentGuidesProps = {
  boardState: BoardState
}

export function AlignmentGuides (props: AlignmentGuidesProps) {
  const { boardState } = props

  const selectedFlexComponent = useSelectedFlexComponent(boardState)
  const guides = useGuides(boardState)

  if (!selectedFlexComponent) return

  return (
    <div id="alignment-guides">
      {guides.horizontal.map((guide, index) => (
        <div
          key={`horizontal-guide-${index}`}
          className="absolute pointer-events-none border-[0.5px] border-dashed border-blue-500"
          style={{
            top: guide.lineGuide,
            left: -5000,
            width: 10000,
          }}
        />
      ))}

      {guides.vertical.map((guide, index) => (
        <div
          key={`vertical-guide-${index}`}
          className="absolute pointer-events-none border-[0.5px] border-dashed border-blue-500"
          style={{
            top: -5000,
            left: guide.lineGuide,
            height: 10000
          }}
        />
      ))}
    </div>
  )
}
