import { z } from 'zod'
import { ROLES, type AuthUser, type SignInInput } from '@/lib/schemas/auth'
import { AuthError, type AuthService, type SignUpData } from '../repositories/types'
import { delay, readJson, writeJson } from './storage'

/**
 * Autenticación simulada para la Fase 1. Guarda usuarios en localStorage.
 * NO es segura: solo sirve para desarrollar y probar sin backend. En la Fase 2 se reemplaza por
 * Supabase Auth.
 */

const USERS_KEY = 'petsiki:users:v1'
const SESSION_KEY = 'petsiki:session:v1'

const storedUserSchema = z.object({
  id: z.string(),
  email: z.string(),
  fullName: z.string(),
  role: z.enum(ROLES),
  passwordHash: z.string(),
})
type StoredUser = z.infer<typeof storedUserSchema>

/** Cuentas de prueba precargadas. */
export const DEMO_ACCOUNTS = [
  { email: 'admin@petsiki.com', password: 'admin1234', fullName: 'Admin Petsiki', role: 'admin' },
  { email: 'user@petsiki.com', password: 'user1234', fullName: 'Usuaria Demo', role: 'user' },
] as const

async function hash(password: string) {
  const bytes = new TextEncoder().encode(`petsiki:${password}`)
  const digest = await crypto.subtle.digest('SHA-256', bytes)
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('')
}

const toPublic = ({ id, email, fullName, role }: StoredUser): AuthUser => ({
  id,
  email,
  fullName,
  role,
})

export class LocalAuthService implements AuthService {
  private listeners = new Set<(user: AuthUser | null) => void>()

  private async loadUsers(): Promise<StoredUser[]> {
    const stored = readJson(USERS_KEY, z.array(storedUserSchema))
    if (stored) return stored
    const seeded = await Promise.all(
      DEMO_ACCOUNTS.map(async (a, i) => ({
        id: i === 0 ? 'user-admin' : 'user-demo',
        email: a.email,
        fullName: a.fullName,
        role: a.role,
        passwordHash: await hash(a.password),
      })),
    )
    writeJson(USERS_KEY, seeded)
    return seeded
  }

  private async currentUser() {
    const id = readJson(SESSION_KEY, z.string())
    if (!id) return null
    const user = (await this.loadUsers()).find((u) => u.id === id)
    return user ? toPublic(user) : null
  }

  private emit(user: AuthUser | null) {
    for (const listener of this.listeners) listener(user)
  }

  async getSession() {
    return this.currentUser()
  }

  async signIn({ email, password }: SignInInput) {
    await delay()
    const users = await this.loadUsers()
    const user = users.find((u) => u.email === email.trim().toLowerCase())
    if (!user || user.passwordHash !== (await hash(password))) {
      throw new AuthError('El email o la contraseña no son correctos.')
    }
    writeJson(SESSION_KEY, user.id)
    const pub = toPublic(user)
    this.emit(pub)
    return pub
  }

  async signUp({ fullName, email, password }: SignUpData) {
    await delay()
    const users = await this.loadUsers()
    const normalized = email.trim().toLowerCase()
    if (users.some((u) => u.email === normalized)) {
      throw new AuthError('Ya existe una cuenta con ese email. Ingresa con tu contraseña.')
    }
    const user: StoredUser = {
      id: crypto.randomUUID(),
      email: normalized,
      fullName: fullName.trim(),
      role: 'user',
      passwordHash: await hash(password),
    }
    writeJson(USERS_KEY, [...users, user])
    writeJson(SESSION_KEY, user.id)
    const pub = toPublic(user)
    this.emit(pub)
    return pub
  }

  async signOut() {
    localStorage.removeItem(SESSION_KEY)
    this.emit(null)
  }

  onChange(listener: (user: AuthUser | null) => void) {
    this.listeners.add(listener)
    const onStorage = (e: StorageEvent) => {
      if (e.key === SESSION_KEY || e.key === null) void this.currentUser().then(listener)
    }
    window.addEventListener('storage', onStorage)
    return () => {
      this.listeners.delete(listener)
      window.removeEventListener('storage', onStorage)
    }
  }
}
