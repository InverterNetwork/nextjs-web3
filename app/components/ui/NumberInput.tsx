import { useInputFocus } from '@/hooks/useInputFocus'
import { formatAmountString } from '@/lib/utils'
import cn from 'classnames'

export default function NumberInput({
  step = 1,
  defaultValue = 1,
  min = 0,
  max = undefined,
  precision = 0,
  onChange,
  value,
  label,
  ...props
}: {
  onChange: (string: string) => void
  value: string | number
  step?: number
  defaultValue?: number
  min?: number
  precision?: number
  max?: number
  label?: string
} & Omit<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  'onChange'
>) {
  const handleIncrement = () => {
    let newValue = (Number(value) ?? defaultValue) + step
    if (max !== undefined) newValue = Math.min(newValue, max)
    onChange(formatAmountString(newValue.toString()))
  }

  const handleDecrement = () => {
    let newValue = (Number(value) ?? defaultValue) - step
    if (min !== undefined) newValue = Math.max(newValue, min)
    onChange(formatAmountString(newValue.toString()))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (max !== undefined && Number(e.target.value) > max) return
    onChange(formatAmountString(e.target.value))
  }

  const { inputRef, inputIndex, onDone } = useInputFocus()

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') onDone()
  }

  props.className = cn(props?.className)

  return (
    <div {...props}>
      {!!label && (
        <>
          <h3>{label}</h3>
          <hr className="my-3" />
        </>
      )}
      <div className="flex gap-3">
        <button onClick={handleDecrement} className="btn" tabIndex={-1}>
          -
        </button>
        <input
          ref={inputRef}
          onKeyDown={handleKeyDown}
          type="number"
          inputMode="decimal"
          value={value}
          onChange={handleChange}
          className="input w-full input-bordered"
          data-inputindex={inputIndex}
        />
        <button onClick={handleIncrement} className="btn" tabIndex={-1}>
          +
        </button>
      </div>
    </div>
  )
}
