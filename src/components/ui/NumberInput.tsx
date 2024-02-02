'use client'

import { formatAmountString } from '../../lib/utils'
import cn from 'classnames'
import { useState, useRef } from 'react'
import { Input, type InputProps } from 'react-daisyui'

type NumberInputRestProps = Omit<
  InputProps,
  'onChange' | 'color' | 'type' | 'inputMode'
>

type NumberInputProps = {
  onChange: (string: string) => void
  label?: string
  invalid?: boolean
} & NumberInputRestProps

export default function NumberInput({
  onChange,
  label,
  invalid = false,
  ...props
}: NumberInputProps) {
  const stepNumber = Number(props.step ?? 1)

  const [isTouched, setIsTouched] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const [valid, setValid] = useState(false)

  const handleValidity = () => {
    let newValid = inputRef.current?.validity.valid ?? false

    if (!isTouched) setIsTouched(true)
    if (newValid !== valid) setValid(newValid)
  }

  const handleIncrementOrDecrement = (inc?: boolean) => {
    if (!!inputRef.current) {
      const newValue =
          Number(inputRef.current.value) + (!!inc ? stepNumber : -stepNumber),
        newString = formatAmountString(newValue.toString())
      inputRef.current.value = newString
      onChange(newString)
      handleValidity()
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    onChange(formatAmountString(value))
    handleValidity()
  }

  const isInvalid = invalid || !valid

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
    </>
  )
}
