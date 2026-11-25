/** Presupuesto tal como lo devuelve la API (PresupuestoResponse). */
export type Presupuesto = {
  id: number
  montoLimite: number
  fechaInicio: string
  fechaFin: string
}

/** Valores del formulario. fechaFin viene de un input date (YYYY-MM-DD). */
export type BudgetFormData = {
  montoLimite: string
  fechaFin: string
}

/**
 * Cuerpo de POST /presupuestos (CrearPresupuestoRequest).
 * El usuario no se envía: el backend lo toma de la sesión.
 */
export type NewBudget = {
  montoLimite: number
  fechaFin: string
}
