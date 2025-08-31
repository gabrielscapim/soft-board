import {
  Board,
  BoardPropertiesMenu,
  useFlexComponents,
  useSelectedFlexComponents
} from '../../components'
import { useBoard } from '../../hooks'

export function EditBoardRoute () {
  const { boardState, boardController, boardManager } = useBoard()

  const selected = useSelectedFlexComponents(boardState)
  const flexComponents = useFlexComponents(boardState)
  const selectedFlexComponents = flexComponents.filter(component => selected?.includes(component.id))

  return (
    <>
      {selectedFlexComponents.length > 0 && (
        <BoardPropertiesMenu
          boardState={boardState}
          boardController={boardController}
          flexComponents={flexComponents}
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
