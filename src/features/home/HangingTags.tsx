import { Link } from 'react-router'
import { motion, useReducedMotion } from 'motion/react'
import { PlacaHole } from '@/components/ui/Card'
import { photoUrl } from '@/lib/images'
import type { Pet } from '@/lib/schemas/pet'
import { formatAge, speciesLabel } from '@/features/pets/labels'

/** Posición y giro final de cada placa colgante. */
const layout = [
  { rotate: -7, z: 2, string: 56 },
  { rotate: 5, z: 3, string: 104 },
  { rotate: -3, z: 1, string: 24 },
]

/**
 * El momento orquestado de la landing: tres placas de collar que caen y se mecen hasta quedar
 * quietas, como colgadas de un gancho.
 */
export function HangingTags({ pets }: { pets: Pet[] }) {
  const reduced = useReducedMotion()

  return (
    <div
      className="relative flex items-start justify-center gap-3 sm:gap-5"
      aria-label="Mascotas destacadas"
    >
      {/* Barra de la que cuelgan las placas */}
      <span
        aria-hidden
        className="absolute -top-2 left-[6%] right-[6%] h-1.5 rounded-full bg-tinta/85"
      />
      {pets.slice(0, 3).map((pet, i) => {
        const pos = layout[i]
        return (
          <motion.div
            key={pet.id}
            className="relative flex w-[31%] max-w-[13.5rem] flex-col items-center"
            style={{ zIndex: pos.z, transformOrigin: '50% 0%' }}
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: -60, rotate: pos.rotate * -3 }}
            animate={{ opacity: 1, y: 0, rotate: pos.rotate }}
            transition={
              reduced
                ? { duration: 0.2 }
                : {
                    opacity: { duration: 0.3, delay: 0.15 + i * 0.12 },
                    y: { type: 'spring', stiffness: 140, damping: 16, delay: 0.15 + i * 0.12 },
                    rotate: { type: 'spring', stiffness: 60, damping: 6, delay: 0.15 + i * 0.12 },
                  }
            }
            whileHover={reduced ? undefined : { rotate: pos.rotate * 0.3 }}
          >
            {/* Cordón */}
            <span aria-hidden className="w-0.5 bg-tinta/70" style={{ height: pos.string }} />
            <span
              aria-hidden
              className="-mt-1 size-4 rounded-full border-[3px] border-tinta/80 bg-transparent"
            />
            <Link
              to={`/mascotas/${pet.id}`}
              className="-mt-2 block w-full rounded-placa focus-visible:outline-offset-4"
            >
              <article className="relative rounded-placa bg-white p-2.5 pt-8 shadow-alta ring-1 ring-linea/70 sm:p-3 sm:pt-9">
                <PlacaHole />
                <img
                  src={photoUrl(pet.photos[0], 480)}
                  alt=""
                  className="aspect-square w-full rounded-[1.1rem] object-cover"
                />
                <div className="px-1 pt-3 pb-1">
                  <h3 className="display truncate text-2xl sm:text-3xl">{pet.name}</h3>
                  <p className="mt-1 truncate text-xs text-tinta-suave sm:text-sm">
                    {speciesLabel[pet.species]}, {formatAge(pet.ageMonths)}
                  </p>
                </div>
              </article>
            </Link>
          </motion.div>
        )
      })}
    </div>
  )
}
