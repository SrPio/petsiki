import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate, useSearchParams } from 'react-router'
import { Button } from '@/components/ui/Button'
import { FormError } from '@/components/ui/FormError'
import { Input } from '@/components/ui/Input'
import { useToast } from '@/components/ui/toast-context'
import { AuthError } from '@/data/repositories/types'
import { signInSchema, type SignInInput } from '@/lib/schemas/auth'
import { safeRedirect, useAuth } from './auth-context'
import { AuthLayout } from './AuthLayout'
import { DemoAccounts } from './DemoAccounts'

export function LoginPage() {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const toast = useToast()
  const [formError, setFormError] = useState<string | null>(null)
  const redirectTo = safeRedirect(params.get('volver'))

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<SignInInput>({ resolver: zodResolver(signInSchema) })

  const onSubmit = handleSubmit(async (data) => {
    setFormError(null)
    try {
      const user = await signIn(data)
      toast.show(`Hola, ${user.fullName.split(' ')[0]}`)
      navigate(redirectTo, { replace: true })
    } catch (e) {
      setFormError(e instanceof AuthError ? e.message : 'No pudimos ingresar. Inténtalo otra vez.')
    }
  })

  return (
    <AuthLayout
      title="Ingresa a tu cuenta"
      lead="Con tu cuenta ves los datos de contacto de cada mascota y guardas tus favoritas."
      footer={
        <>
          ¿No tienes cuenta?{' '}
          <Link
            to={`/registro${params.get('volver') ? `?volver=${encodeURIComponent(redirectTo)}` : ''}`}
            className="font-semibold text-ciruela underline-offset-4 hover:underline"
          >
            Crea una gratis
          </Link>
        </>
      }
      aside={
        <DemoAccounts
          onPick={({ email, password }) => {
            setValue('email', email, { shouldValidate: true })
            setValue('password', password, { shouldValidate: true })
          }}
        />
      }
    >
      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
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
          autoComplete="current-password"
          error={errors.password?.message}
          {...register('password')}
        />
        <FormError message={formError} />
        <Button type="submit" size="lg" disabled={isSubmitting} className="mt-1 w-full">
          {isSubmitting ? 'Ingresando…' : 'Ingresar'}
        </Button>
      </form>
    </AuthLayout>
  )
}
