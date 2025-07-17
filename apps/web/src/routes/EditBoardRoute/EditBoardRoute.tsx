import { Board, BoardPropertiesMenu } from '../../components'
import { useBoardContext, useFlexComponents, useSelectedFlexComponents } from '../../hooks'

export function EditBoardRoute () {
  const { boardState, boardController, boardManager } = useBoardContext()

  const selected = useSelectedFlexComponents(boardState)
  const flexComponents = useFlexComponents(boardState)
  const selectedFlexComponents = flexComponents.filter(component => selected?.includes(component.id))

  return (
    <>
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
