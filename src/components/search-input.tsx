import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Input, type InputProps } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import queryParams from '@/constants/query-param-keys'

export default function SearchInput() {
  const timerIdRef = useRef<number>()
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get(queryParams.query) ?? ''
  const [inputValue, setInputValue] = useState(query)
  const onChange: InputProps['onChange'] = (event) => {
    const { value } = event.target
    setInputValue(value)
    window.clearTimeout(timerIdRef.current)
    timerIdRef.current = window.setTimeout(() => {
      setSearchParams((prevSearchParams) => {
        const nextSearchParams = new URLSearchParams(prevSearchParams)

        if (value) {
          nextSearchParams.set(queryParams.query, value)
        } else {
          nextSearchParams.delete(queryParams.query)
        }

        return nextSearchParams
      })
      window.clearTimeout(timerIdRef.current)
    }, 300)
  }

  useEffect(() => {
    setInputValue(query)
  }, [query])

  return (
    <Label className="flex flex-col w-full gap-1">
      <span>Search</span>

      <Input
        type='text'
        value={inputValue}
        onChange={onChange}
      />
    </Label>
  )
}
