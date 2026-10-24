import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { Card } from '@/components/ui/Card'
import { useFadeUp, useStagger } from '@/lib/motion'

type AuthLayoutProps = {
  title: string
  lead: string
  children: ReactNode
  aside?: ReactNode
  footer?: ReactNode
}

export function AuthLayout({ title, lead, children, aside, footer }: AuthLayoutProps) {
  const stagger = useStagger(0.08)
  const fadeUp = useFadeUp()

  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="show"
      className="contenedor grid gap-10 lg:grid-cols-[1fr_28rem] lg:items-start lg:gap-16"
    >
      <motion.div variants={fadeUp} className="max-w-xl lg:pt-6">
        <h1 className="display text-6xl text-balance md:text-7xl">{title}</h1>
        <p className="mt-4 text-lg text-tinta-suave md:text-xl">{lead}</p>
        {aside && <div className="mt-8 hidden lg:block">{aside}</div>}
      </motion.div>

      <motion.div variants={fadeUp} className="flex flex-col gap-5">
        <Card placa className="p-6 md:p-8">
          {children}
        </Card>
        {footer && <div className="text-center text-tinta-suave">{footer}</div>}
        {aside && <div className="lg:hidden">{aside}</div>}
      </motion.div>
    </motion.div>
  )
}
