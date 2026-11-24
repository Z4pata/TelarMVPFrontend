import type { FieldErrors } from '../../api/HttpError'
import type { LoginData, RegisterData } from './types'

// Reglas alineadas con las validaciones del backend (LoginRequest y CrearUsuarioRequest).
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PASSWORD_MIN = 8
const PASSWORD_MAX = 72
const EMAIL_MAX = 150
const NAME_MAX = 100

function validateEmail(email: string): string | undefined {
  if (!email.trim()) return 'El email es obligatorio.'
  if (email.length > EMAIL_MAX) return `El email no puede superar ${EMAIL_MAX} caracteres.`
  if (!EMAIL_PATTERN.test(email)) return 'El email no tiene un formato válido.'
}

function validatePassword(password: string): string | undefined {
  if (!password) return 'La contraseña es obligatoria.'
  if (password.length < PASSWORD_MIN || password.length > PASSWORD_MAX) {
    return `La contraseña debe tener entre ${PASSWORD_MIN} y ${PASSWORD_MAX} caracteres.`
  }
}

function validateName(nombre: string): string | undefined {
  if (!nombre.trim()) return 'El nombre es obligatorio.'
  if (nombre.length > NAME_MAX) return `El nombre no puede superar ${NAME_MAX} caracteres.`
}

function validateConfirmation(password: string, confirmPassword: string): string | undefined {
  if (password !== confirmPassword) return 'Las contraseñas no coinciden.'
}

function withoutEmpty(errors: Record<string, string | undefined>): FieldErrors {
  return Object.fromEntries(
    Object.entries(errors).filter((entry): entry is [string, string] => Boolean(entry[1])),
  )
}

export function validateLogin({ email, password }: LoginData): FieldErrors {
  return withoutEmpty({
    email: validateEmail(email),
    password: validatePassword(password),
  })
}

export function validateRegister(data: RegisterData): FieldErrors {
  return withoutEmpty({
    nombre: validateName(data.nombre),
    email: validateEmail(data.email),
    password: validatePassword(data.password),
    confirmPassword: validateConfirmation(data.password, data.confirmPassword),
  })
}
