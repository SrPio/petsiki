import { Link } from 'react-router'
import { Clock, Lock, Mail, MessageCircle, Phone, Store, Truck, UserRound } from 'lucide-react'
import type { ReactNode } from 'react'
import { buttonClasses } from '@/components/ui/button-styles'
import { cn } from '@/lib/cn'
import { adoptionMessage, mailtoUrl, telUrl, whatsappUrl } from '@/lib/contact'
import type { ContactMethod, Pet } from '@/lib/schemas/pet'
import { contactMethodLabel, logisticsLabel } from '../labels'

type ContactCardProps = { pet: Pet; locked: boolean }

export function ContactCard({ pet, locked }: ContactCardProps) {
  return (
    <section
      aria-labelledby="contacto"
      className="rounded-placa bg-white p-6 shadow-suave ring-1 ring-linea/70 md:p-7"
    >
      <h2 id="contacto" className="titulo text-2xl">
        Contacto y logística
      </h2>
      {locked ? <LockedContact pet={pet} /> : <ContactDetails pet={pet} />}
      <Logistics pet={pet} />
    </section>
  )
}

function LockedContact({ pet }: { pet: Pet }) {
  return (
    <div className="mt-5 rounded-3xl bg-nube p-5">
      <div className="flex items-start gap-3">
        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-lavanda text-ciruela-honda">
          <Lock aria-hidden className="size-5" />
        </span>
        <div>
          <p className="font-semibold">Ingresa para ver el contacto</p>
          <p className="mt-1 text-sm text-tinta-suave">
            Mostramos el WhatsApp, teléfono y email de quien cuida a {pet.name} solo a personas con
            cuenta. Así protegemos sus datos.
          </p>
        </div>
      </div>
      <Link
        to={`/ingresar?volver=${encodeURIComponent(`/mascotas/${pet.id}`)}`}
        className={cn(buttonClasses('primario', 'md'), 'mt-5 w-full sm:w-auto')}
      >
        Ingresar para ver el contacto
      </Link>
    </div>
  )
}

function ContactDetails({ pet }: { pet: Pet }) {
  const { contact } = pet
  const message = adoptionMessage(pet.name)

  const actions: Array<{ method: ContactMethod; href: string; label: string; icon: ReactNode }> = []
  if (contact.whatsapp)
    actions.push({
      method: 'whatsapp',
      href: whatsappUrl(contact.whatsapp, message),
      label: 'Escribir por WhatsApp',
      icon: <MessageCircle aria-hidden className="size-5" />,
    })
  if (contact.phone)
    actions.push({
      method: 'telefono',
      href: telUrl(contact.phone),
      label: `Llamar al ${contact.phone}`,
      icon: <Phone aria-hidden className="size-5" />,
    })
  if (contact.email)
    actions.push({
      method: 'email',
      href: mailtoUrl(contact.email, `Adopción de ${pet.name}`, message),
      label: 'Enviar email',
      icon: <Mail aria-hidden className="size-5" />,
    })
  // El método preferido va primero y destacado.
  actions.sort(
    (a, b) => Number(b.method === contact.preferred) - Number(a.method === contact.preferred),
  )

  return (
    <div className="mt-5">
      <dl className="grid gap-3 text-sm sm:grid-cols-2">
        <InfoRow icon={<UserRound className="size-4" />} term="Responsable" value={contact.name} />
        {contact.availability && (
          <InfoRow
            icon={<Clock className="size-4" />}
            term="Horario"
            value={contact.availability}
          />
        )}
      </dl>
      <p className="mt-4 text-sm text-tinta-suave">
        Prefiere que le contacten por {contactMethodLabel[contact.preferred].toLowerCase()}.
      </p>
      <div className="mt-4 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
        {actions.map((a, i) => (
          <a
            key={a.method}
            href={a.href}
            target={a.method === 'whatsapp' ? '_blank' : undefined}
            rel={a.method === 'whatsapp' ? 'noopener noreferrer' : undefined}
            className={buttonClasses(i === 0 ? 'primario' : 'secundario', 'md')}
          >
            {a.icon}
            {a.label}
          </a>
        ))}
      </div>
      {contact.email && (
        <p className="mt-3 text-sm break-all text-tinta-suave">Email: {contact.email}</p>
      )}
    </div>
  )
}

function Logistics({ pet }: { pet: Pet }) {
  const { mode, notes } = pet.logistics
  const modes = mode === 'ambos' ? (['retiro', 'entrega'] as const) : [mode]

  return (
    <div className="mt-6 border-t border-linea pt-5">
      <h3 className="font-semibold">¿Cómo se entrega?</h3>
      <ul className="mt-3 flex flex-wrap gap-2">
        {modes.map((m) => (
          <li
            key={m}
            className="inline-flex items-center gap-2 rounded-full bg-pistacho px-3.5 py-1.5 text-sm font-semibold text-pistacho-hondo"
          >
            {m === 'retiro' ? (
              <Store aria-hidden className="size-4" />
            ) : (
              <Truck aria-hidden className="size-4" />
            )}
            {logisticsLabel[m]}
          </li>
        ))}
      </ul>
      {notes && <p className="mt-3 text-tinta-suave">{notes}</p>}
    </div>
  )
}

function InfoRow({ icon, term, value }: { icon: ReactNode; term: string; value: string }) {
  return (
    <div className="flex items-start gap-2.5 rounded-2xl bg-nube px-3.5 py-3">
      <span aria-hidden className="mt-0.5 text-ciruela">
        {icon}
      </span>
      <div>
        <dt className="text-tinta-suave">{term}</dt>
        <dd className="font-semibold text-tinta">{value}</dd>
      </div>
    </div>
  )
}
