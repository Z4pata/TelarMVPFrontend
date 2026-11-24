import { LinkButton } from '../../../components/ui/LinkButton'
import { AuthLayout } from '../components/AuthLayout'
import { RegisterForm } from '../components/RegisterForm'

interface RegisterPageProps {
  onRegistered: () => void
  onGoToLogin: () => void
}

export function RegisterPage({ onRegistered, onGoToLogin }: RegisterPageProps) {
  return (
    <AuthLayout title="Crea tu cuenta" subtitle="Empieza a ordenar tus finanzas en minutos.">
      <RegisterForm onSuccess={onRegistered} />
      <p className="auth-form__footer">
        ¿Ya tienes cuenta? <LinkButton onClick={onGoToLogin}>Inicia sesión</LinkButton>
      </p>
    </AuthLayout>
  )
}
