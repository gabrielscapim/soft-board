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

export function MembersRoute () {
  const [createMemberDialogOpen, setCreateMemberDialogOpen] = useState(false)
  const [memberToDelete, setMemberToDelete] = useState<GetMembersResultData | null>(null)
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('query') ?? ''
  const [debouncedQuery] = useDebounce(query, 400)
  const client = useClient()
  const memberRole = useMemberRole()
  const getMembers = useQuery({
    queryKey: ['members', debouncedQuery],
    queryFn: () => client.getMembers({ query: debouncedQuery })
  })
  const createMember = useMutation({
    mutationFn: (data: CreateMemberCommand) => client.createMember(data),
    onSuccess: () => {
      getMembers.refetch()
      setCreateMemberDialogOpen(false)
      toast.success('Member created successfully')
    },
    onError: (error) => {
      const isConflict = Client.isConflict(error)
      const isNotFound = Client.isNotFound(error)

      if (isConflict) {
        toast.error('Member already exists in the team')
      } else if (isNotFound) {
        toast.error('User not found')
      } else {
        toast.error('Failed to create member')
      }
    }
  })
  const deleteMember = useMutation({
    mutationFn: () => client.deleteMember({ memberId: memberToDelete!.id }),
    onSuccess: () => {
      getMembers.refetch()
      setMemberToDelete(null)
      toast.success('Member deleted successfully')
    },
    onError: () => toast.error('Failed to delete member')
  })
  const updateMemberRole = useMutation({
    mutationFn: (data: UpdateMemberRoleCommand) => client.updateMemberRole(data),
    onSuccess: () => {
      getMembers.refetch()
      toast.success('Member role updated successfully')
    },
    onError: () => toast.error('Failed to update member role')
  })
  const members = getMembers.data?.data ?? []
  const hasPermission = ['owner', 'admin'].includes(memberRole ?? '')

  return (
    <div className="py-4 w-full px-8">
      <div className="mb-6 flex flex-row justify-between items-center">
        <div className="space-y-0.5">
          <h1 className="text-2xl font-semibold">Team members</h1>
          <p className="text-sm text-muted-foreground">
            Manage your team members, their roles, and permissions.
          </p>
        </div>
        <Button
          className="text-"
          variant="outline"
          size="sm"
          disabled={createMember.isPending || getMembers.isPending || !hasPermission}
          onClick={() => setCreateMemberDialogOpen(true)}
        >
          <PlusIcon />
          Add member
        </Button>
      </div>

      <Input
        placeholder="Search members by name or email"
        className="max-w-sm mb-4"
        value={query}
        onChange={event => {
          const value = event.target.value
          setSearchParams(value ? { query: value } : {})
        }}
      />

      {getMembers.error && (
        <div className="flex flex-col items-center justify-center mt-4">
          <h2 className="text-lg font-semibold text-destructive mb-1">
            Failed to load members
          </h2>
          <p className="text-xs text-muted-foreground">
            There was an error fetching the members
          </p>
          <Button
            variant="outline"
            size="sm"
            className="mt-4"
            disabled={getMembers.isPending}
            onClick={() => getMembers.refetch()}
          >
            Retry
          </Button>
        </div>
      )}

      {!getMembers.error && (
        <MembersDataTable
          members={members}
          hasPermission={hasPermission}
          loading={getMembers.isPending}
          updateMemberRoleLoading={updateMemberRole.isPending}
          handleDelete={member => setMemberToDelete(member)}
          updateMemberRole={(memberId, role) => updateMemberRole.mutate({ memberId, role })}
        />
      )}


      {createMemberDialogOpen && (
        <CreateMemberDialog
          open={createMemberDialogOpen}
          onOpenChange={setCreateMemberDialogOpen}
          onCreate={(email, role) => createMember.mutate({ email, role })}
          onCancel={() => setCreateMemberDialogOpen(false)}
        />
      )}

      {memberToDelete && (
        <DeleteMemberDialog
          open={Boolean(memberToDelete)}
          onDelete={() => deleteMember.mutate()}
          onCancel={() => setMemberToDelete(null)}
        />
      )}
    </div>
  )
}
