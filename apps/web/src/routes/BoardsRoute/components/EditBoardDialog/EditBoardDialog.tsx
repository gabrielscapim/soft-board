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

  const formik = useFormik({
    validationSchema: yup.object({
      name: yup
        .string()
        .min(1, 'Name must be at least 1 character')
        .max(255, 'Name must be at most 255 characters')
        .required('Name is required')
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
            <DialogTitle>Edit board</DialogTitle>
            <DialogDescription>
              Make changes to your board here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={formik.handleSubmit}>
            <div className="grid gap-3 mb-4">
              <Label htmlFor="name">Name</Label>
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
