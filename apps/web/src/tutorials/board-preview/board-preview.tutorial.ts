import { getPopoverAnchorSelector } from '../anchors.tutorials'
import { Tutorial } from '../types'

export const boardPreviewTutorial: Tutorial = {
  name: 'board-preview',
  steps: [
    {
      element: getPopoverAnchorSelector('PreviewModeMobileScreenContainerTopBarScreenSelector'),
      popover: {
        title: 'boardPreview.screenSelector.title',
        description: 'boardPreview.screenSelector.description',
        side: 'left'
      },
      disableActiveInteraction: true
    },
    {
      element: getPopoverAnchorSelector('PreviewModeContainerMobileScreenContainer'),
      popover: {
        title: 'boardPreview.interactiveScreens.title',
        description: 'boardPreview.interactiveScreens.description',
        side: 'left'
      },
      disableActiveInteraction: false
    }
  ]
}
