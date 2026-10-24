import { Link } from 'react-router'
import { buttonClasses } from '@/components/ui/button-styles'
import { PageIntro } from '@/components/PageIntro'

export function HomePage() {
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
    </section>
  )
}
