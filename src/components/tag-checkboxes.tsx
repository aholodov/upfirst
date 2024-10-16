import { type ComponentProps } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import queryParams from '@/query-param-keys'

type CheckboxProps = ComponentProps<typeof Checkbox>

export default function TagCheckboxes() {
  const [searchParams, setSearchParams] = useSearchParams()
  const tags = searchParams.getAll(queryParams.tags)
  const onChange: CheckboxProps['onClick'] = (event) => {
    const { value } = event.currentTarget

    setSearchParams((prevSearchParams) => {
      const nextSearchParams = new URLSearchParams(prevSearchParams)

      if (value === 'all') {
        nextSearchParams.delete(queryParams.tags)

        return nextSearchParams
      }

      let nextTags = nextSearchParams.getAll(queryParams.tags)

      if (nextTags.includes(value)) {
        nextSearchParams.delete(queryParams.tags, value)
      } else {
        nextSearchParams.append(queryParams.tags, value)
      }
      nextTags = nextSearchParams.getAll(queryParams.tags)

      if (['story', 'show_hn', 'ask_hn', 'front_page'].every((tag) => nextTags.includes(tag))) {
        nextSearchParams.delete(queryParams.tags)
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
          <Checkbox value="all" checked={!tags.length || "indeterminate"} onClick={onChange} />

          all
        </Label>

        <Label className="flex gap-1 items-center">
          <Checkbox value="story" checked={tags.includes("story")} onClick={onChange} />

          story
        </Label>

        <Label className="flex gap-1 items-center">
          <Checkbox value="show_hn" checked={tags.includes("show_hn")} onClick={onChange} />

          show
        </Label>

        <Label className="flex gap-1 items-center">
          <Checkbox value="ask_hn" checked={tags.includes("ask_hn")} onClick={onChange} />

          ask
        </Label>

        <Label className="flex gap-1 items-center">
          <Checkbox value="front_page" checked={tags.includes("front_page")} onClick={onChange} />

          front page
        </Label>
      </div>
    </div>
  )
}
