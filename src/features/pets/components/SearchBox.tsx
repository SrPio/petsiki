import { useEffect, useState } from 'react'
import { Search, X } from 'lucide-react'
import { useDebouncedValue } from '@/lib/useDebouncedValue'

type SearchBoxProps = {
  value: string | undefined
  onChange: (value: string | undefined) => void
}

const clean = (text: string) => text.trim() || undefined

/** Búsqueda con debounce: escribe en la URL 300 ms después de dejar de tipear. */
export function SearchBox({ value, onChange }: SearchBoxProps) {
  const [text, setText] = useState(value ?? '')
  const [prevValue, setPrevValue] = useState(value)

  // Si la URL cambia desde afuera (ej. "Limpiar filtros"), actualiza el input.
  if (value !== prevValue) {
    setPrevValue(value)
    if (clean(text) !== value) setText(value ?? '')
  }

  const debounced = useDebouncedValue(text, 300)

  useEffect(() => {
    // Solo cuando el texto ya se estabilizó, para no revivir una búsqueda recién borrada.
    if (debounced !== text) return
    const next = clean(debounced)
    if (next !== value) onChange(next)
  }, [debounced, text, value, onChange])

  return (
    <div className="relative">
      <label htmlFor="buscar-mascotas" className="sr-only">
        Buscar por nombre, raza o ciudad
      </label>
      <Search
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-tinta-suave"
      />
      <input
        id="buscar-mascotas"
        type="search"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Buscar por nombre, raza o ciudad"
        className="h-13 w-full rounded-full border border-linea bg-white pr-12 pl-12 text-base text-tinta shadow-suave transition-[border-color,box-shadow] placeholder:text-tinta-suave/80 hover:border-ciruela/40 focus:border-ciruela focus:ring-4 focus:ring-ciruela/15 focus:outline-none [&::-webkit-search-cancel-button]:hidden"
      />
      {text && (
        <button
          type="button"
          aria-label="Borrar búsqueda"
          onClick={() => setText('')}
          className="absolute top-1/2 right-2 grid size-9 -translate-y-1/2 place-items-center rounded-full text-tinta-suave hover:bg-nube hover:text-tinta"
        >
          <X className="size-4" />
        </button>
      )}
    </div>
  )
}
