import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate, useSearchParams } from 'react-router'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useToast } from '@/components/ui/toast-context'
import { AuthError } from '@/data/repositories/types'
import { signUpSchema, type SignUpInput } from '@/lib/schemas/auth'
import { safeRedirect, useAuth } from './auth-context'
import { AuthLayout } from './AuthLayout'
import { FormError } from '@/components/ui/FormError'

export function RegisterPage() {
  const { signUp } = useAuth()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const toast = useToast()
  const [formError, setFormError] = useState<string | null>(null)
  const redirectTo = safeRedirect(params.get('volver'))

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpInput>({ resolver: zodResolver(signUpSchema) })

  const onSubmit = handleSubmit(async ({ fullName, email, password }) => {
    setFormError(null)
    try {
      await signUp({ fullName, email, password })
      toast.show('Tu cuenta está lista')
      navigate(redirectTo, { replace: true })
    } catch (e) {
      setFormError(
        e instanceof AuthError ? e.message : 'No pudimos crear tu cuenta. Inténtalo otra vez.',
      )
    }
  })

  return (
    <AuthLayout
      title="Crea tu cuenta"
      lead="Es gratis. Te sirve para contactar a quienes cuidan a las mascotas y guardar tus favoritas."
      footer={
        <>
          ¿Ya tienes cuenta?{' '}
          <Link
            to={`/ingresar${params.get('volver') ? `?volver=${encodeURIComponent(redirectTo)}` : ''}`}
            className="font-semibold text-ciruela underline-offset-4 hover:underline"
          >
            Ingresa
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
        <Input
          label="Nombre"
          autoComplete="name"
          error={errors.fullName?.message}
          {...register('fullName')}
        />
        <Input
          label="Email"
          type="email"
          autoComplete="email"
          error={errors.email?.message}
          {...register('email')}
        />
        <Input
          label="Contraseña"
          type="password"
          autoComplete="new-password"
          hint="Usa al menos 8 caracteres."
          error={errors.password?.message}
          {...register('password')}
        />
        <Input
          label="Repite la contraseña"
          type="password"
          autoComplete="new-password"
          error={errors.confirmPassword?.message}
          {...register('confirmPassword')}
        />
        <FormError message={formError} />
        <Button type="submit" size="lg" disabled={isSubmitting} className="mt-1 w-full">
          {isSubmitting ? 'Creando cuenta…' : 'Crear cuenta'}
        </Button>
      </form>
    </AuthLayout>
  )
}
