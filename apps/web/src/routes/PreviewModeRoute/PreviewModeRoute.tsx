import { PreviewModeContainer } from '@/components'
import { useBoard } from '@/hooks'

export function PreviewModeRoute () {
  const { boardState } = useBoard()

  return (
    <PreviewModeContainer boardState={boardState} />
  )
}
