import { Link, useNavigate } from 'react-router'
import { Heart, LayoutDashboard, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { buttonClasses } from '@/components/ui/button-styles'
import { Card } from '@/components/ui/Card'
import { useToast } from '@/components/ui/toast-context'
import { cn } from '@/lib/cn'
import { useAuth } from './auth-context'
import { Avatar } from './UserMenu'

export function AccountPage() {
  const { user, isAdmin, signOut } = useAuth()
  const navigate = useNavigate()
  const toast = useToast()
  if (!user) return null

  return (
    <div className="contenedor max-w-xl">
      <h1 className="display text-6xl">Tu cuenta</h1>
      <Card placa className="mt-8 p-6">
        <div className="flex items-center gap-4">
          <Avatar user={user} size="lg" />
          <div className="min-w-0">
            <p className="titulo truncate text-2xl">{user.fullName}</p>
            <p className="truncate text-tinta-suave">{user.email}</p>
          </div>
        </div>
        {isAdmin && (
          <p className="mt-4 inline-block rounded-full bg-lavanda px-3 py-1 text-sm font-semibold text-ciruela-honda">
            Administrador
          </p>
        )}
      </Card>

      <div className="mt-6 flex flex-col gap-3">
        {isAdmin && (
          <Link to="/admin" className={cn(buttonClasses('primario', 'lg'), 'w-full')}>
            <LayoutDashboard aria-hidden className="size-5" />
            Panel de mascotas
          </Link>
        )}
        <Link
          to="/favoritos"
          className={cn(buttonClasses(isAdmin ? 'secundario' : 'primario', 'lg'), 'w-full')}
        >
          <Heart aria-hidden className="size-5" />
          Mis favoritos
        </Link>
        <Button
          variant="fantasma"
          size="lg"
          className="w-full"
          icon={<LogOut aria-hidden className="size-5" />}
          onClick={async () => {
            await signOut()
            toast.show('Cerraste sesión')
            navigate('/')
          }}
        >
          Cerrar sesión
        </Button>
      </div>
    </div>
  )
}
