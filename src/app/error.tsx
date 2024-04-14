'use client'

import { HasError } from '@/components/ui'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const nonNullableErrorObject = {
    ...(!!error.name && { name: error.name }),
    ...(!!error.cause && { cause: error.cause }),
    ...(!!error.message && { message: error.message }),
    ...(!!error.digest && { digest: error.digest }),
    ...(!!error.stack && { stack: error.stack }),
  }

  return <HasError error={nonNullableErrorObject} reset={reset} />
}
