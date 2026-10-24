import { lazy, Suspense, type ComponentProps } from 'react'
import { Skeleton } from '@/components/ui/Skeleton'
import { cn } from '@/lib/cn'

const PetMap = lazy(() => import('./PetMap'))

/** Carga Leaflet solo cuando se muestra un mapa. */
export function LazyPetMap(props: ComponentProps<typeof PetMap>) {
  return (
    <Suspense fallback={<Skeleton className={cn('rounded-placa', props.className)} />}>
      <PetMap {...props} />
    </Suspense>
  )
}
