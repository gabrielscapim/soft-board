import { getPopoverAnchorSelector } from '../anchors.tutorials'
import { Tutorial } from '../types'
import { t } from 'i18next'

export const editBoardTutorial: Tutorial = {
  name: 'edit-board',
  steps: [
    {
      element: getPopoverAnchorSelector('Board'),
      popover: {
        title: t('editBoard.boardCanvas.title', { ns: 'tutorial' }),
        description: t('editBoard.boardCanvas.description', { ns: 'tutorial' }),
        side: 'left'
      },
      disableActiveInteraction: true
    },
    {
      element: getPopoverAnchorSelector('EditBoardHeaderAddScreenButton'),
      popover: {
        title: t('editBoard.addScreenButton.title', { ns: 'tutorial' }),
        description: t('editBoard.addScreenButton.description', { ns: 'tutorial' }),
        side: 'bottom',
        onNextClick: async (element, _step, { driver }) => {
          const button = element as HTMLElement

          button.focus()
          button.click()

          await new Promise(resolve => setTimeout(resolve, 50))

          document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))

          await new Promise(resolve => setTimeout(resolve, 50))

          driver.moveNext()
        }
      },
      disableActiveInteraction: true
    },
    {
      element: getPopoverAnchorSelector('CollapsibleEditBoardSidebar'),
      popover: {
        title: t('editBoard.componentLibrary.title', { ns: 'tutorial' }),
        description: t('editBoard.componentLibrary.description', { ns: 'tutorial' }),
        side: 'right'
      },
      disableActiveInteraction: true
    },
    {
      element: getPopoverAnchorSelector('BoardComponentCardPreview'),
      popover: {
        title: t('editBoard.addComponentCard.title', { ns: 'tutorial' }),
        description: t('editBoard.addComponentCard.description', { ns: 'tutorial' }),
        side: 'right',
        onNextClick: async (element, _step, { driver }) => {
          const card = element as HTMLElement

          card.focus()
          card.click()

          await new Promise(resolve => setTimeout(resolve, 50))

          driver.moveNext()
        }
      },
      disableActiveInteraction: true
    },
    {
      element: getPopoverAnchorSelector('BoardPropertiesMenu'),
      popover: {
        title: t('editBoard.componentSettings.title', { ns: 'tutorial' }),
        description: t('editBoard.componentSettings.description', { ns: 'tutorial' }),
        side: 'left',
        onNextClick: async (_element, _step, { driver }) => {
          const actionsTabTrigger = document.querySelector(
            getPopoverAnchorSelector('BoardPropertiesMenuActionsTab')
          ) as HTMLElement

          actionsTabTrigger.focus()
          actionsTabTrigger.click()

          await new Promise(resolve => setTimeout(resolve, 50))

          driver.moveNext()
        }
      },
      disableActiveInteraction: true
    },
    {
      element: getPopoverAnchorSelector('BoardPropertiesMenu'),
      popover: {
        title: t('editBoard.actionsAndNavigation.title', { ns: 'tutorial' }),
        description: t('editBoard.actionsAndNavigation.description', { ns: 'tutorial' }),
        side: 'bottom',
        onNextClick: async (_element, _step, { driver }) => {
          document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))

          await new Promise(resolve => setTimeout(resolve, 50))

          driver.moveNext()
        }
      },
      disableActiveInteraction: true
    }
  ]
}
