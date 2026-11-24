import { Alert } from '../../../components/ui/Alert'
import { Button } from '../../../components/ui/Button'
import { TextField } from '../../../components/ui/TextField'
import { useForm } from '../../../hooks/useForm'
import { login } from '../authService'
import type { LoginData } from '../types'
import { validateLogin } from '../validation'
import './AuthForm.css'

const INITIAL_VALUES: LoginData = { email: '', password: '' }

interface LoginFormProps {
  onSuccess: () => void
}

export function LoginForm({ onSuccess }: LoginFormProps) {
  const { values, fieldErrors, formError, isSubmitting, handleChange, handleSubmit } = useForm({
    initialValues: INITIAL_VALUES,
    validate: validateLogin,
    onSubmit: async (data) => {
      await login(data)
      onSuccess()
    },
  })

  return (
    <form className="auth-form" onSubmit={handleSubmit} noValidate>
      {formError && <Alert variant="error" message={formError} />}
      <TextField
        name="email"
        type="email"
        label="Email"
        autoComplete="email"
        value={values.email}
        error={fieldErrors.email}
        onChange={handleChange}
      />
      <TextField
        name="password"
        type="password"
        label="Contraseña"
        autoComplete="current-password"
        value={values.password}
        error={fieldErrors.password}
        onChange={handleChange}
      />
      <Button type="submit" block isLoading={isSubmitting}>
        Iniciar sesión
      </Button>
    </form>
  )
}
