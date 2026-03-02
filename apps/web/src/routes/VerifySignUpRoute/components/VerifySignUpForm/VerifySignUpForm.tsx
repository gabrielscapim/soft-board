import { Client } from '@/client'
import { Button } from '@/components/ui/button'
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/components/ui/input-otp'
import { useAuthentication, useClient } from '@/hooks'
import { useMutation } from '@tanstack/react-query'
import { useFormik } from 'formik'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate, useSearchParams } from 'react-router'
import { toast } from 'sonner'
import { VerifySignUpCommand } from 'types/endpoints'

export function VerifySignUpForm () {
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const token = location.state?.token ?? searchParams.get('token') // From sign-up route or email link
  const code = searchParams.get('code') ?? ''
  const client = useClient()
  const authentication = useAuthentication()
  const navigate = useNavigate()
  const { t } = useTranslation('routes.verifySignUp')

  const verifySignUp = useMutation({
    mutationFn: (data: VerifySignUpCommand) => client.verifySignUp(
      data,
      {
        headers: {
          'soft-board-sign-up-form': token
        }
      }
    ),
    onSuccess: (result) => {
      authentication.setAuthenticatedUser(result)
      navigate(`/${result.fallbackTeam?.slug ?? ''}/boards`)
      toast.success(t('toast.success'))
    },
    onError: (error: any) => {
      const code = Client.getErrorCode(error)
      toast.error(code ? t(`errors.${code}`, { ns: 'common' }) : 'An error occurred while verifying your email.')
    }
  })

  const formik = useFormik({
    initialValues: {
      code
    },
    onSubmit: async (values) => verifySignUp.mutateAsync({ code: values.code })
  })

  return (
    <form className="py-20" onSubmit={formik.handleSubmit}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center text-center gap-2">
          <h1 className="text-2xl font-bold pb-1">
            {t('form.title')}
          </h1>
          <p className="text-muted-foreground text-balance text-sm">
            {t('form.description')}
          </p>
        </div>

        <div className="w-65 mx-auto flex flex-col gap-8">
          <InputOTP
            maxLength={6}
            value={formik.values.code}
            onChange={(value) => formik.setFieldValue('code', value)}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>

            <InputOTPSeparator />

            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          <Button
            type="submit"
            disabled={formik.isSubmitting}
          >
            {t('form.confirm')}
          </Button>
        </div>
      </div>
    </form>
  )
}
