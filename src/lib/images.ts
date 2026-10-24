/** Pide a Unsplash el ancho justo. Otras URLs (o data URLs) se devuelven tal cual. */
export function photoUrl(url: string, width: number) {
  if (!url.startsWith('https://images.unsplash.com/')) return url
  const u = new URL(url)
  u.searchParams.set('w', String(width))
  u.searchParams.set('auto', 'format')
  u.searchParams.set('fit', 'crop')
  return u.toString()
}
