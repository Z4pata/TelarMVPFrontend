import { getJson, postJson } from '../../api/httpClient'
import type { Categoria, Cuenta, Movimiento, NewMovement, TipoMovimiento, Totals } from './types'

// Nombres de tipo de movimiento definidos en el backend (ProcesadorIngreso y ProcesadorEgreso).
const INGRESO = 'Ingreso'
const EGRESO = 'Egreso'

export function getCuentasDelUsuario(): Promise<Cuenta[]> {
  return getJson<Cuenta[]>('/cuentas/usuario')
}

export function getTiposMovimiento(): Promise<TipoMovimiento[]> {
  return getJson<TipoMovimiento[]>('/tipos-movimiento')
}

export function getCategorias(): Promise<Categoria[]> {
  return getJson<Categoria[]>('/categorias')
}

export function crearMovimiento(movement: NewMovement): Promise<unknown> {
  return postJson('/movimientos', movement)
}

/** Movimientos de una cuenta, del más reciente al más antiguo. */
export async function getMovimientosPorCuenta(cuentaId: number): Promise<Movimiento[]> {
  const movimientos = await getJson<Movimiento[]>(`/movimientos/cuenta/${cuentaId}`)
  return [...movimientos].sort((a, b) => b.fecha.localeCompare(a.fecha))
}

export function isIngreso(tipo: TipoMovimiento): boolean {
  return tipo.nombre.toLowerCase() === INGRESO.toLowerCase()
}

/** Suma de ingresos y gastos de una lista de movimientos. */
export function sumarMovimientos(movimientos: Movimiento[]): Totals {
  return movimientos.reduce(
    (totals, movimiento) => {
      const monto = Number(movimiento.monto)
      return isIngreso(movimiento.tipoMovimiento)
        ? { ...totals, ingresos: totals.ingresos + monto }
        : { ...totals, gastos: totals.gastos + monto }
    },
    { ingresos: 0, gastos: 0 },
  )
}

function getTotalPorTipo(tipoMovimientoId: number): Promise<number> {
  return getJson<number>(`/movimientos/usuario/total/${tipoMovimientoId}`)
}

function findTipoId(tipos: TipoMovimiento[], nombre: string): number {
  const tipo = tipos.find((item) => item.nombre.toLowerCase() === nombre.toLowerCase())
  if (!tipo) throw new Error(`No existe el tipo de movimiento "${nombre}".`)
  return tipo.id
}

/** Total de ingresos y gastos del usuario en su presupuesto actual. */
export async function getTotales(): Promise<Totals> {
  const tipos = await getTiposMovimiento()
  const [ingresos, gastos] = await Promise.all([
    getTotalPorTipo(findTipoId(tipos, INGRESO)),
    getTotalPorTipo(findTipoId(tipos, EGRESO)),
  ])

  return { ingresos: Number(ingresos ?? 0), gastos: Number(gastos ?? 0) }
}
