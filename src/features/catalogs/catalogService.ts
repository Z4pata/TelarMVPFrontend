import { deleteJson, getJson, postJson, putJson } from '../../api/httpClient'
import type { CatalogApi, CatalogFormData, CatalogItem } from './types'

function toRequest({ nombre, descripcion }: CatalogFormData) {
  return { nombre: nombre.trim(), descripcion: descripcion.trim() || null }
}

/** Crea las operaciones CRUD para un recurso REST como /categorias. */
export function createCatalogApi(path: string): CatalogApi {
  return {
    list: () => getJson<CatalogItem[]>(path),
    create: (data) => postJson<CatalogItem>(path, toRequest(data)),
    update: (id, data) => putJson<CatalogItem>(`${path}/${id}`, toRequest(data)),
    remove: (id) => deleteJson(`${path}/${id}`),
  }
}
