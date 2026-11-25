import { getJson, postJson } from '../../api/httpClient'
import { HttpError } from '../../api/HttpError'
import type { BudgetFormData, NewBudget, Presupuesto } from './types'

const NOT_FOUND = 404

// El presupuesto cubre el último día completo, por eso termina a las 23:59:59.
const END_OF_DAY = 'T23:59:59'

function toNewBudget({ montoLimite, fechaFin }: BudgetFormData): NewBudget {
  return {
    montoLimite: Number(montoLimite),
    fechaFin: `${fechaFin}${END_OF_DAY}`,
  }
}

/** Presupuesto vigente del usuario, o null si no tiene uno activo (la API responde 404). */
export async function getPresupuestoActual(): Promise<Presupuesto | null> {
  try {
    return await getJson<Presupuesto>('/presupuestos/actual')
  } catch (error) {
    if (error instanceof HttpError && error.status === NOT_FOUND) return null
    throw error
  }
}

export function crearPresupuesto(data: BudgetFormData): Promise<Presupuesto> {
  return postJson<Presupuesto>('/presupuestos', toNewBudget(data))
}
