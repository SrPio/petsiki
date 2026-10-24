import { createContext, useContext } from 'react'

export type ToastTone = 'exito' | 'error'
export type ToastApi = { show: (message: string, tone?: ToastTone) => void }

export const ToastContext = createContext<ToastApi | null>(null)

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast debe usarse dentro de <ToastProvider>')
  return ctx
}
