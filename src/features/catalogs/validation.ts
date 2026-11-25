import type { FieldErrors } from '../../api/HttpError'
import { firstError, maxLength, required, withoutEmpty } from '../../utils/validation'
import type { CatalogFormData } from './types'

const DESCRIPCION_MAX = 255

/** Validador del formulario de catálogo para un límite de nombre dado. */
export function createCatalogValidator(nombreMax: number) {
  return ({ nombre, descripcion }: CatalogFormData): FieldErrors =>
    withoutEmpty({
      nombre: firstError(
        required(nombre, 'El nombre es obligatorio.'),
        maxLength(nombre, nombreMax, 'El nombre'),
      ),
      descripcion: maxLength(descripcion, DESCRIPCION_MAX, 'La descripción'),
    })
}
