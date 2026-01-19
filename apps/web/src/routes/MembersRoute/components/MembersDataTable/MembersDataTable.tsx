import { GetMembersResultData } from 'types/endpoints'
import { ColumnDef } from '@tanstack/react-table'
import { DataTable, FormattedDate } from '@/components'
import { useAuthentication } from '@/hooks'
import { Button } from '@/components/ui/button'
import { MoreHorizontal, TrashIcon } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { getAvatarFallbackName } from '@/helpers'
import { useTranslation } from 'react-i18next'

export type MembersDataTableProps = {
  members?: GetMembersResultData[]
  memberRole?: 'owner' | 'admin' | 'member'
  loading?: boolean
  updateMemberRoleLoading?: boolean
  handleDelete?: (member: GetMembersResultData) => void
  updateMemberRole?: (memberId: string, role: 'admin' | 'member') => void
}

type MemberData = {
  id: string
  userId: string
  name: string
  role: 'owner' | 'admin' | 'member'
  email: string
  createDate: string
  updateDate: string
}

export function MembersDataTable (props: MembersDataTableProps) {
  const {
    members = [],
    memberRole,
    loading = false,
    updateMemberRoleLoading = false,
    handleDelete,
    updateMemberRole
  } = props

  const { t } = useTranslation('routes.members')
  const { authenticatedUser } = useAuthentication()

  // Exclude the authenticated user from the list of members
  const filteredMembers = members.filter(member => member.user.id !== authenticatedUser?.userId)
  const authenticatedUserMember = members.find(member => member.user.id === authenticatedUser?.userId)
  const data: MemberData[] = [...(authenticatedUserMember ? [authenticatedUserMember] : []), ...filteredMembers].map(member => ({
    id: member.id,
    userId: member.user.id,
    name: member.user.name,
    role: member.role,
    email: member.user.email,
    createDate: member.createDate,
    updateDate: member.updateDate
  }))

  const columns: ColumnDef<MemberData>[] = [
    {
      accessorKey: 'name',
      header: t('table.columns.name'),
      cell: ({ row }) => {
        const isSameUser = row.original.userId === authenticatedUser?.userId
        const name = row.getValue('name') as MemberData['name']

        return (
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarFallback>
                {getAvatarFallbackName(name)}
              </AvatarFallback>
            </Avatar>
            <span>
              {isSameUser ? `${name} (${t('table.columns.you')})` : name}
            </span>
          </div>
        )
      }
    },
    {
      accessorKey: 'role',
      header: t('table.columns.role'),
      cell: ({ row }) => {
        const role = row.getValue('role') as MemberData['role']
        const isOwner = row.original.role === 'owner'

        if (isOwner) {
          return <span>{t('table.roles.owner')}</span>
        }

        const isSameUser = row.original.userId === authenticatedUser?.userId
        const roles = [
          { value: 'admin', label: t('table.roles.admin') },
          { value: 'member', label: t('table.roles.member') }
        ]

        return (
          <Select
            value={role}
            onValueChange={value => updateMemberRole?.(row.original.id, value as 'admin' | 'member')}
          >
            <SelectTrigger
              size="sm"
              disabled={updateMemberRoleLoading || isSameUser || memberRole !== 'owner'}
            >
              <SelectValue placeholder="Select a member" />
            </SelectTrigger>
            <SelectContent className="max-h-72">
              {roles.map(role => (
                <SelectItem key={role.value} value={role.value}>
                  {t(`common:${role.value}`)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )
      }
    },
    {
      accessorKey: 'email',
      header: t('table.columns.email')
    },
    {
      accessorKey: 'createDate',
      header: t('table.columns.addedAt'),
      cell: ({ row }) => <FormattedDate date={new Date(row.getValue('createDate'))} />
    },
    {
      accessorKey: 'updateDate',
      header: t('table.columns.updatedAt'),
      cell: ({ row }) => <FormattedDate date={new Date(row.getValue('updateDate'))} />
    },
    {
      id: 'actions',
      header: t('table.columns.actions'),
      cell: ({ row }) => {
        const currentMember = members.find(m => m.user.id === row.original.userId)!
        const isSameUser = currentMember.user.id === authenticatedUser?.userId

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{t('common:actions')}</DropdownMenuLabel>
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                disabled={isSameUser || memberRole !== 'owner'}
                onClick={() => handleDelete?.(currentMember)}
              >
                <TrashIcon />
                {t('common:delete')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      }
    }
  ]

  return (
    <DataTable
      columns={columns}
      data={data}
      loading={loading}
    />
  )
}
