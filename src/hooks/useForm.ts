import { useState, type ChangeEvent, type FormEvent } from 'react'
import { HttpError, type FieldErrors } from '../api/HttpError'

function removeKey(errors: FieldErrors, key: string): FieldErrors {
  const next = { ...errors }
  delete next[key]
  return next
}

interface UseFormOptions<TValues> {
  initialValues: TValues
  validate: (values: TValues) => FieldErrors
  onSubmit: (values: TValues) => Promise<void>
}

/** Maneja valores, validación, envío y errores de un formulario. */
export function useForm<TValues extends Record<string, string>>({
  initialValues,
  validate,
  onSubmit,
}: UseFormOptions<TValues>) {
  const [values, setValues] = useState<TValues>(initialValues)
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [formError, setFormError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
    setFieldErrors((current) => removeKey(current, name))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFormError(null)

    const errors = validate(values)
    setFieldErrors(errors)
    if (Object.keys(errors).length > 0) return

    setIsSubmitting(true)
    try {
      await onSubmit(values)
    } catch (error) {
      const httpError = error instanceof HttpError ? error : null
      setFieldErrors(httpError?.fieldErrors ?? {})
      setFormError(httpError?.message ?? 'Algo salió mal. Intenta de nuevo.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return { values, fieldErrors, formError, isSubmitting, handleChange, handleSubmit }
}
