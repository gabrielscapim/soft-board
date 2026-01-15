import { Outlet } from 'react-router'
import { TUTORIALS, useTutorial } from '@/tutorials'
import { GetBoardResult } from 'types/endpoints'
import { useBoard } from '@/hooks'
import { BoardWizardHeader, BoardWizardFooter } from './components'

const MAP_STEP_TO_TUTORIAL: Record<GetBoardResult['step'] | 'null', keyof typeof TUTORIALS| null> = {
  null: null,
  init: 'board-init',
  requirements: 'board-requirements',
  wireflows: 'board-wireflows',
  review: 'board-review',
  end: null
}

export function BoardWizardLayout () {
  const { board } = useBoard()
  const tutorialName = MAP_STEP_TO_TUTORIAL[board?.step ?? 'null']
  const tutorial = useTutorial(tutorialName)

  return (
    <>
      <BoardWizardHeader
        {...(tutorialName ? { onStartTutorial: () => tutorial.runTutorialOnce(tutorialName) } : {})}
      />
      <main className="flex grow h-[calc(100vh-140px)]">
        <Outlet />
      </main>
      <BoardWizardFooter />
    </>
  )
}
