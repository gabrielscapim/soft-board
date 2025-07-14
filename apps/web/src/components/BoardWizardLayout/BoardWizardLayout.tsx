import { Outlet } from 'react-router'
import { BoardWizardHeader } from '../BoardWizardHeader'

export function BoardWizardLayout () {
  return (
    <>
      <BoardWizardHeader />
      <main className="flex grow h-[calc(100vh-52px)]">
        <Outlet />
      </main>
    </>
  )
}
