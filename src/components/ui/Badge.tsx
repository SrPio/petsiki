import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

type Tone = 'pistacho' | 'lavanda' | 'durazno' | 'neutro'

const tones: Record<Tone, string> = {
  pistacho: 'bg-pistacho text-pistacho-hondo',
  lavanda: 'bg-lavanda text-ciruela-honda',
  durazno: 'bg-durazno text-durazno-hondo',
  neutro: 'bg-white text-tinta-suave ring-1 ring-linea',
}

export function Badge({
  tone = 'neutro',
  icon,
  children,
  className,
}: {
  tone?: Tone
  icon?: ReactNode
  children: ReactNode
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm leading-none font-semibold',
        tones[tone],
        className,
      )}
    >
      {icon}
      {children}
    </span>
  )
}
