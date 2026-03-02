import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFormik } from 'formik'
import { useTranslation } from 'react-i18next'
import { GetTeamResult, UpdateTeamCommand } from 'types/endpoints'
import * as yup from 'yup'
import { TeamLogoInput } from './TeamLogoInput'

export type SettingsFormProps = {
  team?: GetTeamResult
  hasPermission?: boolean
  handleSubmit?: (data: UpdateTeamCommand) => void
}

const schema = yup.object({
  name: yup.string().trim().required('Team name is required').max(100, 'Team name must be at most 100 characters long'),
  logo: yup
    .object({
      base64: yup.string().required('Logo base64 data is required'),
      mimeType: yup.string().required('Logo MIME type is required')
    })
    .optional()
    .nullable()
    .default(undefined)
})

type FormValues = yup.InferType<typeof schema>

export function SettingsForm (props: SettingsFormProps) {
  const { team, hasPermission, handleSubmit } = props

  const { t } = useTranslation('routes.settings')

  const formik = useFormik<FormValues>({
    validationSchema: schema,
    initialValues: {
      name: team?.name ?? '',
      logo: undefined
    },
    onSubmit: values => {
      handleSubmit?.(values)
      formik.setSubmitting(false)
    }
  })

  return (
    <form className="flex flex-col gap-6" onSubmit={formik.handleSubmit}>
      <TeamLogoInput
        team={team}
        newLogo={formik.values.logo}
        hasPermission={hasPermission}
        onFileChange={(logo) => formik.setFieldValue('logo', logo)}
        onRemoveLogo={() => formik.setFieldValue('logo', null)}
      />

      <div className="grid gap-3 py-3">
        <Label htmlFor="name">{t('form.name.label')}</Label>
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
          {t('form.name.placeholder')}
        </span>
      </div>

      <Button
        type="submit"
        className="w-fit self-end"
        disabled={formik.isSubmitting || !hasPermission}
      >
        {t('form.submit')}
      </Button>
    </form>
  )
}
