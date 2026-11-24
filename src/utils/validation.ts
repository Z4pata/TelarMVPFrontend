import type { FieldErrors } from '../api/HttpError'

type Rule = string | undefined

/** Mensaje de error si el texto está vacío. */
export function required(value: string, message: string): Rule {
  if (!value.trim()) return message
}

/** Mensaje de error si el texto supera el máximo de caracteres. */
export function maxLength(value: string, max: number, fieldLabel: string): Rule {
  if (value.length > max) return `${fieldLabel} no puede superar ${max} caracteres.`
}

/** Primer error encontrado entre varias reglas de un mismo campo. */
export function firstError(...rules: Rule[]): Rule {
  return rules.find(Boolean)
}

/** Quita los campos sin error para obtener el objeto que espera useForm. */
export function withoutEmpty(errors: Record<string, Rule>): FieldErrors {
  return Object.fromEntries(
    Object.entries(errors).filter((entry): entry is [string, string] => Boolean(entry[1])),
  )
}
