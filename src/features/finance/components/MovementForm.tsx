import { Alert } from '../../../components/ui/Alert'
import { Button } from '../../../components/ui/Button'
import { SelectField, type SelectOption } from '../../../components/ui/SelectField'
import { TextField } from '../../../components/ui/TextField'
import { useAsync } from '../../../hooks/useAsync'
import { useForm } from '../../../hooks/useForm'
import { nowForDateTimeInput } from '../../../utils/format'
import { crearMovimiento, getCategorias, getTiposMovimiento } from '../financeService'
import type { Cuenta, MovementFormData, NewMovement } from '../types'
import { validateMovement } from '../validation'
import './MovementForm.css'

interface MovementFormProps {
  cuentas: Cuenta[]
  onSuccess: () => void
}

function loadOptions() {
  return Promise.all([getTiposMovimiento(), getCategorias()])
}

function toOptions(items: { id: number; nombre: string }[]): SelectOption[] {
  return items.map((item) => ({ value: String(item.id), label: item.nombre }))
}

function toNewMovement(data: MovementFormData): NewMovement {
  return {
    cuentaId: Number(data.cuentaId),
    tipoMovimientoId: Number(data.tipoMovimientoId),
    categoriaId: Number(data.categoriaId),
    monto: Number(data.monto),
    fecha: data.fecha,
    descripcion: data.descripcion.trim(),
  }
}

export function MovementForm({ cuentas, onSuccess }: MovementFormProps) {
  const options = useAsync(loadOptions)
  const [tipos, categorias] = options.data ?? [[], []]

  const { values, fieldErrors, formError, isSubmitting, handleChange, handleSubmit } = useForm({
    initialValues: {
      cuentaId: '',
      tipoMovimientoId: '',
      categoriaId: '',
      monto: '',
      fecha: nowForDateTimeInput(),
      descripcion: '',
    },
    validate: validateMovement,
    onSubmit: async (data) => {
      await crearMovimiento(toNewMovement(data))
      onSuccess()
    },
  })

  const cuentaOptions = cuentas.map((cuenta) => ({
    value: String(cuenta.id),
    label: `${cuenta.entidad} · ${cuenta.tipoCuenta.nombre}`,
  }))

  return (
    <form className="movement-form" onSubmit={handleSubmit} noValidate>
      {options.error && <Alert variant="error" message={options.error.message} />}
      {formError && <Alert variant="error" message={formError} />}
      <SelectField
        name="tipoMovimientoId"
        label="Tipo de movimiento"
        options={toOptions(tipos)}
        value={values.tipoMovimientoId}
        error={fieldErrors.tipoMovimientoId}
        onChange={handleChange}
      />
      <SelectField
        name="cuentaId"
        label="Cuenta"
        options={cuentaOptions}
        value={values.cuentaId}
        error={fieldErrors.cuentaId}
        onChange={handleChange}
      />
      <SelectField
        name="categoriaId"
        label="Categoría"
        options={toOptions(categorias)}
        value={values.categoriaId}
        error={fieldErrors.categoriaId}
        onChange={handleChange}
      />
      <div className="movement-form__row">
        <TextField
          name="monto"
          type="number"
          label="Monto"
          inputMode="decimal"
          min="0"
          step="0.01"
          value={values.monto}
          error={fieldErrors.monto}
          onChange={handleChange}
        />
        <TextField
          name="fecha"
          type="datetime-local"
          label="Fecha"
          value={values.fecha}
          error={fieldErrors.fecha}
          onChange={handleChange}
        />
      </div>
      <TextField
        name="descripcion"
        label="Descripción (opcional)"
        value={values.descripcion}
        error={fieldErrors.descripcion}
        onChange={handleChange}
      />
      <Button type="submit" block isLoading={isSubmitting} disabled={options.isLoading}>
        Guardar movimiento
      </Button>
    </form>
  )
}
