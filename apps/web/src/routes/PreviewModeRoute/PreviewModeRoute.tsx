import { PreviewModeContainer } from '@/components'
import { useBoard, useTutorial } from '@/hooks'

export function PreviewModeRoute () {
  const { boardState } = useBoard()
  useTutorial('board-preview')

  return (
    <PreviewModeContainer boardState={boardState} />
  )
}
