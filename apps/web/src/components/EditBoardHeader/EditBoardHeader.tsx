import { Button } from '../ui/button'
import { SmartphoneIcon } from 'lucide-react'
import { BoardZoomController } from '../BoardZoomController'
import { useBoard, useMemberRole, useScreenDimensions } from '@/hooks'
import { MAX_SCALE, MIN_SCALE } from '@/helpers'
import { useFlexComponents, useScale } from '../Board'
import { BoardLink } from '../BoardLink'
import { FLEX_COMPONENTS_SCHEMAS } from '@/flex-components'
import { PreviewModeLink } from '../PreviewModeLink'

export function EditBoardHeader () {
  const { boardState, boardController } = useBoard()
  const scale = useScale(boardState)
  const screenDimensions = useScreenDimensions()
  const flexComponents = useFlexComponents(boardState)
  const memberRole = useMemberRole()
  const hasPermission = memberRole !== 'member'
  const currentMobileScreens = flexComponents.filter(fc => fc.type === 'mobileScreen')

  return (
    <header className="bg-background sticky top-0 shrink-0 p-3 h-15 flex justify-between items-center w-full border-b-1">
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center gap-2">
          <BoardLink to=".." />
          <PreviewModeLink to="../preview" />
        </div>

        <div className="flex items-center gap-4">
          <Button
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
                x: Math.round((screenDimensions.width / 2) / 10) * 10,
                y: Math.round((screenDimensions.height / 2) / 10) * 10
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
        </div>
      </div>
    </header>
  )
}
