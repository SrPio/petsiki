import type { ContactMethod, LogisticsMode, PetStatus, Sex, Size, Species } from '@/lib/schemas/pet'

export const speciesLabel: Record<Species, string> = {
  perro: 'Perro',
  gato: 'Gato',
  conejo: 'Conejo',
  ave: 'Ave',
  otro: 'Otro',
}

export const sexLabel: Record<Sex, string> = { macho: 'Macho', hembra: 'Hembra' }

export const sizeLabel: Record<Size, string> = {
  pequeno: 'Pequeño',
  mediano: 'Mediano',
  grande: 'Grande',
}

export const statusLabel: Record<PetStatus, string> = {
  disponible: 'Disponible',
  en_proceso: 'En proceso',
  adoptado: 'Adoptado',
}

export const logisticsLabel: Record<LogisticsMode, string> = {
  retiro: 'Retiro en el lugar',
  entrega: 'Entrega a domicilio',
  ambos: 'Retiro o entrega',
}

export const contactMethodLabel: Record<ContactMethod, string> = {
  whatsapp: 'WhatsApp',
  telefono: 'Teléfono',
  email: 'Email',
}

/** "8 meses", "1 año", "3 años". */
export function formatAge(months: number) {
  if (months < 12) return months === 1 ? '1 mes' : `${months} meses`
  const years = Math.floor(months / 12)
  return years === 1 ? '1 año' : `${years} años`
}

export const toOptions = <T extends string>(labels: Record<T, string>) =>
  (Object.entries(labels) as Array<[T, string]>).map(([value, label]) => ({ value, label }))
