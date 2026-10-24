import { AnimatePresence, motion } from 'motion/react'
import { Button } from '@/components/ui/Button'
import { PlacaIcon } from '@/components/Logo'
import { useCardVariants } from '@/lib/motion'
import type { Pet } from '@/lib/schemas/pet'
import { PetCard, PetCardSkeleton } from './PetCard'

const gridClasses = 'grid gap-5 sm:grid-cols-2 xl:grid-cols-3'

type PetGridProps = {
  pets: Pet[] | undefined
  isPending: boolean
  isError: boolean
  onRetry: () => void
  onClearFilters?: () => void
  skeletonCount?: number
}

export function PetGrid({
  pets,
  isPending,
  isError,
  onRetry,
  onClearFilters,
  skeletonCount = 6,
}: PetGridProps) {
  const variants = useCardVariants()

  if (isError) {
    return (
      <div role="alert" className="rounded-placa bg-white p-8 ring-1 ring-linea">
        <p className="titulo text-xl">No pudimos cargar las mascotas</p>
        <p className="mt-2 text-tinta-suave">Revisa tu conexión e inténtalo otra vez.</p>
        <Button className="mt-5" variant="secundario" onClick={onRetry}>
          Reintentar
        </Button>
      </div>
    )
  }

  if (isPending) {
    return (
      <div className={gridClasses} aria-busy="true" aria-label="Cargando mascotas">
        {Array.from({ length: skeletonCount }, (_, i) => (
          <PetCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (!pets || pets.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-start gap-4 rounded-placa bg-white p-8 ring-1 ring-linea md:p-12"
      >
        <PlacaIcon className="size-16 rotate-6" />
        <div>
          <p className="titulo text-2xl">No hay mascotas con estos filtros</p>
          <p className="mt-2 max-w-md text-tinta-suave">
            Prueba con otra ciudad o quita algún filtro para ver más opciones.
          </p>
        </div>
        {onClearFilters && (
          <Button variant="secundario" onClick={onClearFilters}>
            Limpiar filtros
          </Button>
        )}
      </motion.div>
    )
  }

  return (
    <ul className={gridClasses}>
      <AnimatePresence mode="popLayout" initial>
        {pets.map((pet, i) => (
          <motion.li
            key={pet.id}
            layout
            custom={i}
            variants={variants}
            initial="hidden"
            animate="show"
            exit="exit"
          >
            <PetCard pet={pet} />
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  )
}
