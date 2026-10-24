import { Heart, House, LayoutDashboard, PawPrint, UserRound, type LucideIcon } from 'lucide-react'

export type NavItem = { to: string; label: string; icon: LucideIcon; end?: boolean }

export const mainNav: NavItem[] = [
  { to: '/', label: 'Inicio', icon: House, end: true },
  { to: '/mascotas', label: 'Mascotas', icon: PawPrint },
  { to: '/favoritos', label: 'Favoritos', icon: Heart },
]

export const adminNav: NavItem = { to: '/admin', label: 'Panel', icon: LayoutDashboard }

export function accountNav(signedIn: boolean): NavItem {
  return signedIn
    ? { to: '/cuenta', label: 'Cuenta', icon: UserRound }
    : { to: '/ingresar', label: 'Ingresar', icon: UserRound }
}
