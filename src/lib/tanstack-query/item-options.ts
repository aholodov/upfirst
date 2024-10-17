import { queryOptions } from '@tanstack/react-query'
import { generatePath } from 'react-router-dom'
import { z } from 'zod'
import axiosInstance from '@/lib/axios-instance'

/* region [Recursive types](https://github.com/colinhacks/zod?tab=readme-ov-file#recursive-types) */
const baseItemSchema = z.object({
  id: z.number().int(),
  author: z.string(),
  text: z.string().nullable(),
  type: z.string(),
  created_at: z.string().datetime(),
})

export type Item = z.infer<typeof baseItemSchema> & {
  children: Array<Item>,
}

const itemSchema: z.ZodType<Item> = baseItemSchema.extend({
  children: z.lazy(() => itemSchema.array()),
})
/* endregion */

export interface ItemOptionProps {
  itemId: string | number
}

export function itemsKey() {
  return ['api/v1/items/:itemId'] as const
}

export function itemsWithIdKey({ itemId }: ItemOptionProps) {
  return [...itemsKey(), { itemId: itemId.toString() }] as const
}

export default function createItemOptions({ itemId }: ItemOptionProps) {
  return queryOptions({
    queryKey: itemsWithIdKey({ itemId }),
    queryFn: async ({ queryKey: [path, { itemId }], signal }) => {
      const url = generatePath(path, { itemId })
      const response = await axiosInstance.get(url, {
        signal,
      })

      return itemSchema.parse(response.data)
    },
  })
}
