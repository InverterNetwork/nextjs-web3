import { cn } from '@/styles/cn'
import { Number } from './Number'
import { Toggle } from './Toggle'
import { Text } from './Text'
import { Textarea } from './Textarea'

export const NameLabel = ({
  name,
  alt,
  bigAlt,
  required,
}: {
  name?: string
  alt?: string
  bigAlt?: boolean
  required?: boolean
}) => (
  <label className={cn('label', !name && 'hidden')}>
    <span className={'label-text'}>
      {name}
      {required && <span className="text-error align-top leading-none">*</span>}
    </span>
    {!!alt && (
      <span
        className={cn('label-text-alt', !!bigAlt && 'text-base font-semibold')}
      >
        {alt}
      </span>
    )}
  </label>
)

export const DescriptionLabel = ({ description }: { description?: string }) => (
  <label className={cn('label', !description && 'hidden')}>
    <span className="label-text-alt">{description}</span>
  </label>
)

export type { TextInputProps } from './Text'
export type { TextareaInputProps } from './Textarea'
export type { ToggleInputProps } from './Toggle'
export type { NumberInputProps } from './Number'

export default {
  Textarea,
  Number,
  Toggle,
  Text,
}
