import type { Cuenta } from '../types'
import './AccountList.css'

interface AccountListProps {
  cuentas: Cuenta[]
  onSelect: (cuentaId: number) => void
}

export function AccountList({ cuentas, onSelect }: AccountListProps) {
  if (cuentas.length === 0) {
    return <p className="account-list__empty">Todavía no tienes cuentas creadas.</p>
  }

  return (
    <ul className="account-list">
      {cuentas.map((cuenta) => (
        <li key={cuenta.id}>
          <button type="button" className="account-list__item" onClick={() => onSelect(cuenta.id)}>
            <span className="account-list__type">{cuenta.tipoCuenta.nombre}</span>
            <span className="account-list__name">{cuenta.entidad}</span>
            {cuenta.descripcion && <span className="account-list__description">{cuenta.descripcion}</span>}
          </button>
        </li>
      ))}
    </ul>
  )
}
