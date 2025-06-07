import { Separator } from '@radix-ui/react-separator'
import { SidebarTrigger } from '../ui/sidebar'

export function BoardHeader () {
  return (
    <header className="bg-background sticky top-0 flex shrink-0 items-center gap-2 border-b p-2">
      <SidebarTrigger className="m-0" />
      <Separator
        orientation="vertical"
        className="mr-2 data-[orientation=vertical]:h-4"
      />
    </header>
  )
}
