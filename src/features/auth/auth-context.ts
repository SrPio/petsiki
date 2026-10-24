import { createContext, useContext } from 'react'
import type { SignUpData } from '@/data/repositories/types'
import type { AuthUser, SignInInput } from '@/lib/schemas/auth'

export type AuthState = {
  /** "loading" mientras se lee la sesión guardada. */
  status: 'loading' | 'ready'
  user: AuthUser | null
  isAdmin: boolean
  signIn: (input: SignInInput) => Promise<AuthUser>
  signUp: (input: SignUpData) => Promise<AuthUser>
  signOut: () => Promise<void>
}

export const AuthContext = createContext<AuthState | null>(null)

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth debe usarse dentro de <AuthProvider>')
  return ctx
}

/** Solo acepta rutas internas para evitar redirecciones abiertas (?volver=https://...). */
export function safeRedirect(target: string | null, fallback = '/') {
  if (!target || !target.startsWith('/') || target.startsWith('//') || target.startsWith('/\\'))
    return fallback
  return target
}
