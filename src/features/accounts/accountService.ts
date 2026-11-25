import { HttpError } from '../../api/HttpError'
import { deleteJson, getJson, postJson, putJson } from '../../api/httpClient'
import type { AccountFormData, Cuenta, NewAccount, TipoCuenta } from './types'

const CONFLICT = 409
const ACCOUNT_IN_USE_MESSAGE = 'No puedes eliminar esta cuenta porque tiene movimientos registrados.'

export function getTiposCuenta(): Promise<TipoCuenta[]> {
  return getJson<TipoCuenta[]>('/tipos-cuenta')
}

export function getCuenta(id: number): Promise<Cuenta> {
  return getJson<Cuenta>(`/cuentas/${id}`)
}

function toNewAccount({ tipoCuentaId, entidad, descripcion }: AccountFormData): NewAccount {
  return {
    tipoCuentaId: Number(tipoCuentaId),
    entidad: entidad.trim(),
    descripcion: descripcion.trim() || null,
  }
}

export function crearCuenta(data: AccountFormData): Promise<Cuenta> {
  return postJson<Cuenta>('/cuentas', toNewAccount(data))
}

export function actualizarCuenta(id: number, data: AccountFormData): Promise<Cuenta> {
  return putJson<Cuenta>(`/cuentas/${id}`, toNewAccount(data))
}

/** Elimina la cuenta. Si la base de datos no permite borrar sus movimientos, responde 409. */
export async function eliminarCuenta(id: number): Promise<void> {
  try {
    await deleteJson(`/cuentas/${id}`)
  } catch (error) {
    if (error instanceof HttpError && error.status === CONFLICT) {
      throw new HttpError(CONFLICT, ACCOUNT_IN_USE_MESSAGE)
    }
    throw error
  }
}
