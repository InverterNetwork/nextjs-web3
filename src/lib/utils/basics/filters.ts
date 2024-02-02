export function filterNumbers(i: object | any[]): number[] {
  if (Array.isArray(i)) return i.filter((x) => typeof x === 'number')
  else if (typeof i === 'object')
    return Object.values(i).filter((x) => typeof x === 'number')
  else return []
}

export function filterTruthyValues<T>(obj: T): T {
  const filtered = {} as T

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key as keyof T]

      if (
        typeof value === 'object' &&
        value !== null &&
        !Array.isArray(value)
      ) {
        const filteredValue = filterTruthyValues(
          value as Record<string, unknown>
        )

        // Only add the value if it's not an empty object
        if (Object.keys(filteredValue).length > 0) {
          filtered[key as keyof T] = filteredValue as T[keyof T]
        }
      } else if (value || typeof value === 'number') {
        filtered[key as keyof T] = value
      }
    }
  }

  return filtered
}
