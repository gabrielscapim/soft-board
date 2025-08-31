import { Board, BoardPropertiesMenu, BoardProps, useFlexComponents, useSelectedFlexComponents } from '@/components'
import { useBoard } from '@/hooks'

export type BoardContainerProps = Partial<BoardProps> & {
  enableFullScreen?: boolean
}

export function BoardContainer (props: BoardContainerProps) {
  const { boardState, boardController, boardManager } = useBoard()

  const selected = useSelectedFlexComponents(boardState)
  const flexComponents = useFlexComponents(boardState)
  const selectedFlexComponents = flexComponents.filter(component => selected?.includes(component.id))

  return (
    <>
      {selectedFlexComponents.length > 0 && props.enableSelection &&  (
        <BoardPropertiesMenu
          className="top-30"
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
        {...props}
      />
    </>
  )
}
