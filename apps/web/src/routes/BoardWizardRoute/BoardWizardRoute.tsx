import { useSelectedBoard } from '@/hooks'
import { useParams } from 'react-router'
import { RequirementsWizard } from './RequirementsWizard'
import { WireflowsWizard } from './WireflowsWizard'
import { ReviewWizard } from './ReviewWizard'

export function BoardWizardRoute () {
  const params = useParams<{ boardId?: string }>()
  const boardId = params.boardId
  const { board } = useSelectedBoard(boardId)

  return (
    <div className="flex flex-col w-full py-0 px-4">
      <div className="flex flex-row overflow-hidden border rounded-xl bg-card h-full">
        {(board?.step === 'init' || board?.step === 'requirements') && <RequirementsWizard />}
        {board?.step === 'wireflows' && <WireflowsWizard />}
        {board?.step === 'review' && <ReviewWizard />}
      </div>
    </div>
  )
}
