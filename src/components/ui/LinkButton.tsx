import type { ButtonHTMLAttributes } from 'react'
import './LinkButton.css'

/** Botón con apariencia de enlace, para acciones de navegación dentro de la app. */
export function LinkButton(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button type="button" className="link-button" {...props} />
}
