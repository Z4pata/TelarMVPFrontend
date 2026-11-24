import type { InputHTMLAttributes } from 'react'
import './TextField.css'

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  label: string
  error?: string
}

export function TextField({ id, name, label, error, ...inputProps }: TextFieldProps) {
  // El id puede venir de fuera cuando el mismo nombre de campo aparece en varios formularios.
  const inputId = id ?? name
  const errorId = `${inputId}-error`

  return (
    <div className="text-field">
      <label className="text-field__label" htmlFor={inputId}>
        {label}
      </label>
      <input
        id={inputId}
        name={name}
        className="text-field__input"
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        {...inputProps}
      />
      {error && (
        <p id={errorId} className="text-field__error">
          {error}
        </p>
      )}
    </div>
  )
}
