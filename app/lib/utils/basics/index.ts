export * from './filters'

// Date
export const unixTime = (date?: Date) =>
  Math.floor((date ?? new Date()).getTime() / 1000)

export const unixTimeToDate = (date: number) => {
  return new Intl.DateTimeFormat('en-CA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date * 1000)
}

// Helpers

export const delay = (s: number) =>
  new Promise((resolve) => setTimeout(resolve, s * 1000))

export const valuesAreEmpty = (input?: object | any[]) => {
  if (!input) return true

  if (Array.isArray(input)) return input.some((value) => !value)

  return Object.values(input!).some((value) => !value)
}

// Text
export const firstLetterToUpper = (text: string) =>
  text.charAt(0).toUpperCase() + text.slice(1)

export const comaToDot = (str: string) =>
  str.replace(/,/g, '.').replace(/[^0-9.]+/g, '')

// Address
export const compressAddress = (address?: string) =>
  !address ? '...' : address.slice(0, 4) + '...' + address.slice(-4)
