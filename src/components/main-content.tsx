import { type ComponentProps } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query'
import { TriangleAlert, Info } from 'lucide-react'
import { InView } from 'react-intersection-observer'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import SearchSkeletons from '@/components/search-skeletons.tsx'
import createSearchOptions from '@/lib/tanstack-query/search-options.ts'

type InViewProps = ComponentProps<typeof InView>

export default function MainContent() {
  const { isLoading, error, data, isFetchingNextPage, hasNextPage, fetchNextPage } = useInfiniteQuery(createSearchOptions())
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
        <TriangleAlert className="h-4 w-4"/>

        <AlertTitle>Error</AlertTitle>

        <AlertDescription>
          {error.message}
        </AlertDescription>
      </Alert>
    )
  }

  if (!data) {
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
      {data.pages.map(({ page, hits }) => (
        <section key={page} className="flex flex-col gap-2">
          {hits.map((hit) => (
            <code key={hit.objectID} className="whitespace-pre">
              {JSON.stringify(hit, null, 2)}
            </code>
          ))}
        </section>
      ))}

      {isFetchingNextPage && (
        <SearchSkeletons />
      )}

      {hasNextPage && !isFetchingNextPage && (
        <InView onChange={handleInViewChange} />
      )}
    </>
  )
}
