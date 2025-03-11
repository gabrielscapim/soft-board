import { useContext } from 'react'
import { BoardContext } from '../contexts'

export function useBoard () {
  return useContext(BoardContext)
}
