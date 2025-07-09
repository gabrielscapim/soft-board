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

export type MembersDataTableProps = {
  members?: GetMembersResultData[]
  hasPermission?: boolean
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
  const { members = [], hasPermission, loading, updateMemberRoleLoading, handleDelete, updateMemberRole } = props

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
      header: 'Name',
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
              {isSameUser ? `${name} (You)` : name}
            </span>
          </div>
        )
      }
    },
    {
      accessorKey: 'role',
      header: 'Role',
      cell: ({ row }) => {
        const role = row.getValue('role') as MemberData['role']
        const isOwner = row.original.role === 'owner'

        if (isOwner) {
          return <span>Owner</span>
        }

        const isSameUser = row.original.userId === authenticatedUser?.userId
        const roles = [
          { value: 'admin', label: 'Admin' },
          { value: 'member', label: 'Member' }
        ]

        return (
          <Select
            value={role}
            onValueChange={value => updateMemberRole?.(row.original.id, value as 'admin' | 'member')}
          >
            <SelectTrigger
              size="sm"
              disabled={updateMemberRoleLoading || isSameUser || !hasPermission}
            >
              <SelectValue placeholder="Select color" />
            </SelectTrigger>
            <SelectContent className="max-h-72">
              {roles.map(role => (
                <SelectItem key={role.value} value={role.value}>
                  {role.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )
      }
    },
    {
      accessorKey: 'email',
      header: 'Email'
    },
    {
      accessorKey: 'createDate',
      header: 'Added At',
      cell: ({ row }) => <FormattedDate date={new Date(row.getValue('createDate'))} />
    },
    {
      accessorKey: 'updateDate',
      header: 'Updated At',
      cell: ({ row }) => <FormattedDate date={new Date(row.getValue('updateDate'))} />
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        const member = members.find(m => m.user.id === row.original.userId)!
        const isSameUser = member.user.id === authenticatedUser?.userId
        const isOwner = member.role === 'owner'

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                disabled={isSameUser || !hasPermission || isOwner}
                onClick={() => handleDelete?.(member)}
              >
                <TrashIcon />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  return (
    <DataTable
      columns={columns}
      data={data}
      loading={loading}
    />
  )
}
