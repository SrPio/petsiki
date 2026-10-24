import { useState, type ReactNode } from 'react'
import { createRepositories } from './index'
import { RepositoriesContext } from './repositories-context'
import type { Repositories } from './repositories/types'

/** Entrega los repositorios a la app. En tests se puede pasar una implementación propia. */
export function RepositoriesProvider({
  repositories,
  children,
}: {
  repositories?: Repositories
  children: ReactNode
}) {
  const [value] = useState(() => repositories ?? createRepositories())
  return <RepositoriesContext.Provider value={value}>{children}</RepositoriesContext.Provider>
}
