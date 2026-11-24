import type { ReactNode } from 'react'
import { Logo } from '../../../components/brand/Logo'
import './AuthLayout.css'

interface AuthLayoutProps {
  title: string
  subtitle: string
  children: ReactNode
}

export function AuthLayout({ title, subtitle, children }: AuthLayoutProps) {
  return (
    <main className="auth-layout">
      <section className="auth-layout__brand" aria-hidden="true">
        <span className="auth-layout__line" />
        <p className="auth-layout__headline">
          Menos fricción.
          <br />
          Más control.
        </p>
        <p className="auth-layout__tagline">Tus finanzas personales, claras y en orden.</p>
        <span className="auth-layout__dots">
          <span className="dot dot--red" />
          <span className="dot dot--blue" />
          <span className="dot dot--green" />
        </span>
      </section>

      <section className="auth-layout__card">
        <Logo />
        <header className="auth-layout__header">
          <h1 className="auth-layout__title">{title}</h1>
          <p className="auth-layout__subtitle">{subtitle}</p>
        </header>
        {children}
      </section>
    </main>
  )
}
