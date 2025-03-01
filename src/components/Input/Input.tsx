import clsx, { ClassValue } from 'clsx'
import { DetailedHTMLProps, ReactNode } from 'react'

export type InputProps =
  Omit<DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'size'> & {
    label?: ReactNode
    size?: 'lg' | 'md' | 'sm' | 'xs'
    className?: ClassValue
    helperText?: ReactNode
    error?: boolean
  }

export function Input (props: InputProps) {
  const { label, size, className, helperText, error, ...inputProps } = props

  return (
    <label className="form-control w-full">
      {label !== undefined && (
        <div className="label py-1">
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
      <input
        className={clsx(
          'input',
          'input-bordered',
          error && 'input-error',
          {
            'input-lg': size === 'lg',
            'input-md': size === 'md',
            'input-sm': size === 'sm',
            'input-xs': size === 'xs'
          },
          className
        )}
        {...inputProps}
      />
      {helperText !== undefined && (
        <div className="label py-1">
          <span
            className={clsx(
              'label-text-alt',
              'min-h-4',
              error && 'text-error'
            )}
          >
            {helperText}
          </span>
        </div>
      )}
    </label>
  )
}
