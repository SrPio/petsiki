import { useCallback, useMemo, useRef, useState, type ReactNode } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { CircleAlert, CircleCheck, X } from 'lucide-react'
import { springSuave } from '@/lib/motion'
import { ToastContext, type ToastTone } from './toast-context'

type Toast = { id: number; message: string; tone: ToastTone }

const DURATION_MS = 3500

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])
  const nextId = useRef(1)
  const reduced = useReducedMotion()

  const dismiss = useCallback((id: number) => {
    setToasts((list) => list.filter((t) => t.id !== id))
  }, [])

  const show = useCallback(
    (message: string, tone: ToastTone = 'exito') => {
      const id = nextId.current++
      setToasts((list) => [...list, { id, message, tone }])
      window.setTimeout(() => dismiss(id), DURATION_MS)
    },
    [dismiss],
  )

  const api = useMemo(() => ({ show }), [show])

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div
        aria-live="polite"
        className="pointer-events-none fixed inset-x-0 bottom-24 z-[60] flex flex-col items-center gap-2 px-4 md:top-6 md:right-6 md:bottom-auto md:left-auto md:items-end"
      >
        <AnimatePresence initial={false}>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              layout={!reduced}
              role="status"
              initial={{ opacity: 0, y: reduced ? 0 : 16, scale: reduced ? 1 : 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: reduced ? 1 : 0.96, transition: { duration: 0.15 } }}
              transition={springSuave}
              className="pointer-events-auto flex w-full max-w-sm items-center gap-3 rounded-2xl bg-tinta py-3 pr-2 pl-4 text-white shadow-alta"
            >
              {t.tone === 'exito' ? (
                <CircleCheck aria-hidden className="size-5 shrink-0 text-pistacho" />
              ) : (
                <CircleAlert aria-hidden className="size-5 shrink-0 text-durazno" />
              )}
              <p className="flex-1 text-sm font-medium">{t.message}</p>
              <button
                type="button"
                aria-label="Cerrar aviso"
                onClick={() => dismiss(t.id)}
                className="grid size-8 place-items-center rounded-full text-white/70 hover:bg-white/10 hover:text-white"
              >
                <X className="size-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}
