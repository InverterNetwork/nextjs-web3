import Link from 'next/link'
import { JsonView } from './json-view'
import { Separator } from './separator'
import { Button } from './button'

export function HasError({ error, reset }: { error: any; reset?: () => void }) {
  return (
    <div className="flex flex-col gap-5">
      <h1>We Have Encountered An Error</h1>
      <Separator />
      <JsonView json={error} />
      <Separator />
      <div className="flex gap-5">
        <Button asChild>
          <Link href="/">Back</Link>
        </Button>
        {!!reset && (
          <Button
            onClick={
              // Attempt to recover by trying to re-render the segment
              () => reset()
            }
          >
            Try again
          </Button>
        )}
      </div>
    </div>
  )
}
