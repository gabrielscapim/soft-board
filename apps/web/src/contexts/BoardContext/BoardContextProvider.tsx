import { PropsWithChildren, useEffect, useMemo, useState } from 'react'
import { BoardController, BoardManager, BoardState } from '../../lib'
import { BoardContext } from './BoardContext'
import { useParams } from 'react-router'
import { useClient } from '@/hooks'
import { useQuery } from '@tanstack/react-query'
import { FlexComponent } from '@/types'
import { FullScreenLoader } from '@/components'
import { ErrorRoute } from '@/routes'
import { Client } from '@/client'

export type BoardContextProvider = PropsWithChildren

export function BoardContextProvider ({ children }: BoardContextProvider) {
  const params = useParams<{ boardId?: string }>()
  const boardId = params.boardId
  const client = useClient()

  const getBoard = useQuery({
    queryKey: ['getBoard', boardId],
    queryFn: () => client.getBoard({ boardId: boardId! }),
    enabled: Boolean(boardId),
    retry: 1
  })
  const components = useMemo(() => {
    const result = getBoard.data?.components.map<FlexComponent>(component => ({
      id: component.id,
      name: component.name,
      type: component.type as FlexComponent['type'],
      properties: component.properties as FlexComponent['properties'],
      connectionId: component.connectionId,
      screenId: component.screenId
    }))

    return result ?? []
  }, [getBoard.data?.components])

  const [board] = useState(() => {
    const boardState = new BoardState({ id: boardId, components })
    const boardManager = new BoardManager({ client, boardState })
    const boardController = new BoardController({ boardState, boardManager })

    return { boardState, boardController, boardManager }
  })

  useEffect(() => {
    board.boardState.setFlexComponents(components)
  }, [components, board.boardState])

  const error = Client.getError(getBoard.error)

  return (
    <BoardContext.Provider
      value={{
        boardState: board.boardState,
        boardController: board.boardController,
        boardManager: board.boardManager,
        board: getBoard.data,
        error: getBoard.error,
        loading: getBoard.isLoading,
        refetch: getBoard.refetch
      }}
    >
      {getBoard.error && (
        <ErrorRoute
          status={error?.response?.status}
          description={Client.isNotFound(error)
            ? 'Board not found or you do not have permission to access it.'
            : 'An error occurred while fetching the board.'
          }
        />
      )}
      {getBoard.isLoading && <FullScreenLoader />}
      {children}
    </BoardContext.Provider>
  )
}
