import type { FieldErrors } from '../../api/HttpError'
import { todayForDateInput } from '../../utils/date'
import { required, withoutEmpty } from '../../utils/validation'
import type { BudgetFormData } from './types'

// Reglas alineadas con CrearPresupuestoRequest del backend.

function validateMonto(monto: string): string | undefined {
  if (!monto.trim()) return 'El monto límite es obligatorio.'
  if (!(Number(monto) > 0)) return 'El monto límite debe ser mayor que cero.'
}

function validateFechaFin(fechaFin: string): string | undefined {
  // Las fechas YYYY-MM-DD se pueden comparar como texto.
  if (fechaFin < todayForDateInput()) return 'La fecha de fin no puede estar en el pasado.'
}

export function validateBudget({ montoLimite, fechaFin }: BudgetFormData): FieldErrors {
  return withoutEmpty({
    montoLimite: validateMonto(montoLimite),
    fechaFin: required(fechaFin, 'La fecha de fin es obligatoria.') ?? validateFechaFin(fechaFin),
  })
}
