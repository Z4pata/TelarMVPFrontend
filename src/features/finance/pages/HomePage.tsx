import { useState } from 'react'
import { AppHeader } from '../../../components/layout/AppHeader'
import { Alert } from '../../../components/ui/Alert'
import { Button } from '../../../components/ui/Button'
import { Modal } from '../../../components/ui/Modal'
import { useAsync } from '../../../hooks/useAsync'
import { useSessionExpired } from '../../../hooks/useSessionExpired'
import { AccountForm } from '../../accounts/components/AccountForm'
import { getPresupuestoActual } from '../../budgets/budgetService'
import { CatalogSidebar } from '../../catalogs/components/CatalogSidebar'
import { BudgetCard } from '../../budgets/components/BudgetCard'
import { BudgetEmptyState } from '../../budgets/components/BudgetEmptyState'
import { BudgetForm } from '../../budgets/components/BudgetForm'
import { AccountList } from '../components/AccountList'
import { MovementForm } from '../components/MovementForm'
import { SummaryCard } from '../components/SummaryCard'
import { getCuentasDelUsuario, getTotales } from '../financeService'
import './HomePage.css'

const MOVEMENT_CREATED_NOTICE = 'Movimiento guardado. Tus totales ya están actualizados.'
const ACCOUNT_CREATED_NOTICE = 'Cuenta creada. Ya puedes registrar movimientos en ella.'
const BUDGET_CREATED_NOTICE = 'Presupuesto creado. Tus totales se calculan desde hoy.'

interface HomePageProps {
  onLogout: () => void
  onSessionExpired: () => void
  onOpenAccount: (cuentaId: number) => void
}

export function HomePage({ onLogout, onSessionExpired, onOpenAccount }: HomePageProps) {
  const totals = useAsync(getTotales)
  const cuentas = useAsync(getCuentasDelUsuario)
  const presupuesto = useAsync(getPresupuestoActual)
  const [isMovementOpen, setIsMovementOpen] = useState(false)
  const [isAccountOpen, setIsAccountOpen] = useState(false)
  const [isBudgetOpen, setIsBudgetOpen] = useState(false)
  const [notice, setNotice] = useState<string>()

  useSessionExpired([totals.error, cuentas.error, presupuesto.error], onSessionExpired)

  function handleMovementCreated() {
    setIsMovementOpen(false)
    setNotice(MOVEMENT_CREATED_NOTICE)
    totals.reload()
  }

  // Un cambio en los catálogos puede afectar los nombres de las cuentas y los totales.
  function handleCatalogChange() {
    totals.reload()
    cuentas.reload()
  }

  function handleAccountCreated() {
    setIsAccountOpen(false)
    setNotice(ACCOUNT_CREATED_NOTICE)
    cuentas.reload()
  }

  function handleBudgetCreated() {
    setIsBudgetOpen(false)
    setNotice(BUDGET_CREATED_NOTICE)
    presupuesto.reload()
    totals.reload()
  }

  // Sin presupuesto activo la API no calcula totales; el estado vacío ya lo explica.
  const hasNoBudget = presupuesto.data === null && !presupuesto.isLoading && !presupuesto.error

  return (
    <div className="home">
      <AppHeader onLogout={onLogout} />

      <div className="home__layout">
        <CatalogSidebar onChange={handleCatalogChange} />

        <main className="home__content">
          <section className="home__intro">
            <div>
              <h1 className="home__title">Tu resumen</h1>
              <p className="home__subtitle">Ingresos y gastos de tu presupuesto actual.</p>
            </div>
            <Button onClick={() => setIsMovementOpen(true)} disabled={!cuentas.data?.length}>
              Nuevo movimiento
            </Button>
          </section>

          {notice && <Alert variant="success" message={notice} />}

          <section className="home__section" aria-label="Totales">
            {totals.error && !hasNoBudget && <Alert variant="error" message={totals.error.message} />}
            <div className="home__totals">
              <SummaryCard label="Total ingresos" amount={totals.data?.ingresos ?? null} accent="green" />
              <SummaryCard label="Total gastos" amount={totals.data?.gastos ?? null} accent="red" />
            </div>
          </section>

          <section className="home__section" aria-label="Presupuesto actual">
            {presupuesto.error && <Alert variant="error" message={presupuesto.error.message} />}
            {presupuesto.data && (
              <BudgetCard presupuesto={presupuesto.data} gastado={totals.data?.gastos ?? null} />
            )}
            {hasNoBudget && <BudgetEmptyState onCreate={() => setIsBudgetOpen(true)} />}
          </section>

          <section className="home__section">
            <div className="home__section-header">
              <h2 className="home__section-title">Mis cuentas</h2>
              <Button variant="secondary" onClick={() => setIsAccountOpen(true)}>
                Nueva cuenta
              </Button>
            </div>
            {cuentas.isLoading && <p className="home__loading">Cargando cuentas…</p>}
            {cuentas.error && <Alert variant="error" message={cuentas.error.message} />}
            {cuentas.data && <AccountList cuentas={cuentas.data} onSelect={onOpenAccount} />}
          </section>
        </main>
      </div>

      <Modal title="Nuevo movimiento" isOpen={isMovementOpen} onClose={() => setIsMovementOpen(false)}>
        <MovementForm cuentas={cuentas.data ?? []} onSuccess={handleMovementCreated} />
      </Modal>

      <Modal title="Nueva cuenta" isOpen={isAccountOpen} onClose={() => setIsAccountOpen(false)}>
        <AccountForm onSaved={handleAccountCreated} />
      </Modal>

      <Modal title="Nuevo presupuesto" isOpen={isBudgetOpen} onClose={() => setIsBudgetOpen(false)}>
        <BudgetForm onCreated={handleBudgetCreated} />
      </Modal>
    </div>
  )
}
