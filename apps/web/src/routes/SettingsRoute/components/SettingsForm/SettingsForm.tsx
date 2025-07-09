import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFormik } from 'formik'
import { GetTeamResult } from 'types/endpoints'
import * as yup from 'yup'

export type SettingsFormProps = {
  team?: GetTeamResult
  hasPermission?: boolean
  handleSubmit?: (name: string) => void
}

const schema = yup.object({
  name: yup.string().trim().required('Team name is required').max(100, 'Team name must be at most 100 characters long')
})

export function SettingsForm (props: SettingsFormProps) {
  const { team, hasPermission, handleSubmit } = props

  const formik = useFormik({
    validationSchema: schema,
    initialValues: {
      name: team?.name ?? '',
    },
    onSubmit: values => {
      handleSubmit?.(values.name)
      formik.setSubmitting(false)
    }
  })

  return (
    <form className="flex flex-col gap-6" onSubmit={formik.handleSubmit}>
      <div className="grid gap-3">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          type="text"
          name="name"
          maxLength={100}
          required
          disabled={formik.isSubmitting || !hasPermission}
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <span className="text-xs text-muted-foreground">
          This is the name of your team. It will be displayed for all members.
        </span>
      </div>
      <Button
        type="submit"
        className="w-fit self-start"
        disabled={formik.isSubmitting || !hasPermission}
      >
        Save changes
      </Button>
    </form>
  )
}
