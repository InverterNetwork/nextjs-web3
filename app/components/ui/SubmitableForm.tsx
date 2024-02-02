'use client'

import { useState } from 'react'
import { Button } from 'react-daisyui'
import Copy from './Copy'
import cn from 'classnames'
import React from 'react'
import NumberInput from './NumberInput'
import TextInput, { TextInputProps } from './TextInput'

type SubmitableFormProps = {
  rows: TextInputProps[]
  onSubmit: () => void
  header?: string
  buttonLabel?: string
  data?: string
  isPending?: boolean
  defaultIsEditing?: boolean
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>

export default function SubmitableForm({
  rows,
  header,
  data,
  onSubmit,
  isPending,
  buttonLabel = 'Edit',
  defaultIsEditing = false,
  ...props
}: SubmitableFormProps) {
  const [isEditing, setIsEditing] = useState(!!header ? defaultIsEditing : true)

  const invalid = rows.some((i) => i.invalid)

  const toggle = () => {
    if (isEditing) {
      setIsEditing(false)
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
    <Button size={'sm'} variant="outline" onClick={toggle} loading={isPending}>
      {!isEditing ? (!data ? 'Add' : buttonLabel ?? 'Edit') : 'Cancel'}
    </Button>
  )

  const { className, ...rest } = props

  return (
    <div {...rest} className={cn('flex flex-col w-full gap-3', className)}>
      <div
        className={cn(
          'w-full flex justify-between items-center',
          !header && 'hidden'
        )}
      >
        <h3>{header}</h3>
        <Toggler />
      </div>

      <form
        className={cn('form-control w-full', !isEditing && 'hidden')}
        onSubmit={handleSubmit}
      >
        {rows.map(({ ...props }, i) => {
          if (props.type === 'number') return <NumberInput key={i} {...props} />

          return <TextInput key={i} {...props} />
        })}

        <Button className="mt-6" size={'sm'} color="primary" type="submit">
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
    </div>
  )
}
