import type { SelectHTMLAttributes } from 'react'
import './TextField.css'

export interface SelectOption {
  value: string
  label: string
}

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string
  label: string
  options: SelectOption[]
  placeholder?: string
  error?: string
}

export function SelectField({
  name,
  label,
  options,
  placeholder = 'Selecciona una opción',
  error,
  ...selectProps
}: SelectFieldProps) {
  const errorId = `${name}-error`

  return (
    <div className="text-field">
      <label className="text-field__label" htmlFor={name}>
        {label}
      </label>
      <select
        id={name}
        name={name}
        className="text-field__input"
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        {...selectProps}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p id={errorId} className="text-field__error">
          {error}
        </p>
      )}
    </div>
  )
}
