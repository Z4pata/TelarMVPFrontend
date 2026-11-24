import { formatCurrency, formatDate } from '../../../utils/format'
import { isIngreso } from '../financeService'
import type { Movimiento } from '../types'
import './MovementList.css'

interface MovementListProps {
  movimientos: Movimiento[]
}

function MovementItem({ movimiento }: { movimiento: Movimiento }) {
  const tone = isIngreso(movimiento.tipoMovimiento) ? 'income' : 'expense'
  const sign = tone === 'income' ? '+' : '−'

  return (
    <li className="movement-list__item">
      <div className="movement-list__text">
        <p className="movement-list__category">{movimiento.categoria.nombre}</p>
        <p className="movement-list__meta">
          {formatDate(movimiento.fecha)} · {movimiento.tipoMovimiento.nombre}
        </p>
        {movimiento.descripcion && <p className="movement-list__description">{movimiento.descripcion}</p>}
      </div>
      <p className={`movement-list__amount movement-list__amount--${tone}`}>
        {sign} {formatCurrency(Number(movimiento.monto))}
      </p>
    </li>
  )
}

/** Lista de movimientos financieros con su monto destacado según el tipo. */
export function MovementList({ movimientos }: MovementListProps) {
  if (movimientos.length === 0) {
    return <p className="movement-list__empty">Esta cuenta todavía no tiene movimientos.</p>
  }

  return (
    <ul className="movement-list">
      {movimientos.map((movimiento) => (
        <MovementItem key={movimiento.id} movimiento={movimiento} />
      ))}
    </ul>
  )
}
