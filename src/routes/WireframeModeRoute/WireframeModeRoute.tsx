import { useBoard } from '../../hooks'

export function WireframeModeRoute () {
  const board = useBoard()

  return (
    <>
      Hello from WireframeModeRoute
      <pre>{JSON.stringify(board?.flexComponents, null, 2)}</pre>
    </>
  )
}
