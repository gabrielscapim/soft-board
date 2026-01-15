import { SmartphoneIcon } from 'lucide-react'
import { useBoard, useMemberRole, useScreenDimensions } from '@/hooks'
import { MAX_SCALE, MIN_SCALE } from '@/helpers'
import { FLEX_COMPONENTS_SCHEMAS } from '@/flex-components'
import { TUTORIALS_ANCHORS, useTutorial } from '@/tutorials'
import { useBoardStore, BoardLink, PreviewModeLink, Button, BoardZoomController, HelpDropdownMenu } from '@/components'

export function EditBoardHeader () {
  const { boardState, boardController } = useBoard()
  const scale = useBoardStore(boardState, 'scaleChanged', state => state.scale)
  const screenDimensions = useScreenDimensions()
  const flexComponents = useBoardStore(boardState, 'flexComponentsChanged', state => state.flexComponents)
  const memberRole = useMemberRole()
  const hasPermission = memberRole !== 'member'
  const currentMobileScreens = flexComponents.filter(fc => fc.type === 'mobileScreen')
  const tutorial = useTutorial()

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
            onClick={() => boardController.onAddFlexComponent({
              type: 'mobileScreen',
              properties: {
                ...FLEX_COMPONENTS_SCHEMAS.mobileScreen.variations[0].properties,
                main: currentMobileScreens.length === 0
              },
              name: FLEX_COMPONENTS_SCHEMAS.mobileScreen.variations[0].name,
              position: {
                x: (Math.round((screenDimensions.width / 2) / 10) * 10) - 300,
                y: (Math.round((screenDimensions.height / 2) / 10) * 10) - 300
              }
            })}
          >
            <SmartphoneIcon />
            Add screen
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
