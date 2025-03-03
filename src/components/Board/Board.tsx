import Cursor from '../../public/cursor.png'
import { useBoardTranslate, useDraggableFlexBoard, useElementResizer, useFlexComponents, useScale, useSelectedFlexComponent, useZoomBoard } from '../../hooks'
import { createElement, useRef } from 'react'
import { BoardController, BoardState } from '../../lib'
import { FLEX_COMPONENTS } from '../../flex-components'
import { AlignmentGuides, ConnectionLines, ResizeBox } from './subcomponents'

export type BoardProps = {
  boardState: BoardState
  boardController: BoardController
}

export function Board (props: BoardProps) {
  const { boardState } = props

  const flexBoardContainerRef = useRef<HTMLDivElement>(null)
  const flexBoardRef = useRef<HTMLDivElement>(null)
  const flexComponents = useFlexComponents(boardState)
  const scale = useScale(boardState)
  const boardTranslate = useBoardTranslate(boardState)
  const selectedFlexComponent = useSelectedFlexComponent(boardState)

  useDraggableFlexBoard(boardState, flexBoardContainerRef.current)
  useElementResizer(boardState, flexBoardContainerRef.current)
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
            },
            boardController: props.boardController
          })
        ))}

        {selectedFlexComponent && <ResizeBox boardState={boardState} />}
      </div>

      {selectedFlexComponent && (
        <AlignmentGuides
          boardState={boardState}
          boardTranslate={boardTranslate}
          scale={scale}
        />
      )}

      <ConnectionLines
        boardState={boardState}
        boardTranslate={boardTranslate}
        scale={scale}
      />
    </div>
  )
}
