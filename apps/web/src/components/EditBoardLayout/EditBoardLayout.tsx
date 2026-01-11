import { Outlet } from 'react-router'
import { EditBoardSidebar } from '../EditBoardSidebar'
import { SidebarInset, SidebarProvider } from '../ui/sidebar'
import { EditBoardHeader } from '../EditBoardHeader'
import { useBoard } from '@/hooks'
import { InvalidBoardStepState } from './components/InvalidBoardStepState'

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
