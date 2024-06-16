'use client'

import { Toggle as Org, ToggleProps } from '@/react-daisyui'
import { useState, useRef } from 'react'
import { DescriptionLabel, NameLabel } from '.'

export type ToggleInputProps = {
  onChange: (value: boolean) => void
  invalid?: boolean
  label?: string
  description?: string
} & Omit<ToggleProps, 'onChange' | 'color' | 'type'>

export const Toggle = ({
  onChange,
  label,
  invalid = false,
  description,
  ...props
}: ToggleInputProps) => {
  const [isTouched, setIsTouched] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const [valid, setValid] = useState(true)

  const testValidity = (value: boolean) => {
    let valid = inputRef.current?.validity.valid ?? true

    if (!!inputRef.current) {
      // let validityMessage = ''
      // inputRef.current.setCustomValidity(validityMessage)
    }

    return valid
  }

  const isInvalid = invalid || !valid

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isTouched) setIsTouched(true)
    const value = e.target.checked
    onChange(value)
    setValid(testValidity(value))
  }

  return (
    <div className="form-control w-auto">
      <NameLabel name={label} />

      <Org
        placeholder={props.placeholder ?? 'Type Here'}
        onChange={handleChange}
        ref={inputRef}
        {...(isTouched && isInvalid && { color: 'warning' })}
        {...props}
      />

      <DescriptionLabel description={description} />
    </div>
  )
}
