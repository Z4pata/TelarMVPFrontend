import { formatCurrency } from '../../../utils/format'
import './SummaryCard.css'

interface SummaryCardProps {
  label: string
  amount: number | null
  accent: 'green' | 'red'
}

export function SummaryCard({ label, amount, accent }: SummaryCardProps) {
  return (
    <article className={`summary-card summary-card--${accent}`}>
      <p className="summary-card__label">{label}</p>
      <p className="summary-card__amount">{amount === null ? '—' : formatCurrency(amount)}</p>
    </article>
  )
}
