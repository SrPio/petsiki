import { Link } from 'react-router'
import { buttonClasses } from '@/components/ui/button-styles'
import { PageIntro } from '@/components/PageIntro'
import { usePets } from '@/features/pets/queries'

export function HomePage() {
  const { data: pets } = usePets({ status: 'disponible' })

  return (
    <section className="contenedor">
      <PageIntro
        title="Adopta a tu próxima compañía"
        lead="Perros, gatos, conejos y más esperan una casa. Revisa su ficha, mira dónde están y coordina el retiro o la entrega directamente con quien los cuida."
      >
        <Link to="/mascotas" className={buttonClasses('primario', 'lg')}>
          Ver mascotas
        </Link>
        <Link to="/ingresar" className={buttonClasses('secundario', 'lg')}>
          Crear cuenta
        </Link>
      </PageIntro>
      {pets && (
        <p className="mt-6 text-tinta-suave">
          {pets.length === 1
            ? 'Hoy 1 mascota busca casa.'
            : `Hoy ${pets.length} mascotas buscan casa.`}
        </p>
      )}
    </section>
  )
}
