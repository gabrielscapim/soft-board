import { PropsWithChildren, useEffect, useMemo, useState } from 'react'
import { BoardController, BoardManager, BoardState } from '../../lib'
import { BoardContext } from './BoardContext'
import { useParams } from 'react-router'
import { useClient } from '@/hooks'
import { keepPreviousData, QueryClient, useQuery } from '@tanstack/react-query'
import { FlexComponent } from '@/types'
import { BoardPendingContainer, FullScreenLoader } from '@/components'
import { ErrorRoute } from '@/routes'
import { Client } from '@/client'
import { GetBoardQuery } from 'types/endpoints'

export type BoardProviderProps = PropsWithChildren

export function BoardProvider ({ children }: BoardProviderProps) {
  const params = useParams<{ boardId?: string }>()
  const [query, setQuery] = useState<GetBoardQuery>({ boardId: params.boardId! })
  const boardId = params.boardId
  const client = useClient()
  const queryClient = new QueryClient()

  queryClient.prefetchQuery

  const getBoard = useQuery({
    queryKey: ['getBoard', query],
    queryFn: () => client.getBoard(query),
    enabled: Boolean(boardId),
    retry: 1,
    placeholderData: keepPreviousData
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
        boardGenerationId: query.boardGenerationId,
        error: getBoard.error,
        loading: getBoard.isLoading,
        refetch: (newQuery) => {
          if (newQuery) {
            setQuery(newQuery)
          } else {
            getBoard.refetch()
          }
        }
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
      {getBoard.data && getBoard.data.status === 'pending' && <BoardPendingContainer />}
      {getBoard.data && getBoard.data.status !== 'pending' && children}
    </BoardContext.Provider>
  )
}
