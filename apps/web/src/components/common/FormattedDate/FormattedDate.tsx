import clsx from 'clsx'
import { differenceInHours, formatDistanceToNow, format as dfFormat, Locale } from 'date-fns'
import { isValid } from 'date-fns/isValid'
import { enUS, ptBR } from 'date-fns/locale'
import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

export type FormattedDateProps = {
  className?: string
  date?: Date | string | number | null
  format?: string
  fallback?: ReactNode
}

const dateLocales: Record<string, Locale> = {
  en: enUS,
  'en-US': enUS,
  pt: ptBR,
  'pt-BR': ptBR
}

const DEFAULT_FORMAT = 'Pp'

export function FormattedDate (props: FormattedDateProps) {
  const { date, format = DEFAULT_FORMAT, fallback, className } = props
  const { i18n } = useTranslation()

  const value = getValue(date)

  if (!value || !isValid(value)) {
    return <>{fallback}</>
  }

  const locale = dateLocales[i18n.language] ?? enUS
  const now = new Date()
  const diffHours = differenceInHours(now, value)

  let label: string

  if (diffHours < 24) {
    label = formatDistanceToNow(value, {
      locale,
      addSuffix: true
    })
  } else {
    label = dfFormat(value, format, { locale })
  }

  return (
    <span className={clsx(className, 'whitespace-nowrap')}>
      {label}
    </span>
  )
}

function getValue (date: FormattedDateProps['date']): Date | null {
  if (date instanceof Date) {
    return date
  }

  if (typeof date === 'string' || typeof date === 'number') {
    const parsed = new Date(date)
    return isValid(parsed) ? parsed : null
  }

  return null
}
