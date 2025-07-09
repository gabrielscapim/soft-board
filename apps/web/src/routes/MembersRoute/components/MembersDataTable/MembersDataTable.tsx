import { GetMembersResultData } from 'types/endpoints'
import { ColumnDef } from '@tanstack/react-table'
import { DataTable, FormattedDate } from '@/components'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { useAuthentication } from '@/hooks'
import { useState } from 'react'

export type MembersDataTableProps = {
  members?: GetMembersResultData[]
  loading?: boolean
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
  const {
    members = [],
    loading = false
  } = props

  const [rowSelection, setRowSelection] = useState({})
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
      id: 'select',
      header: ({ table }) => {
        const allRows = table.getRowModel().rows
        const selectableRows = allRows.filter(
          (row) => row.original.userId !== authenticatedUser?.userId
        )

        const allSelectableSelected = selectableRows.every((row) => row.getIsSelected())
        const someSelectableSelected = selectableRows.some((row) => row.getIsSelected())

        return (
          <Checkbox
            checked={allSelectableSelected || (someSelectableSelected && 'indeterminate')}
            onCheckedChange={(checked) => {
              selectableRows.forEach((row) => row.toggleSelected(!!checked))
            }}
            aria-label="Select all"
            disabled={loading}
          />
        )
      },
      cell: ({ row }) => {
        const isSameUser = row.original.userId === authenticatedUser?.userId

        return (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
            disabled={loading || isSameUser}
          />
        )
      }
    },
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
    }
  ]

  return (
    <DataTable
      columns={columns}
      data={data}
      rowSelection={rowSelection}
      loading={loading}
      setRowSelection={setRowSelection}
    />
  )
}
