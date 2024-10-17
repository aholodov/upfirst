import { type ComponentProps } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import queryParams from '@/constants/query-param-keys'
import tagValues from '@/constants/tag-values'

type CheckboxProps = ComponentProps<typeof Checkbox>

const allTags = 'all'

const TAGS = [
  { value: tagValues.story },
  { value: tagValues.show, title: 'show' },
  { value: tagValues.ask, title: 'ask' },
  { value: tagValues.front, title: 'front' },
]

export default function TagCheckboxes() {
  const [searchParams, setSearchParams] = useSearchParams()
  const tags = searchParams.getAll(queryParams.tagsOr)
  const onChange: CheckboxProps['onClick'] = (event) => {
    const { value } = event.currentTarget

    setSearchParams((prevSearchParams) => {
      const nextSearchParams = new URLSearchParams(prevSearchParams)

      if (value === allTags) {
        nextSearchParams.delete(queryParams.tagsOr)

        return nextSearchParams
      }

      let nextTags = nextSearchParams.getAll(queryParams.tagsOr)

      if (nextTags.includes(value)) {
        nextSearchParams.delete(queryParams.tagsOr, value)
      } else {
        nextSearchParams.append(queryParams.tagsOr, value)
      }
      nextTags = nextSearchParams.getAll(queryParams.tagsOr)

      if (TAGS.every(({ value }) => nextTags.includes(value))) {
        nextSearchParams.delete(queryParams.tagsOr)
      }

      return nextSearchParams
    })
  }

  return (
    <div className="flex flex-col w-full gap-1">
      <Label asChild>
        <span>Tags:</span>
      </Label>

      <div className="flex flex-col w-full gap-1">
        <Label className="flex gap-1 items-center">
          <Checkbox value={allTags} checked={!tags.length || "indeterminate"} onClick={onChange} />

          all
        </Label>

        {TAGS.map(({ value, title }) => (
          <Label key={value} className="flex gap-1 items-center">
            <Checkbox value={value} checked={tags.includes(value)} onClick={onChange} />

            {title ?? value}
          </Label>
        ))}
      </div>
    </div>
  )
}
