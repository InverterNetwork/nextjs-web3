'use client'

import { Dropdown, Loading, Table } from '@/react-daisyui'
import { NoData } from '.'
import { Fragment, useState } from 'react'
import Link from 'next/link'
import { HiDotsHorizontal } from 'react-icons/hi'
import utils, { cn } from '@/utils'

type Action = {
  name: string
  onClick: () => void
}

type Row = (
  | { item: string; type: 'url' }
  | {
      item: Action[]
      type: 'dropdown'
    }
  | { item: string; type?: undefined }
  | { item: Date; type: 'date' }
  | { item: Date; type: 'age' }
  | { item: () => JSX.Element; type: 'custom' }
)[]

export function InteractiveTable({
  isPending,
  heads,
  rows,
  onSelect,
  className,
  tableProps,
  rowProps,
}: {
  isPending?: boolean
  heads: string[]
  rows: Row[]
  onSelect?: (index: number) => void
  className?: string
  tableProps?: React.ComponentProps<typeof Table>
  rowProps?: Omit<React.ComponentProps<typeof Table.Row>, 'onClick' | 'key'>
}) {
  const [selected, setSelected] = useState<number>(0)

  if (isPending) return <Loading className={'m-4 self-center'} />

  if (!rows.length) return <NoData />

  return (
    <div className={cn('overflow-y-scroll w-full scrollbar-none', className)}>
      <Table {...tableProps}>
        <Table.Head>
          {heads.map((head, index) => (
            <span key={index}>{head}</span>
          ))}
        </Table.Head>

        <Table.Body>
          {rows.map((row, index) => {
            const { className, ...rest } = rowProps ?? {}
            return (
              <Table.Row
                className={cn(
                  !!onSelect &&
                    'cursor-pointer transition-transform duration-150 ease-in-out transform active:scale-95 hover:bg-primary hover:text-primary-content',
                  !!onSelect &&
                    selected === index &&
                    'bg-primary text-primary-content',
                  className
                )}
                key={index}
                onClick={() => {
                  if (!!onSelect) {
                    setSelected(index)
                    onSelect(index)
                  }
                }}
                {...rest}
              >
                {row.map((i, index) => {
                  return (
                    <Fragment key={index}>
                      {(() => {
                        switch (i.type) {
                          case 'url':
                            return (
                              <Link href={i.item} target="_blank">
                                {i.item}
                              </Link>
                            )

                          case 'dropdown':
                            return (
                              <span>
                                <Dropdown horizontal="left">
                                  <Dropdown.Toggle>
                                    <HiDotsHorizontal />
                                  </Dropdown.Toggle>
                                  <Dropdown.Menu className="z-10 w-52 bg-base-300">
                                    {i.item.map((i, index) => (
                                      <Dropdown.Item
                                        key={index}
                                        onClick={i.onClick}
                                      >
                                        {i.name}
                                      </Dropdown.Item>
                                    ))}
                                  </Dropdown.Menu>
                                </Dropdown>
                              </span>
                            )

                          case 'date':
                            return (
                              <span>
                                {new Intl.DateTimeFormat('en-US', {
                                  year: 'numeric',
                                  month: '2-digit',
                                  day: '2-digit',
                                }).format(i.item)}
                              </span>
                            )

                          case 'age':
                            try {
                              const { days, hours } = utils.getTimeDiff(i.item)

                              return (
                                <span>
                                  {days} days {hours} hours ago
                                </span>
                              )
                            } catch {
                              return <span>Invalid date</span>
                            }

                          case 'custom':
                            return <span>{i.item()}</span>

                          default:
                            return <span>{i.item}</span>
                        }
                      })()}
                    </Fragment>
                  )
                })}
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table>
    </div>
  )
}
