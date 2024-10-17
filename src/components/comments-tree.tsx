import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardDescription,
} from '@/components/ui/card'
import type { Item } from '@/lib/tanstack-query/item-options'
import dateFormat from '@/lib/date-format'

type CommentsTreeProps = Pick<Item, 'children'>

export default function CommentsTree({ children }: CommentsTreeProps) {
  return (
    <ul className="flex flex-col gap-2 w-full">
      {children.map(({ id, children, type, author, text, created_at }) => {
        if (type !== 'comment') {
          return null
        }

        return (
          <li key={id}>
            <Card>
              <CardHeader className="p-3 pb-1">
                <CardDescription className="flex flex-wrap gap-2">
                  {author}

                  <time dateTime={created_at}>{dateFormat(created_at)}</time>
                </CardDescription>
              </CardHeader>

              <CardContent
                className="p-3 py-1 last:pb-2 break-words overflow-y-scroll"
                dangerouslySetInnerHTML={{ __html: text ?? '' }}
              />

              {!!children.length && (
                <CardFooter className="p-1 pl-2">
                  <CommentsTree children={children} />
                </CardFooter>
              )}
            </Card>
          </li>
        )
      })}
    </ul>
  )
}
