import { BoardLink } from '../BoardLink'
import { EditBoardLink } from '../EditBoardLink'

export function WireframeModeHeader () {
  return (
    <header className="bg-background sticky top-0 shrink-0 p-3 h-15 flex justify-between items-center w-full border-b-1">
      <div className="flex flex-row gap-2">
        <BoardLink to=".." />
        <EditBoardLink to="../edit" />
      </div>
    </header>
  )
}
