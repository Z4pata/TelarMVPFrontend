import type { FieldErrors } from '../../api/HttpError'
import type { MovementFormData } from './types'

// Reglas alineadas con MovimientoFinancieroRequest del backend.
const DESCRIPTION_MAX = 255

function required(value: string, message: string): string | undefined {
  if (!value.trim()) return message
}

function validateMonto(monto: string): string | undefined {
  if (!monto.trim()) return 'El monto es obligatorio.'
  if (!(Number(monto) > 0)) return 'El monto debe ser mayor que cero.'
}

function validateDescripcion(descripcion: string): string | undefined {
  if (descripcion.length > DESCRIPTION_MAX) {
    return `La descripción no puede superar ${DESCRIPTION_MAX} caracteres.`
  }
}

export function validateMovement(data: MovementFormData): FieldErrors {
  const errors = {
    cuentaId: required(data.cuentaId, 'La cuenta es obligatoria.'),
    tipoMovimientoId: required(data.tipoMovimientoId, 'El tipo de movimiento es obligatorio.'),
    categoriaId: required(data.categoriaId, 'La categoría es obligatoria.'),
    monto: validateMonto(data.monto),
    fecha: required(data.fecha, 'La fecha es obligatoria.'),
    descripcion: validateDescripcion(data.descripcion),
  }

  return Object.fromEntries(
    Object.entries(errors).filter((entry): entry is [string, string] => Boolean(entry[1])),
  )
}
