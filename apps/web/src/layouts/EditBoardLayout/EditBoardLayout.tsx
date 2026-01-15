import { Outlet } from 'react-router'
import { useBoard } from '@/hooks'
import { SidebarProvider, SidebarInset } from '@/components'
import { EditBoardSidebar, EditBoardHeader, InvalidBoardStepState } from './components'

export function EditBoardLayout () {
  const { board } = useBoard()

  if (board?.step !== 'wireflows') {
    return (
      <InvalidBoardStepState />
    )
  }

  return (
    <SidebarProvider>
      <EditBoardSidebar />
      <SidebarInset>
        <EditBoardHeader />
        <main className="flex grow">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
