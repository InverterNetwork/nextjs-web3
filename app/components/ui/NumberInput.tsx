'use client'

import { useInputFocus } from '@/hooks/useInputFocus'
import { formatAmountString } from '@/lib/utils'
import cn from 'classnames'
import { Input, type InputProps } from 'react-daisyui'

export default function NumberInput({
  step = 1,
  min = 0,
  max = undefined,
  precision = 0,
  onChange,
  value,
  label,
  invalid = false,
  ...props
}: {
  tracker?: number | boolean
  onChange: (string: string) => void
  value?: string | number
  step?: number
  defaultValue?: number
  min?: number
  precision?: number
  max?: number
  label?: string
  invalid?: boolean
} & Omit<
  InputProps,
  'onChange' | 'placeholder' | 'value' | 'onSubmit' | 'color'
>) {
  const { inputRef, inputIndex, onDone } = useInputFocus()

  const handleIncrementOrDecrement = (type: 'inc' | 'dec') => {
    let newValue =
      (Number(inputRef.current?.value) ?? props.defaultValue) +
      (type === 'inc' ? step : -step)
    if (max !== undefined) newValue = Math.min(newValue, max)
    if (min !== undefined) newValue = Math.max(newValue, min)
    const newString = formatAmountString(newValue.toString())
    if (!!inputRef.current) inputRef.current.value = newString
    onChange(newString)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (min !== undefined && Number(e.target.value) < min) return
    if (max !== undefined && Number(e.target.value) > max) return
    onChange(formatAmountString(e.target.value))
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onDone()
    }
  }

  return (
    <>
      <label className={cn('label', !label && 'hidden')}>
        <span className="label-text">{label}</span>
      </label>

      <div className="flex gap-3">
        <button
          onClick={(e) => {
            if (e.nativeEvent.detail === 0) return

            handleIncrementOrDecrement('dec')
          }}
          className="btn"
          tabIndex={-1}
        >
          -
        </button>
        <Input
          className="w-full"
          ref={inputRef}
          onKeyDown={handleKeyDown}
          type="number"
          inputMode="decimal"
          onChange={handleChange}
          data-inputindex={inputIndex}
          {...(invalid && { color: 'warning' })}
          {...props}
        />
        <button
          onClick={(e) => {
            if (e.nativeEvent.detail === 0) return

            handleIncrementOrDecrement('inc')
          }}
          className="btn"
          tabIndex={-1}
        >
          +
        </button>
      </div>
    </>
  )
}
