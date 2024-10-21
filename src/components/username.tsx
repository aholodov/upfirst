import { type PropsWithChildren } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { buttonVariants } from '@/components/ui/button.tsx'
import queryParams from '@/constants/query-param-keys'
import { createAuthorValue } from '@/lib/author-tag'

interface UsernameProps extends PropsWithChildren {
  value?: string
}

export default function Username({ value, children }: UsernameProps) {
  const [searchParams] = useSearchParams()

  if (!value) return null

  const search = new URLSearchParams(searchParams)
  search.set(queryParams.tagsAnd, createAuthorValue(value))

  return (
    <Link
      to={{ search: search.toString() }}
      className={buttonVariants({ variant: 'link', size: 'sm', className: 'text-[length:inherit] p-0 h-[unset]' })}
    >
      {children ?? value}
    </Link>
  )
}
