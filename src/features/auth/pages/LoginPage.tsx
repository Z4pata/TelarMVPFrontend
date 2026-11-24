import { Alert } from '../../../components/ui/Alert'
import { LinkButton } from '../../../components/ui/LinkButton'
import { AuthLayout } from '../components/AuthLayout'
import { LoginForm } from '../components/LoginForm'

interface LoginPageProps {
  notice?: string
  onLoggedIn: () => void
  onGoToRegister: () => void
}

export function LoginPage({ notice, onLoggedIn, onGoToRegister }: LoginPageProps) {
  return (
    <AuthLayout title="Inicia sesión" subtitle="Entra para ver tus cuentas y movimientos.">
      {notice && <Alert variant="success" message={notice} />}
      <LoginForm onSuccess={onLoggedIn} />
      <p className="auth-form__footer">
        ¿No tienes cuenta? <LinkButton onClick={onGoToRegister}>Regístrate</LinkButton>
      </p>
    </AuthLayout>
  )
}
