import { useTutorial } from '@/tutorials'
import { BoardCanvas, useBoardStore } from '../../components'
import { useBoard, useMemberRole } from '../../hooks'
import { BoardPropertiesMenu } from './components'

export function EditBoardRoute () {
  const { boardState, boardController, boardManager } = useBoard()
  const selected = useBoardStore(boardState, 'selectedFlexComponentsChanged', state => state.selectedFlexComponents)
  const flexComponents = useBoardStore(boardState, 'flexComponentsChanged', state => state.flexComponents)
  const selectedFlexComponents = flexComponents.filter(component => selected?.includes(component.id))
  const memberRole = useMemberRole()
  const hasPermission = memberRole !== 'member'
  useTutorial('edit-board')

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
      <BoardCanvas
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
