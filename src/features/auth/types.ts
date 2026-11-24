export type LoginData = {
  email: string
  password: string
}

export type RegisterData = {
  nombre: string
  email: string
  password: string
  confirmPassword: string
}

export type User = {
  id: number
  nombre: string
  email: string
}
