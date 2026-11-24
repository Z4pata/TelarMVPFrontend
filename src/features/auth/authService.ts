import { postJson } from '../../api/httpClient'
import type { LoginData, RegisterData, User } from './types'

/** Inicia sesión. El backend responde creando la cookie HttpOnly de sesión. */
export async function login(data: LoginData): Promise<void> {
  await postJson<unknown>('/auth/login', data)
}

/** Cierra sesión. El backend borra la cookie, que el frontend no puede tocar. */
export async function logout(): Promise<void> {
  await postJson<unknown>('/auth/logout')
}

/** Crea un usuario nuevo. */
export function register({ nombre, email, password }: RegisterData): Promise<User> {
  return postJson<User>('/usuarios', { nombre, email, password })
}
