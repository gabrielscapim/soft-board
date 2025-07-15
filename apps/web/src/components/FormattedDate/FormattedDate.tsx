import clsx from 'clsx'
import { differenceInHours, formatDistanceToNow, format as dfFormat } from 'date-fns'
import { isValid } from 'date-fns/isValid'
import { enUS } from 'date-fns/locale'
import { ReactNode } from 'react'

export type FormattedDateProps = {
  className?: string
  date?: Date | string | number | null
  format?: string
  fallback?: ReactNode
}

const DEFAULT_FORMAT = 'Pp'

export function FormattedDate (props: FormattedDateProps) {
  const { date, format = DEFAULT_FORMAT, fallback, className } = props
  const value = getValue(date)

  if (!value || !isValid(value)) {
    return fallback
  }

  const now = new Date()
  const diffHours = differenceInHours(now, value)

  let label: string

  if (diffHours < 1) {
    label = formatDistanceToNow(value, { locale: enUS, addSuffix: true })
  } else if (diffHours < 24) {
    label = formatDistanceToNow(value, { locale: enUS, addSuffix: true })
  } else {
    label = dfFormat(value, format, { locale: enUS })
  }

  return (
    <span
      className={clsx(className, 'whitespace-nowrap')}
    >
      {label}
    </span>
  )
}

function getValue (date: FormattedDateProps['date']): Date | null {
  if (date instanceof Date) {
    return date
  }

  if (typeof date === 'string') {
    return new Date(date)
  }

  if (typeof date === 'number') {
    return new Date(date)
  }

  return null
}
