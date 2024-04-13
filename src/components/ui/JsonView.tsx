'use client'

import { useTheme } from '@/hooks'

import {
  JsonView as JsonViewOrg,
  allExpanded,
  darkStyles,
  defaultStyles,
} from 'react-json-view-lite'
import 'react-json-view-lite/dist/index.css'

const JsonView = (json: any) => {
  const isLight = useTheme().theme === 'light'
  return (
    <JsonViewOrg
      data={json}
      shouldExpandNode={allExpanded}
      style={isLight ? defaultStyles : darkStyles}
    />
  )
}

export default JsonView
