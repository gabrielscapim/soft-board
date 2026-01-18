import { getPopoverAnchorSelector } from '../anchors.tutorials'
import { Tutorial } from '../types'
import { t } from 'i18next'

export const onboardingTutorial: Tutorial = {
  name: 'onboarding',
  steps: [
    {
      element: getPopoverAnchorSelector('RootSidebar'),
      popover: {
        title: t('onboarding.mainNavigation.title', { ns: 'tutorial' }),
        description: t('onboarding.mainNavigation.description', { ns: 'tutorial' }),
        side: 'right'
      },
      disableActiveInteraction: true
    },
    {
      element: getPopoverAnchorSelector('TeamSwitcher'),
      popover: {
        title: t('onboarding.teamSwitcher.title', { ns: 'tutorial' }),
        description: t('onboarding.teamSwitcher.description', { ns: 'tutorial' }),
        side: 'bottom'
      },
      disableActiveInteraction: true
    },
    {
      element: getPopoverAnchorSelector('RootSidebarBoardsItem'),
      popover: {
        title: t('onboarding.boards.title', { ns: 'tutorial' }),
        description: t('onboarding.boards.description', { ns: 'tutorial' }),
        side: 'right'
      },
      disableActiveInteraction: true
    },
    {
      element: getPopoverAnchorSelector('RootSidebarMembersItem'),
      popover: {
        title: t('onboarding.teamMembers.title', { ns: 'tutorial' }),
        description: t('onboarding.teamMembers.description', { ns: 'tutorial' }),
        side: 'right'
      },
      disableActiveInteraction: true
    },
    {
      element: getPopoverAnchorSelector('RootSidebarSettingsItem'),
      popover: {
        title: t('onboarding.teamSettings.title', { ns: 'tutorial' }),
        description: t('onboarding.teamSettings.description', { ns: 'tutorial' }),
        side: 'right'
      },
      disableActiveInteraction: true
    },
    {
      element: getPopoverAnchorSelector('NavUser'),
      popover: {
        title: t('onboarding.yourAccount.title', { ns: 'tutorial' }),
        description: t('onboarding.yourAccount.description', { ns: 'tutorial' }),
        side: 'top'
      },
      disableActiveInteraction: true
    },
    {
      element: getPopoverAnchorSelector('BoardsRoute'),
      popover: {
        title: t('onboarding.yourBoards.title', { ns: 'tutorial' }),
        description: t('onboarding.yourBoards.description', { ns: 'tutorial' }),
        side: 'top'
      },
      disableActiveInteraction: true
    },
    {
      element: getPopoverAnchorSelector('CreateBoardButton'),
      popover: {
        title: t('onboarding.createBoard.title', { ns: 'tutorial' }),
        description: t('onboarding.createBoard.description', { ns: 'tutorial' }),
        side: 'left'
      },
      disableActiveInteraction: false
    },
    {
      popover: {
        title: t('onboarding.ready.title', { ns: 'tutorial' }),
        description: t('onboarding.ready.description', { ns: 'tutorial' }),
        side: 'bottom'
      }
    }
  ]
}
