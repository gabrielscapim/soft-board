import { BoardContainerHeader } from './BoardContainerHeader'
import { Board, BoardPropertiesMenu, BoardProps } from '@/components'
import { useBoardContext, useFlexComponents, useSelectedFlexComponents } from '@/hooks'

export type BoardContainerProps = Partial<BoardProps> & {
  enableFullScreen?: boolean
}

export function BoardContainer (props: BoardContainerProps) {
  const { boardState, boardController, boardManager } = useBoardContext()

  const selected = useSelectedFlexComponents(boardState)
  const flexComponents = useFlexComponents(boardState)
  const selectedFlexComponents = flexComponents.filter(component => selected?.includes(component.id))

  return (
    <>
      <BoardContainerHeader
        enableFullScreen={props.enableFullScreen}
        boardState={boardState}
        boardController={boardController}
      />
      {selectedFlexComponents.length > 0 && props.enableSelection &&  (
        <BoardPropertiesMenu
          className="top-30"
          boardState={boardState}
          boardController={boardController}
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
