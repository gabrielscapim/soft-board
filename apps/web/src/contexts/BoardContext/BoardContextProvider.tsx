import { PropsWithChildren, useEffect, useMemo, useState } from 'react'
import { BoardController, BoardManager, BoardState } from '../../lib'
import { BoardContext } from './BoardContext'
import { useParams } from 'react-router'
import { useClient } from '@/hooks'
import { useQuery } from '@tanstack/react-query'
import { FlexComponent } from '@/types'

export type BoardContextProvider = PropsWithChildren

export function BoardContextProvider ({ children }: BoardContextProvider) {
  const params = useParams<{ boardId?: string }>()
  const boardId = params.boardId
  const client = useClient()

  const getComponents = useQuery({
    queryKey: ['getComponents', boardId],
    queryFn: () => client.getComponents({ boardId: boardId! }),
    enabled: Boolean(boardId)
  })
  const components = useMemo(() => {
    const result = getComponents.data?.data.map<FlexComponent>(component => ({
      id: component.id,
      name: component.name,
      type: component.type as FlexComponent['type'],
      properties: component.properties as FlexComponent['properties'],
      connectionId: component.connectionId,
      screenId: component.screenId
    }))

    return result ?? []
  }, [getComponents.data?.data])

  const [board] = useState(() => {
    const boardState = new BoardState({ id: boardId, components })
    const boardManager = new BoardManager({ client, boardState })
    const boardController = new BoardController({ boardState, boardManager })

    return { boardState, boardController, boardManager }
  })

  useEffect(() => {
    board.boardState.setFlexComponents(components)
  }, [components, board.boardState])

  return (
    <BoardContext.Provider
      value={{
        boardState: board.boardState,
        boardController: board.boardController,
        boardManager: board.boardManager
      }}
    >
      {children}
    </BoardContext.Provider>
  )
}
