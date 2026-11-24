import { useEffect, useId, useRef, type ReactNode } from 'react'
import './Modal.css'

interface ModalProps {
  title: string
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

/** Ventana modal basada en el elemento nativo <dialog> (foco y tecla Esc incluidos). */
export function Modal({ title, isOpen, onClose, children }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  // Id único para que varios modales en la misma página no compartan título.
  const titleId = useId()

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (isOpen && !dialog.open) dialog.showModal()
    if (!isOpen && dialog.open) dialog.close()
  }, [isOpen])

  return (
    <dialog ref={dialogRef} className="modal" aria-labelledby={titleId} onClose={onClose}>
      <header className="modal__header">
        <h2 id={titleId} className="modal__title">
          {title}
        </h2>
        <button type="button" className="modal__close" aria-label="Cerrar" onClick={onClose}>
          ×
        </button>
      </header>
      {isOpen && children}
    </dialog>
  )
}
