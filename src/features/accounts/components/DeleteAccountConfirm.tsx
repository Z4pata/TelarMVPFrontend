import { useState } from 'react'
import { HttpError } from '../../../api/HttpError'
import { Alert } from '../../../components/ui/Alert'
import { Button } from '../../../components/ui/Button'
import '../../../components/ui/FormStack.css'
import { eliminarCuenta } from '../accountService'
import type { Cuenta } from '../types'

const GENERIC_ERROR_MESSAGE = 'Algo salió mal. Intenta de nuevo.'

interface DeleteAccountConfirmProps {
  cuenta: Cuenta
  /** Movimientos de la cuenta, que se borran con ella. */
  movimientosCount: number
  onDeleted: () => void
  onCancel: () => void
}

/** Pide confirmación y elimina la cuenta. */
export function DeleteAccountConfirm({ cuenta, movimientosCount, onDeleted, onCancel }: DeleteAccountConfirmProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState<string>()

  async function handleConfirm() {
    setIsDeleting(true)
    setError(undefined)
    try {
      await eliminarCuenta(cuenta.id)
      onDeleted()
    } catch (caught) {
      setError(caught instanceof HttpError ? caught.message : GENERIC_ERROR_MESSAGE)
      setIsDeleting(false)
    }
  }

  return (
    <div className="form-stack">
      {error && <Alert variant="error" message={error} />}
      <p className="form-stack__hint">
        Vas a eliminar la cuenta <strong>{cuenta.entidad}</strong>
        {movimientosCount > 0 && ` y sus ${movimientosCount} movimientos`}. Esta acción no se puede deshacer.
      </p>
      <div className="form-stack__actions">
        <Button variant="secondary" onClick={onCancel} disabled={isDeleting}>
          Cancelar
        </Button>
        <Button onClick={handleConfirm} isLoading={isDeleting}>
          Eliminar cuenta
        </Button>
      </div>
    </div>
  )
}
