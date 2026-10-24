import { createContext, useContext } from 'react'
import type { Repositories } from './repositories/types'

export const RepositoriesContext = createContext<Repositories | null>(null)

export function useRepositories() {
  const ctx = useContext(RepositoriesContext)
  if (!ctx) throw new Error('useRepositories debe usarse dentro de <RepositoriesProvider>')
  return ctx
}
