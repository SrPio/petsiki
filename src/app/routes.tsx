import type { RouteObject } from 'react-router'
import { AdminPage } from '@/features/admin/AdminPage'
import { LoginPage } from '@/features/auth/LoginPage'
import { FavoritesPage } from '@/features/favorites/FavoritesPage'
import { HomePage } from '@/features/home/HomePage'
import { PetsPage } from '@/features/pets/PetsPage'
import { RootLayout } from './layout/RootLayout'
import { NotFoundPage } from './NotFoundPage'

const devRoutes: RouteObject[] = import.meta.env.DEV
  ? [
      {
        path: 'styleguide',
        lazy: async () => ({ Component: (await import('./StyleguidePage')).StyleguidePage }),
      },
    ]
  : []

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'mascotas', element: <PetsPage /> },
      { path: 'favoritos', element: <FavoritesPage /> },
      { path: 'ingresar', element: <LoginPage /> },
      { path: 'admin', element: <AdminPage /> },
      ...devRoutes,
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]
