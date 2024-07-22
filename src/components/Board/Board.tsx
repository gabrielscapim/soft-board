import { createElement, useRef } from 'react'
import { useDraggableFlexBoard, useFlexComponents } from '../../hooks'
import { BoardState } from '../../lib'
import { Grid } from './subcomponents'
import { FLEX_COMPONENTS } from '../../flex-components'

export type LayoutProps = {
  boardState: BoardState
}

export function Board (props: LayoutProps) {
  const { boardState } = props

  const ref = useRef<SVGSVGElement>(null)
  const flexComponents = useFlexComponents(boardState)
  useDraggableFlexBoard(boardState, ref.current)

  return (
    <svg
      width="100%"
      height="100%"
      id="flex-board"
      ref={ref}
    >
      <Grid />
      {flexComponents.map(flexComponent => (
        createElement(FLEX_COMPONENTS[flexComponent.type], {
          key: flexComponent.id,
          component: {
            ...flexComponent
          }
        })
      ))}
    </svg>
  )
}
