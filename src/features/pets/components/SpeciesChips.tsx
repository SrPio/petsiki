import { motion } from 'motion/react'
import { Bird, Cat, Dog, PawPrint, Rabbit, Sparkles, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/cn'
import { springSuave } from '@/lib/motion'
import { SPECIES, type Species } from '@/lib/schemas/pet'
import { speciesLabel } from '../labels'

const icons: Record<Species | 'todos', LucideIcon> = {
  todos: PawPrint,
  perro: Dog,
  gato: Cat,
  conejo: Rabbit,
  ave: Bird,
  otro: Sparkles,
}

const plural: Record<Species, string> = {
  perro: 'Perros',
  gato: 'Gatos',
  conejo: 'Conejos',
  ave: 'Aves',
  otro: 'Otros',
}

type SpeciesChipsProps = {
  value: Species | undefined
  onChange: (value: Species | undefined) => void
}

export function SpeciesChips({ value, onChange }: SpeciesChipsProps) {
  const options: Array<{ key: Species | 'todos'; label: string }> = [
    { key: 'todos', label: 'Todos' },
    ...SPECIES.map((s) => ({ key: s, label: plural[s] })),
  ]

  return (
    <div
      role="group"
      aria-label="Tipo de mascota"
      className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] md:mx-0 md:flex-wrap md:px-0"
    >
      {options.map(({ key, label }) => {
        const active = key === 'todos' ? !value : value === key
        const Icon = icons[key]
        return (
          <button
            key={key}
            type="button"
            aria-pressed={active}
            title={key === 'todos' ? 'Todos los tipos' : speciesLabel[key]}
            onClick={() => onChange(key === 'todos' ? undefined : key)}
            className={cn(
              'relative flex h-11 shrink-0 items-center gap-2 rounded-full px-4 font-semibold transition-colors',
              active
                ? 'text-white'
                : 'bg-white text-tinta-suave ring-1 ring-linea hover:text-tinta hover:ring-ciruela/40',
            )}
          >
            {active && (
              <motion.span
                layoutId="chip-especie"
                transition={springSuave}
                className="absolute inset-0 rounded-full bg-ciruela shadow-suave"
              />
            )}
            <Icon aria-hidden className="relative size-[18px]" strokeWidth={2.2} />
            <span className="relative">{label}</span>
          </button>
        )
      })}
    </div>
  )
}
