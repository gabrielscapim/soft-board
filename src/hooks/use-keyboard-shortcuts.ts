import { useEffect } from 'react'
import { BoardState, KeyboardShortcuts } from '../lib'

export function useKeyboardShortcuts (
  boardState: BoardState
) {
  useEffect(() => {
    const keyboardShortcuts = new KeyboardShortcuts(boardState)

    document.addEventListener('keydown', keyboardShortcuts.onKeyPressed)

    return () => {
      document.removeEventListener('keydown', keyboardShortcuts.onKeyPressed)
    }
  }, [boardState])
}
