import Link from 'next/link'
import JsonView from './JsonView'

export default function HasError({ error }: { error: any }) {
  return (
    <div className="felx flex-col gap-5">
      <h1>We Have Encountered An Error Gathering The Data</h1>
      <div className="divider" />
      <JsonView json={error} />
      <div className="divider" />
      <Link href="/">
        <button className="btn btn-primary">Explore</button>
      </Link>
    </div>
  )
}
