import clsx from 'clsx'
import { formatDate } from 'date-fns/format'
import { isValid } from 'date-fns/isValid'
import { ptBR } from 'date-fns/locale/pt-BR'
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

  const formatted = formatDate(value, format, { locale: format === 'EEEE' ? undefined : ptBR })

  return (
    <span
      className={clsx(className, 'whitespace-nowrap')}
    >
      {formatted}
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
