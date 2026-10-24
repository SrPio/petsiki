import { Link, NavLink } from 'react-router'
import { motion } from 'motion/react'
import { Logo } from '@/components/Logo'
import { buttonClasses } from '@/components/ui/button-styles'
import { cn } from '@/lib/cn'
import { springSuave } from '@/lib/motion'
import { mainNav } from '../navigation'

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-linea/60 bg-nube/85 backdrop-blur-md">
      <div className="contenedor flex h-16 items-center justify-between gap-6 md:h-20">
        <Link to="/" aria-label="Petsiki, inicio" className="rounded-full">
          <Logo />
        </Link>

        <nav aria-label="Principal" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    cn(
                      'relative block rounded-full px-4 py-2 font-semibold transition-colors',
                      isActive ? 'text-ciruela-honda' : 'text-tinta-suave hover:text-tinta',
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <motion.span
                          layoutId="nav-activo-escritorio"
                          transition={springSuave}
                          className="absolute inset-0 rounded-full bg-lavanda"
                        />
                      )}
                      <span className="relative">{item.label}</span>
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <Link
          to="/ingresar"
          className={cn(buttonClasses('primario', 'sm'), 'hidden md:inline-flex')}
        >
          Ingresar
        </Link>
      </div>
    </header>
  )
}
