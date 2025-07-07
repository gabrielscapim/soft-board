import { useEffect } from 'react'
import { BoardState, KeyboardShortcuts } from '../lib'

export function useKeyboardShortcuts (
  boardState: BoardState
) {
  useEffect(() => {
    const keyboardShortcuts = new KeyboardShortcuts(boardState)

    document.addEventListener('keydown', keyboardShortcuts.onKeyPressed)
    document.addEventListener('copy', keyboardShortcuts.onCopyPressed)
    document.addEventListener('paste', keyboardShortcuts.onPastePressed)

    return () => {
      document.removeEventListener('keydown', keyboardShortcuts.onKeyPressed)
      document.removeEventListener('copy', keyboardShortcuts.onCopyPressed)
      document.removeEventListener('paste', keyboardShortcuts.onPastePressed)
    }
  }, [boardState])
}
