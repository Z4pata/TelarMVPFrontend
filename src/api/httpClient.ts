import { API_URL } from '../config/env'
import { HttpError, type FieldErrors } from './HttpError'

interface ApiErrorBody {
  mensaje?: string
  errores?: FieldErrors
}

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

const NETWORK_ERROR_MESSAGE = 'No pudimos conectar con el servidor. Intenta de nuevo.'
const GENERIC_ERROR_MESSAGE = 'Algo salió mal. Intenta de nuevo.'

async function parseBody(response: Response): Promise<unknown> {
  const text = await response.text()
  if (!text) return null

  try {
    return JSON.parse(text)
  } catch {
    return text
  }
}

function toHttpError(status: number, body: unknown): HttpError {
  const apiError = (typeof body === 'object' && body !== null ? body : {}) as ApiErrorBody
  return new HttpError(status, apiError.mensaje ?? GENERIC_ERROR_MESSAGE, apiError.errores)
}

/**
 * Envía una petición a la API.
 * La sesión viaja en una cookie HttpOnly, por eso siempre se incluyen las credenciales
 * y el token nunca se guarda en el navegador.
 */
async function request<TResponse>(method: HttpMethod, path: string, payload?: unknown): Promise<TResponse> {
  let response: Response

  try {
    response = await fetch(`${API_URL}${path}`, {
      method,
      credentials: 'include',
      headers: payload === undefined ? undefined : { 'Content-Type': 'application/json' },
      body: payload === undefined ? undefined : JSON.stringify(payload),
    })
  } catch {
    throw new HttpError(0, NETWORK_ERROR_MESSAGE)
  }

  const body = await parseBody(response)
  if (!response.ok) throw toHttpError(response.status, body)

  return body as TResponse
}

export function getJson<TResponse>(path: string): Promise<TResponse> {
  return request<TResponse>('GET', path)
}

export function postJson<TResponse>(path: string, payload?: unknown): Promise<TResponse> {
  return request<TResponse>('POST', path, payload)
}

export function putJson<TResponse>(path: string, payload: unknown): Promise<TResponse> {
  return request<TResponse>('PUT', path, payload)
}

export async function deleteJson(path: string): Promise<void> {
  await request<unknown>('DELETE', path)
}
