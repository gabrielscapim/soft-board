import { SmartphoneIcon } from 'lucide-react'
import { useBoard, useMemberRole, useScreenDimensions } from '@/hooks'
import { MAX_SCALE, MIN_SCALE } from '@/helpers'
import { SOFT_COMPONENTS_SCHEMAS } from '@/soft-components'
import { TUTORIALS_ANCHORS, useTutorial } from '@/tutorials'
import { useBoardStore, BoardLink, PreviewModeLink, Button, BoardZoomController, HelpDropdownMenu } from '@/components'
import { useTranslation } from 'react-i18next'

export function EditBoardHeader () {
  const { boardState, boardController } = useBoard()
  const scale = useBoardStore(boardState, 'scaleChanged', state => state.scale)
  const screenDimensions = useScreenDimensions()
  const softComponents = useBoardStore(boardState, 'softComponentsChanged', state => state.softComponents)
  const memberRole = useMemberRole()
  const hasPermission = memberRole !== 'member'
  const currentMobileScreens = softComponents.filter(fc => fc.type === 'mobileScreen')
  const tutorial = useTutorial()
  const { t } = useTranslation('layouts.editBoardLayout')

  return (
    <header className="bg-background sticky top-0 shrink-0 p-3 h-15 flex justify-between items-center w-full border-b-1">
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center gap-2">
          <BoardLink to=".." />
          <PreviewModeLink to="../preview" />
        </div>

        <div className="flex items-center gap-4">
          <Button
            data-tutorial={TUTORIALS_ANCHORS.EditBoardHeaderAddScreenButton}
            size="sm"
            variant="outline"
            disabled={hasPermission === false}
            onClick={() => boardController.onAddSoftComponent({
              type: 'mobileScreen',
              properties: {
                ...SOFT_COMPONENTS_SCHEMAS.mobileScreen.variations[0].properties,
                main: currentMobileScreens.length === 0
              },
              name: SOFT_COMPONENTS_SCHEMAS.mobileScreen.variations[0].name,
              position: {
                x: (Math.round((screenDimensions.width / 2) / 10) * 10) - 300,
                y: (Math.round((screenDimensions.height / 2) / 10) * 10) - 300
              }
            })}
          >
            <SmartphoneIcon />
            {t('actions.addScreen')}
          </Button>
          <BoardZoomController
            scale={scale}
            onZoomIn={() => boardController.onChangeBoardScale({ scale: Math.min(scale + 0.25, MAX_SCALE) })}
            onZoomOut={() => boardController.onChangeBoardScale({ scale: Math.max(scale - 0.25, MIN_SCALE) })}
          />
          <HelpDropdownMenu onStartTutorial={() => tutorial.runTutorialOnce('edit-board')} />
        </div>
      </div>
    </header>
  )
}
