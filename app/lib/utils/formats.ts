import { formatEther, formatUnits, parseUnits } from 'ethers/lib/utils'
import { BigNumber } from 'ethers'
// Date
export function unixTimeToDate(date?: number) {
  if (!date) return '...'
  return new Intl.DateTimeFormat('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  }).format(date * 1000)
}
// Text
export function firstLetterToUpper(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1)
}
export function comaToDot(x: string) {
  return x.replace(/,/g, '.').replace(/[^0-9.]+/g, '')
}
// Address
export function compressAddress(address?: string) {
  if (!address) return '...'
  return address.slice(0, 4) + '...' + address.slice(-4)
}
// URL
export function encodeQueryData(data: { [key: string]: string | number }) {
  const ret = []
  for (const d in data)
    ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]))
  return ret.join('&')
}

export const getQueryParams = (url: string) => {
  const queryParams = {} as any
  // create an anchor tag to use the property called search
  const anchor = document.createElement('a')
  // assigning url to href of anchor tag
  anchor.href = url
  // search property returns the query string of url
  const queryStrings = anchor.search.substring(1)
  const params = queryStrings.split('&')
  for (let i = 0; i < params.length; i++) {
    const pair = params[i].split('=')
    queryParams[pair[0]] = decodeURIComponent(pair[1])
  }
  return queryParams
}

export const arrToObj = ({
  arr,
  key,
  exclude,
}: {
  arr: { [key: string | number]: any }[]
  key: string | number
  exclude?: (string | number)[]
}) =>
  arr.reduce((prev, curr) => {
    const obj: { [key: string | number]: unknown } = {}
    Object.keys(curr)
      .map((m) => !(exclude ?? []).includes(m) && m)
      .forEach((key) => key && (obj[key] = curr[key]))
    return Object.assign(prev, {
      [curr[key]]: obj,
    })
  }, {})

type KeyValueArray<T> = {
  key: keyof T
  value: T[keyof T]
}[]

export function objectToArray<T extends object>(obj?: T): KeyValueArray<T> {
  return !obj
    ? []
    : Object.entries(obj).map(([key, value]) => ({
        key: key as keyof T,
        value: value as T[keyof T],
      }))
}

export const replacePreUrl = ({ href, replace }: { [key: string]: string }) => {
  return href.replace(/http(s)?(:)?(\/\/)?|(\/\/)?(www\.)?/, replace)
}

export function formatAmountString(input: string): string {
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

// EVM
export const gasToNative = (x: string | number, y: string | number) =>
  Number(Number(formatEther(String(Number(x) * Number(y)))).toFixed(4))

export const parseFormatted = (
  formatted?: string | number,
  decimalsArg?: number
) => {
  if (!formatted || !decimalsArg) return undefined
  return String(parseUnits(Number(formatted).toFixed(decimalsArg), decimalsArg))
}

export const formatParsed = (
  parsed?: string | number | BigNumber,
  decimalsArg?: number
) => {
  if (!parsed! || !decimalsArg) return undefined
  return Number(formatUnits(BigNumber.from(String(parsed)), decimalsArg))
}
