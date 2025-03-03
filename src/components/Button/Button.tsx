import clsx, { ClassValue } from 'clsx'
import { DetailedHTMLProps, HTMLAttributeAnchorTarget } from 'react'

export type ButtonColor =
  'neutral' |
  'primary' |
  'secondary' |
  'info' |
  'success' |
  'warning' |
  'error'

export type ButtonProps =
  DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
    className?: ClassValue
    color?: ButtonColor
    size?: 'lg' | 'md' | 'sm' | 'xs'
    target?: HTMLAttributeAnchorTarget
    square?: boolean
    circle?: boolean
    outline?: boolean
    ghost?: boolean
  }

export function Button (props: ButtonProps) {
  const {
    color,
    size,
    children,
    square,
    circle,
    outline,
    ghost,
    className,
    ...buttonProps
  } = props

  const classes = clsx(
    'btn',
    {
      'btn-outline': outline
    },
    {
      'btn-neutral': color === 'neutral',
      'btn-primary': color === 'primary',
      'btn-secondary': color === 'secondary',
      'btn-info': color === 'info',
      'btn-success': color === 'success',
      'btn-warning': color === 'warning',
      'btn-error': color === 'error'
    },
    {
      'btn-square': square,
      'btn-circle': circle,
      'btn-ghost': ghost
    },
    {
      'btn-lg': size === 'lg',
      'btn-md': size === 'md',
      'btn-sm': size === 'sm',
      'btn-xs': size === 'xs'
    },
    ghost && 'disabled:bg-transparent',
    className
  )

  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  )
}
