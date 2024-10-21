import { type ReactNode, useEffect, useId, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { CircleX } from 'lucide-react'
import { Input, type InputProps } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface SearchInputProps {
  paramKey: string
  label: ReactNode
  getInputValue?(value: string): string
  setParamValue?(value: string): string
}

function defaultFormater(value: string): string {
  return value
}

export default function SearchInput({
  paramKey,
  label,
  getInputValue = defaultFormater,
  setParamValue = defaultFormater,
}: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const inputId = useId()
  const timerIdRef = useRef<number>()
  const [searchParams, setSearchParams] = useSearchParams()
  const paramValue = getInputValue(searchParams.get(paramKey) ?? '')
  const [inputValue, setInputValue] = useState(paramValue)
  const setParam = (value: string) => {
    setSearchParams((prevSearchParams) => {
      const nextSearchParams = new URLSearchParams(prevSearchParams)

      if (value) {
        nextSearchParams.set(paramKey, setParamValue(value))
      } else {
        nextSearchParams.delete(paramKey)
      }

      return nextSearchParams
    })
  }
  const onChange: InputProps['onChange'] = (event) => {
    const { value } = event.target
    setInputValue(value)
    window.clearTimeout(timerIdRef.current)
    timerIdRef.current = window.setTimeout(() => {
      setParam(value)
      window.clearTimeout(timerIdRef.current)
    }, 300)
  }
  const handleClearInput = () => {
    const value = ''
    setInputValue(value)
    setParam(value)
    inputRef.current?.focus()
  }

  useEffect(() => {
    setInputValue(paramValue)
  }, [paramValue])

  return (
    <div className="space-y-2">
      <Label htmlFor={inputId}>{label}</Label>

      <div className="relative">
        <Input
          id={inputId}
          ref={inputRef}
          className="pr-9"
          type="text"
          value={inputValue}
          onChange={onChange}
        />

        {inputValue && (
          <button
            className="absolute inset-y-px right-px flex h-full w-9 items-center justify-center rounded-r-lg border border-transparent text-muted-foreground/80 ring-offset-background transition-shadow animate-in fade-in zoom-in-75 hover:text-foreground focus-visible:border-ring focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Clear input"
            onClick={handleClearInput}
          >
            <CircleX size={16} strokeWidth={2} aria-hidden="true" role="presentation" />
          </button>
        )}
      </div>
    </div>
  )
}
