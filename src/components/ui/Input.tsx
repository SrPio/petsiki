import type { ComponentProps } from 'react'
import { cn } from '@/lib/cn'
import { Field, fieldClasses } from './Field'

type InputProps = Omit<ComponentProps<'input'>, 'id'> & {
  label: string
  hint?: string
  error?: string
}

export function Input({ label, hint, error, className, ...props }: InputProps) {
  return (
    <Field label={label} hint={hint} error={error}>
      {(fieldProps) => <input {...fieldProps} {...props} className={cn(fieldClasses, className)} />}
    </Field>
  )
}
