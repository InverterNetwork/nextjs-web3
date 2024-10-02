'use client'

import utils from '@/utils'
import { useState, useRef } from 'react'
import { Input, type InputProps } from '@/react-daisyui'
import { DescriptionLabel, NameLabel } from '.'

export type NumberInputProps = {
  onChange: (string: string) => void
  label?: string
  invalid?: boolean
  description?: string
} & Omit<InputProps, 'onChange' | 'color' | 'type' | 'inputMode'>

export function Number({
  onChange,
  label,
  invalid = false,
  description,
  ...props
}: NumberInputProps) {
  // const stepNumber = Number(props.step ?? 1)

  const [isTouched, setIsTouched] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(utils.format.amountString(e.target.value))
    if (!isTouched) setIsTouched(true)
  }

  const scanValidity = () => {
    let valid = inputRef.current?.validity.valid ?? true

    if (!!inputRef.current) {
      // let validityMessage = ''
      // inputRef.current.setCustomValidity(validityMessage)
    }

    return valid
  }

  const isInvalid = invalid || !scanValidity()

  return (
    <div className="form-control w-auto">
      <NameLabel name={label} />
      <Input
        onWheel={(e) => {
          e.preventDefault()
          // @ts-expect-error - TS doesn't know about the wheelDelta property
          e.target.blur()
        }}
        placeholder={props.placeholder ?? 'Type Here'}
        ref={inputRef}
        type="number"
        inputMode="decimal"
        onChange={handleChange}
        {...(isTouched && isInvalid && { color: 'warning' })}
        {...props}
      />
      <DescriptionLabel description={description} />
    </div>
  )
}
