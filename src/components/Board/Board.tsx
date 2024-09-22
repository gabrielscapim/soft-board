import Cursor from '../../public/cursor.png'
import { useBoardTranslate, useDraggableFlexBoard, useFlexComponents, useScale, useZoomBoard } from '../../hooks'
import { createElement, useRef } from 'react'
import { BoardState } from '../../lib'
import { FLEX_COMPONENTS } from '../../flex-components'

export type LayoutProps = {
  boardState: BoardState
}

export function Board (props: LayoutProps) {
  const { boardState } = props

  const flexBoardContainerRef = useRef<HTMLDivElement>(null)
  const flexBoardRef = useRef<HTMLDivElement>(null)
  const flexComponents = useFlexComponents(boardState)
  const scale = useScale(boardState)
  const boardTranslate = useBoardTranslate(boardState)
  useDraggableFlexBoard(boardState, flexBoardContainerRef.current)
  useZoomBoard(boardState, flexBoardContainerRef.current, flexBoardRef.current)

  return (
    <div
      id="flex-board-container"
      ref={flexBoardContainerRef}
      className="relative w-full h-full overflow-hidden"
      style={{
        cursor: `url(${Cursor}) 0 0, auto`
      }}
    >
      <div
        id="grid"
        className="absolute w-screen h-screen"
      />
      <div
        id="flex-board"
        ref={flexBoardRef}
        className="w-0 h-0 absolute"
        style={{ transform: `translate(${boardTranslate.x}px, ${boardTranslate.y}px) scale(${scale})` }}
      >
        {flexComponents.map(flexComponent => (
          createElement(FLEX_COMPONENTS[flexComponent.type], {
            key: flexComponent.id,
            component: {
              ...flexComponent
            }
          })
        ))}
      </div>
    </div>
  )
}
