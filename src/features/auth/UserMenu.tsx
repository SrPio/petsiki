import { useEffect, useId, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { AnimatePresence, motion } from 'motion/react'
import { ChevronDown, Heart, LayoutDashboard, LogOut } from 'lucide-react'
import { useToast } from '@/components/ui/toast-context'
import { springSuave } from '@/lib/motion'
import type { AuthUser } from '@/lib/schemas/auth'
import { useAuth } from './auth-context'

export function Avatar({ user, size = 'md' }: { user: AuthUser; size?: 'md' | 'lg' }) {
  return (
    <span
      aria-hidden
      className={
        size === 'lg'
          ? 'display grid size-16 place-items-center rounded-full bg-pistacho text-3xl text-pistacho-hondo'
          : 'display grid size-9 place-items-center rounded-full bg-pistacho text-lg text-pistacho-hondo'
      }
    >
      {user.fullName.trim().charAt(0).toUpperCase()}
    </span>
  )
}

export function UserMenu({ user }: { user: AuthUser }) {
  const { isAdmin, signOut } = useAuth()
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const menuId = useId()
  const navigate = useNavigate()
  const toast = useToast()

  useEffect(() => {
    if (!open) return
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('pointerdown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  async function handleSignOut() {
    setOpen(false)
    await signOut()
    toast.show('Cerraste sesión')
    navigate('/')
  }

  const itemClass =
    'flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left font-semibold text-tinta transition-colors hover:bg-nube'

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={`Menú de ${user.fullName}`}
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-full bg-white py-1 pr-3 pl-1 shadow-suave ring-1 ring-linea transition hover:ring-ciruela/40"
      >
        <Avatar user={user} />
        <span className="max-w-32 truncate font-semibold">{user.fullName.split(' ')[0]}</span>
        <ChevronDown
          aria-hidden
          className={`size-4 text-tinta-suave transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id={menuId}
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98, transition: { duration: 0.12 } }}
            transition={springSuave}
            style={{ transformOrigin: 'top right' }}
            className="absolute top-full right-0 mt-2 w-64 rounded-3xl bg-white p-2 shadow-alta ring-1 ring-linea/70"
          >
            <div className="px-3 pt-2 pb-3">
              <p className="truncate font-semibold">{user.fullName}</p>
              <p className="truncate text-sm text-tinta-suave">{user.email}</p>
              {isAdmin && (
                <p className="mt-2 inline-block rounded-full bg-lavanda px-2.5 py-0.5 text-xs font-semibold text-ciruela-honda">
                  Administrador
                </p>
              )}
            </div>
            <ul className="border-t border-linea pt-2">
              {isAdmin && (
                <li>
                  <Link to="/admin" className={itemClass} onClick={() => setOpen(false)}>
                    <LayoutDashboard aria-hidden className="size-5 text-ciruela" />
                    Panel de mascotas
                  </Link>
                </li>
              )}
              <li>
                <Link to="/favoritos" className={itemClass} onClick={() => setOpen(false)}>
                  <Heart aria-hidden className="size-5 text-ciruela" />
                  Mis favoritos
                </Link>
              </li>
              <li>
                <button type="button" className={itemClass} onClick={handleSignOut}>
                  <LogOut aria-hidden className="size-5 text-ciruela" />
                  Cerrar sesión
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
