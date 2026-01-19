import { Client } from '@/client'
import { Button, Input, Label } from '@/components'
import { useClient } from '@/hooks/use-client'
import { useMutation } from '@tanstack/react-query'
import { useFormik } from 'formik'
import { ChevronLeftIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'
import { toast } from 'sonner'
import * as yup from 'yup'

export type ResetPasswordFormProps = {
  token: string
  onSubmit?: () => void
}

const formSchema = yup.object({
  password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required')
})

export function ResetPasswordForm (props: ResetPasswordFormProps) {
  const { token, onSubmit } = props

  const { t } = useTranslation('routes.resetPassword')
  const client = useClient()
  const resetPassword = useMutation({
    mutationFn: async (newPassword: string) => await client.resetPassword({ newPassword, token }),
    onError: (error: any) => {
      const code = Client.getErrorCode(error)
      toast.error(code ? t(`errors.${code}`, { ns: 'common' }) : t('toast.resetPasswordError'))
    }
  })
  const formik = useFormik({
    validationSchema: formSchema,
    initialValues: {
      password: ''
    },
    onSubmit: async (values, helpers) => {
      await resetPassword.mutateAsync(values.password)
      helpers.resetForm()
      toast.success(t('toast.resetPasswordSuccess'))
      onSubmit?.()
    }
  })

  return (
    <form className="px-8 md:px-8 py-14 md:py-14" onSubmit={formik.handleSubmit}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-2xl font-bold pb-1">
            {t('form.title')}
          </h1>
          <p className="text-muted-foreground text-balance text-sm">
            {t('form.description')}
          </p>
        </div>
        <div className="grid gap-3">
          <Label htmlFor="password">{t('form.password.label')}</Label>
          <Input
            id="password"
            type="password"
            required
            disabled={formik.isSubmitting}
            value={formik.values.password}
            onChange={formik.handleChange}
          />
        </div>
        <Button
          type="submit"
          className="w-full"
          disabled={formik.isSubmitting}
        >
          {t('form.confirm')}
        </Button>
        <Link to="/sign-in" className="w-full">
          <Button
            type="button"
            variant="outline"
            className="w-full"
            disabled={formik.isSubmitting}
            onClick={() => formik.resetForm()}
          >
            <ChevronLeftIcon />
            {t('form.back')}
          </Button>
        </Link>
      </div>
    </form>
  )
}
