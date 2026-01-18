import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  Input,
  Label
} from '@/components'
import { useFormik } from 'formik'
import { useTranslation } from 'react-i18next'
import * as yup from 'yup'

export type CreateTeamDialogProps = {
  open: boolean
  isMutating?: boolean
  onCancel?: () => void
  onConfirm?: (name: string) => void
}

const schema = yup.object({
  name: yup.string().trim().required('Name is required').max(100, 'Name must be at most 100 characters long')
})

export function CreateTeamDialog (props: CreateTeamDialogProps) {
  const {
    open,
    isMutating,
    onCancel,
    onConfirm
  } = props

  const { t } = useTranslation('layouts.rootLayout')

  const formik = useFormik({
    validationSchema: schema,
    initialValues: {
      name: ''
    },
    onSubmit: (values) => onConfirm?.(values.name)
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
            <DialogTitle>{t('createTeamDialog.title')}</DialogTitle>
            <DialogDescription>
              {t('createTeamDialog.description')}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={formik.handleSubmit}>
            <div className="grid gap-3 mb-4">
              <Label htmlFor="name">{t('common:name')}</Label>
              <Input
                id="name"
                type="text"
                minLength={1}
                maxLength={255}
                required
                value={formik.values.name}
                onChange={formik.handleChange}
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="outline"
                  disabled={isMutating}
                  onClick={onCancel}
                >
                  {t('createTeamDialog.cancel')}
                </Button>
              </DialogClose>
              <Button
                type="submit"
                disabled={isMutating}
              >
                {t('createTeamDialog.create')}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </div>
    </Dialog>
  )
}
