import { cn } from '@/styles/cn'
import { Number } from './Number'
import { Toggle } from './Toggle'
import { Text } from './Text'

export * from './Number'
export * from './Toggle'
export * from './Text'

export const NameLabel = ({ name }: { name?: string }) => (
  <label className={cn('label', !name && 'hidden')}>
    <span className="label-text">{name}</span>
  </label>
)

export const DescriptionLabel = ({ description }: { description?: string }) => (
  <label className={cn('label', !description && 'hidden')}>
    <span className="label-text-alt">{description}</span>
  </label>
)

export default {
  Number,
  Toggle,
  Text,
}
