import Cursor from '../../public/cursor.png'
import { useDraggableFlexBoard, useFlexComponents } from '../../hooks'
import { createElement, useRef } from 'react'
import { BoardState } from '../../lib'
import { FLEX_COMPONENTS } from '../../flex-components'

export type LayoutProps = {
  boardState: BoardState
}

export function Board (props: LayoutProps) {
  const { boardState } = props

  const ref = useRef<HTMLDivElement>(null)
  const flexComponents = useFlexComponents(boardState)
  useDraggableFlexBoard(boardState, ref.current)

  return (
    <div
      id="flex-board-container"
      ref={ref}
      className="relative w-full h-full overflow-hidden"
    >
      <div
        id="grid"
        className="absolute w-screen h-screen"
        style={{
          cursor: `url(${Cursor}) 0 0, auto`
        }}
      />
      <div
        id="flex-board"
        className="w-0 h-0 absolute"
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
