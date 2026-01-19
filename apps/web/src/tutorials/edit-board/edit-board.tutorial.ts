import { getPopoverAnchorSelector } from '../anchors.tutorials'
import { Tutorial } from '../types'

export const editBoardTutorial: Tutorial = {
  name: 'edit-board',
  steps: [
    {
      element: getPopoverAnchorSelector('Board'),
      popover: {
        title: 'editBoard.boardCanvas.title',
        description: 'editBoard.boardCanvas.description',
        side: 'left'
      },
      disableActiveInteraction: true
    },
    {
      element: getPopoverAnchorSelector('EditBoardHeaderAddScreenButton'),
      popover: {
        title: 'editBoard.addScreenButton.title',
        description: 'editBoard.addScreenButton.description',
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
        title: 'editBoard.componentLibrary.title',
        description: 'editBoard.componentLibrary.description',
        side: 'right'
      },
      disableActiveInteraction: true
    },
    {
      element: getPopoverAnchorSelector('BoardComponentCardPreview'),
      popover: {
        title: 'editBoard.addComponentCard.title',
        description: 'editBoard.addComponentCard.description',
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
        title: 'editBoard.componentSettings.title',
        description: 'editBoard.componentSettings.description',
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
        title: 'editBoard.actionsAndNavigation.title',
        description: 'editBoard.actionsAndNavigation.description',
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
