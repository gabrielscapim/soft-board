import { useFormik } from 'formik'
import * as yup from 'yup'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export type CreateMemberDialogProps = {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  onCreate?: (email: string, role: 'admin' | 'member') => void
  onCancel?: () => void
}

const schema = yup.object({
  email: yup.string().email('Invalid email address').required('Email is required'),
  role: yup.string().oneOf(['admin', 'member'], 'Invalid role').required('Role is required')
})

const ROLES = [
  { value: 'admin', label: 'Admin' },
  { value: 'member', label: 'Member' }
]

export function CreateMemberDialog (props: CreateMemberDialogProps) {
  const { open, onOpenChange, onCreate, onCancel } = props

  const formik = useFormik({
    validationSchema: schema,
    initialValues: {
      email: '',
      role: 'member'
    },
    onSubmit: values => {
      onCreate?.(values.email, values.role as 'admin' | 'member')
      formik.setSubmitting(false)
    }
  })

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <div>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create member</DialogTitle>
            <DialogDescription>
              Add a new member to your team. Specify their email and role.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={formik.handleSubmit}>
            <div className="grid gap-3 mb-4">
              <Label htmlFor="name">Email</Label>
              <Input
                id="email"
                type="email"
                required
                value={formik.values.email}
                onChange={formik.handleChange}
              />
            </div>
            <Label className="grid gap-2 mb-4">
              Role
              <Select
                value={formik.values.role}
                onValueChange={value => formik.setFieldValue('role', value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select color" />
                </SelectTrigger>
                <SelectContent className="max-h-72">
                  {ROLES.map(role => (
                    <SelectItem key={role.value} value={role.value}>
                      {role.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Label>
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="outline"
                  disabled={formik.isSubmitting}
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                disabled={formik.isSubmitting}
              >
                Create member
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </div>
    </Dialog>
  )
}
