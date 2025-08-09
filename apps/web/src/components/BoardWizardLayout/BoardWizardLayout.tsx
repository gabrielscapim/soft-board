import { Outlet } from 'react-router'
import { BoardWizardHeader } from '../BoardWizardHeader'
import { BoardWizardFooter } from '../BoardWizardFooter'

export function BoardWizardLayout () {
  return (
    <>
      <BoardWizardHeader />
      <main className="flex grow h-[calc(100vh-136px)]">
        <Outlet />
      </main>
      <BoardWizardFooter />
    </>
  )
}
