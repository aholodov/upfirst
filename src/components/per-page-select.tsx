import { type ComponentProps } from 'react';
import { useSearchParams } from 'react-router-dom'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import queryParams from '@/query-param-keys'

type SelectProps = ComponentProps<typeof Select>
const DEFAULT_PER_PAGE = '10'

export default function PerPageSelect() {
  const [searchParams, setSearchParams] = useSearchParams()
  const perPage = searchParams.get(queryParams.perPage) ?? DEFAULT_PER_PAGE
  const onValueChange: SelectProps['onValueChange'] = (value) => {
    setSearchParams((prevSearchParams) => {
      const nextSearchParams = new URLSearchParams(prevSearchParams)
      nextSearchParams.delete(queryParams.perPage)

      if (value !== DEFAULT_PER_PAGE) {
        nextSearchParams.set(queryParams.perPage, value)
      }

      return nextSearchParams
    })
  }

  return (
    <Label className="flex flex-col w-full gap-1">
      <span>Per page</span>

      <Select value={perPage} onValueChange={onValueChange}>
        <SelectTrigger>
          <SelectValue placeholder="Per page" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="10">10</SelectItem>

          <SelectItem value="50">50</SelectItem>

          <SelectItem value="100">100</SelectItem>
        </SelectContent>
      </Select>
    </Label>
  )
}
