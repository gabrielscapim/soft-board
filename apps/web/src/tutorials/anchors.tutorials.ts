/**
 * Anchors used in tutorials to guide users through the application.
 * The keys represent the specific UI elements, and the values are the corresponding data-tutorial attributes.
 */
export const TUTORIALS_ANCHORS = {
  BoardCard: 'board.list.item',
  BoardsRoute: 'board.list.container',
  CreateBoardButton: 'board.list.create',
  RootSidebar: 'sidebar.navigation',
  RootSidebarBoardsItem: 'sidebar.navigation.boards',
  RootSidebarMembersItem: 'sidebar.navigation.team',
  RootSidebarSettingsItem: 'sidebar.navigation.settings',
  TeamSwitcher: 'sidebar.team.switcher',
  NavUser: 'sidebar.user.menu'
}

export function getPopoverAnchorSelector (anchorKey: keyof typeof TUTORIALS_ANCHORS) {
  return `[data-tutorial="${TUTORIALS_ANCHORS[anchorKey]}"]`
}
