import { Link, useLocation, useNavigate, useParams } from 'react-router'
import { motion } from 'motion/react'
import { ArrowLeft, Check, MapPin, X } from 'lucide-react'
import { LazyPetMap } from '@/components/map/LazyPetMap'
import { PageIntro } from '@/components/PageIntro'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { buttonClasses } from '@/components/ui/button-styles'
import { Skeleton } from '@/components/ui/Skeleton'
import { useFadeUp, useStagger } from '@/lib/motion'
import type { Pet } from '@/lib/schemas/pet'
import { ContactCard } from './components/ContactCard'
import { PetGallery } from './components/PetGallery'
import { formatAge, sexLabel, sizeLabel, speciesLabel, statusLabel } from './labels'
import { usePet } from './queries'

export function PetDetailPage() {
  const { id } = useParams()
  const { data: pet, isPending, isError, refetch } = usePet(id)

  if (isPending) return <DetailSkeleton />
  if (isError)
    return (
      <div className="contenedor">
        <PageIntro
          title="No pudimos cargar esta mascota"
          lead="Revisa tu conexión e inténtalo otra vez."
        >
          <Button onClick={() => refetch()}>Reintentar</Button>
        </PageIntro>
      </div>
    )
  if (!pet)
    return (
      <div className="contenedor">
        <PageIntro
          title="Esta mascota ya no está publicada"
          lead="Puede que ya haya encontrado casa o que el enlace esté mal escrito."
        >
          <Link to="/mascotas" className={buttonClasses('primario', 'lg')}>
            Ver otras mascotas
          </Link>
        </PageIntro>
      </div>
    )

  return <PetDetail pet={pet} />
}

function PetDetail({ pet }: { pet: Pet }) {
  const stagger = useStagger(0.07)
  const fadeUp = useFadeUp()
  // TODO(Task 6): mostrar el contacto cuando haya sesión.
  const locked = true

  return (
    <article className="contenedor">
      <BackLink />
      <div className="mt-5 grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <PetGallery photos={pet.photos} name={pet.name} />
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-8"
        >
          <motion.header variants={fadeUp}>
            <div className="flex flex-wrap gap-2">
              <Badge
                tone={
                  pet.status === 'disponible'
                    ? 'pistacho'
                    : pet.status === 'en_proceso'
                      ? 'durazno'
                      : 'neutro'
                }
              >
                {statusLabel[pet.status]}
              </Badge>
              <Badge tone="lavanda">{speciesLabel[pet.species]}</Badge>
            </div>
            <h1 className="display mt-4 text-7xl md:text-8xl">{pet.name}</h1>
            <p className="mt-3 text-lg text-tinta-suave">
              {[
                pet.breed,
                sexLabel[pet.sex],
                formatAge(pet.ageMonths),
                `tamaño ${sizeLabel[pet.size].toLowerCase()}`,
              ]
                .filter(Boolean)
                .join(', ')}
            </p>
            <p className="mt-3 flex items-center gap-1.5 font-semibold">
              <MapPin aria-hidden className="size-5 text-ciruela" />
              {pet.city}, {pet.region}
            </p>
          </motion.header>

          <motion.section variants={fadeUp} aria-labelledby="sobre">
            <h2 id="sobre" className="titulo text-2xl">
              Sobre {pet.name}
            </h2>
            <p className="mt-3 max-w-[65ch] text-lg text-pretty">{pet.description}</p>
            <ul className="mt-5 flex flex-wrap gap-3">
              <HealthItem
                ok={pet.vaccinated}
                label={pet.vaccinated ? 'Vacunas al día' : 'Sin vacunas'}
              />
              <HealthItem
                ok={pet.sterilized}
                label={pet.sterilized ? 'Esterilizado' : 'Sin esterilizar'}
              />
            </ul>
          </motion.section>

          <motion.div variants={fadeUp}>
            <ContactCard pet={pet} locked={locked} />
          </motion.div>

          <motion.section variants={fadeUp} aria-labelledby="ubicacion">
            <h2 id="ubicacion" className="titulo text-2xl">
              Dónde está
            </h2>
            <p className="mt-2 text-tinta-suave">
              {pet.addressHint ? `${pet.addressHint}, ${pet.city}.` : `${pet.city}, ${pet.region}.`}{' '}
              El mapa muestra una zona aproximada; la dirección exacta se coordina por contacto.
            </p>
            <LazyPetMap
              lat={pet.lat}
              lng={pet.lng}
              label={`zona aproximada de ${pet.name} en ${pet.city}`}
              className="mt-4 h-72 overflow-hidden rounded-placa shadow-suave ring-1 ring-linea/70 md:h-80"
            />
          </motion.section>
        </motion.div>
      </div>
    </article>
  )
}

function HealthItem({ ok, label }: { ok: boolean; label: string }) {
  const Icon = ok ? Check : X
  return (
    <li className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 font-semibold ring-1 ring-linea">
      <span
        className={
          ok
            ? 'grid size-6 place-items-center rounded-full bg-pistacho text-pistacho-hondo'
            : 'grid size-6 place-items-center rounded-full bg-nube text-tinta-suave'
        }
      >
        <Icon aria-hidden className="size-4" strokeWidth={3} />
      </span>
      {label}
    </li>
  )
}

/** Vuelve atrás conservando los filtros del catálogo; si se entró directo, va al catálogo. */
function BackLink() {
  const navigate = useNavigate()
  const location = useLocation()
  const hasHistory = location.key !== 'default'

  return (
    <Link
      to="/mascotas"
      onClick={(e) => {
        if (hasHistory) {
          e.preventDefault()
          navigate(-1)
        }
      }}
      className="inline-flex items-center gap-1.5 rounded-full py-2 pr-3 font-semibold text-tinta-suave transition-colors hover:text-tinta"
    >
      <ArrowLeft aria-hidden className="size-5" />
      Volver a mascotas
    </Link>
  )
}

function DetailSkeleton() {
  return (
    <div className="contenedor" aria-busy="true" aria-label="Cargando mascota">
      <Skeleton className="h-6 w-40" />
      <div className="mt-5 grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
        <Skeleton className="aspect-[4/3] w-full rounded-placa md:aspect-[5/4]" />
        <div className="flex flex-col gap-4">
          <Skeleton className="h-7 w-48 rounded-full" />
          <Skeleton className="h-20 w-2/3" />
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="mt-6 h-40 w-full rounded-placa" />
        </div>
      </div>
    </div>
  )
}
