import {
  Board,
  BoardPropertiesMenu,
  useFlexComponents,
  useSelectedFlexComponents
} from '../../components'
import { useBoard, useMemberRole } from '../../hooks'

export function EditBoardRoute () {
  const { boardState, boardController, boardManager } = useBoard()
  const selected = useSelectedFlexComponents(boardState)
  const flexComponents = useFlexComponents(boardState)
  const selectedFlexComponents = flexComponents.filter(component => selected?.includes(component.id))
  const memberRole = useMemberRole()
  const hasPermission = memberRole !== 'member'

  return (
    <>
      {selectedFlexComponents.length > 0 && hasPermission && (
        <BoardPropertiesMenu
          boardState={boardState}
          boardController={boardController}
          flexComponents={flexComponents}
          selectedFlexComponents={selectedFlexComponents}
        />
      )}
      <Board
        enableSelection={hasPermission}
        enableResizing={hasPermission}
        enableDraggable={hasPermission}
        enableKeyboardShortcuts={hasPermission}
        boardState={boardState}
        boardController={boardController}
        boardManager={boardManager}
      />
    </>
  )
}
