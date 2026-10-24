import { describe, expect, it } from 'vitest'
import { getFadeUp, getPageVariants, getStagger } from './motion'

describe('presets de movimiento', () => {
  it('usan desplazamiento vertical con movimiento normal', () => {
    expect(getPageVariants(false).initial).toMatchObject({ opacity: 0, y: 12 })
    expect(getFadeUp(false).hidden).toMatchObject({ opacity: 0, y: 16 })
  })

  it('eliminan desplazamientos y escalonado con movimiento reducido', () => {
    const page = getPageVariants(true)
    for (const key of ['initial', 'enter', 'exit'] as const) {
      expect(page[key]).not.toHaveProperty('y')
    }
    expect(getFadeUp(true).hidden).not.toHaveProperty('y')
    expect(getStagger(true).show).toMatchObject({ transition: { staggerChildren: 0 } })
  })
})
