import { useQuery } from '@tanstack/react-query'
import { Info, TriangleAlert } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import CommentsTree from '@/components/comments-tree'
import createItemOptions, { type ItemOptionProps } from '@/lib/tanstack-query/item-options'

const SKELETONS = Array.from({ length: 10 }).map((_, i) => i)

export default function Comments({ itemId }: ItemOptionProps) {
  const { isLoading, error, data } = useQuery({
    ...createItemOptions({ itemId }),
    enabled: !!itemId,
  })

  if (isLoading) {
    return (
      <ul className="flex flex-col gap-2 w-full">
        {SKELETONS.map((id) => (
          <Card key={id}>
            <CardHeader className="p-3 pb-1">
              <CardDescription className="flex flex-wrap gap-2">
                <Skeleton className="w-24 h-3 my-1" />

                <Skeleton className="w-24 h-3 my-1" />
              </CardDescription>
            </CardHeader>

            <CardContent className="flex flex-col w-full gap-1 p-3 py-1 last:pb-2">
              <Skeleton className="w-full h-3" />

              <Skeleton className="w-full h-3" />

              <Skeleton className="w-2/3 h-3" />
            </CardContent>
          </Card>
        ))}
      </ul>
    )
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

  return <CommentsTree children={data.children} />
}
