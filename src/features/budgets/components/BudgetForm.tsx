import { Alert } from '../../../components/ui/Alert'
import { Button } from '../../../components/ui/Button'
import { TextField } from '../../../components/ui/TextField'
import '../../../components/ui/FormStack.css'
import { useForm } from '../../../hooks/useForm'
import { todayForDateInput } from '../../../utils/date'
import { crearPresupuesto } from '../budgetService'
import type { BudgetFormData, Presupuesto } from '../types'
import { validateBudget } from '../validation'

const INITIAL_VALUES: BudgetFormData = { montoLimite: '', fechaFin: '' }

interface BudgetFormProps {
  onCreated: (presupuesto: Presupuesto) => void
}

/** Formulario para crear el presupuesto activo del usuario. Empieza hoy. */
export function BudgetForm({ onCreated }: BudgetFormProps) {
  const { values, fieldErrors, formError, isSubmitting, handleChange, handleSubmit } = useForm({
    initialValues: INITIAL_VALUES,
    validate: validateBudget,
    onSubmit: async (data) => onCreated(await crearPresupuesto(data)),
  })

  return (
    <form className="form-stack" onSubmit={handleSubmit} noValidate>
      {formError && <Alert variant="error" message={formError} />}
      <p className="form-stack__hint">El presupuesto empieza hoy y solo puedes tener uno activo.</p>
      <TextField
        name="montoLimite"
        type="number"
        inputMode="decimal"
        min="0"
        step="any"
        label="Monto límite"
        placeholder="Ej. 1500000"
        value={values.montoLimite}
        error={fieldErrors.montoLimite}
        onChange={handleChange}
      />
      <TextField
        name="fechaFin"
        type="date"
        label="Fecha de fin"
        min={todayForDateInput()}
        value={values.fechaFin}
        error={fieldErrors.fechaFin}
        onChange={handleChange}
      />
      <Button type="submit" block isLoading={isSubmitting}>
        Crear presupuesto
      </Button>
    </form>
  )
}
