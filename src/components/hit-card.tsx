import { useState } from 'react'
import { z } from 'zod'
import { ChevronDown, ChevronUp, ExternalLink } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button, buttonVariants } from '@/components/ui/button.tsx'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card.tsx'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible.tsx'
import dateFormat from '@/lib/date-format.ts'
import { hitSchema } from '@/lib/tanstack-query/search-options.ts'

type Hit = z.infer<typeof hitSchema>

interface HitProps extends Omit<Hit, 'objectID' | '_tags'> {
  tags: Hit['_tags']
}

export default function HitCard({ author, created_at, title, url, tags }: HitProps) {
  const [isOpen, setIsOpen] = useState(false)
  const CollapsibleIcon = isOpen ? ChevronDown : ChevronUp
  const type = tags.at(0) ?? 'Unknown'

  return (
    <Card>
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <CardHeader>
          <CardTitle className="flex items-start gap-2">
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="icon" className="shrink-0">
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

          <CardDescription className="flex items-center gap-2 ml-11">
            <Badge>{type}</Badge>

            {author}

            <time dateTime={created_at}>{dateFormat(created_at)}</time>
          </CardDescription>
        </CardHeader>

        <CollapsibleContent>
          <CardContent className="ml-11">
            <div className="flex gap-2 items-start">
              <div>Tags:</div>

              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => <Badge key={tag}>{tag}</Badge>)}
              </div>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  )
}
