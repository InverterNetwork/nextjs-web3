import Link from 'next/link'

export default function FourOFour() {
  return (
    <div className="felx flex-col gap-5">
      <h1>404 / Page Not Found</h1>
      <div className="divider" />
      <Link href="/">
        <button className="btn btn-primary">Explore</button>
      </Link>
    </div>
  )
}
