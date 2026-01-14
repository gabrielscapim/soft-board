import { getPopoverAnchorSelector } from '../anchors.tutorials'
import { Tutorial } from '../types'

export const boardPreviewTutorial: Tutorial = {
  name: 'board-preview',
  steps: [
    {
      element: getPopoverAnchorSelector('PreviewModeContainerMobileScreenContainer'),
      popover: {
        title: 'Preview Mode',
        description: 'You can switch between screens by clicking in the components which are connected via actions.',
        side: 'top'
      },
      disableActiveInteraction: false
    }
  ]
}
