import { Board, PreviewModeContainer, useBoardStore } from '@/components'
import { BoardState, BoardManager, BoardController } from '@/lib'
import { FlexComponent } from '@/types'
import { useMemo, useState } from 'react'
import { GetSharedBoardByTokenResult } from 'types/endpoints'
import { SharedBoardHeader } from '../SharedBoardHeader'
import { SharedBoardRequirementsContainer } from '../SharedBoardRequirementsContainer'

export type SharedBoardContainerProps = {
  sharedBoard: GetSharedBoardByTokenResult
}

export function SharedBoardContainer (props: SharedBoardContainerProps) {
  const { sharedBoard } = props

  const [mode, setMode] = useState<'board' | 'preview' | 'requirements'>('board')

  const components = useMemo(() => {
    return (
      sharedBoard.board.components.map<FlexComponent>(component => ({
        ...component,
        type: component.type as FlexComponent['type'],
        properties: component.properties as FlexComponent['properties']
      }))
    )
  }, [sharedBoard.board.components])

  const [board] = useState(() => {
    const boardState = new BoardState({ id: sharedBoard.board.id, components })
    const boardManager = new BoardManager({ client: null as any, boardState })
    const boardController = new BoardController({ boardState, boardManager })

    return { boardState, boardManager, boardController }
  })

  const scale = useBoardStore(board.boardState, 'scaleChanged', state => state.scale)

  return (
    <>
      <SharedBoardHeader
        board={sharedBoard.board}
        scale={scale}
        currentMode={mode}
        onChangeMode={newMode => setMode(newMode)}
        onChangeBoardScale={newScale => board.boardController.onChangeBoardScale({ scale: newScale })}
      />

      <main className="flex grow w-full h-[calc(100vh-60px)]">
        {mode === 'board' && (
          <Board
            enableDraggable={false}
            enableKeyboardShortcuts={false}
            enableResizing={false}
            enableSelection={false}
            boardState={board.boardState}
            boardController={board.boardController}
            boardManager={board.boardManager}
          />
        )}

        {mode === 'preview' && (
          <PreviewModeContainer boardState={board.boardState} />
        )}

        {mode === 'requirements' && (
          <SharedBoardRequirementsContainer requirements={sharedBoard.board.requirements} />
        )}
      </main>
    </>
  )
}
