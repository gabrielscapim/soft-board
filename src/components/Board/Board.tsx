import { BoardController, BoardState } from '../../lib'
import { Grid } from './subcomponents'

export type LayoutProps = {
  boardState: BoardState
  boardController: BoardController
}

export function Board (props: LayoutProps) {
  return (
    <Grid />
  )
}
