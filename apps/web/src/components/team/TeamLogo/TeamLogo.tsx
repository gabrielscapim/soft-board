import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui'
import { getAvatarFallbackName } from '@/helpers'
import clsx, { ClassValue } from 'clsx'

export type TeamLogoProps = {
  team?: {
    name: string
    logoUrl?: string | null
  }
  className?: ClassValue
}

export function TeamLogo (props: TeamLogoProps) {
  const { className, team } = props

  return (
    <Avatar
      className={clsx(className)}
    >
      <AvatarImage src={team?.logoUrl || undefined} />
      <AvatarFallback>
        {getAvatarFallbackName(team?.name)}
      </AvatarFallback>
    </Avatar>
  )
}
