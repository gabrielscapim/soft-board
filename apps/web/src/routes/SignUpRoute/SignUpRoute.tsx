import { Card, CardContent } from '@/components/ui/card'
import { getRootImage } from '@/helpers'
import { useMemo } from 'react'
import { SignUpForm } from './components'

export function SignUpRoute () {
  const [rootImage] = useMemo(() => [getRootImage()], [])

  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        <Card className="overflow-hidden p-0">
          <CardContent className="grid p-0 md:grid-cols-2">
            <SignUpForm />

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
