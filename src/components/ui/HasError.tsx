import Link from 'next/link'
import { JsonView } from '.'

export function HasError({ error, reset }: { error: any; reset?: () => void }) {
  return (
    <div className="felx flex-col gap-5">
      <h1>We Have Encountered An Error</h1>
      <div className="divider" />
      <JsonView json={error} />
      <div className="divider" />
      <div className="flex gap-5">
        <Link href="/">
          <button className="btn btn-primary">Home</button>
        </Link>
        {!!reset && (
          <button
            onClick={
              // Attempt to recover by trying to re-render the segment
              () => reset()
            }
            className="btn btn-primary"
          >
            Try again
          </button>
        )}
      </div>
    </div>
  )
}
