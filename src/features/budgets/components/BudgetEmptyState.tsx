import { Button } from '../../../components/ui/Button'
import './BudgetEmptyState.css'

interface BudgetEmptyStateProps {
  onCreate: () => void
}

/** Se muestra cuando el usuario no tiene presupuesto o el último ya venció. */
export function BudgetEmptyState({ onCreate }: BudgetEmptyStateProps) {
  return (
    <article className="budget-empty">
      <div>
        <p className="budget-empty__title">No tienes un presupuesto activo</p>
        <p className="budget-empty__text">
          Crea uno nuevo para ver tus totales y controlar cuánto gastas en el periodo.
        </p>
      </div>
      <Button onClick={onCreate}>Crear presupuesto</Button>
    </article>
  )
}
