import { useCallback, useEffect, useState } from 'react'
import { HttpError } from '../api/HttpError'

interface AsyncState<T> {
  data: T | null
  error: HttpError | null
  isLoading: boolean
}

function toHttpError(error: unknown): HttpError {
  if (error instanceof HttpError) return error
  const message = error instanceof Error ? error.message : 'Algo salió mal. Intenta de nuevo.'
  return new HttpError(0, message)
}

/**
 * Ejecuta una carga asíncrona al montar y permite repetirla con reload.
 * `load` debe ser una referencia estable (una función de módulo o memorizada).
 */
export function useAsync<T>(load: () => Promise<T>) {
  const [state, setState] = useState<AsyncState<T>>({ data: null, error: null, isLoading: true })
  const [version, setVersion] = useState(0)

  useEffect(() => {
    let isActive = true

    load()
      .then((data) => isActive && setState({ data, error: null, isLoading: false }))
      .catch((error: unknown) => isActive && setState({ data: null, error: toHttpError(error), isLoading: false }))

    return () => {
      isActive = false
    }
  }, [load, version])

  const reload = useCallback(() => {
    setState((current) => ({ ...current, isLoading: true }))
    setVersion((current) => current + 1)
  }, [])

  return { ...state, reload }
}
