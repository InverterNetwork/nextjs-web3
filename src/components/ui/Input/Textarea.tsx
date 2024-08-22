'use client'

import { Textarea as TextareaOrg, type TextareaProps } from '@/react-daisyui'
import { useState, useRef } from 'react'
import { DescriptionLabel, NameLabel } from '.'

export type TextareaInputProps = {
  onChange: (value: string) => void
  invalid?: boolean
  label?: string
  description?: string
} & Omit<TextareaProps, 'onChange' | 'color'>

export const Textarea = ({
  onChange,
  label,
  invalid = false,
  description,
  placeholder,
  ...props
}: TextareaInputProps) => {
  const [isTouched, setIsTouched] = useState(false)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const [valid, setValid] = useState(true)

  const testValidity = (value: string) => {
    let valid = inputRef.current?.validity.valid ?? true

    if (!!inputRef.current) {
      let validityMessage = ''

      inputRef.current.setCustomValidity(validityMessage)
    }

    return valid
  }

  const isInvalid = invalid || !valid

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!isTouched) setIsTouched(true)
    const value = e.target.value
    onChange(value)
    setValid(testValidity(value))
  }

  return (
    <div className="form-control w-auto">
      <NameLabel name={label} required={props.required} />

      <TextareaOrg
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
