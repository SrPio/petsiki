import { useLocation, useNavigate } from 'react-router'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Heart } from 'lucide-react'
import { useToast } from '@/components/ui/toast-context'
import { useAuth } from '@/features/auth/auth-context'
import { cn } from '@/lib/cn'
import { springPop } from '@/lib/motion'
import { useFavoriteIds, useToggleFavorite } from './queries'

type FavoriteButtonProps = {
  petId: string
  petName: string
  size?: 'md' | 'lg'
  className?: string
}

export function FavoriteButton({ petId, petName, size = 'md', className }: FavoriteButtonProps) {
  const { user } = useAuth()
  const { data: ids } = useFavoriteIds()
  const toggle = useToggleFavorite()
  const navigate = useNavigate()
  const location = useLocation()
  const toast = useToast()
  const reduced = useReducedMotion()
  const active = Boolean(ids?.includes(petId))

  function onClick() {
    if (!user) {
      navigate(`/ingresar?volver=${encodeURIComponent(location.pathname + location.search)}`)
      return
    }
    toggle.mutate(
      { petId, favorite: !active },
      {
        onSuccess: () =>
          toast.show(
            active ? `Quitaste a ${petName} de favoritos` : `${petName} se guardó en tus favoritos`,
          ),
        onError: () => toast.show('No se pudo guardar. Inténtalo otra vez.', 'error'),
      },
    )
  }

  const label = !user
    ? `Ingresa para guardar a ${petName}`
    : active
      ? `Quitar a ${petName} de favoritos`
      : `Guardar a ${petName} en favoritos`

  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-pressed={user ? active : undefined}
      aria-label={label}
      title={label}
      whileTap={reduced ? undefined : { scale: 0.88 }}
      className={cn(
        'relative grid place-items-center rounded-full bg-white/95 shadow-suave ring-1 ring-linea/70 backdrop-blur transition-colors hover:bg-white',
        size === 'lg' ? 'size-14' : 'size-11',
        className,
      )}
    >
      {/* Onda que confirma el guardado */}
      <AnimatePresence>
        {active && !reduced && (
          <motion.span
            key="onda"
            aria-hidden
            initial={{ scale: 0.6, opacity: 0.6 }}
            animate={{ scale: 1.7, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="absolute inset-0 rounded-full bg-durazno"
          />
        )}
      </AnimatePresence>
      <motion.span
        key={active ? 'on' : 'off'}
        initial={reduced ? false : { scale: active ? 0.4 : 1 }}
        animate={{ scale: 1 }}
        transition={springPop}
        className="relative"
      >
        <Heart
          aria-hidden
          className={cn(
            size === 'lg' ? 'size-7' : 'size-5',
            'transition-colors duration-200',
            active ? 'fill-[#e8590c] text-[#e8590c]' : 'text-tinta',
          )}
          strokeWidth={2.2}
        />
      </motion.span>
    </motion.button>
  )
}
