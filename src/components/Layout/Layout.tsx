import { Outlet } from 'react-router'
import { BoardSidebar } from '../BoardSidebar'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '../ui/sidebar'
import { Separator } from '../ui/separator'

export function Layout () {
  return (
    <SidebarProvider>
      <BoardSidebar />
      <SidebarInset>
        <header className="bg-background sticky top-0 flex shrink-0 items-center gap-2 border-b p-2">
          <SidebarTrigger className="m-0" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
        </header>
        <main>
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
