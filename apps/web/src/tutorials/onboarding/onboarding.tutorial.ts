import { getPopoverAnchorSelector } from '../anchors.tutorials'
import { Tutorial } from '../types'
import { t } from 'i18next'

export const onboardingTutorial: Tutorial = {
  name: 'onboarding',
  steps: [
    {
      element: getPopoverAnchorSelector('RootSidebar'),
      popover: {
        title: t('tutorial.mainNavigation.title', { ns: 'routes.boards' }),
        description: t('tutorial.mainNavigation.description', { ns: 'routes.boards' }),
        side: 'right'
      },
      disableActiveInteraction: true
    },
    {
      element: getPopoverAnchorSelector('TeamSwitcher'),
      popover: {
        title: t('tutorial.teamSwitcher.title', { ns: 'routes.boards' }),
        description: t('tutorial.teamSwitcher.description', { ns: 'routes.boards' }),
        side: 'bottom'
      },
      disableActiveInteraction: true
    },
    {
      element: getPopoverAnchorSelector('RootSidebarBoardsItem'),
      popover: {
        title: t('tutorial.boards.title', { ns: 'routes.boards' }),
        description: t('tutorial.boards.description', { ns: 'routes.boards' }),
        side: 'right'
      },
      disableActiveInteraction: true
    },
    {
      element: getPopoverAnchorSelector('RootSidebarMembersItem'),
      popover: {
        title: t('tutorial.teamMembers.title', { ns: 'routes.boards' }),
        description: t('tutorial.teamMembers.description', { ns: 'routes.boards' }),
        side: 'right'
      },
      disableActiveInteraction: true
    },
    {
      element: getPopoverAnchorSelector('RootSidebarSettingsItem'),
      popover: {
        title: t('tutorial.teamSettings.title', { ns: 'routes.boards' }),
        description: t('tutorial.teamSettings.description', { ns: 'routes.boards' }),
        side: 'right'
      },
      disableActiveInteraction: true
    },
    {
      element: getPopoverAnchorSelector('NavUser'),
      popover: {
        title: t('tutorial.yourAccount.title', { ns: 'routes.boards' }),
        description: t('tutorial.yourAccount.description', { ns: 'routes.boards' }),
        side: 'top'
      },
      disableActiveInteraction: true
    },
    {
      element: getPopoverAnchorSelector('BoardsRoute'),
      popover: {
        title: t('tutorial.yourBoards.title', { ns: 'routes.boards' }),
        description: t('tutorial.yourBoards.description', { ns: 'routes.boards' }),
        side: 'top'
      },
      disableActiveInteraction: true
    },
    {
      element: getPopoverAnchorSelector('CreateBoardButton'),
      popover: {
        title: t('tutorial.createBoard.title', { ns: 'routes.boards' }),
        description: t('tutorial.createBoard.description', { ns: 'routes.boards' }),
        side: 'left',
        nextBtnText: 'I created it'
      },
      disableActiveInteraction: false
    },
    {
      popover: {
        title: t('tutorial.ready.title', { ns: 'routes.boards' }),
        description: t('tutorial.ready.description', { ns: 'routes.boards' }),
        side: 'bottom',
        nextBtnText: 'Got it'
      }
    }
  ]
}
