'use client'

import { useState } from 'react'
import { Button, Input, type InputProps } from 'react-daisyui'
import Copy from './Copy'
import { useInputFocus } from '@/hooks/useInputFocus'
import cn from 'classnames'
import React from 'react'

type EditableInputProps = {
  rows: {
    onChange: (value: string) => void
    invalid?: boolean
    label?: string
  }[]
  onSubmit: () => void
  header: string
  buttonLabel?: string
  data?: string
  isPending?: boolean
  defaultIsEditing?: boolean
}

export default function SubmitableTextForm({
  rows,
  header,
  data,
  onSubmit,
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
  const { inputRef, inputIndex, onDone } = useInputFocus(isEditing)
  const invalid = rows.some((i) => i.invalid)

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
      variant="outline"
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
        {rows.map(({ onChange, label, invalid = false }, i) => {
          return (
            <React.Fragment key={i}>
              <label className={cn('label', !label && 'hidden')}>
                <span className="label-text">{label}</span>
              </label>

              <Input
                {...props}
                {...(invalid && { color: 'warning' })}
                placeholder={'Type Here'}
                onChange={(e) => {
                  onChange(e.target.value)
                }}
                ref={inputRef}
                data-inputindex={inputIndex}
              />
            </React.Fragment>
          )
        })}

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
