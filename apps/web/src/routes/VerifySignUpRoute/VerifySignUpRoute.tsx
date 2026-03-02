import { Card, CardContent } from '@/components/ui/card'
import { VerifySignUpForm } from './components'

export function VerifySignUpRoute () {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <div className="w-full max-w-sm md:max-w-lg">
        <Card className="overflow-hidden p-0">
          <CardContent className="p-0">
            <VerifySignUpForm />
          </CardContent>
        </Card>
      </div>
    </div>

  )
}
