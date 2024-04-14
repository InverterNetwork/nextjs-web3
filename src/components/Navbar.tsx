'use client'

import { usePathname } from 'next/navigation'
import Image from 'next/image'
import NextLink from 'next/link'
import { ThemeSwitcher, WalletWidget } from '.'
import Link from 'next/link'
import { Button, Dropdown } from 'react-daisyui'
import { GiHamburgerMenu } from 'react-icons/gi'
import { cn } from '@/styles/cn'

export function Navbar() {
  const pathname = usePathname()
  return (
    <div
      className={`
      fixed left-1/2 -translate-x-1/2 items-center p-2 flex 
      justify-center gap-4 z-10 w-max bottom-0 
      drop-shadow-2xl rounded-tl-xl rounded-tr-xl bg-base-100 
      border-t border-x border-faint
    `.trim()}
    >
      <NextLink href="/">
        <Image
          priority
          src="/inverter-light-logo.svg"
          alt="inverter_logo"
          width={42}
          height={42}
        />
      </NextLink>

      <ThemeSwitcher className="lg:flex hidden" />

      <WalletWidget />

      <div className="items-center lg:flex hidden gap-4">
        <h4>|</h4>
        <NavItems pathname={pathname} />
      </div>

      <Dropdown className="relative items-center flex lg:hidden">
        <Button tag="label" color="ghost" className="py-0 px-1" tabIndex={0}>
          <GiHamburgerMenu className="fill-current w-5 h-5" />
        </Button>
        <Dropdown.Menu className="menu-sm absolute bottom-[120%] right-0">
          <Dropdown.Item className="flex gap-2">
            <ThemeSwitcher className="w-full" />
          </Dropdown.Item>
          <NavItems pathname={pathname} reverse />
        </Dropdown.Menu>
      </Dropdown>
    </div>
  )
}

const NavItems = ({
  pathname,
  reverse = false,
}: {
  pathname: string
  reverse?: boolean
}) => {
  const arr = [
    { href: '/', label: 'Landing' },
    { href: '/one', label: 'One' },
    { href: '/two', label: 'two' },
  ]

  if (reverse) arr.reverse()

  return arr.map((i, index) => {
    if (reverse) {
      return (
        <Link href={i.href} key={index}>
          <Dropdown.Item anchor={false}>
            <div
              className={cn(
                'my-1 p-2 text-md',
                pathname === i.href && 'bg-neutral'
              )}
            >
              {i.label}
            </div>
          </Dropdown.Item>
        </Link>
      )
    }
    return (
      <Link href={i.href} key={index}>
        <Button
          size={'sm'}
          {...(pathname !== i.href && { color: 'ghost' })}
          active={pathname === i.href}
        >
          {i.label}
        </Button>
      </Link>
    )
  })
}
