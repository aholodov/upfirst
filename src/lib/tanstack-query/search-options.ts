import { infiniteQueryOptions } from '@tanstack/react-query'
import { z } from 'zod'
import axiosInstance from '@/lib/axios-instance.ts'

const hitSchema = z.object({
  objectID: z.string(),
  created_at: z.string().datetime(),
  author: z.string(),
  title: z.string(),
  url: z.string().url(),
}).partial({
  title: true,
  url: true,
})
const searchResponseSchema = z.object({
  nbPages: z.number().int(),
  page: z.number().int(),
  hits: z.array(hitSchema),
});

export default function createSearchOptions() {
  return infiniteQueryOptions({
    queryKey: ['api/v1/search'] as const,
    queryFn: async ({ queryKey: [path], signal, pageParam }) => {
      const response = await axiosInstance.get(path, {
        params: {
          page: pageParam,
          tags: '(story,show_hn,ask_hn,front_page)',
          hitsPerPage: 10,
        },
        signal,
      });

      return searchResponseSchema.parse(response.data);
    },
    initialPageParam: 0,
    getNextPageParam: ({ nbPages, page }) => page < nbPages ? page + 1 : null,
  })
};
