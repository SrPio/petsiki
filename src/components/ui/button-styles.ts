import { cn } from '@/lib/cn'

export type ButtonVariant = 'primario' | 'secundario' | 'fantasma' | 'peligro'
export type ButtonSize = 'sm' | 'md' | 'lg'

const variants: Record<ButtonVariant, string> = {
  primario: 'bg-ciruela text-white shadow-suave hover:bg-ciruela-honda',
  secundario: 'bg-lavanda text-ciruela-honda hover:bg-[#d9cdf1]',
  fantasma: 'bg-transparent text-tinta hover:bg-lavanda/60',
  peligro: 'bg-[#b42318] text-white hover:bg-[#912018]',
}

const sizes: Record<ButtonSize, string> = {
  sm: 'h-9 px-4 text-sm gap-1.5',
  md: 'h-11 px-5 text-base gap-2',
  lg: 'h-14 px-7 text-lg gap-2.5',
}

/** Clases de botón, también usadas por links que se ven como botón. */
export const buttonClasses = (variant: ButtonVariant = 'primario', size: ButtonSize = 'md') =>
  cn(
    'inline-flex select-none items-center justify-center rounded-full font-semibold',
    'transition-[background-color,color,scale] duration-200 active:scale-[0.97]',
    'disabled:cursor-not-allowed disabled:opacity-50',
    variants[variant],
    sizes[size],
  )
