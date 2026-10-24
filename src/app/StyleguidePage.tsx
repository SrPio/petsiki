import { useState, type ReactNode } from 'react'
import { Heart, MapPin, Plus } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Modal } from '@/components/ui/Modal'
import { Select } from '@/components/ui/Select'
import { Skeleton } from '@/components/ui/Skeleton'
import { useToast } from '@/components/ui/toast-context'

const palette = [
  { name: 'Nube', hex: '#EEF2F7', className: 'bg-nube' },
  { name: 'Tinta', hex: '#1F2742', className: 'bg-tinta' },
  { name: 'Tinta suave', hex: '#4A5373', className: 'bg-tinta-suave' },
  { name: 'Ciruela', hex: '#6A3EA1', className: 'bg-ciruela' },
  { name: 'Ciruela honda', hex: '#4E2A7E', className: 'bg-ciruela-honda' },
  { name: 'Lavanda', hex: '#E5DCF6', className: 'bg-lavanda' },
  { name: 'Pistacho', hex: '#C4E38A', className: 'bg-pistacho' },
  { name: 'Durazno', hex: '#FFC6A6', className: 'bg-durazno' },
]

const especies = [
  { value: 'perro', label: 'Perro' },
  { value: 'gato', label: 'Gato' },
  { value: 'conejo', label: 'Conejo' },
  { value: 'ave', label: 'Ave' },
]

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-t border-linea pt-8">
      <h2 className="titulo mb-6 text-2xl">{title}</h2>
      {children}
    </section>
  )
}

export function StyleguidePage() {
  const [modalOpen, setModalOpen] = useState(false)
  const toast = useToast()

  return (
    <div className="contenedor flex flex-col gap-12">
      <div>
        <h1 className="display text-5xl md:text-7xl">Guía de estilo</h1>
        <p className="mt-3 max-w-xl text-tinta-suave">
          Componentes base de Petsiki. Esta página solo existe en desarrollo.
        </p>
      </div>

      <Section title="Color">
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {palette.map((c) => (
            <li key={c.name} className="flex items-center gap-3">
              <span className={`size-12 shrink-0 rounded-2xl ring-1 ring-linea ${c.className}`} />
              <span className="text-sm leading-tight">
                <span className="block font-semibold">{c.name}</span>
                <span className="text-tinta-suave">{c.hex}</span>
              </span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Tipografía">
        <div className="flex flex-col gap-4">
          <p className="display text-7xl md:text-8xl">Rocco</p>
          <p className="titulo text-4xl">Busca una casa con patio</p>
          <p className="titulo text-2xl">Contacto y logística</p>
          <p className="max-w-[65ch] text-lg">
            Rocco es un mestizo de tres años, tranquilo en casa y muy juguetón en el parque. Se
            lleva bien con otros perros y está vacunado y esterilizado.
          </p>
          <p className="text-sm text-tinta-suave">Publicado hace 2 días</p>
        </div>
      </Section>

      <Section title="Botones">
        <div className="flex flex-wrap items-center gap-3">
          <Button>Ver mascotas</Button>
          <Button variant="secundario" icon={<Plus className="size-5" />}>
            Agregar mascota
          </Button>
          <Button variant="fantasma">Cancelar</Button>
          <Button variant="peligro">Eliminar</Button>
          <Button size="sm">Pequeño</Button>
          <Button size="lg">Grande</Button>
          <Button disabled>Deshabilitado</Button>
        </div>
      </Section>

      <Section title="Formularios">
        <div className="grid max-w-2xl gap-5 sm:grid-cols-2">
          <Input label="Nombre" placeholder="Ej. Rocco" />
          <Select label="Tipo" placeholder="Elige un tipo" options={especies} />
          <Input label="Teléfono" hint="Incluye el código de país." placeholder="+56 9 1234 5678" />
          <Input
            label="Email"
            defaultValue="rocco@"
            error="Escribe un email válido, ej. nombre@correo.cl"
          />
        </div>
      </Section>

      <Section title="Etiquetas">
        <div className="flex flex-wrap gap-2">
          <Badge tone="pistacho">Disponible</Badge>
          <Badge tone="durazno">En proceso</Badge>
          <Badge tone="lavanda">Vacunado</Badge>
          <Badge icon={<MapPin className="size-3.5" />}>Valparaíso</Badge>
        </div>
      </Section>

      <Section title="Tarjetas">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <Card placa className="p-6">
            <p className="display text-5xl">Luna</p>
            <p className="mt-2 text-tinta-suave">Gata, 1 año, Santiago</p>
            <div className="mt-4 flex gap-2">
              <Badge tone="pistacho">Disponible</Badge>
            </div>
          </Card>
          <Card className="p-6">
            <p className="titulo text-xl">Tarjeta simple</p>
            <p className="mt-2 text-tinta-suave">Para bloques de información sin forma de placa.</p>
          </Card>
          <Card className="flex flex-col gap-3 p-6" aria-label="Cargando">
            <Skeleton className="h-36 w-full rounded-2xl" />
            <Skeleton className="h-6 w-2/3" />
            <Skeleton className="h-4 w-1/2" />
          </Card>
        </div>
      </Section>

      <Section title="Modal y avisos">
        <div className="flex flex-wrap gap-3">
          <Button variant="secundario" onClick={() => setModalOpen(true)}>
            Abrir modal
          </Button>
          <Button
            variant="secundario"
            icon={<Heart className="size-5" />}
            onClick={() => toast.show('Luna se guardó en tus favoritos')}
          >
            Aviso de éxito
          </Button>
          <Button
            variant="fantasma"
            onClick={() => toast.show('No se pudo guardar. Revisa tu conexión.', 'error')}
          >
            Aviso de error
          </Button>
        </div>
        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          title="¿Eliminar a Luna?"
          description="Luna dejará de aparecer en el catálogo. Esta acción no se puede deshacer."
          footer={
            <>
              <Button variant="fantasma" onClick={() => setModalOpen(false)}>
                Cancelar
              </Button>
              <Button variant="peligro" onClick={() => setModalOpen(false)}>
                Eliminar a Luna
              </Button>
            </>
          }
        />
      </Section>
    </div>
  )
}
