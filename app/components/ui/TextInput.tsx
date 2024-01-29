'use client'

import { useInputFocus } from '@/hooks'
import { Input, type InputProps } from 'react-daisyui'
import cn from 'classnames'

export type TextInputProps = {
  onChange: (value: string) => void
  invalid?: boolean
  label?: string
} & Omit<InputProps, 'onChange' | 'placeholder' | 'onSubmit' | 'color'>

const TextInput = (props: TextInputProps) => {
  const { onChange, label, invalid = false, ...inputProps } = props
  const { inputRef, inputIndex, onDone } = useInputFocus()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onDone()
    }
  }

  return (
    <>
      <label className={cn('label', !label && 'hidden')}>
        <span className="label-text">{label}</span>
      </label>

      <Input
        onKeyDown={handleKeyDown}
        placeholder={'Type Here'}
        onChange={handleChange}
        ref={inputRef}
        data-inputindex={inputIndex}
        {...(invalid && { color: 'warning' })}
        {...inputProps}
      />
    </>
  )
}

export default TextInput
