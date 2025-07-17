import { BoardContainerHeader } from './BoardContainerHeader'
import { Board, BoardPropertiesMenu } from '@/components'
import { useBoardContext, useFlexComponents, useSelectedFlexComponents } from '@/hooks'

export function BoardContainer () {
  const { boardState, boardController, boardManager } = useBoardContext()

  const selected = useSelectedFlexComponents(boardState)
  const flexComponents = useFlexComponents(boardState)
  const selectedFlexComponents = flexComponents.filter(component => selected?.includes(component.id))

  return (
    <>
      <BoardContainerHeader
        boardState={boardState}
        boardController={boardController}
      />
      {selectedFlexComponents.length > 0 && (
        <BoardPropertiesMenu
          boardState={boardState}
          boardController={boardController}
          selectedFlexComponents={selectedFlexComponents}
        />
      )}
      <Board
        boardState={boardState}
        boardController={boardController}
        boardManager={boardManager}
      />
    </>
  )
}
