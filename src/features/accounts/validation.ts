import type { FieldErrors } from '../../api/HttpError'
import { firstError, maxLength, required, withoutEmpty } from '../../utils/validation'
import type { AccountFormData } from './types'

// Reglas alineadas con CuentaRequest del backend.
const ENTIDAD_MAX = 100
const DESCRIPCION_MAX = 255

export function validateAccount({ tipoCuentaId, entidad, descripcion }: AccountFormData): FieldErrors {
  return withoutEmpty({
    tipoCuentaId: required(tipoCuentaId, 'El tipo de cuenta es obligatorio.'),
    entidad: firstError(
      required(entidad, 'La entidad financiera es obligatoria.'),
      maxLength(entidad, ENTIDAD_MAX, 'La entidad financiera'),
    ),
    descripcion: maxLength(descripcion, DESCRIPCION_MAX, 'La descripción'),
  })
}
