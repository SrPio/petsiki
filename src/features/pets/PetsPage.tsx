import { PageIntro } from '@/components/PageIntro'

export function PetsPage() {
  return (
    <section className="contenedor">
      <PageIntro
        title="Mascotas en adopción"
        lead="Filtra por tipo, tamaño o ciudad para encontrar a quien buscas."
      />
    </section>
  )
}
