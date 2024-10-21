import { type ComponentProps } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import { TriangleAlert, Info } from 'lucide-react'
import { InView } from 'react-intersection-observer'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import SearchSkeletons from '@/components/search-skeletons'
import createSearchOptions from '@/lib/tanstack-query/search-options'
import HitCard from '@/components/hit-card'
import queryParams from '@/constants/query-param-keys'

type InViewProps = ComponentProps<typeof InView>

export default function MainContent() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get(queryParams.query) ?? undefined
  const tagsOr = searchParams.getAll(queryParams.tagsOr)
  const tagsAnd = searchParams.getAll(queryParams.tagsAnd)
  const perPage = searchParams.get(queryParams.perPage) ?? '10'
  const { isLoading, error, data, isFetchingNextPage, hasNextPage, fetchNextPage } = useInfiniteQuery(
    createSearchOptions({
      tagsAnd,
      tagsOr,
      perPage,
      query,
    })
  )
  const handleInViewChange: InViewProps['onChange'] = (inView) => {
    if (!inView) return

    void fetchNextPage()
  }

  if (isLoading) {
    return <SearchSkeletons />
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <TriangleAlert className="h-4 w-4" />

        <AlertTitle>Error</AlertTitle>

        <AlertDescription>
          {error.message}
        </AlertDescription>
      </Alert>
    )
  }

  if (!data?.pages.at(0)?.hits.length) {
    return (
      <Alert>
        <Info className="h-4 w-4" />

        <AlertTitle>Info</AlertTitle>

        <AlertDescription>
          No data found.
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <>
      <div className="flex flex-col gap-2">
        {data.pages.map(({ page, hits }) => (
          <section key={page} className="flex flex-col gap-2">
            {hits.map((hit) => (
              <HitCard
                key={hit.objectID}
                objectID={hit.objectID}
                author={hit.author}
                created_at={hit.created_at}
                title={hit.title}
                url={hit.url}
                tags={hit._tags}
              />
            ))}
          </section>
        ))}

        {isFetchingNextPage && (
          <SearchSkeletons />
        )}
      </div>

      {hasNextPage && !isFetchingNextPage && (
        <InView onChange={handleInViewChange} />
      )}
    </>
  )
}
