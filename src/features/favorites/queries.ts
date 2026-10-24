import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRepositories } from '@/data/repositories-context'
import { useAuth } from '@/features/auth/auth-context'

/** Las claves bajo ['me'] se invalidan al cambiar de sesión (ver AuthProvider). */
export const favoriteKeys = {
  list: (userId: string) => ['me', 'favorites', userId] as const,
}

export function useFavoriteIds() {
  const { favorites } = useRepositories()
  const { user } = useAuth()
  return useQuery({
    queryKey: favoriteKeys.list(user?.id ?? 'anon'),
    queryFn: () => favorites.list(user!.id),
    enabled: Boolean(user),
  })
}

/** Marca o desmarca un favorito con actualización optimista. */
export function useToggleFavorite() {
  const { favorites } = useRepositories()
  const { user } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ petId, favorite }: { petId: string; favorite: boolean }) => {
      if (!user) throw new Error('Necesitas una sesión para guardar favoritos')
      if (favorite) await favorites.add(user.id, petId)
      else await favorites.remove(user.id, petId)
    },
    onMutate: async ({ petId, favorite }) => {
      if (!user) return
      const key = favoriteKeys.list(user.id)
      await queryClient.cancelQueries({ queryKey: key })
      const previous = queryClient.getQueryData<string[]>(key)
      queryClient.setQueryData<string[]>(key, (ids = []) =>
        favorite ? [petId, ...ids.filter((id) => id !== petId)] : ids.filter((id) => id !== petId),
      )
      return { previous, key }
    },
    onError: (_err, _vars, ctx) => {
      if (ctx) queryClient.setQueryData(ctx.key, ctx.previous)
    },
    onSettled: (_data, _err, _vars, ctx) => {
      if (ctx) void queryClient.invalidateQueries({ queryKey: ctx.key })
    },
  })
}
