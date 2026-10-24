import type { ReactNode } from 'react'

export function PageIntro({
  title,
  lead,
  children,
}: {
  title: string
  lead?: string
  children?: ReactNode
}) {
  return (
    <div className="max-w-2xl">
      <h1 className="display text-5xl text-balance md:text-7xl">{title}</h1>
      {lead && <p className="mt-4 text-lg text-pretty text-tinta-suave md:text-xl">{lead}</p>}
      {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
    </div>
  )
}
