import { LinkButton } from '../../../components/ui/LinkButton'
import type { CatalogItem } from '../types'

interface CatalogItemRowProps {
  item: CatalogItem
  isLocked: boolean
  isConfirmingDelete: boolean
  isDeleting: boolean
  onEdit: () => void
  onAskDelete: () => void
  onConfirmDelete: () => void
  onCancelDelete: () => void
}

/** Fila de un elemento del catálogo con sus acciones de editar y eliminar. */
export function CatalogItemRow({
  item,
  isLocked,
  isConfirmingDelete,
  isDeleting,
  onEdit,
  onAskDelete,
  onConfirmDelete,
  onCancelDelete,
}: CatalogItemRowProps) {
  return (
    <li className="catalog-item">
      <div className="catalog-item__text">
        <p className="catalog-item__name">{item.nombre}</p>
        {item.descripcion && <p className="catalog-item__description">{item.descripcion}</p>}
      </div>

      {isLocked && <span className="catalog-item__locked">Protegido</span>}

      {!isLocked && isConfirmingDelete && (
        <div className="catalog-item__actions" role="group" aria-label={`Confirmar eliminación de ${item.nombre}`}>
          <span className="catalog-item__question">¿Eliminar?</span>
          <LinkButton className="link-button link-button--danger" onClick={onConfirmDelete} disabled={isDeleting}>
            {isDeleting ? 'Eliminando…' : 'Sí'}
          </LinkButton>
          <LinkButton onClick={onCancelDelete} disabled={isDeleting}>
            No
          </LinkButton>
        </div>
      )}

      {!isLocked && !isConfirmingDelete && (
        <div className="catalog-item__actions">
          <LinkButton onClick={onEdit} aria-label={`Editar ${item.nombre}`}>
            Editar
          </LinkButton>
          <LinkButton className="link-button link-button--danger" onClick={onAskDelete} aria-label={`Eliminar ${item.nombre}`}>
            Eliminar
          </LinkButton>
        </div>
      )}
    </li>
  )
}
