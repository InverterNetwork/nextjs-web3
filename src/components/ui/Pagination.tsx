'use client'

import { cn } from '@/styles/cn'
import Link from 'next/link'

type PaginationProps = {
  totalPages?: number
  page: number
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  (
    | {
        setPage(page: number): void
        prevHref?: never
        nextHref?: never
        hrefOrigin?: never
      }
    | {
        setPage?: never
        prevHref?: string | null
        nextHref?: string | null
        hrefOrigin: string
      }
  )

export function Pagination({
  totalPages,
  page,
  setPage,
  hrefOrigin,
  prevHref,
  nextHref,
  ...props
}: PaginationProps) {
  const { className, ...rest } = props
  return (
    <div className={cn('join', className)} {...rest}>
      <button
        className="join-item btn relative"
        disabled={page <= 1}
        onClick={() => {
          setPage?.(page - 1)
        }}
      >
        {prevHref && (
          <Link
            className="absolute w-full h-full left-0"
            href={`${hrefOrigin}${prevHref}`}
          />
        )}
        «
      </button>
      <button className="join-item btn btn-ghost border-faint border-x-0">
        Page {page}
      </button>
      <button
        className="join-item btn relative"
        disabled={!totalPages ? true : page >= totalPages}
        onClick={() => {
          setPage?.(page + 1)
        }}
      >
        {nextHref && (
          <Link
            className="absolute w-full h-full left-0"
            href={`${hrefOrigin}${nextHref}`}
          />
        )}
        »
      </button>
    </div>
  )
}
