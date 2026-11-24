export type FieldErrors = Record<string, string>

/** Error devuelto por la API con el formato ApiError del backend. */
export class HttpError extends Error {
  readonly status: number
  readonly fieldErrors: FieldErrors

  constructor(status: number, message: string, fieldErrors: FieldErrors = {}) {
    super(message)
    this.name = 'HttpError'
    this.status = status
    this.fieldErrors = fieldErrors
  }
}
