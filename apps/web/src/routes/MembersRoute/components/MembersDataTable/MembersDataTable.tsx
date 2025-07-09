import { GetMembersResultData } from 'types/endpoints'
import { ColumnDef } from '@tanstack/react-table'
import { DataTable, FormattedDate } from '@/components'
import { Badge } from '@/components/ui/badge'
import { useAuthentication } from '@/hooks'
import { Button } from '@/components/ui/button'
import { MoreHorizontal, TrashIcon } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

export type MembersDataTableProps = {
  members?: GetMembersResultData[]
  loading?: boolean
  handleDelete?: (member: GetMembersResultData) => void
}

type MemberData = {
  userId: string
  name: string
  role: 'owner' | 'admin' | 'member'
  email: string
  createDate: string
  updateDate: string
}

export function MembersDataTable (props: MembersDataTableProps) {
  const { members = [], loading = false, handleDelete } = props

  const { authenticatedUser } = useAuthentication()

  // Exclude the authenticated user from the list of members
  const filteredMembers = members.filter(member => member.user.id !== authenticatedUser?.userId)
  const authenticatedUserMember = members.find(member => member.user.id === authenticatedUser?.userId)
  const data: MemberData[] = [...(authenticatedUserMember ? [authenticatedUserMember] : []), ...filteredMembers].map(member => ({
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
          <span>
            {isSameUser ? `${name} (You)` : name}
          </span>
        )
      }
    },
    {
      accessorKey: 'role',
      header: 'Role',
      cell: ({ row }) => {
        const role = row.getValue('role') as MemberData['role']
        const variant: 'default' | 'outline' | 'secondary' =
          role === 'owner' ? 'default' : role === 'admin' ? 'outline' : 'secondary'

        return (
          <Badge variant={variant}>
            {role.charAt(0).toUpperCase() + role.slice(1)}
          </Badge>
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
                disabled={isSameUser}
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
