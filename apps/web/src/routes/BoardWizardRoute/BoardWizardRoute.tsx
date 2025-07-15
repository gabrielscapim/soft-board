import { useSelectedBoard } from '@/hooks'
import { useParams } from 'react-router'
import { RequirementsWizard } from './RequirementsWizard'

export function BoardWizardRoute () {
  const params = useParams<{ boardId?: string }>()
  const boardId = params.boardId
  const { board } = useSelectedBoard(boardId)

  return (
    <div className="flex flex-col w-full p-2">
      {(board?.step === 'init' || board?.step === 'requirements') && (
        <div className="flex flex-row overflow-hidden border rounded-xl bg-card h-full">
          <RequirementsWizard />
        </div>
      )}
      {(board?.step !== 'init' && board?.step !== 'requirements') &&(
        <div className="flex flex-row overflow-hidden border rounded-xl bg-card h-full">
          {board?.step}
        </div>
      )}
    </div>
  )
}
