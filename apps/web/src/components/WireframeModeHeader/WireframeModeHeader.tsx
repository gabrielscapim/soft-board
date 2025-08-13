import { BoardLink } from '../BoardLink'

export function WireframeModeHeader () {
  return (
    <header className="bg-background sticky top-0 shrink-0 p-3 h-15 flex justify-between items-center w-full border-b-1">
      <BoardLink to=".." />
    </header>
  )
}
