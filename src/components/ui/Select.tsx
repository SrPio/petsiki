import type { ComponentProps } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/cn'
import { Field, fieldClasses } from './Field'

type SelectProps = Omit<ComponentProps<'select'>, 'id'> & {
  label: string
  hint?: string
  error?: string
  options: Array<{ value: string; label: string }>
  placeholder?: string
}

export function Select({
  label,
  hint,
  error,
  options,
  placeholder,
  className,
  ...props
}: SelectProps) {
  return (
    <Field label={label} hint={hint} error={error}>
      {(fieldProps) => (
        <div className="relative">
          <select
            {...fieldProps}
            {...props}
            className={cn(fieldClasses, 'cursor-pointer appearance-none pr-11', className)}
          >
            {placeholder !== undefined && <option value="">{placeholder}</option>}
            {options.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <ChevronDown
            aria-hidden
            className="pointer-events-none absolute top-1/2 right-4 size-5 -translate-y-1/2 text-tinta-suave"
          />
        </div>
      )}
    </Field>
  )
}
