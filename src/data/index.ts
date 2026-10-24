import { LocalAuthService } from './local/LocalAuthService'
import { LocalPetRepository } from './local/LocalPetRepository'
import type { Repositories } from './repositories/types'

export type DataSource = 'local' | 'supabase'

export function getDataSource(): DataSource {
  return import.meta.env.VITE_DATA_SOURCE === 'supabase' ? 'supabase' : 'local'
}

/** Crea los repositorios según VITE_DATA_SOURCE. */
export function createRepositories(source: DataSource = getDataSource()): Repositories {
  if (source === 'supabase') {
    // La implementación con Supabase llega en la Fase 2 (Task 11).
    throw new Error('VITE_DATA_SOURCE=supabase todavía no está disponible. Usa "local".')
  }
  return { pets: new LocalPetRepository(), auth: new LocalAuthService() }
}
