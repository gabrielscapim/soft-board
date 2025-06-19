import { Board } from '../../components'
import { useBoard, useFlexComponents, useSelectedFlexComponents } from '../../hooks'
import { BoardPropertiesMenu } from './components'

export function BoardRoute () {
  const { boardState,  boardController } = useBoard()

  const selectedFlexComponents = useSelectedFlexComponents(boardState)
  const flexComponents = useFlexComponents(boardState)

  const selected = flexComponents.find(component => component.id === selectedFlexComponents?.[0])

  return (
    <>
      {selectedFlexComponents?.length === 1 && selected && (
        <BoardPropertiesMenu
          selected={selected}
          boardState={boardState}
          boardController={boardController}
        />
      )}
      <Board boardState={boardState} boardController={boardController} />
    </>
  )
}
