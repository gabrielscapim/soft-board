import { Button, Input, Label } from '@/components'
import { useClient } from '@/hooks/use-client'
import { useMutation } from '@tanstack/react-query'
import { useFormik } from 'formik'
import { ChevronLeftIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router'
import { toast } from 'sonner'
import { SignUpCommand } from 'types/endpoints'
import * as yup from 'yup'

export type SignUpFormProps = {
  onSubmit?: () => void
}

const formSchema = yup.object({
  name: yup.string().trim().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 8 characters').required('Password is required')
})

export function SignUpForm (props: SignUpFormProps) {
  const { onSubmit } = props

  const { t } = useTranslation('routes.signUp')
  const client = useClient()
  const navigate = useNavigate()
  const signUp = useMutation({
    mutationFn: async (data: SignUpCommand) => await client.signUp(data),
    onSuccess: (result) => {
      navigate('/verify-email', { state: { token: result.token } })
    },
    onError: () => toast.error(t('toast.error'))
  })
  const formik = useFormik({
    validationSchema: formSchema,
    initialValues: {
      name: '',
      email: '',
      password: ''
    },
    onSubmit: async (values, helpers) => {
      await signUp.mutateAsync(values)
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
          <Label htmlFor="name">{t('form.name.label')}</Label>
          <Input
            id="name"
            type="text"
            required
            minLength={2}
            disabled={formik.isSubmitting}
            value={formik.values.name}
            onChange={formik.handleChange}
          />
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
        <div className="grid gap-3">
          <Label htmlFor="password">{t('form.password.label')}</Label>
          <Input
            id="password"
            type="password"
            required
            minLength={8}
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
