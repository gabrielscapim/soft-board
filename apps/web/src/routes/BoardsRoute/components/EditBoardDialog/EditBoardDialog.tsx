import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFormik } from 'formik'
import { useTranslation } from 'react-i18next'
import { GetBoardsResultData } from 'types/endpoints'
import * as yup from 'yup'

export type EditBoardDialogProps = {
  board: GetBoardsResultData | null
  open?: boolean
  isMutating?: boolean
  onCancel?: () => void
  onConfirm?: (title: string) => void
}

export function EditBoardDialog (props: EditBoardDialogProps) {
  const {
    board,
    open,
    isMutating,
    onCancel,
    onConfirm
  } = props

  const { t } = useTranslation('routes.boards')

  const formik = useFormik({
    validationSchema: yup.object({
      name: yup
        .string()
        .min(3, t('editDialog.form.validation.nameMin'))
        .max(50, t('editDialog.form.validation.nameMax'))
        .required(t('editDialog.form.validation.nameRequired'))
    }),
    initialValues: {
      name: board?.title ?? ''
    },
    onSubmit: values => onConfirm?.(values.name)
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
            <DialogTitle>
              {t('editDialog.title')}
            </DialogTitle>
            <DialogDescription>
              {t('editDialog.description')}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={formik.handleSubmit}>
            <div className="grid gap-3 mb-4">
              <Label htmlFor="name">{t('editDialog.form.name.label')}</Label>
              <Input
                id="name"
                type="text"
                minLength={1}
                maxLength={255}
                required
                disabled={isMutating}
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
                  {t('editDialog.cancel')}
                </Button>
              </DialogClose>
              <Button
                type="submit"
                disabled={isMutating}
              >
                {t('editDialog.confirm')}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </div>
    </Dialog>
  )
}
