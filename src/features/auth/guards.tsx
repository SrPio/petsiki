import { useEffect, useRef, type ReactNode } from 'react'
import { Navigate, useLocation, useSearchParams } from 'react-router'
import { useToast } from '@/components/ui/toast-context'
import { safeRedirect, useAuth } from './auth-context'

function FullPageWait() {
  return <div className="min-h-[50vh]" aria-busy="true" aria-label="Revisando tu sesión" />
}

function loginPath(location: { pathname: string; search: string }) {
  return `/ingresar?volver=${encodeURIComponent(location.pathname + location.search)}`
}

/** Exige sesión iniciada. Si no hay, lleva a /ingresar y vuelve después. */
export function RequireAuth({ children }: { children: ReactNode }) {
  const { status, user } = useAuth()
  const location = useLocation()
  if (status === 'loading') return <FullPageWait />
  if (!user) return <Navigate to={loginPath(location)} replace />
  return children
}

/** Exige rol admin. Un usuario normal vuelve al inicio con un aviso. */
export function RequireAdmin({ children }: { children: ReactNode }) {
  const { status, user, isAdmin } = useAuth()
  const location = useLocation()
  if (status === 'loading') return <FullPageWait />
  if (!user) return <Navigate to={loginPath(location)} replace />
  if (!isAdmin) return <NotAllowed />
  return children
}

function NotAllowed() {
  const toast = useToast()
  const shown = useRef(false)
  useEffect(() => {
    if (shown.current) return
    shown.current = true
    toast.show('El panel de mascotas es solo para administradores.', 'error')
  }, [toast])
  return <Navigate to="/" replace />
}

/** Para /ingresar y /registro: con sesión iniciada lleva a ?volver= o al inicio. */
export function RedirectIfAuthenticated({ children }: { children: ReactNode }) {
  const { status, user } = useAuth()
  const [params] = useSearchParams()
  if (status === 'loading') return <FullPageWait />
  if (user) return <Navigate to={safeRedirect(params.get('volver'))} replace />
  return children
}
