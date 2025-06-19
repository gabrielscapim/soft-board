import { Board } from '../../components'
import { useBoard, useFlexComponents, useSelectedFlexComponents } from '../../hooks'
import { BoardPropertiesMenu } from './components'

export function BoardRoute () {
  const { boardState, boardController } = useBoard()

  const selected = useSelectedFlexComponents(boardState)
  const flexComponents = useFlexComponents(boardState)
  const selectedFlexComponents = flexComponents.filter(component => selected?.includes(component.id))

  return (
    <>
      {selectedFlexComponents.length > 0 && (
        <BoardPropertiesMenu
          selectedFlexComponents={selectedFlexComponents}
        />
      )}
      <Board boardState={boardState} boardController={boardController} />
    </>
  )
}
