import type { ComponentProps } from 'react'
import { cn } from '@/lib/cn'

type CardProps = ComponentProps<'div'> & {
  /** Muestra el agujero perforado de la placa del collar. */
  placa?: boolean
}

/** Superficie base. Con `placa` toma la forma de la placa de un collar. */
export function Card({ placa = false, className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'relative rounded-placa bg-white shadow-suave ring-1 ring-linea/70',
        placa && 'pt-9',
        className,
      )}
      {...props}
    >
      {placa && <PlacaHole />}
      {children}
    </div>
  )
}

export function PlacaHole({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        'absolute top-3.5 left-1/2 size-3.5 -translate-x-1/2 rounded-full bg-nube',
        'shadow-[inset_0_1.5px_2px_rgb(31_39_66/0.25)] ring-2 ring-linea',
        className,
      )}
    />
  )
}
