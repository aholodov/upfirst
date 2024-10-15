import {
  Card,
  CardHeader,
  CardTitle
} from '@/components/ui/card.tsx'
import { Skeleton } from '@/components/ui/skeleton.tsx'

const SKELETONS = Array.from({ length: 10 }).map((_, i) => i)

export default function SearchSkeletons() {
  return (
    <section className="flex flex-col gap-2">
      {SKELETONS.map((index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle className="flex gap-2 items-center">
              <Skeleton className="w-9 aspect-square" />

              <Skeleton className="w-1/3 h-5" />

              <Skeleton className="ml-auto w-9 aspect-square" />
            </CardTitle>

            <div className="flex flex-wrap gap-2 ml-11">
              <Skeleton className="w-12 h-3 my-1" />

              <Skeleton className="w-1/6 h-3 my-1" />

              <Skeleton className="w-24 h-3 my-1" />
            </div>
          </CardHeader>
        </Card>
      ))}
    </section>
  )
}
