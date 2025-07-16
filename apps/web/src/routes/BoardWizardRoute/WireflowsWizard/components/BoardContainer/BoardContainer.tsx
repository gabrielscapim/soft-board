import { BoardController, BoardState } from '@/lib'
import { BoardContainerHeader } from './BoardContainerHeader'
import { Board, BoardPropertiesMenu } from '@/components'
import { useFlexComponents, useSelectedFlexComponents } from '@/hooks'

export function BoardContainer () {
  const boardState = new BoardState()
  const boardController = new BoardController(boardState)

  const selected = useSelectedFlexComponents(boardState)
  const flexComponents = useFlexComponents(boardState)
  const selectedFlexComponents = flexComponents.filter(component => selected?.includes(component.id))

  return (
    <>
      <BoardContainerHeader />
      {selectedFlexComponents.length > 0 && (
        <BoardPropertiesMenu
          selectedFlexComponents={selectedFlexComponents}
        />
      )}
      <Board boardState={boardState} boardController={boardController} />
    </>
  )
}
