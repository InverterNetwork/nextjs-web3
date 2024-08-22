function amountString(input: string): string {
  // Remove any leading zeros
  let sanitizedInput = input.replace(/^0+(?=[1-9])/g, '')
  // Replace commas with periods
  sanitizedInput = sanitizedInput.replace(/,/g, '.')
  // Replace all characters except numbers, commas, and periods with an empty string
  sanitizedInput = sanitizedInput.replace(/[^\d.,]/g, '')
  // Replace any duplicate periods with a single period
  sanitizedInput = sanitizedInput.replace(/\.+/g, '.')
  // Add a leading zero if the input starts with a decimal point
  if (/^\./.test(sanitizedInput)) sanitizedInput = `0${sanitizedInput}`
  // Don't start with a point or comma
  if (/^[.,]/.test(sanitizedInput)) sanitizedInput = `0${sanitizedInput}`
  // Ensure that only one period or comma is present in the output string
  const [integerPart, fractionalPart] = sanitizedInput.split('.')
  if (fractionalPart)
    sanitizedInput = `${integerPart}.${fractionalPart.replace(/[\.,]/g, '')}`
  return sanitizedInput
}

function toCompactNumber(value?: string | number) {
  const number = Number(value)
  if (isNaN(number)) return '...'

  const formatter = new Intl.NumberFormat('en', {
    notation: 'compact',
    compactDisplay: 'short',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  return formatter.format(number)
}

const compressAddress = (address?: string) =>
  !address ? '...' : address.slice(0, 4) + '...' + address.slice(-4)

const firstLetterToUpperCase = (text?: string) =>
  !text ? '...' : text.charAt(0).toUpperCase() + text.slice(1)

const unixTimeToDisplay = (date: number) =>
  new Intl.DateTimeFormat('en-CA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date * 1000)

function extractError(errorMessage?: string) {
  if (!errorMessage) return 'Error: Unknown error'
  const regex = /(Error|Details): .*/
  const match = errorMessage.match(regex)
  return match ? match[0] : errorMessage
}

export default {
  extractError,
  amountString,
  toCompactNumber,
  compressAddress,
  firstLetterToUpperCase,
  unixTimeToDisplay,
}
