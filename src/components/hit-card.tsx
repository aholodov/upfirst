import { useState } from 'react'
import { z } from 'zod'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from '@/components/ui/button.tsx'
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

type HitProps = Omit<z.infer<typeof hitSchema>, 'objectID'>

export default function HitCard({ author, created_at, title, url }: HitProps) {
  const [isOpen, setIsOpen] = useState(false)
  const CollapsibleIcon = isOpen ? ChevronDown : ChevronUp

  return (
    <Card>
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <CardHeader>
          <CardTitle className="flex gap-2 items-center">
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="icon">
                <CollapsibleIcon className="h-4 w-4" />
                <span className="sr-only">Toggle</span>
              </Button>
            </CollapsibleTrigger>

            {author}

            <time className="ml-auto" dateTime={created_at}>{dateFormat(created_at)}</time>
          </CardTitle>

          {!!title && (
            <CardDescription className="ml-11">
              {url ?
                (<a
                  href={url}
                  target="_blank"
                >
                  {title}
                </a>)
                : title
              }
            </CardDescription>
          )}
        </CardHeader>

        <CollapsibleContent>
          <CardContent>
            <div>Content</div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  )
}
