import { Select } from '@/components/ui/Select'
import type { PetFilters } from '@/lib/schemas/pet'
import { sexLabel, sizeLabel, statusLabel, toOptions } from '../labels'
import { usePetLocations } from '../queries'
import type { FilterKey } from '../useCatalogFilters'

type FilterFieldsProps = {
  filters: PetFilters
  onChange: (changes: Partial<Record<FilterKey, string | undefined>>) => void
}

/** Filtros secundarios: ubicación, tamaño, sexo y estado. */
export function FilterFields({ filters, onChange }: FilterFieldsProps) {
  const { data: locations = [] } = usePetLocations()
  const cities = filters.region
    ? (locations.find((l) => l.region === filters.region)?.cities ?? [])
    : [...new Set(locations.flatMap((l) => l.cities))].sort((a, b) => a.localeCompare(b, 'es'))

  const set = (key: FilterKey) => (e: React.ChangeEvent<HTMLSelectElement>) =>
    onChange({ [key]: e.target.value || undefined })

  return (
    <div className="flex flex-col gap-5">
      <Select
        label="Región"
        placeholder="Todas las regiones"
        value={filters.region ?? ''}
        onChange={set('region')}
        options={locations.map((l) => ({ value: l.region, label: l.region }))}
      />
      <Select
        label="Ciudad o comuna"
        placeholder="Todas las ciudades"
        value={filters.city ?? ''}
        onChange={set('city')}
        options={cities.map((c) => ({ value: c, label: c }))}
      />
      <Select
        label="Tamaño"
        placeholder="Cualquier tamaño"
        value={filters.size ?? ''}
        onChange={set('size')}
        options={toOptions(sizeLabel)}
      />
      <Select
        label="Sexo"
        placeholder="Macho o hembra"
        value={filters.sex ?? ''}
        onChange={set('sex')}
        options={toOptions(sexLabel)}
      />
      <Select
        label="Estado"
        placeholder="Todos los estados"
        value={filters.status ?? ''}
        onChange={set('status')}
        options={toOptions(statusLabel)}
      />
    </div>
  )
}
