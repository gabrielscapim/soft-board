import { PreviewModeContainer } from '@/components'
import { useBoard } from '@/hooks'
import { useTutorial } from '@/tutorials'

export function PreviewModeRoute () {
  const { boardState } = useBoard()
  useTutorial('board-preview')

  return (
    <PreviewModeContainer boardState={boardState} />
  )
}
