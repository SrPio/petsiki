import { useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router'
import { SEXES, SIZES, SPECIES, STATUSES, type PetFilters } from '@/lib/schemas/pet'

export type FilterKey = keyof PetFilters

const FILTER_KEYS: FilterKey[] = ['q', 'species', 'region', 'city', 'size', 'sex', 'status']

function pickEnum<T extends string>(values: readonly T[], raw: string | null): T | undefined {
  return raw && (values as readonly string[]).includes(raw) ? (raw as T) : undefined
}

/** Filtros del catálogo guardados en la URL (?species=gato&city=Santiago). */
export function useCatalogFilters() {
  const [params, setParams] = useSearchParams()

  const filters = useMemo<PetFilters>(() => {
    const text = (key: string) => params.get(key)?.trim() || undefined
    return {
      q: text('q'),
      species: pickEnum(SPECIES, params.get('species')),
      region: text('region'),
      city: text('city'),
      size: pickEnum(SIZES, params.get('size')),
      sex: pickEnum(SEXES, params.get('sex')),
      status: pickEnum(STATUSES, params.get('status')),
    }
  }, [params])

  const setFilters = useCallback(
    (changes: Partial<Record<FilterKey, string | undefined>>) => {
      setParams(
        (prev) => {
          const next = new URLSearchParams(prev)
          for (const [key, value] of Object.entries(changes)) {
            if (value) next.set(key, value)
            else next.delete(key)
          }
          // Si cambia la región, la ciudad anterior ya no aplica.
          if ('region' in changes && !('city' in changes)) next.delete('city')
          return next
        },
        { replace: true, preventScrollReset: true },
      )
    },
    [setParams],
  )

  const clearFilters = useCallback(() => {
    setParams(new URLSearchParams(), { replace: true, preventScrollReset: true })
  }, [setParams])

  /** Filtros activos sin contar búsqueda ni tipo (que siempre están visibles). */
  const panelCount = (['region', 'city', 'size', 'sex', 'status'] as const).filter(
    (k) => filters[k],
  ).length
  const hasAny = FILTER_KEYS.some((k) => filters[k])

  return { filters, setFilters, clearFilters, panelCount, hasAny }
}
