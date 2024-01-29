'use client'

import { useInputFocus } from '@/hooks/useInputFocus'
import { formatAmountString } from '@/lib/utils'
import cn from 'classnames'
import { Input, type InputProps } from 'react-daisyui'

import { z } from 'zod'

export default function NumberInput({
  step = 1,
  min = 0,
  max = undefined,
  onChange,
  label,
  invalid = false,
  ...props
}: {
  onChange: (string: string) => void
  label?: string
  invalid?: boolean
} & Omit<InputProps, 'onChange' | 'placeholder' | 'onSubmit' | 'color'>) {
  const minNumber = Number(min)
  const maxNumber = Number(max)
  const stepNumber = Number(step)

  const { inputRef, inputIndex, onDone } = useInputFocus()

  const handleIncrementOrDecrement = (inc?: boolean) => {
    let newValue =
      Number(inputRef.current?.value) + (!!inc ? stepNumber : -stepNumber)

    // if (max !== undefined) newValue = Math.min(newValue, maxNumber)
    // if (min !== undefined) newValue = Math.max(newValue, minNumber)

    const newString = formatAmountString(newValue.toString())

    if (!!inputRef.current) inputRef.current.value = newString
    onChange(newString)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // if (min !== undefined && Number(e.target.value) < minNumber) return
    // if (max !== undefined && Number(e.target.value) > maxNumber) return

    onChange(formatAmountString(e.target.value))
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onDone()
    }
  }

  const setValidity = (msg: string) => {
    inputRef.current!.setCustomValidity(msg)
  }

  const scanValidity = () => {
    let valid = true
    let validityMessage = ''

    if (!!inputRef.current) {
      const value = Number(inputRef.current.value)
      try {
        z.number()
          .min(minNumber, `Must be at least ${minNumber}`)
          .max(maxNumber, `Must be at most ${maxNumber}`)
          .parse(value)

        valid = true
        validityMessage = ''
      } catch (e: any) {
        valid = false
        if (e instanceof z.ZodError) {
          validityMessage = e.errors[0]?.message
        }
      }
      setValidity(validityMessage)
    }

    return valid
  }

  const isInvalid = invalid || !scanValidity()

  return (
    <>
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
          onKeyDown={handleKeyDown}
          type="number"
          inputMode="decimal"
          onChange={handleChange}
          data-inputindex={inputIndex}
          {...(isInvalid && { color: 'warning' })}
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
    </>
  )
}
