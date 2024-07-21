import { PropsWithChildren } from 'react'
import { BoardStateContext } from '../contexts'
import { BoardState } from '../lib'

export type BoardStateProviderProps = PropsWithChildren

export function BoardStateProvider (props: BoardStateProviderProps) {
  const boardState = new BoardState()

  return (
    <BoardStateContext.Provider value={boardState}>
      {props.children}
    </BoardStateContext.Provider>
  )
}
