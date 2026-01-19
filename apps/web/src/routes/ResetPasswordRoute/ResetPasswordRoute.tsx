import { Card, CardContent } from '@/components'
import { useNavigate, useParams } from 'react-router'
import { ResetPasswordForm } from './components'
import { getRootImage } from '@/helpers'
import { useState } from 'react'

export function ResetPasswordRoute () {
  const [rootImage] = useState(getRootImage())
  const params = useParams<{ token?: string }>()
  const navigate = useNavigate()
  const token = params.token

  if (!token) {
    return <div className="h-screen">Invalid token.</div>
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <Card className="overflow-hidden p-0">
          <CardContent className="grid p-0 md:grid-cols-2">
            <div className="min-h-[392px] flex">
              <ResetPasswordForm
                token={token}
                onSubmit={() => navigate('/sign-in')}
              />
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
