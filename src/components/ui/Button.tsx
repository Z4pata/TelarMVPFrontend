import type { ButtonHTMLAttributes } from 'react'
import './Button.css'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
  block?: boolean
  isLoading?: boolean
}

export function Button({
  variant = 'primary',
  block = false,
  isLoading = false,
  disabled,
  children,
  ...buttonProps
}: ButtonProps) {
  const className = ['button', `button--${variant}`, block && 'button--block'].filter(Boolean).join(' ')

  return (
    <button className={className} disabled={disabled || isLoading} {...buttonProps}>
      <span>{isLoading ? 'Procesando…' : children}</span>
      {variant === 'primary' && (
        <span className="button__arrow" aria-hidden="true">
          →
        </span>
      )}
    </button>
  )
}
