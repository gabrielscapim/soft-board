import { getPopoverAnchorSelector } from '../anchors.tutorials'
import { Tutorial } from '../types'

export const boardPreviewTutorial: Tutorial = {
  name: 'board-preview',
  steps: [
    {
      element: getPopoverAnchorSelector('PreviewModeMobileScreenContainerTopBarScreenSelector'),
      popover: {
        title: 'Screen Selector',
        description: 'Use this button to switch between different mobile screens in your board preview.',
        side: 'left'
      },
      disableActiveInteraction: false
    },
    {
      element: getPopoverAnchorSelector('PreviewModeContainerMobileScreenContainer'),
      popover: {
        title: 'Interacting with Screens',
        description: 'You can interact with the mobile screens just like you would on a real device. Click, scroll, and explore!',
        side: 'left'
      },
      disableActiveInteraction: false
    }
  ]
}
