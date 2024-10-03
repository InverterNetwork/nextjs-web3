import { cn } from '@/utils'

import {
  JsonView as JsonViewOrg,
  allExpanded,
  defaultStyles,
} from 'react-json-view-lite'
import './styles.css'

export const JsonView = ({
  json,
  className,
}: {
  json: any
  className?: string
}) => {
  return (
    <div className={cn(className, 'rounded-sm')}>
      <JsonViewOrg
        data={json}
        shouldExpandNode={allExpanded}
        style={defaultStyles}
      />
    </div>
  )
}
