import { useEffect } from 'react'
import { BoardManager, BoardState, KeyboardShortcuts } from '../../../../lib'

export function useKeyboardShortcuts (
  boardState: BoardState,
  boardManager: BoardManager,
  enable = true
) {
  useEffect(() => {
    if (!enable) return

    const keyboardShortcuts = new KeyboardShortcuts({ boardState, boardManager })

    document.addEventListener('keydown', keyboardShortcuts.onKeyPressed)
    document.addEventListener('copy', keyboardShortcuts.onCopyPressed)
    document.addEventListener('paste', keyboardShortcuts.onPastePressed)

    return () => {
      document.removeEventListener('keydown', keyboardShortcuts.onKeyPressed)
      document.removeEventListener('copy', keyboardShortcuts.onCopyPressed)
      document.removeEventListener('paste', keyboardShortcuts.onPastePressed)
    }
  }, [boardState, boardManager, enable])
}
