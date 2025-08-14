import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFormik } from 'formik'
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
            <DialogTitle>Create team</DialogTitle>
            <DialogDescription>
              Create a new team to collaborate with others.
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
                Create
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </div>
    </Dialog>
  )
}
