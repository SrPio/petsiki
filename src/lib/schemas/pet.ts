import { z } from 'zod'

export const SPECIES = ['perro', 'gato', 'conejo', 'ave', 'otro'] as const
export const SEXES = ['macho', 'hembra'] as const
export const SIZES = ['pequeno', 'mediano', 'grande'] as const
export const STATUSES = ['disponible', 'en_proceso', 'adoptado'] as const
export const LOGISTICS_MODES = ['retiro', 'entrega', 'ambos'] as const
export const CONTACT_METHODS = ['whatsapp', 'telefono', 'email'] as const

const phone = z
  .string()
  .trim()
  .regex(/^\+?[0-9\s-]{8,16}$/, 'Escribe un teléfono válido, ej. +56 9 1234 5678')

export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Escribe el nombre de la persona responsable'),
  phone: phone.or(z.literal('')),
  whatsapp: phone.or(z.literal('')),
  email: z.email('Escribe un email válido, ej. nombre@correo.cl').or(z.literal('')),
  preferred: z.enum(CONTACT_METHODS),
  availability: z.string().trim().max(120),
})

export const logisticsSchema = z.object({
  mode: z.enum(LOGISTICS_MODES),
  notes: z.string().trim().max(400),
})

/** Datos que el admin ingresa al crear o editar una mascota. */
export const petInputSchema = z.object({
  name: z.string().trim().min(2, 'El nombre debe tener al menos 2 letras').max(40),
  species: z.enum(SPECIES),
  breed: z.string().trim().max(60),
  ageMonths: z.number().int().min(0, 'La edad no puede ser negativa').max(360),
  sex: z.enum(SEXES),
  size: z.enum(SIZES),
  description: z.string().trim().min(20, 'Cuenta un poco más, al menos 20 caracteres').max(1200),
  photos: z.array(z.string().min(1)).min(1, 'Agrega al menos una foto').max(6),
  vaccinated: z.boolean(),
  sterilized: z.boolean(),
  status: z.enum(STATUSES),
  region: z.string().trim().min(2, 'Elige una región'),
  city: z.string().trim().min(2, 'Escribe la ciudad o comuna'),
  addressHint: z.string().trim().max(120),
  lat: z.number().min(-90).max(90),
  lng: z.number().min(-180).max(180),
  contact: contactSchema,
  logistics: logisticsSchema,
})

export const petSchema = petInputSchema.extend({
  id: z.string().min(1),
  createdBy: z.string().nullable(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
})

export type Species = (typeof SPECIES)[number]
export type Sex = (typeof SEXES)[number]
export type Size = (typeof SIZES)[number]
export type PetStatus = (typeof STATUSES)[number]
export type LogisticsMode = (typeof LOGISTICS_MODES)[number]
export type ContactMethod = (typeof CONTACT_METHODS)[number]
export type PetInput = z.infer<typeof petInputSchema>
export type Pet = z.infer<typeof petSchema>

export type PetFilters = {
  q?: string
  species?: Species
  region?: string
  city?: string
  size?: Size
  sex?: Sex
  status?: PetStatus
}
