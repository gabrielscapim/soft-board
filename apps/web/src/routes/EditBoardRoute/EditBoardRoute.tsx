import { useTutorial } from '@/tutorials'
import { BoardCanvas, useBoardStore } from '../../components'
import { useBoard, useMemberRole } from '../../hooks'
import { BoardPropertiesMenu } from './components'

export function EditBoardRoute () {
  const { boardState, boardController, boardManager } = useBoard()
  const selected = useBoardStore(boardState, 'selectedSoftComponentsChanged', state => state.selectedSoftComponents)
  const softComponents = useBoardStore(boardState, 'softComponentsChanged', state => state.softComponents)
  const selectedSoftComponents = softComponents.filter(component => selected?.includes(component.id))
  const memberRole = useMemberRole()
  const hasPermission = memberRole !== 'member'
  useTutorial('edit-board')

  return (
    <>
      {selectedSoftComponents.length > 0 && hasPermission && (
        <BoardPropertiesMenu
          boardState={boardState}
          boardController={boardController}
          softComponents={softComponents}
          selectedSoftComponents={selectedSoftComponents}
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
