import { screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { renderApp } from '@/test/render'

describe('Layout y navegación', () => {
  it('muestra la home con el logo y la navegación principal', async () => {
    renderApp('/')
    expect(
      await screen.findByRole('heading', { level: 1, name: 'Alguien te está esperando' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Petsiki, inicio' })).toBeInTheDocument()
    expect(screen.getByRole('navigation', { name: 'Principal' })).toBeInTheDocument()
    expect(screen.getByRole('navigation', { name: 'Principal móvil' })).toBeInTheDocument()
  })

  it('navega a Mascotas y marca el link como activo', async () => {
    const { user, router } = renderApp('/')
    const nav = screen.getByRole('navigation', { name: 'Principal' })
    await user.click(within(nav).getByRole('link', { name: 'Mascotas' }))

    expect(
      await screen.findByRole('heading', { level: 1, name: 'Mascotas en adopción' }),
    ).toBeInTheDocument()
    expect(router.state.location.pathname).toBe('/mascotas')
    expect(within(nav).getByRole('link', { name: 'Mascotas' })).toHaveAttribute(
      'aria-current',
      'page',
    )
  })

  it('muestra la página 404 en rutas desconocidas', async () => {
    renderApp('/no-existe')
    expect(
      await screen.findByRole('heading', { level: 1, name: 'Esta página no existe' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Volver al inicio' })).toHaveAttribute('href', '/')
  })

  it('carga la guía de estilo en desarrollo', async () => {
    renderApp('/styleguide')
    expect(
      await screen.findByRole('heading', { level: 1, name: 'Guía de estilo' }),
    ).toBeInTheDocument()
  })
})
