'use client'

import { useIsHydrated } from '@/hooks'
import utils from '@/lib/utils'
import { cn } from '@/styles/cn'
import { useState, useRef } from 'react'
import { Input, type InputProps } from 'react-daisyui'

export function NumberInput({
  onChange,
  label,
  invalid = false,
  ...props
}: {
  onChange: (string: string) => void
  label?: string
  invalid?: boolean
} & Omit<InputProps, 'onChange' | 'color' | 'type' | 'inputMode'>) {
  const stepNumber = Number(props.step ?? 1)

  const isHydrated = useIsHydrated()
  const [isTouched, setIsTouched] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleIncrementOrDecrement = (inc?: boolean) => {
    let newValue =
      Number(inputRef.current?.value) + (!!inc ? stepNumber : -stepNumber)
    const newString = utils.format.amountString(newValue.toString())

    if (!!inputRef.current) inputRef.current.value = newString
    onChange(newString)
    if (!isTouched) setIsTouched(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(utils.format.amountString(e.target.value))
    if (!isTouched) setIsTouched(true)
  }

  const scanValidity = () => {
    let valid = inputRef.current?.validity.valid ?? true

    if (isHydrated) return valid

    if (!!inputRef.current) {
      // let validityMessage = ''
      // inputRef.current.setCustomValidity(validityMessage)
    }

    return valid
  }

  const isInvalid = invalid || !scanValidity()

  return (
    <div className="form-control w-auto">
      <label className={cn('label', !label && 'hidden')}>
        <span className="label-text">{label}</span>
      </label>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => {
            handleIncrementOrDecrement(false)
          }}
          className="btn"
          tabIndex={-1}
        >
          -
        </button>

        <Input
          className="w-full"
          ref={inputRef}
          type="number"
          inputMode="decimal"
          onChange={handleChange}
          {...(isTouched && isInvalid && { color: 'warning' })}
          {...props}
        />

        <button
          type="button"
          onClick={() => {
            handleIncrementOrDecrement(true)
          }}
          className="btn"
          tabIndex={-1}
        >
          +
        </button>
      </div>
    </div>
  )
}
