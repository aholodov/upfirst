import { useState } from 'react'
import { z } from 'zod'
import { ChevronDown, ChevronUp, ExternalLink } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible'
import Comments from '@/components/comments'
import dateFormat from '@/lib/date-format'
import { hitSchema } from '@/lib/tanstack-query/search-options'
import Username from '@/components/username'

type Hit = z.infer<typeof hitSchema>

interface HitProps extends Omit<Hit, '_tags'> {
  tags: Hit['_tags']
}

export default function HitCard({ objectID, author, created_at, title, url, tags }: HitProps) {
  const [isOpen, setIsOpen] = useState(false)
  const CollapsibleIcon = isOpen ? ChevronDown : ChevronUp
  const type = tags.at(0) ?? 'Unknown'

  return (
    <Card>
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <CardHeader className="p-3 sm:px-6">
          <CardTitle className="flex items-start gap-2">
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="icon" className="shrink-0 order-last sm:order-none">
                <CollapsibleIcon className="h-4 w-4" />
                <span className="sr-only">Toggle</span>
              </Button>
            </CollapsibleTrigger>

            <span className="mt-2.5">{title}</span>

            {!!url && (
              <a href={url} target="_blank" className={buttonVariants({ size: 'icon', variant: 'ghost', className: 'shrink-0 ml-auto' })}>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </CardTitle>

          <CardDescription className="flex items-center gap-2 sm:ml-11">
            <Badge>{type}</Badge>

            <Username value={author} />

            <time dateTime={created_at}>{dateFormat(created_at)}</time>
          </CardDescription>
        </CardHeader>

        <CollapsibleContent>
          <CardContent className="p-3 sm:px-6 sm:ml-11">
            <Comments itemId={objectID} />
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  )
}
