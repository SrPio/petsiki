import { useId, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'motion/react'

export type FieldRenderProps = {
  id: string
  'aria-invalid': boolean | undefined
  'aria-describedby': string | undefined
}

type FieldProps = {
  label: string
  hint?: string
  error?: string
  children: (props: FieldRenderProps) => ReactNode
}

/** Envoltorio común de label, ayuda y error para inputs y selects. */
export function Field({ label, hint, error, children }: FieldProps) {
  const id = useId()
  const hintId = hint ? `${id}-hint` : undefined
  const errorId = error ? `${id}-error` : undefined
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold text-tinta">
        {label}
      </label>
      {children({ id, 'aria-invalid': error ? true : undefined, 'aria-describedby': describedBy })}
      {hint && !error && (
        <p id={hintId} className="text-sm text-tinta-suave">
          {hint}
        </p>
      )}
      <AnimatePresence initial={false}>
        {error && (
          <motion.p
            id={errorId}
            role="alert"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="text-sm font-medium text-[#b42318]"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

export const fieldClasses =
  'h-12 w-full rounded-campo border border-linea bg-white px-4 text-base text-tinta ' +
  'placeholder:text-tinta-suave/70 transition-[border-color,box-shadow] duration-200 ' +
  'hover:border-ciruela/40 focus:border-ciruela focus:outline-none focus:ring-4 focus:ring-ciruela/15 ' +
  'aria-[invalid=true]:border-[#b42318] aria-[invalid=true]:focus:ring-[#b42318]/15 ' +
  'disabled:cursor-not-allowed disabled:bg-nube'
