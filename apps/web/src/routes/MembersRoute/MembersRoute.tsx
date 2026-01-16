import { useClient, useMemberRole } from '@/hooks'
import { CreateMemberDialog, DeleteMemberDialog, MembersDataTable } from './components'
import { useMutation, useQuery } from '@tanstack/react-query'
import { CreateMemberCommand, GetMembersResultData, UpdateMemberRoleCommand } from 'types/endpoints'
import { toast } from 'sonner'
import { Client } from '@/client'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { PlusIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useSearchParams } from 'react-router'
import { useDebounce } from 'use-debounce'
import { useTranslation } from 'react-i18next'

export function MembersRoute () {
  const [createMemberDialogOpen, setCreateMemberDialogOpen] = useState(false)
  const [memberToDelete, setMemberToDelete] = useState<GetMembersResultData | null>(null)
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('query') ?? ''
  const [debouncedQuery] = useDebounce(query, 400)
  const client = useClient()
  const memberRole = useMemberRole()
  const { t } = useTranslation('routes.members')
  const getMembers = useQuery({
    queryKey: ['members', debouncedQuery],
    queryFn: () => client.getMembers({ query: debouncedQuery })
  })
  const createMember = useMutation({
    mutationFn: (data: CreateMemberCommand) => client.createMember(data),
    onSuccess: () => {
      getMembers.refetch()
      setCreateMemberDialogOpen(false)
      toast.success(t('toast.createMemberSuccess'))
    },
    onError: (error) => {
      const isConflict = Client.isConflict(error)
      const isNotFound = Client.isNotFound(error)

      if (isConflict) {
        toast.error(t('toast.memberAlreadyExistsError'))
      } else if (isNotFound) {
        toast.error(t('toast.userNotFoundError'))
      } else {
        toast.error(t('toast.createMemberError'))
      }
    }
  })
  const deleteMember = useMutation({
    mutationFn: () => client.deleteMember({ memberId: memberToDelete!.id }),
    onSuccess: () => {
      getMembers.refetch()
      setMemberToDelete(null)
      toast.success(t('toast.deleteMemberSuccess'))
    },
    onError: () => toast.error(t('toast.deleteMemberError'))
  })
  const updateMemberRole = useMutation({
    mutationFn: (data: UpdateMemberRoleCommand) => client.updateMemberRole(data),
    onSuccess: () => {
      getMembers.refetch()
      toast.success(t('toast.updateMemberRoleSuccess'))
    },
    onError: () => toast.error(t('toast.updateMemberRoleError'))
  })
  const members = getMembers.data?.data ?? []

  return (
    <div className="py-4 w-full px-8">
      <div className="mb-6 flex flex-row justify-between items-center">
        <div className="space-y-0.5">
          <h1 className="text-2xl font-semibold">
            {t('title')}
          </h1>
          <p className="text-sm text-muted-foreground">
            {t('description')}
          </p>
        </div>
        <Button
          className="text-"
          variant="outline"
          size="sm"
          disabled={createMember.isPending || getMembers.isPending || memberRole === 'member'}
          onClick={() => setCreateMemberDialogOpen(true)}
        >
          <PlusIcon />
          {t('actions.addMember')}
        </Button>
      </div>

      <Input
        placeholder={t('actions.search')}
        className="max-w-sm mb-4"
        value={query}
        onChange={event => {
          const value = event.target.value
          setSearchParams(value ? { query: value } : {})
        }}
      />

      {getMembers.error && (
        <div className="flex flex-col items-center justify-center mt-4">
          <h2 className="text-lg font-semibold mb-1">
            {t('errors.loadTitle')}
          </h2>
          <p className="text-xs text-muted-foreground">
            {t('errors.loadDescription')}
          </p>
          <Button
            variant="outline"
            size="sm"
            className="mt-4"
            disabled={getMembers.isPending}
            onClick={() => getMembers.refetch()}
          >
            {t('common:retry')}
          </Button>
        </div>
      )}

      {!getMembers.error && (
        <MembersDataTable
          members={members}
          memberRole={memberRole}
          loading={getMembers.isPending}
          updateMemberRoleLoading={updateMemberRole.isPending}
          handleDelete={member => setMemberToDelete(member)}
          updateMemberRole={(memberId, role) => updateMemberRole.mutate({ memberId, role })}
        />
      )}


      {createMemberDialogOpen && (
        <CreateMemberDialog
          open={createMemberDialogOpen}
          isMutating={createMember.isPending}
          onCancel={() => setCreateMemberDialogOpen(false)}
          onConfirm={(email, role) => createMember.mutate({ email, role })}
        />
      )}

      {memberToDelete && (
        <DeleteMemberDialog
          open={Boolean(memberToDelete)}
          isMutating={deleteMember.isPending}
          onCancel={() => setMemberToDelete(null)}
          onConfirm={() => deleteMember.mutate()}
        />
      )}
    </div>
  )
}
