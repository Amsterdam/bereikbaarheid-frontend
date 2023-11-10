import { z } from 'zod'

/**
 * casts string to number and transforms comma decimal separator to a dot
 * @param schema
 * credits: https://github.com/colinhacks/zod/discussions/1209
 */
export function zToNumber<T extends z.ZodTypeAny>(schema: T) {
  return z.preprocess(val => (val ? Number(String(val).replace(',', '.')) : undefined), schema)
}
