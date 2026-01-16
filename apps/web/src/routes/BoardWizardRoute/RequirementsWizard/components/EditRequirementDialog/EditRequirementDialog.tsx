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
import { Textarea } from '@/components/ui/textarea'
import { useFormik } from 'formik'
import { useTranslation } from 'react-i18next'
import { GetRequirementsResultData } from 'types/endpoints'
import * as yup from 'yup'

export type EditRequirementDialogProps = {
  requirement: GetRequirementsResultData
  open?: boolean
  isMutating?: boolean
  onCancel?: () => void
  onConfirm?: (title: string, description: string) => void
}

const schema = yup.object({
  title: yup.string().trim().required('Title is required').max(100, 'Title must be at most 100 characters'),
  description: yup.string().trim().optional().max(500, 'Description must be at most 500 characters')
})

export function EditRequirementDialog (props: EditRequirementDialogProps) {
  const {
    requirement,
    open,
    isMutating,
    onCancel,
    onConfirm
  } = props

  const { t } = useTranslation('routes.boardWizard.editRequirementDialog')

  const formik = useFormik({
    validationSchema: schema,
    initialValues: {
      title: requirement.title ?? '',
      description: requirement.description ?? ''
    },
    onSubmit: values => onConfirm?.(values.title, values.description)
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
            <DialogTitle>{t('title')}</DialogTitle>
            <DialogDescription>
              {t('description')}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={formik.handleSubmit}>
            <div className="grid gap-3 mb-4">
              <Label htmlFor="name">{t('form.title.label')}</Label>
              <Input
                id="title"
                type="text"
                minLength={1}
                maxLength={100}
                required
                disabled={isMutating}
                value={formik.values.title}
                onChange={formik.handleChange}
              />
            </div>
            <div className="grid gap-3 mb-4">
              <Label htmlFor="name">{t('form.description.label')}</Label>
              <Textarea
                id="description"
                minLength={0}
                maxLength={500}
                placeholder={t('form.description.placeholder')}
                className="resize-none"
                disabled={isMutating}
                value={formik.values.description}
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
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                disabled={isMutating}
              >
                Save changes
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </div>
    </Dialog>
  )
}
