/**
 * Tipos de movimiento, tipos de cuenta y categorías comparten la misma forma
 * en el backend (id, nombre, descripción), por eso se manejan como "catálogos".
 */
export type CatalogItem = {
  id: number
  nombre: string
  descripcion: string | null
}

/** Valores del formulario, tal como los escribe el usuario. */
export type CatalogFormData = {
  nombre: string
  descripcion: string
}

/** Operaciones CRUD de un catálogo contra la API. */
export interface CatalogApi {
  list: () => Promise<CatalogItem[]>
  create: (data: CatalogFormData) => Promise<CatalogItem>
  update: (id: number, data: CatalogFormData) => Promise<CatalogItem>
  remove: (id: number) => Promise<void>
}

/** Todo lo que necesita la sidebar para mostrar y editar un catálogo. */
export type CatalogConfig = {
  key: string
  title: string
  /** Textos ya concordados en género: "Nueva categoría", "Editar categoría". */
  newLabel: string
  editLabel: string
  nombreMax: number
  hint?: string
  /** Nombres que no se pueden editar ni eliminar (el backend también los protege). */
  lockedNames?: string[]
  api: CatalogApi
}
