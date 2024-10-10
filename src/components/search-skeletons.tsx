import { Skeleton } from '@/components/ui/skeleton.tsx'

const SKELETONS = Array.from({ length: 10 }).map((_, i) => i);

// TODO: create skeleton with correct layout of hit
export default function SearchSkeletons() {
  return (
    <section className="flex flex-col gap-2">
      {SKELETONS.map((index) => (
        <div key={index} className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full"/>
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]"/>
            <Skeleton className="h-4 w-[200px]"/>
          </div>
        </div>
      ))}
    </section>
  )
}
