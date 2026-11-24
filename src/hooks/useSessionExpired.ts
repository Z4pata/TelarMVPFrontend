import { useEffect } from 'react'
import type { HttpError } from '../api/HttpError'

const UNAUTHORIZED = 401

/** Avisa una sola vez cuando alguna de las cargas responde que la sesión terminó. */
export function useSessionExpired(errors: (HttpError | null)[], onSessionExpired: () => void) {
  const isExpired = errors.some((error) => error?.status === UNAUTHORIZED)

  useEffect(() => {
    if (isExpired) onSessionExpired()
  }, [isExpired, onSessionExpired])
}
