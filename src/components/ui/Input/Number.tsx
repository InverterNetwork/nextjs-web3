'use client'

import utils from '@/lib/utils'
import { useState, useRef } from 'react'
import { Input, type InputProps /* , Button */ } from '@/react-daisyui'
import { DescriptionLabel, NameLabel } from '.'

export function Number({
  onChange,
  label,
  invalid = false,
  description,
  ...props
}: {
  onChange: (string: string) => void
  label?: string
  invalid?: boolean
  description?: string
} & Omit<InputProps, 'onChange' | 'color' | 'type' | 'inputMode'>) {
  // const stepNumber = Number(props.step ?? 1)

  const [isTouched, setIsTouched] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // const handleIncrementOrDecrement = (inc?: boolean) => {
  //   let newValue =
  //     Number(inputRef.current?.value) + (!!inc ? stepNumber : -stepNumber)
  //   const newString = utils.format.amountString(newValue.toString())

  //   if (!!inputRef.current) inputRef.current.value = newString
  //   onChange(newString)
  //   if (!isTouched) setIsTouched(true)
  // }

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
        placeholder={props.placeholder ?? 'Type Here'}
        ref={inputRef}
        type="number"
        inputMode="decimal"
        onChange={handleChange}
        {...(isTouched && isInvalid && { color: 'warning' })}
        {...props}
      />
      <DescriptionLabel description={description} />

      {/* <div className="flex gap-2 justify-center">
        <Button
          {...(props?.size && { size: props.size })}
          type="button"
          onClick={() => {
            handleIncrementOrDecrement(false)
          }}
          tabIndex={-1}
        >
          -
        </Button>
        <Button
          {...(props?.size && { size: props.size })}
          type="button"
          onClick={() => {
            handleIncrementOrDecrement(true)
          }}
          tabIndex={-1}
        >
          +
        </Button>
      </div> */}
    </div>
  )
}
