import { createCatalogApi } from './catalogService'
import type { CatalogConfig } from './types'

// Límites de nombre alineados con los DTO del backend.
export const CATALOGS: CatalogConfig[] = [
  {
    key: 'tipos-movimiento',
    title: 'Tipos de movimiento',
    newLabel: 'Nuevo tipo de movimiento',
    editLabel: 'Editar tipo de movimiento',
    nombreMax: 50,
    hint: '"Ingreso" y "Egreso" están protegidos porque la app los usa para calcular tus totales.',
    lockedNames: ['Ingreso', 'Egreso'],
    api: createCatalogApi('/tipos-movimiento'),
  },
  {
    key: 'tipos-cuenta',
    title: 'Tipos de cuenta',
    newLabel: 'Nuevo tipo de cuenta',
    editLabel: 'Editar tipo de cuenta',
    nombreMax: 50,
    api: createCatalogApi('/tipos-cuenta'),
  },
  {
    key: 'categorias',
    title: 'Categorías',
    newLabel: 'Nueva categoría',
    editLabel: 'Editar categoría',
    nombreMax: 100,
    api: createCatalogApi('/categorias'),
  },
]
