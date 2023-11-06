export const random = (min = 0, max = 200, floating?: boolean) => {
  const isFloating =
    typeof floating === 'boolean'
      ? floating
      : Number.isInteger(min) && Number.isInteger(max)
      ? false
      : true
  const randomNumber = isFloating
    ? Math.random() * (max - min) + min
    : Math.floor(Math.random() * (max - min + 1)) + min
  return randomNumber
}

export const currentUnixTime = () => Math.floor(new Date().getTime() / 1000)

export const delay = (s: number) =>
  new Promise((resolve) => setTimeout(resolve, s * 1000))

export function isEmpty<T>(value: T): boolean {
  if (
    value === null ||
    value === undefined ||
    Number.isNaN(value) ||
    value === '' ||
    value === Infinity
  )
    return true
  // BREAK
  if (typeof value === 'string' || Array.isArray(value))
    return value.length === 0
  // BREAK
  if (typeof value === 'object') return Object.keys(value).length === 0
  return false
}

export const valuesAreEmpty = (input?: object | any[]) => {
  if (isEmpty(input)) return true

  if (Array.isArray(input)) {
    return input.some((value) => isEmpty(value))
  } else {
    return Object.values(input!).some((value) => isEmpty(value))
  }
}
