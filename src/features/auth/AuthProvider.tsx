import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useRepositories } from '@/data/repositories-context'
import type { AuthUser } from '@/lib/schemas/auth'
import { AuthContext, type AuthState } from './auth-context'

export function AuthProvider({ children }: { children: ReactNode }) {
  const { auth } = useRepositories()
  const queryClient = useQueryClient()
  const [status, setStatus] = useState<AuthState['status']>('loading')
  const [user, setUser] = useState<AuthUser | null>(null)

  useEffect(() => {
    let active = true
    void auth.getSession().then((u) => {
      if (!active) return
      setUser(u)
      setStatus('ready')
    })
    const unsubscribe = auth.onChange((u) => {
      setUser(u)
      // Los datos por usuario (ej. favoritos) dependen de la sesión.
      void queryClient.invalidateQueries({ queryKey: ['me'] })
    })
    return () => {
      active = false
      unsubscribe()
    }
  }, [auth, queryClient])

  const value = useMemo<AuthState>(
    () => ({
      status,
      user,
      isAdmin: user?.role === 'admin',
      signIn: (input) => auth.signIn(input),
      signUp: (input) => auth.signUp(input),
      signOut: () => auth.signOut(),
    }),
    [auth, status, user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
