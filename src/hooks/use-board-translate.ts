import { useEffect, useState } from 'react'
import { BoardState } from '../lib'

export function useBoardTranslate (boardState: BoardState) {
  const [translate, setTranslate] = useState(boardState.translate)

  useEffect(() => {
    const onChange = () => {
      setTranslate(boardState.translate)
    }

    boardState.addListener('translateChanged', onChange)

    return () => {
      boardState.removeListener('translateChanged', onChange)
    }
  }, [boardState])

  console.log(translate)

  return translate
}
