'use client'

import { Input, type InputProps } from 'react-daisyui'
import cn from 'classnames'

import { isAddress } from 'viem'
import { useState, useRef } from 'react'

type TextInputRestProps = Omit<InputProps, 'onChange' | 'color' | 'type'> & {
  type?: InputProps['type'] | 'address'
}

export type TextInputProps = {
  onChange: (value: string) => void
  invalid?: boolean
  label?: string
} & TextInputRestProps

const TextInput = ({
  onChange,
  label,
  invalid = false,
  ...props
}: TextInputProps) => {
  const [isTouched, setIsTouched] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const [valid, setValid] = useState(false)

  const handleValidity = (value: string) => {
    let newValid = inputRef.current?.validity.valid ?? false

    if (!!inputRef.current) {
      let validityMessage = ''
      switch (props.type) {
        case 'address':
          newValid = isAddress(value)
          if (!valid) validityMessage = 'Invalid Address'
          break
      }

      inputRef.current.setCustomValidity(validityMessage)
    }

    if (!isTouched) setIsTouched(true)
    if (newValid !== valid) setValid(newValid)
  }

  const isInvalid = invalid || !valid

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    onChange(value)
    handleValidity(value)
  }

  return (
    <>
      <label className={cn('label', !label && 'hidden')}>
        <span className="label-text">{label}</span>
      </label>

      <Input
        placeholder={props.placeholder ?? 'Type Here'}
        onChange={handleChange}
        ref={inputRef}
        {...(isTouched && isInvalid && { color: 'warning' })}
        {...props}
      />
    </>
  )
}

export default TextInput
