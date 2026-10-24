import { useState, type ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MotionConfig } from 'motion/react'
import { ToastProvider } from '@/components/ui/Toast'
import { RepositoriesProvider } from '@/data/RepositoriesProvider'
import type { Repositories } from '@/data/repositories/types'

export function Providers({
  children,
  repositories,
}: {
  children: ReactNode
  repositories?: Repositories
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: { queries: { staleTime: 30_000, refetchOnWindowFocus: false } },
      }),
  )

  return (
    <RepositoriesProvider repositories={repositories}>
      <QueryClientProvider client={queryClient}>
        <MotionConfig reducedMotion="user">
          <ToastProvider>{children}</ToastProvider>
        </MotionConfig>
      </QueryClientProvider>
    </RepositoriesProvider>
  )
}
