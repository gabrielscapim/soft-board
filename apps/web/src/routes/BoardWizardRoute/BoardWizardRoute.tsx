import { useBoard, useTutorial } from '@/hooks'
import { InitWizard } from './InitWizard'
import { RequirementsWizard } from './RequirementsWizard'
import { WireflowsWizard } from './WireflowsWizard'
import { ReviewWizard } from './ReviewWizard'
import { EndWizard } from './EndWizard'
import { GetBoardResult } from 'types/endpoints'
import { TUTORIALS } from '@/tutorials'

const MAP_STEP_TO_TUTORIAL: Record<GetBoardResult['step'] | 'null', keyof typeof TUTORIALS| null> = {
  null: null,
  init: 'board-init',
  requirements: 'board-requirements',
  wireflows: 'board-wireflows',
  review: 'board-review',
  end: 'board-init'
}

export function BoardWizardRoute () {
  const { board } = useBoard()

  useTutorial(MAP_STEP_TO_TUTORIAL[board?.step ?? 'null'])

  return (
    <div className="flex flex-col w-full py-0 px-4">
      <div className="flex flex-row overflow-hidden border rounded-xl bg-card h-full">
        {board?.step === 'init' && <InitWizard />}
        {board?.step === 'requirements' && <RequirementsWizard />}
        {board?.step === 'wireflows' && <WireflowsWizard />}
        {board?.step === 'review' && <ReviewWizard />}
        {board?.step === 'end' && <EndWizard />}
      </div>
    </div>
  )
}
