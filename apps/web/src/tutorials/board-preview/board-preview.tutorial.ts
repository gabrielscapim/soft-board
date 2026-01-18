import { getPopoverAnchorSelector } from '../anchors.tutorials'
import { Tutorial } from '../types'
import { t } from 'i18next'

export const boardPreviewTutorial: Tutorial = {
  name: 'board-preview',
  steps: [
    {
      element: getPopoverAnchorSelector('PreviewModeMobileScreenContainerTopBarScreenSelector'),
      popover: {
        title: t('boardPreview.screenSelector.title', { ns: 'tutorial' }),
        description: t('boardPreview.screenSelector.description', { ns: 'tutorial' }),
        side: 'left'
      },
      disableActiveInteraction: true
    },
    {
      element: getPopoverAnchorSelector('PreviewModeContainerMobileScreenContainer'),
      popover: {
        title: t('boardPreview.interactiveScreens.title', { ns: 'tutorial' }),
        description: t('boardPreview.interactiveScreens.description', { ns: 'tutorial' }),
        side: 'left'
      },
      disableActiveInteraction: false
    }
  ]
}
