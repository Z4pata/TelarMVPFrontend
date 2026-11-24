import './Alert.css'

interface AlertProps {
  variant: 'error' | 'success'
  message: string
}

export function Alert({ variant, message }: AlertProps) {
  return (
    <p className={`alert alert--${variant}`} role={variant === 'error' ? 'alert' : 'status'}>
      {message}
    </p>
  )
}
