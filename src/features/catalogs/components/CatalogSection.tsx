import { useState } from 'react'
import { HttpError } from '../../../api/HttpError'
import { Alert } from '../../../components/ui/Alert'
import { Button } from '../../../components/ui/Button'
import { useAsync } from '../../../hooks/useAsync'
import type { CatalogConfig, CatalogFormData, CatalogItem } from '../types'
import { CatalogForm } from './CatalogForm'
import { CatalogItemRow } from './CatalogItemRow'

const CONFLICT = 409
const IN_USE_MESSAGE = 'No se puede eliminar porque hay registros que lo usan.'

function isLocked(item: CatalogItem, lockedNames: string[] = []): boolean {
  const nombre = item.nombre.trim().toLowerCase()
  return lockedNames.some((locked) => locked.toLowerCase() === nombre)
}

type Editing = { mode: 'none' } | { mode: 'create' } | { mode: 'edit'; item: CatalogItem }

function deleteErrorMessage(error: unknown): string {
  if (error instanceof HttpError && error.status === CONFLICT) return IN_USE_MESSAGE
  return error instanceof Error ? error.message : 'No pudimos eliminarlo. Intenta de nuevo.'
}

interface CatalogSectionProps {
  config: CatalogConfig
  onChange: () => void
}

/** Lista un catálogo y permite crear, editar y eliminar sus elementos. */
export function CatalogSection({ config, onChange }: CatalogSectionProps) {
  const { api, newLabel, editLabel, nombreMax, hint, lockedNames } = config
  const items = useAsync(api.list)
  const [editing, setEditing] = useState<Editing>({ mode: 'none' })
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState<string>()

  function closeForm() {
    setEditing({ mode: 'none' })
  }

  async function afterChange() {
    closeForm()
    await items.reload()
    onChange()
  }

  async function handleSave(data: CatalogFormData) {
    if (editing.mode === 'edit') await api.update(editing.item.id, data)
    else await api.create(data)
    await afterChange()
  }

  async function handleDelete(id: number) {
    setIsDeleting(true)
    setDeleteError(undefined)
    try {
      await api.remove(id)
      await afterChange()
    } catch (error) {
      setDeleteError(deleteErrorMessage(error))
    } finally {
      setConfirmDeleteId(null)
      setIsDeleting(false)
    }
  }

  return (
    <section className="catalog-section" aria-label={config.title}>
      {hint && <p className="form-stack__hint">{hint}</p>}
      {items.error && <Alert variant="error" message={items.error.message} />}
      {deleteError && <Alert variant="error" message={deleteError} />}

      {editing.mode === 'none' ? (
        <Button variant="secondary" block onClick={() => setEditing({ mode: 'create' })}>
          {newLabel}
        </Button>
      ) : (
        <div className="catalog-section__form">
          <p className="catalog-section__form-title">
            {editing.mode === 'edit' ? editLabel : newLabel}
          </p>
          <CatalogForm
            key={editing.mode === 'edit' ? editing.item.id : 'new'}
            idPrefix={config.key}
            nombreMax={nombreMax}
            item={editing.mode === 'edit' ? editing.item : undefined}
            onSubmit={handleSave}
            onCancel={closeForm}
          />
        </div>
      )}

      {items.isLoading && <p className="form-stack__hint">Cargando…</p>}
      {items.data?.length === 0 && <p className="form-stack__hint">Aún no hay elementos.</p>}
      {items.data && items.data.length > 0 && (
        <ul className="catalog-section__list">
          {items.data.map((item) => (
            <CatalogItemRow
              key={item.id}
              item={item}
              isLocked={isLocked(item, lockedNames)}
              isConfirmingDelete={confirmDeleteId === item.id}
              isDeleting={isDeleting}
              onEdit={() => setEditing({ mode: 'edit', item })}
              onAskDelete={() => setConfirmDeleteId(item.id)}
              onConfirmDelete={() => handleDelete(item.id)}
              onCancelDelete={() => setConfirmDeleteId(null)}
            />
          ))}
        </ul>
      )}
    </section>
  )
}
