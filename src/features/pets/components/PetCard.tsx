import { Link } from 'react-router'
import { motion } from 'motion/react'
import { MapPin } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { PlacaHole } from '@/components/ui/Card'
import { Skeleton } from '@/components/ui/Skeleton'
import { FavoriteButton } from '@/features/favorites/FavoriteButton'
import { photoUrl } from '@/lib/images'
import { springSuave } from '@/lib/motion'
import type { Pet } from '@/lib/schemas/pet'
import { formatAge, sexLabel, speciesLabel, statusLabel } from '../labels'

export function PetCard({ pet }: { pet: Pet }) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={springSuave}
      className="group relative h-full rounded-placa bg-white p-3 pt-9 shadow-suave ring-1 ring-linea/70 transition-shadow duration-300 hover:shadow-alta has-[a:focus-visible]:ring-3 has-[a:focus-visible]:ring-ciruela"
    >
      <PlacaHole />
      <div className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem] bg-lavanda">
        <img
          src={photoUrl(pet.photos[0], 640)}
          alt={`${pet.name}, ${speciesLabel[pet.species].toLowerCase()} en adopción`}
          loading="lazy"
          decoding="async"
          className="size-full object-cover transition-transform duration-700 ease-[var(--ease-suave)] group-hover:scale-[1.04]"
        />
        {pet.status !== 'disponible' && (
          <Badge
            tone={pet.status === 'en_proceso' ? 'durazno' : 'neutro'}
            className="absolute top-3 left-3 shadow-suave"
          >
            {statusLabel[pet.status]}
          </Badge>
        )}
      </div>
      <FavoriteButton petId={pet.id} petName={pet.name} className="absolute top-12 right-6 z-10" />
      <div className="px-2 pt-4 pb-2">
        <h3 className="display text-4xl">
          {/* El ::after del link cubre toda la tarjeta */}
          <Link
            to={`/mascotas/${pet.id}`}
            className="after:absolute after:inset-0 after:rounded-placa focus-visible:outline-none"
          >
            {pet.name}
          </Link>
        </h3>
        <p className="mt-1.5 text-tinta-suave">
          {speciesLabel[pet.species]} {sexLabel[pet.sex].toLowerCase()}, {formatAge(pet.ageMonths)}
        </p>
        <p className="mt-3 flex items-center gap-1.5 text-sm font-semibold text-tinta">
          <MapPin aria-hidden className="size-4 text-ciruela" />
          {pet.city}, {pet.region}
        </p>
      </div>
    </motion.article>
  )
}

export function PetCardSkeleton() {
  return (
    <div className="relative rounded-placa bg-white p-3 pt-9 shadow-suave ring-1 ring-linea/70">
      <PlacaHole />
      <Skeleton className="aspect-[4/3] w-full rounded-[1.25rem]" />
      <div className="flex flex-col gap-2.5 px-2 pt-4 pb-2">
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="mt-1 h-4 w-1/3" />
      </div>
    </div>
  )
}
