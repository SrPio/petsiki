import type { z } from 'zod'

/** Lee y valida un valor JSON de localStorage. Devuelve null si falta o está corrupto. */
export function readJson<T>(key: string, schema: z.ZodType<T>): T | null {
  const raw = localStorage.getItem(key)
  if (raw === null) return null
  try {
    const parsed = schema.safeParse(JSON.parse(raw))
    return parsed.success ? parsed.data : null
  } catch {
    return null
  }
}

export function writeJson(key: string, value: unknown) {
  localStorage.setItem(key, JSON.stringify(value))
}

/** Latencia simulada para que los estados de carga se vean como con un backend real. */
export function delay(ms = import.meta.env.MODE === 'test' ? 0 : 250) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms))
}
