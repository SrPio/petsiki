import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { ReactElement } from 'react'
import { createMemoryRouter, RouterProvider } from 'react-router'
import { Providers } from '@/app/Providers'
import { routes } from '@/app/routes'

/** Renderiza la app completa en una ruta dada. */
export function renderApp(path = '/') {
  const router = createMemoryRouter(routes, { initialEntries: [path] })
  return {
    user: userEvent.setup(),
    router,
    ...render(
      <Providers>
        <RouterProvider router={router} />
      </Providers>,
    ),
  }
}

/** Renderiza un componente suelto con los providers globales. */
export function renderWithProviders(ui: ReactElement) {
  return { user: userEvent.setup(), ...render(<Providers>{ui}</Providers>) }
}
