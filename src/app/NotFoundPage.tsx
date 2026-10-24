import { Link } from 'react-router'
import { buttonClasses } from '@/components/ui/button-styles'
import { PageIntro } from '@/components/PageIntro'

export function NotFoundPage() {
  return (
    <section className="contenedor">
      <PageIntro
        title="Esta página no existe"
        lead="Puede que el enlace esté mal escrito o que la página se haya movido."
      >
        <Link to="/" className={buttonClasses('primario', 'lg')}>
          Volver al inicio
        </Link>
      </PageIntro>
    </section>
  )
}
