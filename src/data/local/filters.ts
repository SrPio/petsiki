import type { Pet, PetFilters } from '@/lib/schemas/pet'
import { normalize } from '@/lib/text'
import type { PetLocation } from '../repositories/types'

export function matchesFilters(pet: Pet, filters: PetFilters) {
  if (filters.species && pet.species !== filters.species) return false
  if (filters.size && pet.size !== filters.size) return false
  if (filters.sex && pet.sex !== filters.sex) return false
  if (filters.status && pet.status !== filters.status) return false
  if (filters.region && normalize(pet.region) !== normalize(filters.region)) return false
  if (filters.city && normalize(pet.city) !== normalize(filters.city)) return false
  if (filters.q) {
    const q = normalize(filters.q)
    const haystack = normalize(
      [pet.name, pet.breed, pet.city, pet.region, pet.description].join(' '),
    )
    if (!haystack.includes(q)) return false
  }
  return true
}

/** Más recientes primero. */
export function byNewest(a: Pet, b: Pet) {
  return b.createdAt.localeCompare(a.createdAt)
}

export function collectLocations(pets: Pet[]): PetLocation[] {
  const map = new Map<string, Set<string>>()
  for (const pet of pets) {
    if (!map.has(pet.region)) map.set(pet.region, new Set())
    map.get(pet.region)!.add(pet.city)
  }
  return [...map.entries()]
    .map(([region, cities]) => ({
      region,
      cities: [...cities].sort((a, b) => a.localeCompare(b, 'es')),
    }))
    .sort((a, b) => a.region.localeCompare(b.region, 'es'))
}
