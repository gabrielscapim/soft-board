import { Button } from '@/components'
import { Link } from 'react-router'
import {  ChevronLeftIcon, MailCheckIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export function ForgotPasswordSuccess () {
  const { t } = useTranslation('routes.forgotPassword')

  return (
    <div className="flex flex-col items-center justify-center gap-4 px-8 py-14 text-center">
      <MailCheckIcon className="h-10 w-10 text-primary" />

      <h1 className="text-2xl font-bold">
        {t('success.title')}
      </h1>

      <p className="text-sm text-muted-foreground">
        {t('success.description')}
      </p>

      <Link to="/sign-in" className="w-full">
        <Button
          className="w-full"
          variant="outline"
        >
          <ChevronLeftIcon />
          {t('success.back')}
        </Button>
      </Link>
    </div>
  )
}
