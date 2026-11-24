import { Alert } from '../../../components/ui/Alert'
import { Button } from '../../../components/ui/Button'
import { TextField } from '../../../components/ui/TextField'
import { useForm } from '../../../hooks/useForm'
import { register } from '../authService'
import type { RegisterData } from '../types'
import { validateRegister } from '../validation'
import './AuthForm.css'

const INITIAL_VALUES: RegisterData = { nombre: '', email: '', password: '', confirmPassword: '' }

interface RegisterFormProps {
  onSuccess: () => void
}

export function RegisterForm({ onSuccess }: RegisterFormProps) {
  const { values, fieldErrors, formError, isSubmitting, handleChange, handleSubmit } = useForm({
    initialValues: INITIAL_VALUES,
    validate: validateRegister,
    onSubmit: async (data) => {
      await register(data)
      onSuccess()
    },
  })

  return (
    <form className="auth-form" onSubmit={handleSubmit} noValidate>
      {formError && <Alert variant="error" message={formError} />}
      <TextField
        name="nombre"
        label="Nombre"
        autoComplete="name"
        value={values.nombre}
        error={fieldErrors.nombre}
        onChange={handleChange}
      />
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
        autoComplete="new-password"
        value={values.password}
        error={fieldErrors.password}
        onChange={handleChange}
      />
      <TextField
        name="confirmPassword"
        type="password"
        label="Confirmar contraseña"
        autoComplete="new-password"
        value={values.confirmPassword}
        error={fieldErrors.confirmPassword}
        onChange={handleChange}
      />
      <Button type="submit" block isLoading={isSubmitting}>
        Crear cuenta
      </Button>
    </form>
  )
}
