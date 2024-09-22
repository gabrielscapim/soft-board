import { useSelectedFlexComponent } from '../../../hooks'
import { useGrid } from '../../../hooks/use-grid'
import { BoardState } from '../../../lib'

export type ResizeBoxProps = {
  boardState: BoardState
}

type ResizerConfig = {
  left: number
  top: number
  id: string
  cursor: string
}

const resizerSize = 10

export function ResizeBox (props: ResizeBoxProps) {
  const { boardState } = props

  const selectedFlexComponent = useSelectedFlexComponent(boardState)
  const minDistance = useGrid(boardState)

  if (!selectedFlexComponent) {
    return null
  }

  const { properties: { x, y, width, height } } = selectedFlexComponent

  const adjustedX = width < minDistance * 2 ? x - (minDistance - width / 2) : x
  const adjustedY = height < minDistance * 2 ? y - (minDistance - height / 2) : y
  const adjustedWidth = Math.max(width, minDistance * 2)
  const adjustedHeight = Math.max(height, minDistance * 2)

  const resizers: ResizerConfig[] = [
    { left: adjustedX + adjustedWidth / 2 - resizerSize / 2, top: adjustedY - resizerSize / 2, id: 'n', cursor: 'n-resize' },
    { left: adjustedX + adjustedWidth - resizerSize / 2, top: adjustedY - resizerSize / 2, id: 'ne', cursor: 'ne-resize' },
    { left: adjustedX + adjustedWidth - resizerSize / 2, top: adjustedY + adjustedHeight / 2 - resizerSize / 2, id: 'e', cursor: 'e-resize' },
    { left: adjustedX + adjustedWidth - resizerSize / 2, top: adjustedY + adjustedHeight - resizerSize / 2, id: 'se', cursor: 'se-resize' },
    { left: adjustedX + adjustedWidth / 2 - resizerSize / 2, top: adjustedY + adjustedHeight - resizerSize / 2, id: 's', cursor: 's-resize' },
    { left: adjustedX - resizerSize / 2, top: adjustedY + adjustedHeight - resizerSize / 2, id: 'sw', cursor: 'sw-resize' },
    { left: adjustedX - resizerSize / 2, top: adjustedY + adjustedHeight / 2 - resizerSize / 2, id: 'w', cursor: 'w-resize' },
    { left: adjustedX - resizerSize / 2, top: adjustedY - resizerSize / 2, id: 'nw', cursor: 'nw-resize' },
  ]

  return (
    <div>
      <div
        className="absolute border-2 border-blue-500 pointer-events-none"
        style={{
          left: x,
          top: y,
          width: width,
          height: height,
        }}
      />
      {resizers.map(resizer => (
        <div
          key={resizer.id}
          id={resizer.id}
          className="absolute bg-sky-500 border-2 border-white rounded-full resizer"
          style={{
            cursor: resizer.cursor,
            left: resizer.left,
            top: resizer.top,
            width: resizerSize,
            height: resizerSize,
          }}
        />
      ))}
    </div>
  )
}
