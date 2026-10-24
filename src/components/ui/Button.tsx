import { motion, type HTMLMotionProps } from 'motion/react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { springSuave } from '@/lib/motion'
import { buttonClasses, type ButtonSize, type ButtonVariant } from './button-styles'

export type ButtonProps = Omit<HTMLMotionProps<'button'>, 'children'> & {
  variant?: ButtonVariant
  size?: ButtonSize
  icon?: ReactNode
  children?: ReactNode
}

export function Button({
  variant = 'primario',
  size = 'md',
  icon,
  className,
  children,
  type = 'button',
  disabled,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      type={type}
      disabled={disabled}
      whileTap={disabled ? undefined : { scale: 0.96 }}
      whileHover={disabled ? undefined : { y: -1 }}
      transition={springSuave}
      className={cn(buttonClasses(variant, size), className)}
      {...props}
    >
      {icon}
      {children}
    </motion.button>
  )
}
