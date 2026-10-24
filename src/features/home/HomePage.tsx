import { Link } from 'react-router'
import { motion } from 'motion/react'
import { buttonClasses } from '@/components/ui/button-styles'
import { Skeleton } from '@/components/ui/Skeleton'
import { PetGrid } from '@/features/pets/components/PetGrid'
import { usePets } from '@/features/pets/queries'
import { useFadeUp, useStagger } from '@/lib/motion'
import { HangingTags } from './HangingTags'

const steps = [
  {
    title: 'Encuentra a tu mascota',
    text: 'Filtra por tipo, tamaño y ciudad, y revisa su ficha con fotos, salud y carácter.',
  },
  {
    title: 'Contacta a quien la cuida',
    text: 'Con tu cuenta ves el WhatsApp, teléfono o email del responsable y su horario.',
  },
  {
    title: 'Coordina el retiro o la entrega',
    text: 'Cada ficha indica si la mascota se retira en el lugar, se lleva a tu casa o ambas.',
  },
]

export function HomePage() {
  const { data: pets, isPending, isError, refetch } = usePets({ status: 'disponible' })
  const stagger = useStagger(0.08)
  const fadeUp = useFadeUp()
  const cityCount = new Set(pets?.map((p) => p.city)).size

  return (
    <>
      <section className="contenedor grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
        <motion.div variants={stagger} initial="hidden" animate="show">
          <motion.h1
            variants={fadeUp}
            className="display text-6xl text-balance sm:text-7xl lg:text-8xl"
          >
            Alguien te está esperando
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-xl text-lg text-pretty text-tinta-suave md:text-xl"
          >
            Perros, gatos, conejos y más buscan casa. Revisa su ficha, mira dónde están y coordina
            el retiro o la entrega directamente con quien los cuida.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
            <Link to="/mascotas" className={buttonClasses('primario', 'lg')}>
              Ver mascotas
            </Link>
            <Link to="/ingresar" className={buttonClasses('secundario', 'lg')}>
              Crear cuenta
            </Link>
          </motion.div>
          <motion.p variants={fadeUp} className="mt-6 min-h-6 text-tinta-suave">
            {pets &&
              `Hoy ${pets.length === 1 ? 'hay 1 mascota disponible' : `hay ${pets.length} mascotas disponibles`} en ${cityCount === 1 ? '1 ciudad' : `${cityCount} ciudades`}.`}
          </motion.p>
        </motion.div>

        <div className="pt-4 lg:pt-0">
          {pets ? (
            <HangingTags pets={pets} />
          ) : (
            <div className="flex justify-center gap-5 pt-16" aria-hidden>
              {[0, 1, 2].map((i) => (
                <Skeleton key={i} className="h-64 w-[31%] max-w-[13.5rem] rounded-placa" />
              ))}
            </div>
          )}
        </div>
      </section>

      <section aria-labelledby="como-funciona" className="contenedor mt-24 md:mt-32">
        <h2 id="como-funciona" className="titulo text-4xl md:text-5xl">
          Cómo funciona
        </h2>
        <ol className="mt-10 grid gap-8 md:grid-cols-3 md:gap-6">
          {steps.map((step, i) => (
            <li key={step.title} className="flex gap-4 md:flex-col">
              <span
                aria-hidden
                className="display grid size-14 shrink-0 place-items-center rounded-full bg-pistacho text-3xl text-pistacho-hondo"
              >
                {i + 1}
              </span>
              <div>
                <h3 className="titulo text-xl">{step.title}</h3>
                <p className="mt-2 max-w-sm text-tinta-suave">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="recien-llegados" className="contenedor mt-24 md:mt-32">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <h2 id="recien-llegados" className="titulo text-4xl md:text-5xl">
            Recién llegados
          </h2>
          <Link to="/mascotas" className={buttonClasses('fantasma', 'md')}>
            Ver todas las mascotas
          </Link>
        </div>
        <PetGrid
          pets={pets?.slice(3, 9)}
          isPending={isPending}
          isError={isError}
          onRetry={() => refetch()}
        />
      </section>
    </>
  )
}
