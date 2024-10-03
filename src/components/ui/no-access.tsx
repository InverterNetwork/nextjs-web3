import Link from 'next/link'

export function NoAccess() {
  return (
    <div className="felx flex-col gap-5">
      <h1>You Dont Have Access To Visit this Page</h1>
      <div className="divider" />
      <Link href="/">
        <button className="btn btn-primary">Explore</button>
      </Link>
    </div>
  )
}
