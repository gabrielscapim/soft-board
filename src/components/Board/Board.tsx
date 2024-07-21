import { createElement } from 'react'
import { useFlexComponents } from '../../hooks'
import { BoardState } from '../../lib'
import { Grid } from './subcomponents'
import { FLEX_COMPONENTS } from '../../flex-components'

export type LayoutProps = {
  boardState: BoardState
}

export function Board (props: LayoutProps) {
  const { boardState } = props

  const flexComponents = useFlexComponents(boardState)

  return (
    <Grid>
      {flexComponents.map(flexComponent => (
        createElement(FLEX_COMPONENTS[flexComponent.type], {
          key: flexComponent.id,
          component: {
            ...flexComponent
          }
        })
      ))}
    </Grid>
  )
}
