import clsx, { ClassValue } from 'clsx'
import { type ReactNode, type SelectHTMLAttributes } from 'react'

export type SelectProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> & {
  options: { value: string, label: ReactNode, disabled?: boolean }[]
  label?: ReactNode
  size?: 'lg' | 'md' | 'sm' | 'xs'
  color?: 'warning' | 'error'
  error?: boolean
  className?: ClassValue
}

export function Select (props: SelectProps) {
  const { label, options, size, color, error, className, ...selectProps } = props

  return (
    <label className="form-control w-full">
      {label && (
        <div className="label">
          <span
            className={clsx(
              'label-text',
              error && 'text-error'
            )}
          >
            {label}
          </span>
        </div>
      )}
      <select
        className={clsx(
          'select',
          'select-bordered',
          error && 'select-error',
          color === 'warning' && 'select-warning',
          color === 'error' && 'select-error',
          {
            'select-lg': size === 'lg',
            'select-md': size === 'md',
            'select-sm': size === 'sm',
            'select-xs': size === 'xs'
          },
          className
        )}
        {...selectProps}
      >
        {options.map(option => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </select>
    </label>
  )
}
