import { useState } from 'react'
import { SlidersHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { FilterFields } from './components/FilterFields'
import { PetGrid } from './components/PetGrid'
import { SearchBox } from './components/SearchBox'
import { SpeciesChips } from './components/SpeciesChips'
import { usePets } from './queries'
import { useCatalogFilters } from './useCatalogFilters'

function countLabel(n: number) {
  if (n === 0) return 'Sin resultados'
  return n === 1 ? '1 mascota' : `${n} mascotas`
}

export function PetsPage() {
  const { filters, setFilters, clearFilters, panelCount, hasAny } = useCatalogFilters()
  const { data: pets, isPending, isError, isFetching, refetch } = usePets(filters)
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <div className="contenedor">
      <header className="max-w-2xl">
        <h1 className="display text-5xl text-balance md:text-7xl">Mascotas en adopción</h1>
        <p className="mt-4 text-lg text-tinta-suave md:text-xl">
          Filtra por tipo, tamaño o ciudad para encontrar a quien buscas.
        </p>
      </header>

      <div className="mt-8 flex flex-col gap-4">
        <SearchBox value={filters.q} onChange={(q) => setFilters({ q })} />
        <SpeciesChips value={filters.species} onChange={(species) => setFilters({ species })} />
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[16rem_1fr] lg:gap-10">
        <aside aria-label="Filtros" className="hidden lg:block">
          <div className="sticky top-28 flex flex-col gap-6 rounded-placa bg-white p-6 shadow-suave ring-1 ring-linea/70">
            <FilterFields filters={filters} onChange={setFilters} />
            {hasAny && (
              <Button variant="fantasma" size="sm" onClick={clearFilters} className="self-start">
                Limpiar filtros
              </Button>
            )}
          </div>
        </aside>

        <section aria-labelledby="resultados">
          <div className="mb-5 flex items-center justify-between gap-4">
            <p
              id="resultados"
              aria-live="polite"
              className="titulo text-xl transition-opacity duration-200"
              style={{ opacity: isFetching && !isPending ? 0.5 : 1 }}
            >
              {pets ? countLabel(pets.length) : 'Buscando mascotas'}
            </p>
            <Button
              variant="secundario"
              size="sm"
              className="lg:hidden"
              icon={<SlidersHorizontal className="size-4" />}
              onClick={() => setDrawerOpen(true)}
            >
              {panelCount > 0 ? `Filtros (${panelCount})` : 'Filtros'}
            </Button>
          </div>

          <PetGrid
            pets={pets}
            isPending={isPending}
            isError={isError}
            onRetry={() => refetch()}
            onClearFilters={hasAny ? clearFilters : undefined}
          />
        </section>
      </div>

      <Modal
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title="Filtros"
        footer={
          <>
            {hasAny && (
              <Button variant="fantasma" onClick={clearFilters}>
                Limpiar filtros
              </Button>
            )}
            <Button onClick={() => setDrawerOpen(false)}>
              {pets && pets.length > 0
                ? `Ver ${countLabel(pets.length).toLowerCase()}`
                : 'Cerrar filtros'}
            </Button>
          </>
        }
      >
        <FilterFields filters={filters} onChange={setFilters} />
      </Modal>
    </div>
  )
}
