import { KeyRound } from 'lucide-react'
import { getDataSource } from '@/data'
import { DEMO_ACCOUNTS } from '@/data/local/LocalAuthService'

const roleLabel = { admin: 'Administrador', user: 'Usuario' } as const

/** Cuentas de prueba. Solo se muestran mientras los datos son locales. */
export function DemoAccounts({
  onPick,
}: {
  onPick: (account: { email: string; password: string }) => void
}) {
  if (getDataSource() !== 'local') return null

  return (
    <section aria-labelledby="cuentas-demo" className="rounded-placa bg-lavanda/60 p-5">
      <h2 id="cuentas-demo" className="flex items-center gap-2 font-semibold text-ciruela-honda">
        <KeyRound aria-hidden className="size-5" />
        Cuentas de prueba
      </h2>
      <p className="mt-1 text-sm text-tinta-suave">Elige una para completar el formulario.</p>
      <ul className="mt-4 flex flex-col gap-2">
        {DEMO_ACCOUNTS.map((a) => (
          <li key={a.email}>
            <button
              type="button"
              onClick={() => onPick({ email: a.email, password: a.password })}
              className="flex w-full items-center justify-between gap-3 rounded-2xl bg-white px-4 py-3 text-left ring-1 ring-linea transition hover:ring-ciruela/50"
            >
              <span className="min-w-0">
                <span className="block font-semibold">{roleLabel[a.role]}</span>
                <span className="block truncate text-sm text-tinta-suave">
                  {a.email}, clave {a.password}
                </span>
              </span>
              <span className="shrink-0 text-sm font-semibold text-ciruela">Usar</span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}
