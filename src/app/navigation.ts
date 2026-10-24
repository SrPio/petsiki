import { Heart, House, PawPrint, UserRound, type LucideIcon } from 'lucide-react'

export type NavItem = { to: string; label: string; icon: LucideIcon; end?: boolean }

export const mainNav: NavItem[] = [
  { to: '/', label: 'Inicio', icon: House, end: true },
  { to: '/mascotas', label: 'Mascotas', icon: PawPrint },
  { to: '/favoritos', label: 'Favoritos', icon: Heart },
]

export const accountNav: NavItem = { to: '/ingresar', label: 'Cuenta', icon: UserRound }
