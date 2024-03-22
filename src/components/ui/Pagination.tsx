import { cn } from '@/styles/cn'

export default function Pagination({
  totalPages,
  page,
  setPage,
  ...props
}: {
  totalPages?: number
  page: number
  setPage(page: number): void
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>) {
  const { className, ...rest } = props
  return (
    <div className={cn('join', className)} {...rest}>
      <button
        className="join-item btn"
        disabled={page <= 1}
        onClick={() => {
          setPage(page - 1)
        }}
      >
        «
      </button>
      <button className="join-item btn">Page {page}</button>
      <button
        className="join-item btn"
        disabled={(totalPages ?? 1) <= page}
        onClick={() => {
          setPage(page + 1)
        }}
      >
        »
      </button>
    </div>
  )
}
