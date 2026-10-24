import { useLocation, useOutlet } from 'react-router'
import { AnimatePresence, motion } from 'motion/react'
import { usePageVariants } from '@/lib/motion'
import { BottomNav } from './BottomNav'
import { Header } from './Header'

export function RootLayout() {
  const location = useLocation()
  const outlet = useOutlet()
  const variants = usePageVariants()

  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#contenido"
        className="sr-only z-50 rounded-full bg-ciruela px-4 py-2 font-semibold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Saltar al contenido
      </a>
      <Header />
      <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo({ top: 0 })}>
        <motion.main
          id="contenido"
          key={location.pathname}
          variants={variants}
          initial="initial"
          animate="enter"
          exit="exit"
          className="flex-1 pt-8 pb-32 md:pt-14 md:pb-20"
        >
          {outlet}
        </motion.main>
      </AnimatePresence>
      <BottomNav />
    </div>
  )
}
