import type { AuthUser, SignInInput } from '@/lib/schemas/auth'
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

export type SignUpData = { fullName: string; email: string; password: string }

/** Autenticación. Los usuarios nuevos siempre se crean con rol "user". */
export interface AuthService {
  getSession(): Promise<AuthUser | null>
  signIn(input: SignInInput): Promise<AuthUser>
  signUp(input: SignUpData): Promise<AuthUser>
  signOut(): Promise<void>
  /** Avisa cuando cambia la sesión (también desde otra pestaña). Devuelve la función para desuscribirse. */
  onChange(listener: (user: AuthUser | null) => void): () => void
}

export type Repositories = {
  pets: PetRepository
  auth: AuthService
}

export class NotFoundError extends Error {
  constructor(what: string) {
    super(`${what} no existe`)
    this.name = 'NotFoundError'
  }
}

/** Error de autenticación con un mensaje listo para mostrar al usuario. */
export class AuthError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'AuthError'
  }
}
