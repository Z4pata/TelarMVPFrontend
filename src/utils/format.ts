const currencyFormatter = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0,
})

const dateFormatter = new Intl.DateTimeFormat('es-CO', { dateStyle: 'medium' })

export function formatCurrency(value: number): string {
  return currencyFormatter.format(value)
}

/** Fecha legible a partir de un LocalDateTime de la API (YYYY-MM-DDTHH:mm:ss). */
export function formatDate(isoDateTime: string): string {
  return dateFormatter.format(new Date(isoDateTime))
}

/** Fecha y hora local actual en el formato de un input datetime-local (YYYY-MM-DDTHH:mm). */
export function nowForDateTimeInput(): string {
  const now = new Date()
  const offsetMs = now.getTimezoneOffset() * 60_000
  return new Date(now.getTime() - offsetMs).toISOString().slice(0, 16)
}
