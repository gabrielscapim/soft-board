import { FLEX_COMPONENTS_SCHEMAS } from '../../../flex-components'
import { useFlexComponents, useGrid, useSelectedFlexComponents } from '../hooks'
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

const RESIZER_SIZE = 8

export function ResizeBox (props: ResizeBoxProps) {
  const { boardState } = props

  const flexComponents = useFlexComponents(boardState)
  const selected = useSelectedFlexComponents(boardState)
  const minDistance = useGrid(boardState)

  const selectedFlexComponents = flexComponents.filter(flexComponent =>selected?.includes(flexComponent.id))

  if (selectedFlexComponents.length === 0) {
    return null
  }

  const boundingBox = selectedFlexComponents.reduce((acc, flexComponent, index) => {
    const { x, y, width, height } = flexComponent.properties

    const flexComponentRight = x + width
    const flexComponentBotoom = y + height

    if (index === 0) {
      return { x, y, right: flexComponentRight, bottom: flexComponentBotoom }
    }

    return {
      x: Math.min(acc.x, x),
      y: Math.min(acc.y, y),
      right: Math.max(acc.right, flexComponentRight),
      bottom: Math.max(acc.bottom, flexComponentBotoom)
    }
  }, { x: Infinity, y: Infinity, right: -Infinity, bottom: -Infinity })

  const boxX = boundingBox.x
  const boxY = boundingBox.y
  const boxWidth = boundingBox.right - boundingBox.x
  const boxHeight = boundingBox.bottom - boundingBox.y

  const adjustedX = boxWidth < minDistance * 2 ? boxX - (minDistance - boxWidth / 2) : boxX
  const adjustedY = boxHeight < minDistance * 2 ? boxY - (minDistance - boxHeight / 2) : boxY
  const adjustedWidth = Math.max(boxWidth, minDistance * 2)
  const adjustedHeight = Math.max(boxHeight, minDistance * 2)

  const resizers: ResizerConfig[] = [
    { left: adjustedX + adjustedWidth / 2 - RESIZER_SIZE / 2, top: adjustedY - RESIZER_SIZE / 2, id: 'n', cursor: 'n-resize' },
    { left: adjustedX + adjustedWidth - RESIZER_SIZE / 2, top: adjustedY - RESIZER_SIZE / 2, id: 'ne', cursor: 'ne-resize' },
    { left: adjustedX + adjustedWidth - RESIZER_SIZE / 2, top: adjustedY + adjustedHeight / 2 - RESIZER_SIZE / 2, id: 'e', cursor: 'e-resize' },
    { left: adjustedX + adjustedWidth - RESIZER_SIZE / 2, top: adjustedY + adjustedHeight - RESIZER_SIZE / 2, id: 'se', cursor: 'se-resize' },
    { left: adjustedX + adjustedWidth / 2 - RESIZER_SIZE / 2, top: adjustedY + adjustedHeight - RESIZER_SIZE / 2, id: 's', cursor: 's-resize' },
    { left: adjustedX - RESIZER_SIZE / 2, top: adjustedY + adjustedHeight - RESIZER_SIZE / 2, id: 'sw', cursor: 'sw-resize' },
    { left: adjustedX - RESIZER_SIZE / 2, top: adjustedY + adjustedHeight / 2 - RESIZER_SIZE / 2, id: 'w', cursor: 'w-resize' },
    { left: adjustedX - RESIZER_SIZE / 2, top: adjustedY - RESIZER_SIZE / 2, id: 'nw', cursor: 'nw-resize' },
  ]

  const notHorizontalResizable = selectedFlexComponents.some(flexComponent => FLEX_COMPONENTS_SCHEMAS[flexComponent.type]?.resizable?.horizontal === false)
  const notVerticalResizable = selectedFlexComponents.some(flexComponent => FLEX_COMPONENTS_SCHEMAS[flexComponent.type]?.resizable?.vertical === false)

  return (
    <div>
      <div
        className="absolute border-2 border-sky-500 pointer-events-none"
        style={{
          left: boxX,
          top: boxY,
          width: boxWidth,
          height: boxHeight,
          zIndex: 1000
        }}
      />
      {resizers.map(resizer => {
        if (notHorizontalResizable) {
          if (resizer.id === 'e' || resizer.id === 'w' || resizer.id === 'ne' || resizer.id === 'se' || resizer.id === 'nw' || resizer.id === 'sw') {
            return
          }
        }

        if (notVerticalResizable) {
          if (resizer.id === 'n' || resizer.id === 's' || resizer.id === 'ne' || resizer.id === 'se' || resizer.id === 'nw' || resizer.id === 'sw') {
            return
          }
        }

        return (
          <div
            key={resizer.id}
            id={resizer.id}
            className="absolute bg-white border-[1px] border-sky-500 rounded-full resizer"
            style={{
              cursor: resizer.cursor,
              left: resizer.left,
              top: resizer.top,
              width: RESIZER_SIZE,
              height: RESIZER_SIZE,
              zIndex: 1001
            }}
          />
        )
      })}
    </div>
  )
}
