'use client'

import { useState } from 'react'
import { Button, Input, type InputProps } from 'react-daisyui'
import Copy from './Copy'
import { useInputFocus } from '@/hooks/useInputFocus'
import cn from 'classnames'

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
  const { inputRef, inputIndex, onDone } = useInputFocus(isEditing)

  const toggle = () => {
    if (isEditing) {
      setIsEditing(false)
      onDone()
    } else {
      setIsEditing(true)
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (invalid) return
    onSubmit()
    toggle()
  }

  const Toggler = () => (
    <Button
      size={'sm'}
      color="primary"
      onClick={toggle}
      loading={isPending}
      tabIndex={-1}
    >
      {!isEditing ? (!data ? 'Add' : buttonLabel ?? 'Edit') : 'Cancel'}
    </Button>
  )

  return (
    <>
      <div className={'w-full flex justify-between items-center'}>
        <h3>{header}</h3>
        <Toggler />
      </div>

      <form
        className={cn('form-control w-full', !isEditing && 'hidden')}
        onSubmit={handleSubmit}
      >
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
          ref={inputRef}
          data-inputindex={inputIndex}
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

      <div
        className={cn(
          'flex w-full gap-3 items-center',
          (isEditing || !data) && 'hidden'
        )}
      >
        <p>{data}</p>
        <Copy data={data} />
      </div>
    </>
  )
}
