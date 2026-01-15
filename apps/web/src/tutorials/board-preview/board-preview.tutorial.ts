import { getPopoverAnchorSelector } from '../anchors.tutorials'
import { Tutorial } from '../types'

export const boardPreviewTutorial: Tutorial = {
  name: 'board-preview',
  steps: [
    {
      element: getPopoverAnchorSelector('PreviewModeMobileScreenContainerTopBarScreenSelector'),
      popover: {
        title: '📱 Screen selector',
        description:
          'Switch between the different mobile screens in your board preview.',
        side: 'left'
      },
      disableActiveInteraction: true
    },
    {
      element: getPopoverAnchorSelector('PreviewModeContainerMobileScreenContainer'),
      popover: {
        title: '👆 Interact with screens',
        description:
          'Click, scroll, and explore the screens just like on a real device.',
        side: 'left'
      },
      disableActiveInteraction: false
    }
  ]
}
