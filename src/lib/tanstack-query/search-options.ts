import { infiniteQueryOptions } from '@tanstack/react-query'
import { z } from 'zod'
import axiosInstance from '@/lib/axios-instance'
import tagsValues from '@/constants/tag-values'

export const hitSchema = z.object({
  objectID: z.string(),
  created_at: z.string().datetime(),
  author: z.string(),
  title: z.string().optional(),
  url: z.string().url().optional().or(z.literal('')),
  _tags: z.string().array(),
})
export const searchResponseSchema = z.object({
  nbPages: z.number().int(),
  page: z.number().int(),
  hits: hitSchema.array(),
})

interface SearchParams {
  tagsAnd: Array<string>
  tagsOr: Array<string>
  perPage: string
  query?: string
}

function createTags(params: Pick<SearchParams, 'tagsOr' | 'tagsAnd'>) {
  const tagsOr = params.tagsOr.length
    ? params.tagsOr
    : [tagsValues.story, tagsValues.show, tagsValues.ask, tagsValues.front]

  return [...params.tagsAnd, `(${tagsOr.join(',')})`].join(',')
}

export default function createSearchOptions(params: SearchParams) {
  return infiniteQueryOptions({
    queryKey: ['api/v1/search', params] as const,
    queryFn: async ({ queryKey: [path, params], signal, pageParam }) => {
      const tags = createTags(params)
      const response = await axiosInstance.get(path, {
        params: {
          page: pageParam,
          tags,
          hitsPerPage: params.perPage,
          query: params.query,
        },
        signal,
      })

      return searchResponseSchema.parse(response.data)
    },
    initialPageParam: 0,
    getNextPageParam: ({ nbPages, page }) => page < nbPages ? page + 1 : null,
  })
}
