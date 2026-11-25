import { useState } from 'react'
import { CATALOGS } from '../catalogs'
import { CatalogSection } from './CatalogSection'
import './CatalogSidebar.css'

interface CatalogSidebarProps {
  /** Se llama cuando se crea, edita o elimina algo, para refrescar otras vistas. */
  onChange: () => void
}

/**
 * Sidebar para administrar los catálogos de la app.
 * En pantallas grandes está siempre visible; en móvil se abre como panel.
 */
export function CatalogSidebar({ onChange }: CatalogSidebarProps) {
  const [activeKey, setActiveKey] = useState(CATALOGS[0].key)
  const [isOpen, setIsOpen] = useState(false)
  const active = CATALOGS.find((catalog) => catalog.key === activeKey) ?? CATALOGS[0]

  return (
    <>
      <button
        type="button"
        className="catalog-sidebar__toggle"
        aria-expanded={isOpen}
        aria-controls="catalog-sidebar"
        onClick={() => setIsOpen(true)}
      >
        Administrar catálogos
      </button>

      {isOpen && <div className="catalog-sidebar__backdrop" onClick={() => setIsOpen(false)} />}

      <aside id="catalog-sidebar" className={`catalog-sidebar${isOpen ? ' catalog-sidebar--open' : ''}`}>
        <header className="catalog-sidebar__header">
          <h2 className="catalog-sidebar__title">Catálogos</h2>
          <button
            type="button"
            className="catalog-sidebar__close"
            aria-label="Cerrar catálogos"
            onClick={() => setIsOpen(false)}
          >
            ×
          </button>
        </header>

        <nav className="catalog-sidebar__tabs" aria-label="Catálogos">
          {CATALOGS.map((catalog) => (
            <button
              key={catalog.key}
              type="button"
              className="catalog-sidebar__tab"
              aria-current={catalog.key === active.key ? 'page' : undefined}
              onClick={() => setActiveKey(catalog.key)}
            >
              {catalog.title}
            </button>
          ))}
        </nav>

        <CatalogSection key={active.key} config={active} onChange={onChange} />
      </aside>
    </>
  )
}
