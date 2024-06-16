'use client'

import { Input, type InputProps } from '@/react-daisyui'
import { isAddress } from 'viem'
import { useState, useRef } from 'react'
import { DescriptionLabel, NameLabel } from '.'

export type TextInputProps = {
  onChange: (value: string) => void
  invalid?: boolean
  label?: string
  description?: string
} & Omit<InputProps, 'onChange' | 'color' | 'type'> & {
    type?: InputProps['type'] | 'address'
  }

export const Text = ({
  onChange,
  label,
  invalid = false,
  description,
  placeholder,
  ...props
}: TextInputProps) => {
  const [isTouched, setIsTouched] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const [valid, setValid] = useState(true)

  const testValidity = (value: string) => {
    let valid = inputRef.current?.validity.valid ?? true

    if (!!inputRef.current) {
      let validityMessage = ''
      switch (props.type) {
        case 'address':
          valid = isAddress(value)
          if (!valid) validityMessage = 'Invalid Address'
          break
      }

      inputRef.current.setCustomValidity(validityMessage)
    }

    return valid
  }

  const isInvalid = invalid || !valid

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isTouched) setIsTouched(true)
    const value = e.target.value
    onChange(value)
    setValid(testValidity(value))
  }

  return (
    <div className="form-control w-auto">
      <NameLabel name={label} />

      <Input
        placeholder={placeholder ?? 'Type Here'}
        onChange={handleChange}
        ref={inputRef}
        {...(isTouched && isInvalid && { color: 'warning' })}
        {...props}
      />

      <DescriptionLabel description={description} />
    </div>
  )
}
