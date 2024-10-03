'use client'

import { usePathname } from 'next/navigation'
import Image from 'next/image'
import NextLink from 'next/link'
import { ThemeSwitcher, WalletWidget } from '.'
import Link from 'next/link'
import { GiHamburgerMenu } from 'react-icons/gi'
import { cn } from '@/utils'
import { Button } from './ui/button'
import { DropdownMenu } from './ui/dropdown-menu'
import { useTheme } from 'next-themes'

export function Navbar() {
  const { theme } = useTheme()
  const pathname = usePathname()
  return (
    <div
      className={`
      fixed left-1/2 -translate-x-1/2 items-center p-2 flex 
      justify-center gap-4 z-10 w-max bottom-0 
      drop-shadow-2xl rounded-tl-xl rounded-tr-xl bg-background-100/50 backdrop-blur-2xl
      border-t border-x
    `.trim()}
    >
      <NextLink href="/">
        <Image
          className={cn(theme === 'light' && 'invert')}
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
