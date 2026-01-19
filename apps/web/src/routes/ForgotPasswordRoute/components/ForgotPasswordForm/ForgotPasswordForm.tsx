import { Button, Input, Label } from '@/components'
import { useClient } from '@/hooks/use-client'
import { useMutation } from '@tanstack/react-query'
import { useFormik } from 'formik'
import { ChevronLeftIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'
import { toast } from 'sonner'
import * as yup from 'yup'

export type ForgotPasswordFormProps = {
  onSubmit?: () => void
}

const formSchema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required')
})

export function ForgotPasswordForm (props: ForgotPasswordFormProps) {
  const { onSubmit } = props

  const { t } = useTranslation('routes.forgotPassword')
  const client = useClient()
  const forgotPassword = useMutation({
    mutationFn: async (email: string) => await client.forgotPassword({ email }),
    onError: () => toast.error(t('toast.forgotPasswordError'))
  })
  const formik = useFormik({
    validationSchema: formSchema,
    initialValues: {
      email: ''
    },
    onSubmit: async (values, helpers) => {
      await forgotPassword.mutateAsync(values.email)
      helpers.resetForm()
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
          <Label htmlFor="email">{t('form.email.label')}</Label>
          <Input
            id="email"
            type="email"
            required
            disabled={formik.isSubmitting}
            value={formik.values.email}
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
