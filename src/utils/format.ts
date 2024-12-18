export function amountString(input: string): string {
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

export function toCompactNumber(value?: string | number) {
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

export const compressAddress = (address?: string) =>
  !address ? '...' : address.slice(0, 4) + '...' + address.slice(-4)

export const firstLetterToUpperCase = (text?: string) =>
  !text ? '...' : text.charAt(0).toUpperCase() + text.slice(1)

export const unixTimeToDisplay = (date: number) =>
  new Intl.DateTimeFormat('en-CA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date * 1000)

export function extractError(errorMessage?: string) {
  if (!errorMessage) return 'Error: Unknown error'
  const regex = /(Error|Details): .*/
  const match = errorMessage.match(regex)
  return match ? match[0] : errorMessage
}

export type PrunedFile = {
  string: string
  type: string
  name: string
}

// Function to convert a Blob to a base64 string
export async function pruneFile(blob?: Blob): Promise<PrunedFile> {
  if (!blob) throw new Error('No file selected')

  const arrayBuffer = await blob.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)
  return { string: buffer.toString('base64'), type: blob.type, name: blob.name }
}

// Function to reconstruct a Blob from a base64 string
export function parseFile({ string, type, name }: PrunedFile): File {
  const buffer = Buffer.from(string, 'base64')
  // Create a File from the Blob, specifying the name and type
  return new File([buffer], name, { type })
}
