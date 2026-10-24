import type { Pet, PetFilters, PetInput } from '@/lib/schemas/pet'

export type PetLocation = { region: string; cities: string[] }

/** Acceso a mascotas. La UI solo conoce esta interfaz, nunca la fuente concreta. */
export interface PetRepository {
  list(filters?: PetFilters): Promise<Pet[]>
  getById(id: string): Promise<Pet | null>
  create(input: PetInput, createdBy: string | null): Promise<Pet>
  update(id: string, input: Partial<PetInput>): Promise<Pet>
  remove(id: string): Promise<void>
  /** Regiones y ciudades con mascotas publicadas, para los filtros. */
  locations(): Promise<PetLocation[]>
}

export type Repositories = {
  pets: PetRepository
}

export class NotFoundError extends Error {
  constructor(what: string) {
    super(`${what} no existe`)
    this.name = 'NotFoundError'
  }
}
