import { CheckIcon, ChevronsUpDown, DoorOpen, LanguagesIcon, LogOut } from 'lucide-react'
import { getAvatarFallbackName } from '@/helpers'
import { TUTORIALS_ANCHORS } from '@/tutorials'
import {
  Avatar,
  AvatarFallback,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from '@/components'
import { useTranslation } from 'react-i18next'

export type NavUserProps = {
  user: {
    name: string
    email: string
    language: string
  }
  isOwner?: boolean
  onSignOut?: () => void
  onLeaveTeam?: () => void
  onLanguageChange?: (lang: 'en' | 'pt-BR') => void
}

export function NavUser (props: NavUserProps) {
  const { user, isOwner, onSignOut, onLeaveTeam, onLanguageChange } = props

  const { isMobile } = useSidebar()
  const { t } = useTranslation('layouts.rootLayout')
  const avatar = getAvatarFallbackName(user.name)

  return (
    <SidebarMenu data-tutorial={TUTORIALS_ANCHORS.NavUser}>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar>
                <AvatarFallback>
                  {avatar}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar>
                  <AvatarFallback>
                    {avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <LanguagesIcon size={16} className="mr-2" />
                {t('navUser.language')}
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem
                    disabled={user.language === 'en'}
                    onClick={() => onLanguageChange?.('en')}
                  >
                    {user.language === 'en' && <CheckIcon />}
                    {t('navUser.en')}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    disabled={user.language === 'pt-BR'}
                    onClick={() => onLanguageChange?.('pt-BR')}
                  >
                    {user.language === 'pt-BR' && <CheckIcon />}
                    {t('navUser.pt-BR')}
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuItem onClick={onLeaveTeam} disabled={isOwner}>
              <DoorOpen />
              {t('navUser.leaveTeam')}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onSignOut}>
              <LogOut />
              {t('navUser.logOut')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
