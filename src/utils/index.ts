import misc from './misc'
import main from './main'
import format from './format'
import transform from './transform'

import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export default {
  ...misc,
  ...main,
  format,
  transform,
}

export * from './errors'
export * from './guards'
export * from './status-codes'
