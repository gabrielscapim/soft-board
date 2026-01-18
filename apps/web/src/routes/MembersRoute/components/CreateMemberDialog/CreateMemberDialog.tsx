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
import { useTranslation } from 'react-i18next'

export type CreateMemberDialogProps = {
  open?: boolean
  isMutating?: boolean
  onCancel?: () => void
  onConfirm?: (email: string, role: 'admin' | 'member') => void
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
  const { open, isMutating, onCancel, onConfirm } = props

  const { t } = useTranslation('routes.members')
  const formik = useFormik({
    validationSchema: schema,
    initialValues: {
      email: '',
      role: 'member'
    },
    onSubmit: values => onConfirm?.(values.email, values.role as 'admin' | 'member')
  })

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        if (!isMutating) {
          formik.resetForm()
          onCancel?.()
        }
      }}
    >
      <div>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('createMemberDialog.title')}</DialogTitle>
            <DialogDescription>
              {t('createMemberDialog.description')}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={formik.handleSubmit}>
            <div className="grid gap-3 mb-4">
              <Label htmlFor="name">{t('createMemberDialog.form.email.label')}</Label>
              <Input
                id="email"
                type="email"
                required
                disabled={isMutating}
                value={formik.values.email}
                onChange={formik.handleChange}
              />
            </div>
            <Label className="grid gap-2 mb-4">
              {t('createMemberDialog.form.role.label')}
              <Select
                value={formik.values.role}
                onValueChange={value => formik.setFieldValue('role', value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={t('createMemberDialog.form.role.placeholder')} />
                </SelectTrigger>
                <SelectContent className="max-h-72">
                  {ROLES.map(role => (
                    <SelectItem key={role.value} value={role.value}>
                      {t(`common:${role.value}`)}
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
                  disabled={isMutating}
                  onClick={onCancel}
                >
                  {t('createMemberDialog.cancel')}
                </Button>
              </DialogClose>
              <Button
                type="submit"
                disabled={isMutating}
              >
                {t('createMemberDialog.confirm')}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </div>
    </Dialog>
  )
}
