import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { describe, expect, it, vi } from 'vitest'
import { renderWithProviders } from '@/test/render'
import { Button } from './Button'
import { Input } from './Input'
import { Modal } from './Modal'
import { Select } from './Select'
import { useToast } from './toast-context'

describe('Button', () => {
  it('ejecuta onClick y se puede enfocar', async () => {
    const onClick = vi.fn()
    const user = userEvent.setup()
    render(<Button onClick={onClick}>Guardar mascota</Button>)
    const button = screen.getByRole('button', { name: 'Guardar mascota' })

    await user.tab()
    expect(button).toHaveFocus()
    await user.keyboard('{Enter}')
    await user.click(button)
    expect(onClick).toHaveBeenCalledTimes(2)
  })

  it('no ejecuta onClick si está deshabilitado', async () => {
    const onClick = vi.fn()
    const user = userEvent.setup()
    render(
      <Button disabled onClick={onClick}>
        Guardar
      </Button>,
    )
    await user.click(screen.getByRole('button', { name: 'Guardar' }))
    expect(onClick).not.toHaveBeenCalled()
  })
})

describe('Input y Select', () => {
  it('asocian el label y muestran el error accesible', () => {
    render(<Input label="Email" error="Escribe un email válido" />)
    const input = screen.getByLabelText('Email')
    expect(input).toHaveAttribute('aria-invalid', 'true')
    expect(input).toHaveAccessibleDescription('Escribe un email válido')
    expect(screen.getByRole('alert')).toHaveTextContent('Escribe un email válido')
  })

  it('muestra la ayuda cuando no hay error', () => {
    render(<Input label="Teléfono" hint="Incluye el código de país." />)
    const input = screen.getByLabelText('Teléfono')
    expect(input).not.toHaveAttribute('aria-invalid')
    expect(input).toHaveAccessibleDescription('Incluye el código de país.')
  })

  it('Select lista sus opciones', async () => {
    const user = userEvent.setup()
    render(
      <Select
        label="Tipo"
        placeholder="Elige un tipo"
        options={[
          { value: 'perro', label: 'Perro' },
          { value: 'gato', label: 'Gato' },
        ]}
      />,
    )
    const select = screen.getByLabelText('Tipo')
    await user.selectOptions(select, 'gato')
    expect(select).toHaveValue('gato')
  })
})

function ModalDemo() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setOpen(true)}>Abrir</Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="¿Eliminar a Luna?"
        description="Esta acción no se puede deshacer."
        footer={<Button onClick={() => setOpen(false)}>Cancelar</Button>}
      />
    </>
  )
}

describe('Modal', () => {
  it('se abre, mueve el foco adentro y se cierra con Escape', async () => {
    const user = userEvent.setup()
    render(<ModalDemo />)
    const trigger = screen.getByRole('button', { name: 'Abrir' })
    await user.click(trigger)

    const dialog = screen.getByRole('dialog', { name: '¿Eliminar a Luna?' })
    expect(dialog).toHaveAccessibleDescription('Esta acción no se puede deshacer.')
    expect(dialog).toContainElement(document.activeElement as HTMLElement)

    await user.keyboard('{Escape}')
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
    expect(trigger).toHaveFocus()
  })
})

function ToastDemo() {
  const toast = useToast()
  return <Button onClick={() => toast.show('Luna se guardó en tus favoritos')}>Guardar</Button>
}

describe('Toast', () => {
  it('muestra el aviso y se puede cerrar', async () => {
    const { user } = renderWithProviders(<ToastDemo />)
    await user.click(screen.getByRole('button', { name: 'Guardar' }))
    expect(screen.getByRole('status')).toHaveTextContent('Luna se guardó en tus favoritos')

    await user.click(screen.getByRole('button', { name: 'Cerrar aviso' }))
    await waitFor(() => expect(screen.queryByRole('status')).not.toBeInTheDocument())
  })
})
