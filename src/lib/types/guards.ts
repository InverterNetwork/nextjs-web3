import { HTTPError } from '.'

export function authorized<T>(
  value: T | undefined | null,
  message?: string
): asserts value is T {
  if (!value)
    throw new HTTPError(
      !!message ? `Unauthorized: ${message}` : 'Unauthorized',
      401
    )
}

export function isNotEmpty<T>(
  value: T | undefined | null,
  message?: string
): asserts value is T {
  if (!value)
    throw new HTTPError(
      !!message ? `No Data Found: ${message}` : 'No Data Found',
      404
    )
}
