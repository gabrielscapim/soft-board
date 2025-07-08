import { Button } from '@/components/ui/button'
import { PropsWithChildren } from 'react'
import { Link } from 'react-router'

export type NotFoundRouteProps = PropsWithChildren<{
  description?: string
}>

export function NotFoundRoute (props: NotFoundRouteProps) {
  const { children, description } = props

  return (
    <div className="flex items-center min-h-screen px-4 py-12 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <div className="w-full space-y-6 text-center">
        <div className="space-y-3">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">404</h1>
          <p className="text-muted-foreground">
            {description ?? 'The page you are looking for does not exist.'}
          </p>
          {children && children}
          {!children && (
            <Button asChild>
              <Link to="/">
                Go back
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
