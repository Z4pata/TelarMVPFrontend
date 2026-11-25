import { formatCurrency, formatDate } from '../../../utils/format'
import type { Presupuesto } from '../types'
import './BudgetCard.css'

interface BudgetCardProps {
  presupuesto: Presupuesto
  gastado: number | null
}

const PERCENT = 100

function usagePercent(gastado: number, limite: number): number {
  if (limite <= 0) return 0
  return Math.round((gastado / limite) * PERCENT)
}

export function BudgetCard({ presupuesto, gastado }: BudgetCardProps) {
  const spent = gastado ?? 0
  const percent = usagePercent(spent, presupuesto.montoLimite)
  const available = presupuesto.montoLimite - spent
  const isOverLimit = available < 0

  return (
    <article className="budget-card">
      <div className="budget-card__header">
        <div>
          <p className="budget-card__label">Presupuesto actual</p>
          <p className="budget-card__limit">{formatCurrency(presupuesto.montoLimite)}</p>
        </div>
        <p className="budget-card__period">
          {formatDate(presupuesto.fechaInicio)} – {formatDate(presupuesto.fechaFin)}
        </p>
      </div>

      <div
        className="budget-card__bar"
        role="progressbar"
        aria-label="Uso del presupuesto"
        aria-valuemin={0}
        aria-valuemax={PERCENT}
        aria-valuenow={Math.min(percent, PERCENT)}
      >
        <span
          className={`budget-card__fill ${isOverLimit ? 'budget-card__fill--over' : ''}`}
          style={{ width: `${Math.min(percent, PERCENT)}%` }}
        />
      </div>

      <p className="budget-card__usage">
        Gastado {formatCurrency(spent)} ({percent}%) ·{' '}
        <strong className={isOverLimit ? 'budget-card__over' : undefined}>
          {isOverLimit
            ? `Excedido por ${formatCurrency(-available)}`
            : `Disponible ${formatCurrency(available)}`}
        </strong>
      </p>
    </article>
  )
}
