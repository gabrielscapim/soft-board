import { Card, CardContent } from '@/components/ui/card'
import { SettingsForm } from './components'
import { useClient, useMemberRole, useTeam, useTeams } from '@/hooks'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { UpdateTeamCommand } from 'types/endpoints'
import { useNavigate } from 'react-router'
import { Client } from '@/client'
import { useTranslation } from 'react-i18next'

export function SettingsRoute () {
  const getTeam = useTeam()
  const getTeams = useTeams()
  const client = useClient()
  const navigate = useNavigate()
  const memberRole = useMemberRole()
  const { t } = useTranslation('routes.settings')
  const hasPermission = ['owner', 'admin'].includes(memberRole ?? '')

  const updateTeam = useMutation({
    mutationFn: async (data: UpdateTeamCommand) => await client.updateTeam(data),
    onSuccess: (result) => {
      toast.success(t('toast.updateSuccess'))
      getTeams.refetch()
      getTeam.refetch?.()

      if (result.newSlug) {
        navigate(`/${result.newSlug}/settings`)
      }
    },
    onError: error => {
      const code = Client.getErrorCode(error)
      toast.error(code ? t(`errors.${code}`, { ns: 'common' }) : t('toast.updateError'))
    }
  })

  return (
    <div className="py-4 w-full px-8">
      <div className="space-y-0.5 mb-6">
        <h1 className="text-2xl font-semibold">{t('title')}</h1>
        <p className="text-sm text-muted-foreground">
          {t('description')}
        </p>
      </div>

      <Card className="max-w-2xl">
        <CardContent>
          <SettingsForm
            team={getTeam.team}
            hasPermission={hasPermission}
            handleSubmit={data => updateTeam.mutate(data)}
          />
        </CardContent>
      </Card>
    </div>
  )
}
