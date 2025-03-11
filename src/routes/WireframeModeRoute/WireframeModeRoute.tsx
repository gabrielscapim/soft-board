import { useBoard, useFlexComponents } from '../../hooks'

export function WireframeModeRoute () {
  const { boardState } = useBoard()
  const flexComponents = useFlexComponents(boardState)

  return (
    <>
      Hello from WireframeModeRoute
      <pre>{JSON.stringify(flexComponents, null, 2)}</pre>
    </>
  )
}
