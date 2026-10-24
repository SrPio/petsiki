import { z } from 'zod'

export const ROLES = ['user', 'admin'] as const
export type Role = (typeof ROLES)[number]

export type AuthUser = {
  id: string
  email: string
  fullName: string
  role: Role
}

const email = z.email('Escribe un email válido, ej. nombre@correo.cl').trim().toLowerCase()

export const signInSchema = z.object({
  email,
  password: z.string().min(1, 'Escribe tu contraseña'),
})

export const signUpSchema = z
  .object({
    fullName: z.string().trim().min(2, 'Escribe tu nombre').max(60),
    email,
    password: z.string().min(8, 'Usa al menos 8 caracteres'),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Las contraseñas no coinciden',
  })

export type SignInInput = z.infer<typeof signInSchema>
export type SignUpInput = z.infer<typeof signUpSchema>
