/** Fecha local de hoy en el formato de un input date (YYYY-MM-DD). */
export function todayForDateInput(): string {
  const now = new Date()
  const offsetMs = now.getTimezoneOffset() * 60_000
  return new Date(now.getTime() - offsetMs).toISOString().slice(0, 10)
}
