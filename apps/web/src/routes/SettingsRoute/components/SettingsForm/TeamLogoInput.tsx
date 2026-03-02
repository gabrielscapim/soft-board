import { Button, Label } from '@/components'
import { TeamLogo } from '@/components/team'
import { XIcon } from 'lucide-react'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { GetTeamResult, UpdateTeamCommand } from 'types/endpoints'

export type TeamLogoInputProps = {
  team?: Pick<GetTeamResult, 'name' | 'logoUrl'>
  newLogo?: UpdateTeamCommand['logo']
  hasPermission?: boolean
  onFileChange?: (logo: UpdateTeamCommand['logo']) => void
  onRemoveLogo?: () => void
}

const ACCEPTED_TYPES = ['image/png', 'image/jpeg', 'image/svg+xml']
const TWO_MB_IN_BYTES = 2 * 1024 * 1024

export function TeamLogoInput (props: TeamLogoInputProps) {
  const { team, newLogo, hasPermission, onFileChange, onRemoveLogo } = props

  const { t } = useTranslation('routes.settings')
  const fileInputRef = useRef<HTMLInputElement>(null)

  function handleFileChange (e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]

    if (!file) return

    if (!ACCEPTED_TYPES.includes(file.type)) {
      toast.error('Only PNG, JPG or SVG files are allowed.')
      return
    }

    if (file.size > TWO_MB_IN_BYTES) {
      toast.error('File size must be at most 2MB.')
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      onFileChange?.({ base64: reader.result as string, mimeType: file.type })
    }
    reader.readAsDataURL(file)
  }

  function handleRemoveLogo () {
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }

    onRemoveLogo?.()
  }

  const logoUrl = newLogo === null
    ? null
    : newLogo?.base64 ?? team?.logoUrl

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col">
        <Label>{t('form.logo.label')}</Label>
        <span className="text-xs text-muted-foreground pt-2">
          {t('form.logo.description')}
        </span>
      </div>

      <div className="flex items-center gap-4">
        <TeamLogo
          team={{
            name: team?.name ?? '',
            logoUrl
          }}
          className="w-20 h-20"
        />

        <div className="flex flex-col gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept={ACCEPTED_TYPES.join(',')}
            className="hidden"
            disabled={!hasPermission}
            onChange={handleFileChange}
          />

          <Button
            type="button"
            variant="outline"
            size="sm"
            className="text-xs"
            disabled={!hasPermission}
            onClick={() => {
              if (logoUrl) {
                handleRemoveLogo()
              } else {
                fileInputRef.current?.click()
              }
            }}
          >
            {logoUrl ? (<><XIcon /> {t('form.logo.remove')}</>) : t('form.logo.upload')}
          </Button>

          <span className="text-xs text-muted-foreground">
            {t('form.logo.restriction')}
          </span>
        </div>
      </div>
    </div>
  )
}
