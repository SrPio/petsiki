import { Link } from 'react-router'
import { motion } from 'motion/react'
import { Heart } from 'lucide-react'
import { buttonClasses } from '@/components/ui/button-styles'
import { PetGrid } from '@/features/pets/components/PetGrid'
import { usePets } from '@/features/pets/queries'
import { useFavoriteIds } from './queries'

export function FavoritesPage() {
  const favorites = useFavoriteIds()
  const pets = usePets()
  const ids = favorites.data ?? []
  // Orden: el último guardado primero.
  const favoritePets = pets.data
    ? ids.flatMap((id) => pets.data.find((p) => p.id === id) ?? [])
    : undefined
  const isPending = favorites.isPending || pets.isPending
  const isEmpty = !isPending && favoritePets?.length === 0

  return (
    <div className="contenedor">
      <header className="max-w-2xl">
        <h1 className="display text-5xl md:text-7xl">Tus favoritos</h1>
        <p className="mt-4 text-lg text-tinta-suave md:text-xl">
          Las mascotas que marques con el corazón quedan guardadas aquí para revisarlas con calma.
        </p>
      </header>

      <div className="mt-10">
        {isEmpty ? (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-start gap-4 rounded-placa bg-white p-8 ring-1 ring-linea md:p-12"
          >
            <span className="grid size-16 place-items-center rounded-full bg-durazno text-durazno-hondo">
              <Heart aria-hidden className="size-8" />
            </span>
            <div>
              <p className="titulo text-2xl">Todavía no guardas mascotas</p>
              <p className="mt-2 max-w-md text-tinta-suave">
                Toca el corazón en la ficha de una mascota para guardarla aquí.
              </p>
            </div>
            <Link to="/mascotas" className={buttonClasses('primario', 'md')}>
              Ver mascotas
            </Link>
          </motion.div>
        ) : (
          <PetGrid
            pets={favoritePets}
            isPending={isPending}
            isError={favorites.isError || pets.isError}
            onRetry={() => {
              void favorites.refetch()
              void pets.refetch()
            }}
            skeletonCount={3}
          />
        )}
      </div>
    </div>
  )
}
