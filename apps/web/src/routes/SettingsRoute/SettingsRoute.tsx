import { Card, CardContent } from '@/components/ui/card'
import { SettingsForm } from './components'
import { useClient, useTeam } from '@/hooks'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { UpdateTeamCommand } from 'types/endpoints'
import { useNavigate } from 'react-router'
import { Client } from '@/client'

export function SettingsRoute () {
  const getTeam = useTeam()
  const client = useClient()
  const navigate = useNavigate()

  const updateTeam = useMutation({
    mutationFn: (data: UpdateTeamCommand) => client.updateTeam(data),
    onSuccess: (result) => {
      toast.success('Team updated successfully')
      navigate(`/${result.slug}/settings`)
    },
    onError: error => {
      const isConflict = Client.isConflict(error)
      toast.error(isConflict ? 'Team name already exists' : 'Failed to update team')
    }
  })

  return (
    <div className="py-4 w-full px-8">
      <div className="space-y-0.5 mb-6">
        <h1 className="text-2xl font-semibold">Team settings</h1>
        <p className="text-sm text-muted-foreground">
          Manage your team settings.
        </p>
      </div>

      <Card className="max-w-lg">
        <CardContent>
          <SettingsForm
            team={getTeam.team}
            handleSubmit={name => updateTeam.mutate({ name })}
          />
        </CardContent>
      </Card>
    </div>
  )
}
