import { Alert } from '../../../components/ui/Alert'
import { Button } from '../../../components/ui/Button'
import { SelectField, type SelectOption } from '../../../components/ui/SelectField'
import { TextField } from '../../../components/ui/TextField'
import '../../../components/ui/FormStack.css'
import { useAsync } from '../../../hooks/useAsync'
import { useForm } from '../../../hooks/useForm'
import { actualizarCuenta, crearCuenta, getTiposCuenta } from '../accountService'
import type { AccountFormData, Cuenta, TipoCuenta } from '../types'
import { validateAccount } from '../validation'

const EMPTY_VALUES: AccountFormData = { tipoCuentaId: '', entidad: '', descripcion: '' }

function toFormData(cuenta?: Cuenta): AccountFormData {
  if (!cuenta) return EMPTY_VALUES
  return {
    tipoCuentaId: String(cuenta.tipoCuenta.id),
    entidad: cuenta.entidad,
    descripcion: cuenta.descripcion ?? '',
  }
}

function toOptions(tipos: TipoCuenta[]): SelectOption[] {
  return tipos.map((tipo) => ({ value: String(tipo.id), label: tipo.nombre }))
}

function saveCuenta(data: AccountFormData, cuenta?: Cuenta): Promise<Cuenta> {
  return cuenta ? actualizarCuenta(cuenta.id, data) : crearCuenta(data)
}

interface AccountFormProps {
  /** Si se recibe, el formulario edita esta cuenta; si no, crea una nueva. */
  cuenta?: Cuenta
  onSaved: (cuenta: Cuenta) => void
}

/** Formulario para crear o editar una cuenta financiera del usuario en sesión. */
export function AccountForm({ cuenta, onSaved }: AccountFormProps) {
  const tipos = useAsync(getTiposCuenta)
  const { values, fieldErrors, formError, isSubmitting, handleChange, handleSubmit } = useForm({
    initialValues: toFormData(cuenta),
    validate: validateAccount,
    onSubmit: async (data) => onSaved(await saveCuenta(data, cuenta)),
  })

  return (
    <form className="form-stack" onSubmit={handleSubmit} noValidate>
      {formError && <Alert variant="error" message={formError} />}
      {tipos.error && <Alert variant="error" message={tipos.error.message} />}
      <SelectField
        name="tipoCuentaId"
        label="Tipo de cuenta"
        placeholder={tipos.isLoading ? 'Cargando…' : 'Selecciona un tipo'}
        options={toOptions(tipos.data ?? [])}
        disabled={tipos.isLoading}
        value={values.tipoCuentaId}
        error={fieldErrors.tipoCuentaId}
        onChange={handleChange}
      />
      <TextField
        name="entidad"
        label="Entidad financiera"
        placeholder="Ej. Bancolombia"
        value={values.entidad}
        error={fieldErrors.entidad}
        onChange={handleChange}
      />
      <TextField
        name="descripcion"
        label="Descripción (opcional)"
        value={values.descripcion}
        error={fieldErrors.descripcion}
        onChange={handleChange}
      />
      <Button type="submit" block isLoading={isSubmitting}>
        {cuenta ? 'Guardar cambios' : 'Crear cuenta'}
      </Button>
    </form>
  )
}
