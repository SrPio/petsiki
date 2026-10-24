import { z } from 'zod'
import { petSchema, type Pet, type PetFilters, type PetInput } from '@/lib/schemas/pet'
import seed from '../seed/pets.json'
import { NotFoundError, type PetRepository } from '../repositories/types'
import { byNewest, collectLocations, matchesFilters } from './filters'
import { delay, readJson, writeJson } from './storage'

const STORAGE_KEY = 'petsiki:pets:v1'
const petListSchema = z.array(petSchema)

/** Mascotas guardadas en localStorage. La primera vez se siembran desde pets.json. */
export class LocalPetRepository implements PetRepository {
  private load(): Pet[] {
    const stored = readJson(STORAGE_KEY, petListSchema)
    if (stored) return stored
    const initial = petListSchema.parse(seed)
    writeJson(STORAGE_KEY, initial)
    return initial
  }

  private save(pets: Pet[]) {
    writeJson(STORAGE_KEY, pets)
  }

  async list(filters: PetFilters = {}) {
    await delay()
    return this.load()
      .filter((pet) => matchesFilters(pet, filters))
      .sort(byNewest)
  }

  async getById(id: string) {
    await delay()
    return this.load().find((pet) => pet.id === id) ?? null
  }

  async create(input: PetInput, createdBy: string | null) {
    await delay()
    const now = new Date().toISOString()
    const pet = petSchema.parse({
      ...input,
      id: crypto.randomUUID(),
      createdBy,
      createdAt: now,
      updatedAt: now,
    })
    this.save([pet, ...this.load()])
    return pet
  }

  async update(id: string, input: Partial<PetInput>) {
    await delay()
    const pets = this.load()
    const index = pets.findIndex((pet) => pet.id === id)
    if (index === -1) throw new NotFoundError('La mascota')
    const updated = petSchema.parse({
      ...pets[index],
      ...input,
      id,
      updatedAt: new Date().toISOString(),
    })
    pets[index] = updated
    this.save(pets)
    return updated
  }

  async remove(id: string) {
    await delay()
    const pets = this.load()
    const next = pets.filter((pet) => pet.id !== id)
    if (next.length === pets.length) throw new NotFoundError('La mascota')
    this.save(next)
  }

  async locations() {
    await delay()
    return collectLocations(this.load())
  }
}
