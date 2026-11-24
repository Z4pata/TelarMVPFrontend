export type TipoCuenta = {
  id: number
  nombre: string
}

export type Cuenta = {
  id: number
  entidad: string
  descripcion: string | null
  tipoCuenta: TipoCuenta
}

export type TipoMovimiento = {
  id: number
  nombre: string
}

export type Categoria = {
  id: number
  nombre: string
}

/** Valores del formulario de movimiento, tal como los escribe el usuario. */
export type MovementFormData = {
  cuentaId: string
  tipoMovimientoId: string
  categoriaId: string
  monto: string
  fecha: string
  descripcion: string
}

/** Cuerpo que espera POST /movimientos. */
export type NewMovement = {
  cuentaId: number
  tipoMovimientoId: number
  categoriaId: number
  monto: number
  fecha: string
  descripcion: string
}

export type Totals = {
  ingresos: number
  gastos: number
}

/** Movimiento tal como lo devuelve GET /movimientos/cuenta/{cuentaId}. */
export type Movimiento = {
  id: number
  categoria: Categoria
  tipoMovimiento: TipoMovimiento
  descripcion: string | null
  monto: number
  fecha: string
}
