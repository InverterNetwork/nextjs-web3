'use client'

import { useState } from 'react'
import { Button, Input, type InputProps } from 'react-daisyui'
import Copy from './Copy'

type EditableInputProps = {
  onChange: (value: string) => void
  onSubmit: () => void
  header: string
  buttonLabel?: string
  invalid?: boolean
  label?: string
  data?: string
  isPending?: boolean
  defaultIsEditing?: boolean
}

export default function SubmitableText({
  label,
  header,
  data,
  onChange,
  onSubmit,
  invalid = false,
  isPending,
  buttonLabel = 'Edit',
  defaultIsEditing,
  ...props
}: EditableInputProps &
  Omit<
    InputProps,
    'onChange' | 'placeholder' | 'value' | 'onSubmit' | 'color'
  >) {
  const [isEditing, setIsEditing] = useState(defaultIsEditing ?? false)
  const [inputValue, setInputValue] = useState('')

  const toggle = () => setIsEditing((prev) => !prev)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit()
    toggle()
  }

  const Toggler = () => (
    <Button size={'sm'} color="primary" onClick={toggle} loading={isPending}>
      {!isEditing ? (!data ? 'Add' : buttonLabel ?? 'Edit') : 'Cancel'}
    </Button>
  )

  return (
    <>
      <div className={'w-full flex justify-between items-center'}>
        <h3>{header}</h3>
        <Toggler />
      </div>

      {isEditing && (
        <form className="form-control w-full" onSubmit={handleSubmit}>
          {!!label && (
            <label className="label">
              <span className="label-text">{label}</span>
            </label>
          )}
          <Input
            {...props}
            {...(invalid && { color: 'warning' })}
            value={inputValue}
            placeholder={'Type Here'}
            onChange={(e) => {
              onChange(e.target.value)
              setInputValue(e.target.value)
            }}
          />

          <Button
            className="mt-3"
            size={'sm'}
            color="primary"
            type="submit"
            disabled={invalid}
          >
            Submit
          </Button>
        </form>
      )}

      {!isEditing && !!data && (
        <div className={'flex w-full gap-3 items-center'}>
          <p>{data}</p>
          <Copy data={data} />
        </div>
      )}
    </>
  )
}
