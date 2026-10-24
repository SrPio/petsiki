import { AnimatePresence, motion } from 'motion/react'

/** Error general de un formulario (no asociado a un campo). */
export function FormError({ message }: { message: string | null }) {
  return (
    <AnimatePresence initial={false}>
      {message && (
        <motion.p
          role="alert"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="rounded-2xl bg-[#fde8e6] px-4 py-3 text-sm font-medium text-[#912018]"
        >
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  )
}
