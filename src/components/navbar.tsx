'use client'

import { usePathname } from 'next/navigation'
import Image from 'next/image'
import NextLink from 'next/link'
import { ThemeSwitcher, WalletWidget } from '.'
import Link from 'next/link'
import { GiHamburgerMenu } from 'react-icons/gi'
import { Button } from './ui/button'
import { DropdownMenu } from './ui/dropdown-menu'

export function Navbar() {
  const pathname = usePathname()
  return (
    <div
      className={`
      fixed items-center p-2 flex w-screen
      justify-between gap-4 top-0 
      drop-shadow-2xl bg-background-100/50 backdrop-blur-2xl
      border-b border-input
    `.trim()}
    >
      <div className="flex items-center gap-4">
        <NextLink href="/">
          <Image
            priority
            src="/logo.png"
            alt="Rare Earth Logo"
            width={64}
            height={64}
          />
        </NextLink>

        <ThemeSwitcher className="lg:flex hidden" />

        <div className="items-center lg:flex hidden gap-4">
          <NavItems pathname={pathname} />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <WalletWidget />

        <span className="lg:hidden">
          <DropdownMenu>
            <DropdownMenu.Trigger asChild>
              <Button variant="outline" size="icon">
                <GiHamburgerMenu className="fill-current w-5 h-5" />
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content align="end">
              <div className="flex items-center justify-between">
                <h4 className="ml-3">Theme</h4>
                <ThemeSwitcher className="mx-auto" />
              </div>
              <DropdownMenu.Separator />
              <NavItems pathname={pathname} reverse />
            </DropdownMenu.Content>
          </DropdownMenu>
        </span>
      </div>
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
  const arr = [{ href: '/', label: 'Home' }]

  if (reverse) arr.reverse()

  return arr.map((i, index) => {
    if (reverse) {
      return (
        <Link href={i.href} key={index}>
          <DropdownMenu.CheckboxItem checked={pathname === i.href}>
            {i.label}
          </DropdownMenu.CheckboxItem>
        </Link>
      )
    }
    return (
      <Button
        key={index}
        size={'sm'}
        asChild
        {...(pathname !== i.href && { variant: 'default' })}
      >
        <Link href={i.href}>{i.label}</Link>
      </Button>
    )
  })
}
