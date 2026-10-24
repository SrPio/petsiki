import { NavLink } from 'react-router'
import { motion } from 'motion/react'
import { cn } from '@/lib/cn'
import { springSuave } from '@/lib/motion'
import { accountNav, mainNav } from '../navigation'

/** Navegación inferior, solo en móvil. */
export function BottomNav() {
  const items = [...mainNav, accountNav]

  return (
    <nav
      aria-label="Principal móvil"
      className="fixed inset-x-3 bottom-3 z-40 rounded-[1.75rem] bg-white/95 p-1.5 shadow-alta ring-1 ring-linea/70 backdrop-blur-md md:hidden"
      style={{ marginBottom: 'env(safe-area-inset-bottom)' }}
    >
      <ul className="grid grid-cols-4">
        {items.map(({ to, label, icon: Icon, end }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={end}
              className={({ isActive }) =>
                cn(
                  'relative flex flex-col items-center gap-0.5 rounded-[1.4rem] py-2 text-xs font-semibold transition-colors',
                  isActive ? 'text-ciruela-honda' : 'text-tinta-suave',
                )
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.span
                      layoutId="nav-activo-movil"
                      transition={springSuave}
                      className="absolute inset-0 rounded-[1.4rem] bg-lavanda"
                    />
                  )}
                  <Icon aria-hidden className="relative size-5" strokeWidth={2.2} />
                  <span className="relative">{label}</span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
