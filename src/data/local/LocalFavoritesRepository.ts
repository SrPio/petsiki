import { z } from 'zod'
import type { FavoritesRepository } from '../repositories/types'
import { delay, readJson, writeJson } from './storage'

const STORAGE_KEY = 'petsiki:favorites:v1'
const schema = z.record(z.string(), z.array(z.string()))

/** Favoritos en localStorage, separados por id de usuario. */
export class LocalFavoritesRepository implements FavoritesRepository {
  private load() {
    return readJson(STORAGE_KEY, schema) ?? {}
  }

  async list(userId: string) {
    await delay(80)
    return this.load()[userId] ?? []
  }

  async add(userId: string, petId: string) {
    await delay(80)
    const all = this.load()
    const current = all[userId] ?? []
    if (!current.includes(petId)) all[userId] = [petId, ...current]
    writeJson(STORAGE_KEY, all)
  }

  async remove(userId: string, petId: string) {
    await delay(80)
    const all = this.load()
    all[userId] = (all[userId] ?? []).filter((id) => id !== petId)
    writeJson(STORAGE_KEY, all)
  }
}
