import { useQuery } from '@tanstack/react-query'
import { useRepositories } from '@/data/repositories-context'
import type { PetFilters } from '@/lib/schemas/pet'

export const petKeys = {
  all: ['pets'] as const,
  lists: () => [...petKeys.all, 'list'] as const,
  list: (filters: PetFilters) => [...petKeys.lists(), filters] as const,
  detail: (id: string) => [...petKeys.all, 'detail', id] as const,
  locations: () => [...petKeys.all, 'locations'] as const,
}

export function usePets(filters: PetFilters = {}) {
  const { pets } = useRepositories()
  return useQuery({
    queryKey: petKeys.list(filters),
    queryFn: () => pets.list(filters),
  })
}

export function usePet(id: string | undefined) {
  const { pets } = useRepositories()
  return useQuery({
    queryKey: petKeys.detail(id ?? ''),
    queryFn: () => pets.getById(id!),
    enabled: Boolean(id),
  })
}

export function usePetLocations() {
  const { pets } = useRepositories()
  return useQuery({
    queryKey: petKeys.locations(),
    queryFn: () => pets.locations(),
    staleTime: 5 * 60_000,
  })
}
