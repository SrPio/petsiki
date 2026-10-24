import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from '@/App'

describe('App', () => {
  it('renderiza la marca PETSIKI', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: 'PETSIKI' })).toBeInTheDocument()
  })
})
