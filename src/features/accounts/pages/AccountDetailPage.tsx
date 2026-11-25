import { useCallback, useState } from 'react'
import { AppHeader } from '../../../components/layout/AppHeader'
import { Alert } from '../../../components/ui/Alert'
import { Button } from '../../../components/ui/Button'
import { LinkButton } from '../../../components/ui/LinkButton'
import { Modal } from '../../../components/ui/Modal'
import { useAsync } from '../../../hooks/useAsync'
import { useSessionExpired } from '../../../hooks/useSessionExpired'
import { MovementList } from '../../finance/components/MovementList'
import { SummaryCard } from '../../finance/components/SummaryCard'
import { getMovimientosPorCuenta, sumarMovimientos } from '../../finance/financeService'
import { getCuenta } from '../accountService'
import { AccountForm } from '../components/AccountForm'
import { DeleteAccountConfirm } from '../components/DeleteAccountConfirm'
import './AccountDetailPage.css'

const ACCOUNT_UPDATED_NOTICE = 'Cuenta actualizada.'

interface AccountDetailPageProps {
  cuentaId: number
  onBack: () => void
  onDeleted: () => void
  onLogout: () => void
  onSessionExpired: () => void
}

/** Detalle de una cuenta: sus datos, acciones de editar y eliminar, y sus movimientos. */
export function AccountDetailPage({ cuentaId, onBack, onDeleted, onLogout, onSessionExpired }: AccountDetailPageProps) {
  const loadCuenta = useCallback(() => getCuenta(cuentaId), [cuentaId])
  const loadMovimientos = useCallback(() => getMovimientosPorCuenta(cuentaId), [cuentaId])
  const cuenta = useAsync(loadCuenta)
  const movimientos = useAsync(loadMovimientos)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [notice, setNotice] = useState<string>()

  useSessionExpired([cuenta.error, movimientos.error], onSessionExpired)

  function handleUpdated() {
    setIsEditOpen(false)
    setNotice(ACCOUNT_UPDATED_NOTICE)
    cuenta.reload()
  }

  const totals = movimientos.data ? sumarMovimientos(movimientos.data) : null

  return (
    <div className="account-detail">
      <AppHeader onLogout={onLogout} />

      <main className="account-detail__content">
        <LinkButton onClick={onBack}>← Volver a mi resumen</LinkButton>

        {cuenta.isLoading && !cuenta.data && <p className="account-detail__loading">Cargando cuenta…</p>}
        {cuenta.error && <Alert variant="error" message={cuenta.error.message} />}

        {cuenta.data && (
          <section className="account-detail__intro">
            <div>
              <span className="account-detail__type">{cuenta.data.tipoCuenta.nombre}</span>
              <h1 className="account-detail__title">{cuenta.data.entidad}</h1>
              {cuenta.data.descripcion && <p className="account-detail__subtitle">{cuenta.data.descripcion}</p>}
            </div>
            <div className="account-detail__actions">
              <Button variant="secondary" onClick={() => setIsEditOpen(true)}>
                Editar
              </Button>
              <Button variant="secondary" onClick={() => setIsDeleteOpen(true)}>
                Eliminar
              </Button>
            </div>
          </section>
        )}

        {notice && <Alert variant="success" message={notice} />}

        <section className="account-detail__section" aria-label="Totales de la cuenta">
          <div className="account-detail__totals">
            <SummaryCard label="Ingresos de la cuenta" amount={totals?.ingresos ?? null} accent="green" />
            <SummaryCard label="Gastos de la cuenta" amount={totals?.gastos ?? null} accent="red" />
          </div>
        </section>

        <section className="account-detail__section">
          <h2 className="account-detail__section-title">Movimientos</h2>
          {movimientos.isLoading && <p className="account-detail__loading">Cargando movimientos…</p>}
          {movimientos.error && <Alert variant="error" message={movimientos.error.message} />}
          {movimientos.data && <MovementList movimientos={movimientos.data} />}
        </section>
      </main>

      {cuenta.data && (
        <>
          <Modal title="Editar cuenta" isOpen={isEditOpen} onClose={() => setIsEditOpen(false)}>
            <AccountForm cuenta={cuenta.data} onSaved={handleUpdated} />
          </Modal>

          <Modal title="Eliminar cuenta" isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)}>
            <DeleteAccountConfirm
              cuenta={cuenta.data}
              movimientosCount={movimientos.data?.length ?? 0}
              onDeleted={onDeleted}
              onCancel={() => setIsDeleteOpen(false)}
            />
          </Modal>
        </>
      )}
    </div>
  )
}
