import { Logo } from '../brand/Logo'
import { Button } from '../ui/Button'
import './AppHeader.css'

interface AppHeaderProps {
  onLogout: () => void
}

export function AppHeader({ onLogout }: AppHeaderProps) {
  return (
    <header className="app-header">
      <Logo />
      <Button variant="secondary" onClick={onLogout}>
        Cerrar sesión
      </Button>
    </header>
  )
}
