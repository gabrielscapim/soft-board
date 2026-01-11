import { PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router'
import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { BoardController, BoardManager, BoardState } from '../../lib'
import { BoardContext } from './BoardContext'
import { useClient } from '@/hooks'

import { FlexComponent } from '@/types'
import { FullScreenLoader } from '@/components'
import { ErrorRoute } from '@/routes'
import { Client } from '@/client'
import { GetBoardQuery } from 'types/endpoints'
import { SocketContext } from '../SocketContext'

export type BoardProviderProps = PropsWithChildren

export function BoardProvider ({ children }: BoardProviderProps) {
  const params = useParams<{ boardId?: string }>()
  const boardId = params.boardId!
  const socket = useContext(SocketContext)

  const client = useClient()

  const [query, setQuery] = useState<GetBoardQuery>(() => ({
    boardId,
    boardGenerationId: null
  }))

  const getBoard = useQuery({
    queryKey: ['getBoard', query],
    queryFn: () => client.getBoard(query),
    enabled: Boolean(query.boardId),
    retry: 1,
    placeholderData: keepPreviousData
  })

  const components = useMemo(() => {
    return (
      getBoard.data?.components.map<FlexComponent>(component => ({
        id: component.id,
        name: component.name,
        type: component.type as FlexComponent['type'],
        properties: component.properties as FlexComponent['properties'],
        connectionId: component.connectionId,
        screenId: component.screenId
      })) ?? []
    )
  }, [getBoard.data?.components])

  const [board] = useState(() => {
    const boardState = new BoardState({ id: boardId, components })
    const boardManager = new BoardManager({ client, boardState })
    const boardController = new BoardController({ boardState, boardManager })

    return { boardState, boardManager, boardController }
  })

  useEffect(() => {
    board.boardState.setFlexComponents(components)
  }, [components, board.boardState])

  useEffect(() => {
    if (!socket) return

    socket.emit('joinBoard', boardId)

    return () => {
      socket.emit('leaveBoard', boardId)
    }
  }, [socket, boardId])

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
        refetch: () => {
          getBoard.refetch()
        },
        refetchWithQuery: (newQuery: GetBoardQuery) => {
          setQuery(prev => {
            if (newQuery) return newQuery
            return { ...prev }
          })
        }
      }}
    >
      {getBoard.error && (
        <ErrorRoute
          status={error?.response?.status}
          description={
            Client.isNotFound(error)
              ? 'Board not found or you do not have permission to access it.'
              : 'An error occurred while fetching the board.'
          }
        />
      )}

      {getBoard.isLoading && <FullScreenLoader />}

      {getBoard.data && children}
    </BoardContext.Provider>
  )
}
