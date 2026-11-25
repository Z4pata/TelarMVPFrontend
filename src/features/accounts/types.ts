export type TipoCuenta = {
  id: number
  nombre: string
}

/** Cuenta tal como la devuelve la API. */
export type Cuenta = {
  id: number
  entidad: string
  descripcion: string | null
  tipoCuenta: TipoCuenta
}

/** Valores del formulario, tal como los escribe el usuario. */
export type AccountFormData = {
  tipoCuentaId: string
  entidad: string
  descripcion: string
}

/**
 * Cuerpo de POST /cuentas (CuentaRequest).
 * El usuario no se envía: el backend lo toma de la sesión.
 */
export type NewAccount = {
  tipoCuentaId: number
  entidad: string
  descripcion: string | null
}
