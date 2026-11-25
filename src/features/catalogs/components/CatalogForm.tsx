import { Alert } from '../../../components/ui/Alert'
import { Button } from '../../../components/ui/Button'
import { TextField } from '../../../components/ui/TextField'
import '../../../components/ui/FormStack.css'
import { useForm } from '../../../hooks/useForm'
import type { CatalogFormData, CatalogItem } from '../types'
import { createCatalogValidator } from '../validation'

const EMPTY_VALUES: CatalogFormData = { nombre: '', descripcion: '' }

function toFormData(item?: CatalogItem): CatalogFormData {
  if (!item) return EMPTY_VALUES
  return { nombre: item.nombre, descripcion: item.descripcion ?? '' }
}

interface CatalogFormProps {
  /** Prefijo para los ids de los campos, así no se repiten entre formularios. */
  idPrefix: string
  nombreMax: number
  item?: CatalogItem
  onSubmit: (data: CatalogFormData) => Promise<void>
  onCancel: () => void
}

/** Formulario para crear o editar un elemento de catálogo (si recibe item, edita). */
export function CatalogForm({ idPrefix, nombreMax, item, onSubmit, onCancel }: CatalogFormProps) {
  const { values, fieldErrors, formError, isSubmitting, handleChange, handleSubmit } = useForm({
    initialValues: toFormData(item),
    validate: createCatalogValidator(nombreMax),
    onSubmit,
  })

  return (
    <form className="form-stack" onSubmit={handleSubmit} noValidate>
      {formError && <Alert variant="error" message={formError} />}
      <TextField
        id={`${idPrefix}-nombre`}
        name="nombre"
        label="Nombre"
        value={values.nombre}
        error={fieldErrors.nombre}
        onChange={handleChange}
      />
      <TextField
        id={`${idPrefix}-descripcion`}
        name="descripcion"
        label="Descripción (opcional)"
        value={values.descripcion}
        error={fieldErrors.descripcion}
        onChange={handleChange}
      />
      <div className="catalog-form__actions">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" isLoading={isSubmitting}>
          {item ? 'Guardar' : 'Crear'}
        </Button>
      </div>
    </form>
  )
}
