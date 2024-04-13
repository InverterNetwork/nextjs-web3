'use client'

import { Input, type InputProps } from 'react-daisyui'
import { cn } from '@/styles/cn'

import { isAddress } from 'viem'
import { useState, useRef } from 'react'

export type TextInputProps = {
  onChange: (value: string) => void
  invalid?: boolean
  label?: string
} & Omit<InputProps, 'onChange' | 'color' | 'type'> & {
    type?: InputProps['type'] | 'address'
  }

const TextInput = ({
  onChange,
  label,
  invalid = false,
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
      <label className={cn('label', !label && 'hidden')}>
        <span className="label-text">{label}</span>
      </label>

      <Input
        // onKeyDown={handleKeyDown}
        placeholder={props.placeholder ?? 'Type Here'}
        onChange={handleChange}
        ref={inputRef}
        // data-inputindex={inputIndex}
        {...(isTouched && isInvalid && { color: 'warning' })}
        {...props}
      />
    </div>
  )
}

export default TextInput
