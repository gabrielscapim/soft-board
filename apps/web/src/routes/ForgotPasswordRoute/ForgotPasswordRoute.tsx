import { Card, CardContent } from '@/components'
import { ForgotPasswordForm, ForgotPasswordSuccess } from './components'
import { getRootImage } from '@/helpers/get-root-image'
import { useState } from 'react'

export function ForgotPasswordRoute () {
  const [rootImage] = useState(getRootImage())
  const [emailSent, setEmailSent] = useState(false)

  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <Card className="overflow-hidden p-0">
          <CardContent className="grid p-0 md:grid-cols-2">
            <div className="min-h-[392px] flex">
              {emailSent && (
                <ForgotPasswordSuccess />
              )}

              {!emailSent && (
                <ForgotPasswordForm
                  onSubmit={() => setEmailSent(true)}
                />
              )}
            </div>
            <div className="bg-muted relative hidden md:block">
              <img
                src={rootImage}
                alt="Image"
                className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
