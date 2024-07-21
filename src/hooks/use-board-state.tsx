import { useContext } from 'react'
import { BoardStateContext } from '../contexts'

export function useBoardState () {
  const boardState = useContext(BoardStateContext)

  return boardState
}
