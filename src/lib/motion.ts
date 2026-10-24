import { useReducedMotion, type Transition, type Variants } from 'motion/react'

/** Spring por defecto: suave, sin rebote visible. */
export const springSuave: Transition = { type: 'spring', stiffness: 260, damping: 30, mass: 0.9 }

/** Spring con algo de rebote, solo para confirmar acciones (ej. marcar favorito). */
export const springPop: Transition = { type: 'spring', stiffness: 520, damping: 16 }

const easeSuave = [0.22, 1, 0.36, 1] as const

/** Variantes de transición de página. Sin desplazamiento si el usuario pidió menos movimiento. */
export function getPageVariants(reduced: boolean): Variants {
  if (reduced) {
    return {
      initial: { opacity: 0 },
      enter: { opacity: 1, transition: { duration: 0.15 } },
      exit: { opacity: 0, transition: { duration: 0.1 } },
    }
  }
  return {
    initial: { opacity: 0, y: 12 },
    enter: { opacity: 1, y: 0, transition: { duration: 0.45, ease: easeSuave } },
    exit: { opacity: 0, y: -8, transition: { duration: 0.2, ease: 'easeIn' } },
  }
}

/** Entrada de un elemento dentro de una lista escalonada. */
export function getFadeUp(reduced: boolean): Variants {
  return reduced
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.15 } } }
    : { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: springSuave } }
}

/** Tarjetas de una grilla: entran escalonadas según su índice (`custom`). */
export function getCardVariants(reduced: boolean): Variants {
  if (reduced) {
    return {
      hidden: { opacity: 0 },
      show: { opacity: 1, transition: { duration: 0.15 } },
      exit: { opacity: 0, transition: { duration: 0.1 } },
    }
  }
  return {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    show: (i: number = 0) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { ...springSuave, delay: Math.min(i, 8) * 0.05 },
    }),
    exit: { opacity: 0, scale: 0.96, transition: { duration: 0.18 } },
  }
}

export function useCardVariants() {
  return getCardVariants(useReducedMotion() ?? false)
}

/** Contenedor que escalona la entrada de sus hijos. */
export function getStagger(reduced: boolean, delay = 0.06): Variants {
  return { hidden: {}, show: { transition: { staggerChildren: reduced ? 0 : delay } } }
}

export function usePageVariants() {
  return getPageVariants(useReducedMotion() ?? false)
}

export function useFadeUp() {
  return getFadeUp(useReducedMotion() ?? false)
}

export function useStagger(delay?: number) {
  return getStagger(useReducedMotion() ?? false, delay)
}
