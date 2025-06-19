import { SidebarTrigger } from '../ui/sidebar'
import { ZoomController } from './components'

export function BoardHeader () {
  return (
    <header className="bg-background sticky top-0 flex shrink-0 items-center gap-2 border-b p-2">
      <div className="flex justify-between items-center w-full">
        <SidebarTrigger className="m-0 cursor-pointer" />
        <ZoomController />
      </div>
    </header>
  )
}
