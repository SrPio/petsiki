import type { RouteObject } from 'react-router'
import { AdminPage } from '@/features/admin/AdminPage'
import { AccountPage } from '@/features/auth/AccountPage'
import { RedirectIfAuthenticated, RequireAdmin, RequireAuth } from '@/features/auth/guards'
import { LoginPage } from '@/features/auth/LoginPage'
import { RegisterPage } from '@/features/auth/RegisterPage'
import { FavoritesPage } from '@/features/favorites/FavoritesPage'
import { HomePage } from '@/features/home/HomePage'
import { PetDetailPage } from '@/features/pets/PetDetailPage'
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
      { path: 'mascotas/:id', element: <PetDetailPage /> },
      {
        path: 'ingresar',
        element: (
          <RedirectIfAuthenticated>
            <LoginPage />
          </RedirectIfAuthenticated>
        ),
      },
      {
        path: 'registro',
        element: (
          <RedirectIfAuthenticated>
            <RegisterPage />
          </RedirectIfAuthenticated>
        ),
      },
      {
        path: 'cuenta',
        element: (
          <RequireAuth>
            <AccountPage />
          </RequireAuth>
        ),
      },
      {
        path: 'favoritos',
        element: (
          <RequireAuth>
            <FavoritesPage />
          </RequireAuth>
        ),
      },
      {
        path: 'admin',
        element: (
          <RequireAdmin>
            <AdminPage />
          </RequireAdmin>
        ),
      },
      ...devRoutes,
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]
